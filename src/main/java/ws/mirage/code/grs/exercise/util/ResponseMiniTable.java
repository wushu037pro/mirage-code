package ws.mirage.code.grs.exercise.util;

import java.io.Serializable;

/**
 * 返回简略表的json数据-工具类
 * @author 94080
 *
 * @param <E>
 */
public class ResponseMiniTable<E> implements Serializable{

    private static final long serialVersionUID = 1L;
    
    private Integer code;
    private String msg;
    private Integer count;
    private E data;
    
    @Override
    public String toString() {
        return "ResponseMiniTable [code=" + code + ", msg=" + msg + ", count=" + count + ", data=" + data + "]";
    }
    
    public Integer getCode() {
        return code;
    }
    public void setCode(Integer code) {
        this.code = code;
    }
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
    public Integer getCount() {
        return count;
    }
    public void setCount(Integer count) {
        this.count = count;
    }
    public E getData() {
        return data;
    }
    public void setData(E data) {
        this.data = data;
    }

    
    
}
