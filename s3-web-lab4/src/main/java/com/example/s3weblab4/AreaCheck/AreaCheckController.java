package com.example.s3weblab4.AreaCheck;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    private ResultElement addElement(Coordinates coordinates) {
        String res = AreaChecker.Check(coordinates);
        ResultElement resultElement = new ResultElement(coordinates, res, "man");
        SaveDB(resultElement);
        return resultElement;
    }

    private void SaveDB(ResultElement resultElement) {

    }
}
