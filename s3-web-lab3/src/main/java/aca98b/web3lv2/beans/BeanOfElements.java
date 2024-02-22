package aca98b.web3lv2.beans;

import aca98b.web3lv2.AreaCheck;
import aca98b.web3lv2.DbUtil;
import aca98b.web3lv2.OneElement;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import jakarta.inject.Inject;
import jakarta.faces.validator.ValidatorException;
import jakarta.inject.Named;
import org.primefaces.PrimeFaces;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;


@Named
@SessionScoped
public class BeanOfElements implements Serializable {
    private List<OneElement> listOfElements = new ArrayList<>();
    private AreaCheck areaCheck = new AreaCheck();
    private float[] arrayOfR = {1.0f, 1.5f, 2.0f, 2.5f, 3.0f};
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    private DbUtil dbUtil = new DbUtil();
    private String sessionId = "";
    private String noToken = "noToken";
    private Float minX = -5f;
    private Float maxX = 5f;
    private Float minY = -3f;
    private Float maxY = 5f;


    public BeanOfElements() {
        listOfElements = loadDB();
        sessionId = FacesContext.getCurrentInstance().getExternalContext().getSessionId(true);
    }

    private void addElement(String xNew, String yNew, String rNew){
        try {
            float x = Float.parseFloat(xNew);
            float y = Float.parseFloat(yNew);
            float r = Float.parseFloat(rNew);
            long scriptStart = System.nanoTime();
            if (x >= minX && x <= maxX && y >= minY && y <= maxY && areaCheck.inArr(r, arrayOfR)) {
                String res = areaCheck.checker(x, y, r);
                LocalTime currentTime = LocalTime.now();
                String curTime = currentTime.format(formatter);
                String scriptTime = String.format("%.2f", (double) (System.nanoTime() - scriptStart) * 0.0001);
                OneElement el = new OneElement(x, y, r, res, curTime, scriptTime, generateToken());
                safetyAdd(el);
            }
        } catch (NumberFormatException e) {
            FacesMessage message = new FacesMessage("Bad args for numbers!");
            throw new ValidatorException(message);
        }
    }

    public void addNew(String x, String y, String r){ addElement(x, y, r); }

    public void addNewGraph(){
        Map<String, String> values = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        addNew(values.get("x"), values.get("y"), values.get("r"));
    }

    public void clear(){
        listOfElements.clear();
        clearDB();
        System.out.println(listOfElements);
        System.out.println("NORM 4ISTENbKO");
    }

    public List<OneElement> getList(){
        return listOfElements;
    }


    public void sendAllPoint(){
        ObjectMapper objectMapper = new ObjectMapper();
        String json = "[]";
        try {
            json = objectMapper.writeValueAsString(listOfElements);
            System.out.println(json);
            PrimeFaces.current().ajax().addCallbackParam("response", json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            PrimeFaces.current().ajax().addCallbackParam("response", "[]");
        }
    }

    public List<OneElement> loadDB() {
        try (Connection connection = DbUtil.GetConnection()) {
            String sql = "SELECT * FROM aca98b";
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    return DbUtil.convertResultSetToList(resultSet).stream()
                            .map(row -> new OneElement(
                                    ((Number) row.get("x")).floatValue(),
                                    ((Number) row.get("y")).floatValue(),
                                    ((Number) row.get("r")).floatValue(),
                                    (String) row.get("result"),
                                    (String) row.get("time"),
                                    (String) row.get("scriptTime"),
                                    noToken
                            ))
                            .collect(Collectors.toList());
                }
            }
        } catch (SQLException e) {
            // Handle SQLException, log or rethrow if needed
            e.printStackTrace();
            return List.of(); // Return an empty list in case of an error
        }
    }

    public void saveDB(OneElement resultEl) throws SQLException {
        Connection connection = DbUtil.GetConnection();

        String sql = "INSERT INTO aca98b (x, y, r, result, time, scriptTime) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setFloat(1, resultEl.getX());
            preparedStatement.setFloat(2, resultEl.getY());
            preparedStatement.setFloat(3, resultEl.getR());
            preparedStatement.setString(4, resultEl.getResult());
            preparedStatement.setString(5, resultEl.getTime());
            preparedStatement.setString(6, resultEl.getScriptTime());

            if (preparedStatement.executeUpdate() > 0) {
                System.out.println("DbElement inserted successfully.");
            } else {
                System.out.println("Failed to insert DbElement.");
            }
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void clearDB() {
        try (Connection connection = DbUtil.GetConnection()) {
            String sql = "DELETE FROM aca98b";
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, sessionId);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void safetyAdd(OneElement el) {

        String token = el.getUtoken();
        listOfElements.add(el);
        try {
            saveDB(el);
        } catch (Exception e) {
            listOfElements.removeIf(element -> Objects.equals(element.getUtoken(), token));
            FacesMessage message = new FacesMessage("Ошибка при сохранении в БД");
            throw new ValidatorException(message, e);
        }
    }

    public String generateToken(){
        String resultToken = "";
        try {
            KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
            keyGen.initialize(512);
            KeyPair keyPair = keyGen.generateKeyPair();
            byte[] privateKeyBytes = keyPair.getPrivate().getEncoded();
            byte[] shortPrivateKey = new byte[50];
            System.arraycopy(privateKeyBytes, 0, shortPrivateKey, 0, 50);
            resultToken = Base64.getEncoder().encodeToString(shortPrivateKey);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return resultToken;
    }
}

