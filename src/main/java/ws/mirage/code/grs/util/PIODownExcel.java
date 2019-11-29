package ws.mirage.code.grs.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * poi导出模板
 * @author Mirage
 * @time 2019年5月14日 下午3:59:19
 *
 */
public class PIODownExcel {
    /**
     * 导出模板
     * @param response
     * @param temName 表名&sheet名
     * @param title 表头
     * @throws UnsupportedEncodingException
     * @author Mirage
     * @time 2019年5月14日 下午4:10:31
     */
    public static void downTemplatePerson(HttpServletResponse response,String temName,String[] title) throws UnsupportedEncodingException {
        //创建一个Excel文件
        XSSFWorkbook wb = new XSSFWorkbook();
        //在XSSFWorkbook中添加一个sheet
        XSSFSheet sheet = wb.createSheet(temName);
        //设置表头，即每列对应的列名
        //String[] title = {""};
        /*String[] mapKey = {"zlCCComanyName","zlCCRegistAddress","zlCCComanyType","zlCCRegistTime","zlCCLegalRepreName",
                    "zlCCFirstCertifTIme","auditStatus","zlCCDepositBank","zlCCBankAccount","zlCCContactName",
                    "zlCCContactTelNum","zlCCCertifiBody","zlCCGuidanceAgency","zlRmaddress"};*/
        
        //标题样式
        XSSFCellStyle titlestyle = wb.createCellStyle();
        //即垂直居中对齐且水平居中对齐
        titlestyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);//垂直
        titlestyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);//水平
        XSSFFont titlefont = wb.createFont();
        titlefont.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);//粗体显示
        titlefont.setFontHeightInPoints((short) 14);// 设置字体大小
        titlestyle.setFont(titlefont);
        
        //表头样式
        XSSFCellStyle headerstyle = wb.createCellStyle();    
        headerstyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);//水平 
        XSSFFont headerfont = wb.createFont();
        headerfont.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);//粗体显示
        headerfont.setFontHeightInPoints((short) 12);// 设置字体大小
        headerfont.setFontName("宋体");//设置字体
        headerstyle.setFont(headerfont);
        
        //普通样式
        XSSFCellStyle style = wb.createCellStyle();    
        style.setAlignment(HSSFCellStyle.ALIGN_LEFT);//统一左对齐
        
        XSSFRow row = sheet.createRow(0);
        //创建标题
        XSSFCell titleCell = row.createCell(0);
        titleCell.setCellValue(temName);
        sheet.addMergedRegion(new CellRangeAddress( //设置跨行
                0, //first row (0-based)
                0, //last row (0-based)
                0, //first column (0-based)
                title.length//last column (0-based)
                ));
        titleCell.setCellStyle(titlestyle);
        row.setHeight((short) 700);//设置标题行高度
        
        row = sheet.createRow(1);//换行
        //创建序号列
        row.createCell(0).setCellValue("序号");
        //row.createCell(0).setCellStyle(headerstyle); //为什么加了样式不显示字了
        //sheet.setColumnWidth(0, 256*22);
        //写入列名，设置宽度
        for(int i = 0;i<title.length;i++) {
            XSSFCell cell = row.createCell(i+1);
            cell.setCellValue(title[i]);
            cell.setCellStyle(headerstyle);
            //根据字数设置长度
            sheet.setColumnWidth(i+1, 256*title[i].length()*3);
        }
        //写入正式数据
        /*for(int i = 0;i<dataList.size();i++) {
            //循环创建行
            row = sheet.createRow(i+2);
            XSSFCell cell = row.createCell(0);
            //序号
            cell.setCellValue(i+1);
            cell.setCellStyle(style);
            //循环写入正式数据
            for(int j=0;j<mapKey.length;j++) {
                cell = row.createCell(j+1);
                if(dataList.get(i).get(mapKey[j])!=null)
                    cell.setCellValue(dataList.get(i).get(mapKey[j]).toString());
                else
                    cell.setCellValue("");
                cell.setCellStyle(style);
                //为每一列设置一个默认宽
                sheet.setColumnWidth(j, 256*22); 
                //第1列为序号列，设置小一些。
                sheet.setColumnWidth(0, 256*6);
                //第5行也宽一些
                sheet.setColumnWidth(4, 256*26); 
                //第15列文字较多，设置较大点。
                sheet.setColumnWidth(14, 256*35);
            }
        }*/
        
        //设置文件名
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String fileNamep = temName+sdf.format(new Date())+".xlsx";
        String fileName = new String(fileNamep.getBytes(), "ISO-8859-1");
        response.reset();//清空response，避免下载异常
        response.setContentType("octets/stream");
        response.addHeader("Content-Disposition", "attachment;filename="+fileName);
        response.setCharacterEncoding("utf-8");
        OutputStream outputStream = null;
        try {
            outputStream = response.getOutputStream();
            wb.write(outputStream);
            outputStream.flush();//强制写出缓冲区
        } catch (IOException e) {
            e.printStackTrace();
            //log.info(e.getMessage());
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
                //log.info(e.getMessage());
            }
        }
    }
}
