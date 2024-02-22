package com.example.s3weblab4.AreaCheck;

public class AreaChecker {
    public static String Check(Coordinates coordinates){
        float x = coordinates.x;
        float y = coordinates.y;
        float r = coordinates.r;
        String resultF = "false";

        if (x >= 0 && y <= 0){
            if (x <= r && -y <= r && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2))) {
                resultF = "true";
            }
        }
        if (x >= 0 && y >= 0){
            if (x <= r && y <= r / 2) {
                resultF = "true";
            }
        }
        if (x <= 0 && y >= 0) {
            if (-x <= r / 2 && y <= r / 2 && -x + y <= r) {
                resultF = "true";
            }
        }

        return resultF;
    }

    public static boolean inArr(float ch, float[] arr){
        boolean res = false;
        for (float x : arr) {
            if (x == ch) {
                res = true;
                break;
            }
        }
        return res;
    }
}
