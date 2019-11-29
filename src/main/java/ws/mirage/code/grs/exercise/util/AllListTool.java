package ws.mirage.code.grs.exercise.util;

import java.io.Serializable;

/**
 * 用于接收layui请求显示数据表格的参数的工具类
 * 用于导出请求传入查询条件参数的工具类(只用select1 select2 ...参数)
 * @author Mirage
 *
 */
public class AllListTool implements Serializable{

private static final long serialVersionUID = 1L;
	
    //请求的页数
    private Integer page;
	//显示的条数
	private Integer limit;
	//查询条件1
	private String select1;
	//查询条件2
	private String select2;
	//查询条件3
    private String select3;
	//经过计算后数据库语句需要跳过的条数
	private Integer pass;
	
    @Override
    public String toString() {
        return "AllListTool [page=" + page + ", limit=" + limit + ", select1=" + select1 + ", select2=" + select2
                + ", select3=" + select3 + ", pass=" + pass + "]";
    }
    
    public Integer getPage() {
        return page;
    }
    public void setPage(Integer page) {
        this.page = page;
    }
    public Integer getLimit() {
        return limit;
    }
    public void setLimit(Integer limit) {
        this.limit = limit;
    }
    public String getSelect1() {
        return select1;
    }
    public void setSelect1(String select1) {
        this.select1 = select1;
    }
    public String getSelect2() {
        return select2;
    }
    public void setSelect2(String select2) {
        this.select2 = select2;
    }
    public String getSelect3() {
        return select3;
    }
    public void setSelect3(String select3) {
        this.select3 = select3;
    }
    public Integer getPass() {
        return pass;
    }
    public void setPass(Integer pass) {
        this.pass = pass;
    }

    

	
}
