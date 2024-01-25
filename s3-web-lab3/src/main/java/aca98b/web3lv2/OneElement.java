package aca98b.web3lv2;

public final class OneElement {
    private final float x;
    private final float y;
    private final float r;
    private final String result;
    private final String time;
    private final String scriptTime;
    private final String utoken;

    public OneElement(float x, float y, float r, String result, String time, String scriptTime, String utoken){
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.time = time;
        this.scriptTime = scriptTime;
        this.utoken = utoken;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    public String getResult() {
        return result;
    }

    public String getTime() {
        return time;
    }

    public String getScriptTime() {
        return scriptTime;
    }

    public String getUtoken() {
        return utoken;
    }
}
