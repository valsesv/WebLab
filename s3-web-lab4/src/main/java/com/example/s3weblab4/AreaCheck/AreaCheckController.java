package com.example.s3weblab4.AreaCheck;

import com.example.s3weblab4.DbData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;

@RestController
public class AreaCheckController {



    @PostMapping("/sendDataToBackend")
    public ResponseEntity<?> sendDataToBackend(@RequestBody Coordinates coordinates) {
        try {
            ResultElement resultElement = addElement(coordinates);
            return ResponseEntity.ok().body(resultElement);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to process data on the server");
        }
    }

    private ResultElement addElement(Coordinates coordinates) throws SQLException {
        String res = AreaChecker.Check(coordinates);
        ResultElement resultElement = new ResultElement(coordinates, res, "man");
        SaveToDB(resultElement);
        return resultElement;
    }

    private void SaveToDB(ResultElement resultElement) throws SQLException {
        // SQL query to insert data into the database
        String sql = "INSERT INTO result_elements(x, y, r, result, username) VALUES(?,?,?,?, ?)";

        try (Connection conn = DriverManager.getConnection(DbData.url);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            // Set parameters for the PreparedStatement
            pstmt.setDouble(1, resultElement.coordinates().x);
            pstmt.setDouble(2, resultElement.coordinates().y);
            pstmt.setDouble(3, resultElement.coordinates().r);
            pstmt.setString(4, resultElement.result());
            pstmt.setString(5, resultElement.username());

            // Execute the insert statement
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw e; // Rethrow the exception to handle it in the calling method
        }
    }

}
