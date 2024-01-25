package aca98b.web3lv2;

public class AreaCheck {
    public String checker(float x, float y, float r){
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

    public boolean inArr(float ch, float[] arr){
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
