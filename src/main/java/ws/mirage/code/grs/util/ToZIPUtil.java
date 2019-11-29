package ws.mirage.code.grs.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;

/**
 * @author Mirage
 * @create 2019-07-16 17:33
 */
public class ToZIPUtil {
    /**
     * 压缩成ZIP --适用于把‘小微企业中用户上传的附件’压缩 （全部压缩完，在调用之后关流）
     * @param baseFile 需要压缩的文件list，包含文件路径和文件名
     * @param zOut 压缩文件输出流
     * @param pathName zip的条目(参数传的时候后边直接带上斜杠表示是文件夹)
     * @param realPath uoload文件所在的路径
     * @throws RuntimeException 压缩失败会抛出运行时异常
     */
    public static void toZip(List<Map<String,Object>> baseFile , ZipOutputStream zOut, String pathName, String realPath)throws RuntimeException {

        //long start = System.currentTimeMillis();
        try {

            // 建立ZIP条目，参数的填写：以 '输出流指向的zip文件所在的目录' 开始，写相对路径
            zOut.putNextEntry(new ZipEntry( pathName ));
            for (Map fileMap : baseFile) {
                byte[] buf = new byte[10*1024];
                //压缩后的路径和文件名，路径就是输出流的目标路径
                zOut.putNextEntry(new ZipEntry(pathName+(String) fileMap.get("fileName")));
                int len;
                //将要被压缩的File文件，参数可以是String型(文件位置)，也可以是File型
                FileInputStream in = new FileInputStream(realPath+(String) fileMap.get("realpath"));
                while ((len = in.read(buf)) != -1){
                    zOut.write(buf, 0, len);
                }
                zOut.closeEntry();
                in.close();
            }

            //long end = System.currentTimeMillis();
            //System.err.println("压缩完成，耗时：" + (end - start) +" ms");
        } catch (Exception e) {
            throw new RuntimeException("zip error from ZipUtils",e);
        }
    }


    /**
     * 压缩成ZIP --适用于把‘小微企业生成的word’压缩
     * @param SingleFile 需要压缩的文件，包含文件路径和文件名
     * @param zOut 压缩文件输出流
     * @throws RuntimeException 压缩失败会抛出运行时异常
     */
    public static void toZipForSingle(File SingleFile , ZipOutputStream zOut)throws RuntimeException {

        //long start = System.currentTimeMillis();
        try {

            byte[] buf = new byte[10*1024];
            //压缩后的路径和文件名，路径就是输出流的目标路径
            zOut.putNextEntry(new ZipEntry(SingleFile.getName()));
            int len;
            //将要被压缩的File文件
            FileInputStream in = new FileInputStream(SingleFile);
            while ((len = in.read(buf)) != -1){
                zOut.write(buf, 0, len);
            }
            zOut.closeEntry();
            in.close();

            //long end = System.currentTimeMillis();
            //System.err.println("压缩完成，耗时：" + (end - start) +" ms");
        } catch (Exception e) {
            throw new RuntimeException("zip error from ZipUtils",e);
        }
    }





















    /**
     * 压缩成ZIP --适用于小微 --(内部关流,只能调用一次。不用了)
     * @param baseFile 需要压缩的文件list，包含文件路径和文件名
     * @param out 压缩文件输出流
     * @param pathName zip的条目(参数写的时候直接带上斜杠)
     * @param realPath uoload文件所在的路径
     * @throws RuntimeException 压缩失败会抛出运行时异常
     */
    public static void toZip2(List<Map<String,Object>> baseFile , OutputStream out, String pathName, String realPath)throws RuntimeException {

        //long start = System.currentTimeMillis();
        ZipOutputStream zOut = null ;
        try {
            //将文件输出ZIP输出流接起来
            zOut = new ZipOutputStream(out);
            zOut.setEncoding("gbk");
            // 建立ZIP条目
            zOut.putNextEntry(new ZipEntry( pathName ));
            for (Map fileMap : baseFile) {
                byte[] buf = new byte[10*1024];
                //压缩后的路径和文件名，路径就是输出流的目标路径
                zOut.putNextEntry(new ZipEntry(pathName+(String) fileMap.get("fileName")));
                int len;
                //将要被压缩的File文件
                FileInputStream in = new FileInputStream(realPath+(String) fileMap.get("realpath"));
                while ((len = in.read(buf)) != -1){
                    zOut.write(buf, 0, len);
                }
                zOut.closeEntry();
                in.close();
            }

            //long end = System.currentTimeMillis();
            //System.err.println("压缩完成，耗时：" + (end - start) +" ms");
        } catch (Exception e) {
            throw new RuntimeException("zip error from ZipUtils",e);
        }
        finally{
            if(zOut != null){
                System.err.println("=====================");
                try {
                    zOut.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
