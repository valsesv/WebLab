package com.example.s3weblab4.Results;

import com.example.s3weblab4.AreaCheck.Coordinates;
import com.example.s3weblab4.AreaCheck.ResultElement;
import com.example.s3weblab4.DbData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ResultElementController {

    @GetMapping("/getResultElementsByUsername")
    public ResponseEntity<List<ResultElement>> getResults(@RequestParam String username) throws SQLException {
        List<ResultElement> resultElements = getResultElementsByUsername(username);
        return new ResponseEntity<>(resultElements, HttpStatus.OK);
    }

    public List<ResultElement> getResultElementsByUsername(String username) throws SQLException {
        List<ResultElement> resultList = new ArrayList<>();

        // SQL query to retrieve ResultElements for a given username
        String sql = "SELECT coordinates_x, coordinates_y, result FROM result_elements WHERE username = ?";

        try (Connection conn = DriverManager.getConnection(DbData.url);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Set the username parameter
            pstmt.setString(1, username);

            // Execute the query
            ResultSet rs = pstmt.executeQuery();

            // Iterate through the result set and create ResultElement objects
            while (rs.next()) {
                Coordinates coordinates = new Coordinates();
                coordinates.x = rs.getFloat("x");
                coordinates.y = rs.getFloat("y");
                coordinates.r = rs.getFloat("r");
                coordinates.username = rs.getString("username");
                String result = rs.getString("result");

                ResultElement resultElement = new ResultElement(coordinates, result);

                // Add the result element to the list
                resultList.add(resultElement);
            }
        }

        return resultList;
    }
}
