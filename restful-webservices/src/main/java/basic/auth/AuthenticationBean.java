package basic.auth;

public class AuthenticationBean {

    private String msg;

    AuthenticationBean(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "AuthenticationBean{" +
                "msg='" + msg + '\'' +
                '}';
    }
}
