package ws.mirage.code.grs.util;

import java.io.File;

/**
 * @author Mirage
 * @create 2019-07-16 17:32
 */
public class FileDelete {


    /*
     * 如果是文件 ==》直接删除
     * 如果是目录 ==》必须先删除里面每一层目录里的所有文件，最后才能删除外层的目录
     *              原因：不为空的话 删不了
     */
    public static void deleteFile(File file) {
        if(file.exists()) {//判断路径是否存在
            if(file.isFile()){//boolean isFile():测试此抽象路径名表示的文件是否是一个标准文件。
                file.delete();
            }else{//不是文件，对于文件夹的操作
                //保存 路径D:/1/新建文件夹2  下的所有的文件和文件夹到listFiles数组中
                File[] listFiles = file.listFiles();//listFiles方法：返回file路径下所有文件和文件夹的绝对路径
                for (File file2 : listFiles) {
                    /*
                     * 递归作用：由外到内先一层一层删除里面的文件 再从最内层 反过来删除文件夹
                     *    注意：此时的文件夹在上一步的操作之后，里面的文件内容已全部删除
                     *         所以每一层的文件夹都是空的  ==》最后就可以直接删除了
                     */
                    deleteFile(file2);
                }
            }
            file.delete();
        }else {
            System.out.println("该file路径不存在！！");
        }
    }
}
