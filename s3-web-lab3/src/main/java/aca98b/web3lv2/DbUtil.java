package aca98b.web3lv2;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

//@SessionScoped
public class DbUtil {

    private static String url = "jdbc:sqlite:aca98b";
    public static Connection GetConnection() throws SQLException {
        return  DriverManager.getConnection(url);
    }

    static {
        try {
            Class.forName("org.sqlite.JDBC");

            // Create the aca98b table
            try (Statement statement = GetConnection().createStatement()) {
                String createTableSql = "CREATE TABLE IF NOT EXISTS aca98b ("
                        + "id INTEGER PRIMARY KEY,"
                        + "x FLOAT NOT NULL,"
                        + "y FLOAT NOT NULL,"
                        + "r FLOAT NOT NULL,"
                        + "result TEXT NOT NULL,"
                        + "time TEXT NOT NULL,"
                        + "scriptTime TEXT NOT NULL)";
                statement.executeUpdate(createTableSql);
            }

        } catch (ClassNotFoundException | SQLException ex) {
            Logger lgr = Logger.getLogger(DbUtil.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }

//        }
    }


    public static List<Map<String, Object>> convertResultSetToList(ResultSet resultSet) throws SQLException {
        List<Map<String, Object>> resultList = new ArrayList<>();

        ResultSetMetaData metaData = resultSet.getMetaData();
        int columnCount = metaData.getColumnCount();

        while (resultSet.next()) {
            Map<String, Object> row = new HashMap<>();
            for (int i = 1; i <= columnCount; i++) {
                String columnName = metaData.getColumnName(i);
                Object value = resultSet.getObject(i);
                row.put(columnName, value);
            }
            resultList.add(row);
        }

        return resultList;
    }
}