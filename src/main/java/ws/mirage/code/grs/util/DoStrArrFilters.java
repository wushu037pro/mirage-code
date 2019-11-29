package ws.mirage.code.grs.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 * @author Mirage
 * @create 2019-08-16 23:42
 */
public class DoStrArrFilters {

    /**
     * 删除数组中的指定值  或者数组中的元素包含指定值
     * @param filters   数组
     * @param target    指定值
     * @return
     */
    public String[] doStrArrFilters(String[] filters, String target){
        String[] res = null;
        if(filters.length > 0) {
            List<String> tempList = Arrays.asList(filters);
            //Arrays.asList(filters) 迭代器实现类 不支持remove() 删除，多一步转化
            List<String> arrList = new ArrayList<String>(tempList);
            Iterator<String> it = arrList.iterator();
            while(it.hasNext()) {
                String x = it.next();
                if(x.indexOf(target) != -1) {
                    it.remove();
                }
            }
            res = new String[arrList.size()];
            arrList.toArray(res);
        }
        return res;
    }
}
