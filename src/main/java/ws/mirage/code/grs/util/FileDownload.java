package ws.mirage.code.grs.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 下载文件的流设置
 * @author Mirage
 * @time 2019年4月28日 下午7:01:38
 *
 */
public class FileDownload {

    /**
     * 下载模板
     * @param response
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("downTemplate")
    public void downTemplate(HttpServletResponse response) throws UnsupportedEncodingException {
        FileDownload.DownloadTemplate(response, "file/office/春节走访困难户信息模板.xlsx");
    }
    

    /**
     * 从服务端下载文件的工具类
     * @param response 响应对象
     * @param filePath 文件路径
     * @throws UnsupportedEncodingException 抛出的'不存在对应编码的异常',编码写对了就不会报异常，所以抛出
     */
    public static void DownloadTemplate(HttpServletResponse response,String filePath) throws UnsupportedEncodingException {
        //1.获取要下载的文件的绝对路径
        //2.获取要下载的文件名，从最后一个路径分隔符开始截取，获得文件名
        String fileName1 = filePath.substring(filePath.lastIndexOf("/")+1);
        String fileName = new String(fileName1.getBytes(), "ISO-8859-1");//Tomcat传输用的是iso-8859-1，避免乱码
        response.reset();//清空response，避免下载异常
        //ContentType:二进制流
        response.setContentType("application/octet-stream");
        //3.设置content-disposition响应头控制浏览器以下载的形式打开此文件
        response.setHeader("content-disposition", 
                "attachment;filename="+fileName);
        InputStream in = null;
        OutputStream out = null;
        try {
            //4.获取输入流读取文件
            in = new FileInputStream(filePath);
            int len = 0;
            byte[] buffer = new byte[1024*10];
            //5.获取输出流发送文件
            out = response.getOutputStream();
            while((len = in.read(buffer))>0) {
                out.write(buffer, 0, len);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                in.close();
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
