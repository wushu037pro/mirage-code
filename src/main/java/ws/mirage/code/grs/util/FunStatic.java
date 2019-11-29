package ws.mirage.code.grs.util;

import java.text.SimpleDateFormat;
import java.util.Date;
/**
 * 九阳、海克斯康主键编码
 * @author Mirage
 * @time 2019年6月5日 下午6:48:39
 *
 */
public class FunStatic {
	
    /**
     * 获取日期类型的主键编码  ---程序中的静态变量+秒
     */
	private static int WorkOrderNoIndex = 1;
	public static synchronized String getWorkOrderNo() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
		String strWorkOrderNo = sdf.format(new Date());
		if (WorkOrderNoIndex > 99)
			WorkOrderNoIndex = 1;
		if (WorkOrderNoIndex < 10)
			strWorkOrderNo += "0" + WorkOrderNoIndex;
		else
			strWorkOrderNo += WorkOrderNoIndex;

		WorkOrderNoIndex++;

		return strWorkOrderNo;
	}
	
	
    /**
     * 获取表单编码，type=2是投诉单，1是咨询单
     * @return
     */
/*    public synchronized String getElseCodef(){
        //设置日期格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String date = sdf.format(new Date());
        Map<String,Object> map = this.findOneForJdbc("select top 1 * from t_code where date='"+date+"' where type=2 order by ints desc ;");
        String code="";
        //如果没有今天的编码日期，就保存一个
        if(map==null||map.size()==0){
            code = date+"0001";
            this.executeSql("insert into t_code(code,date,ints,type) values('"+code+"','"+date+"',1,2)");
        }else{//如果有今天的编码日期，就递增
            int num = (Integer)map.get("ints")+1;
            if(num<1000){
                code = date+String.format("%04d", num);
            }else{
                code = date+String.valueOf(num);
            }
            this.executeSql("update t_code set code='"+code+"',date='"+date+"',ints="+num+" where date='"+date+"' and type=2");
        }
        return code;
    }*/
    
    
    
    
    
    
}
