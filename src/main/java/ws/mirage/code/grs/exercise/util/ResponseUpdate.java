package ws.mirage.code.grs.exercise.util;

import java.io.Serializable;

/**
 * 返回修改信息弹窗的json数据-工具类
 * @author 94080
 *
 */
public class ResponseUpdate<T> implements Serializable{
		
	private static final long serialVersionUID = 1L;
	
	private Integer state;
	private String message;
	private T data;
	
	public ResponseUpdate(Integer state, String message) {
		super();
		this.state = state;
		this.message = message;
	}
	
	public ResponseUpdate(Integer state, Exception e) {
		super();
		this.state = state;
		this.message = e.getMessage();
	}

    @Override
    public String toString() {
        return "ResponseUpdate [state=" + state + ", message=" + message + ", data=" + data + "]";
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }


	
	
}
