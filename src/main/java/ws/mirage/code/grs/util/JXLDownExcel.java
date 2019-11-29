package ws.mirage.code.grs.util;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.UnderlineStyle;
import jxl.write.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * jxl导出Excel
 * @author Mirage
 * @create 2019-08-19 9:26
 */
public class JXLDownExcel {

    /**
     * 导出Excel
     * @param response
     * @param fileName 文件名&标题名&sheet名
     * @param title 表头
     * @param mapKey 和表头顺序对应的，dataList中的key
     * @param dataList 数据列表
     * @param widthArr 列宽
     * @throws UnsupportedEncodingException
     * @author Mirage
     * @time 2019年5月14日 下午4:10:31
     */
    public static void exportExcel(HttpServletResponse response, String fileName, String[] title, String[] mapKey, List<Map<String,Object>> dataList, int[] widthArr) throws UnsupportedEncodingException {
        //创建一个Excel文件
        XSSFWorkbook wb = new XSSFWorkbook();
        //在XSSFWorkbook中添加一个sheet
        XSSFSheet sheet = wb.createSheet(fileName);

        //标题样式
        XSSFCellStyle titleStyle = wb.createCellStyle();
        //即垂直居中对齐且水平居中对齐
        titleStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);//垂直居中
        titleStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);//水平居中
        XSSFFont titleFont = wb.createFont();
        titleFont.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);//粗体显示
        titleFont.setFontHeightInPoints((short) 14);// 设置字体大小
        titleFont.setFontName("等线");//设置字体
        titleStyle.setFont(titleFont);

        //表头样式
        XSSFCellStyle headerStyle = wb.createCellStyle();
        headerStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);//垂直居中
        headerStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);//水平居中
        XSSFFont headerFont = wb.createFont();
        headerFont.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);//粗体显示
        headerFont.setFontHeightInPoints((short) 12);// 设置字体大小
        headerFont.setFontName("等线");//设置字体
        headerStyle.setFont(headerFont);

        //普通样式
        XSSFCellStyle generalStyle = wb.createCellStyle();
        generalStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);//垂直居中
        generalStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);//水平居中
        XSSFFont generalFont = wb.createFont();
        generalFont.setBoldweight(XSSFFont.BOLDWEIGHT_NORMAL);//正常字体
        generalFont.setFontHeightInPoints((short) 10);// 设置字体大小
        generalFont.setFontName("等线");//设置字体
        generalStyle.setFont(generalFont);

        //1.写入标题
        //创建行对象(创建一个重复利用)
        XSSFRow row = null;
        row = sheet.createRow(0);
        //创建单元格对象(创建一个重复利用)
        XSSFCell cell = null;
        cell = row.createCell(0);
        cell.setCellValue(fileName);
        //设置跨行
        sheet.addMergedRegion(new CellRangeAddress(
                0, //first row (0-based)
                0, //last row (0-based)
                0, //first column (0-based)
                title.length-1//last column (0-based)
        ));
        cell.setCellStyle(titleStyle);
        row.setHeight((short) 700);//设置标题行高度

        //2.写入列名，设置宽度
        //换行
        row = sheet.createRow(1);
        for(int i = 0;i<title.length;i++) {
            cell = row.createCell(i);
            cell.setCellValue(title[i]);
            cell.setCellStyle(headerStyle);
        }

        //3.写入正式数据
        for(int i = 0;i<dataList.size();i++) {
            //循环创建行
            row = sheet.createRow(i+2);
            //循环写入正式数据
            for(int j=0;j<mapKey.length;j++) {
                cell = row.createCell(j);
                if(dataList.get(i).get(mapKey[j])!=null) {
                    cell.setCellValue(dataList.get(i).get(mapKey[j]).toString());
                }else {
                    cell.setCellValue("");
                }
                cell.setCellStyle(generalStyle);
            }
        }

        //设置列宽
        for(int i=0;i<widthArr.length;i++){
            sheet.setColumnWidth(i, 256*widthArr[i]);
        }


        //设置文件名
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        fileName = new String((fileName+sdf.format(new Date())+".xlsx").getBytes(),"ISO-8859-1");
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


    /**
     * 导出模板(不如导出Excel详细)
     * @param response
     * @param namearr1
     * @param dataarr1
     * @param namearr2
     * @param dataarr2
     * @param fileName
     */
    public static void exportExcel(HttpServletResponse response,String[] namearr1, String[][] dataarr1,
                                   String[] namearr2,String[][] dataarr2,String fileName ) {
        WritableWorkbook workbook = null;
        OutputStream outputStream = null;
        try {
            response.reset();//清空response，避免下载异常
            response.setContentType("application/msexcel");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            fileName = new String(fileName.getBytes(), "ISO-8859-1")+sdf.format(new Date())+".xls";
            response.addHeader("Content-disposition", "attachment;filename="+fileName);
            response.setCharacterEncoding("utf-8");

            outputStream =response.getOutputStream();// 取得输出流

            //创建一个excel
            workbook = Workbook.createWorkbook(outputStream);
            //创建一个sheet
            WritableSheet sheet1 = workbook.createSheet("按投诉次数", 0);
            WritableSheet sheet2 = workbook.createSheet("按产品数量", 1);

            //给单元格设置样式
            //标题样式
            //定义格式：ARIAL字体、14号、粗体、非斜体、无下划线、黑色
            WritableFont wfTitle = new WritableFont(WritableFont.ARIAL, 14,WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE,jxl.format.Colour.BLACK);
            WritableCellFormat wcfTitle = new WritableCellFormat(wfTitle);
            wcfTitle.setBackground(jxl.format.Colour.WHITE); // 象牙白
            wcfTitle.setBorder(jxl.format.Border.ALL,jxl.format.BorderLineStyle.THIN, jxl.format.Colour.BLACK); // BorderLineStyle边框
            wcfTitle.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE); //设置垂直对齐
            wcfTitle.setAlignment(Alignment.CENTRE); // 设置水平居中

            //表头样式
            WritableFont wfHeader = new WritableFont(WritableFont.ARIAL, 12,WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE,jxl.format.Colour.BLACK);
            WritableCellFormat wcfHeader = new WritableCellFormat(wfHeader);
            wcfHeader.setBackground(jxl.format.Colour.WHITE); // 象牙白
            wcfHeader.setBorder(jxl.format.Border.ALL,jxl.format.BorderLineStyle.THIN, jxl.format.Colour.BLACK); // BorderLineStyle边框
            wcfHeader.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE); //设置垂直对齐
            wcfHeader.setAlignment(Alignment.CENTRE); // 设置水平居中

            //普通样式
            WritableFont wfGeneral = new WritableFont(WritableFont.ARIAL, 10,WritableFont.NO_BOLD, false, UnderlineStyle.NO_UNDERLINE,jxl.format.Colour.BLACK);
            WritableCellFormat wcfGeneral = new WritableCellFormat(wfGeneral);
            wcfGeneral.setBackground(jxl.format.Colour.WHITE); // 象牙白
            wcfGeneral.setBorder(jxl.format.Border.ALL,jxl.format.BorderLineStyle.THIN, jxl.format.Colour.BLACK); // BorderLineStyle边框
            wcfGeneral.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE); //设置垂直对齐
            wcfGeneral.setAlignment(Alignment.CENTRE); // 设置水平居中

            Label label = null;//单元格内容(统一写一个对象重复使用)

            //sheet1写入标题
            label = new Label(0, 0, "重复单预警-按投诉次数", wcfTitle); // Label(col,row,str);
            sheet1.mergeCells(0, 0, namearr1.length-1, 0);//合并： 第1列第1行  到 第x列第1行
            //sheet.setColumnView(0, navCellView); // 设置col显示样式
            //	sheet.setRowView(0, 500, false); // 设置行高
            sheet1.addCell(label);
            //sheet1写入表头
            for (int i = 0; i < namearr1.length; i++) {
                sheet1.setColumnView(i, namearr1[i].length()*3);// 设置单元格宽度（根据字数）
                label = new Label(i, 1, namearr1[i],wcfHeader);
                sheet1.addCell(label);//填充单元格
            }
            //sheet1写入数据
            for (int i = 0; i < dataarr1.length; i++) {
                for (int j = 0; j < dataarr1[i].length; j++) {//列
                    label = new Label(j, i+2, dataarr1[i][j], wcfGeneral);//从第三行开始写数据
                    sheet1.addCell(label);//填充单元格
                }
            }
            //列宽
            sheet1.setColumnView(0, 10);// 设置单元格宽度
            sheet1.setColumnView(1, 40);// 设置单元格宽度
            sheet1.setColumnView(2, 30);// 设置单元格宽度
            sheet1.setColumnView(3, 20);// 设置单元格宽度

            //sheet2写入标题
            label = new Label(0, 0, "重复单预警-按产品数量", wcfTitle); // Label(col,row,str);
            sheet2.mergeCells(0, 0, namearr2.length-1, 0);//合并： 第1列第1行  到 第x列第1行
            //sheet.setColumnView(0, navCellView); // 设置col显示样式
            //	sheet.setRowView(0, 500, false); // 设置行高
            sheet2.addCell(label);
            //sheet2写入表头
            for (int i = 0; i < namearr2.length; i++) {
                sheet2.setColumnView(i, namearr2[i].length()*3);// 设置单元格宽度（根据字数）
                label = new Label(i, 1, namearr2[i],wcfHeader);
                sheet2.addCell(label);//填充单元格
            }
            //sheet2写入数据
            for (int i = 0; i < dataarr2.length; i++) {
                for (int j = 0; j < dataarr2[i].length; j++) {//列
                    label = new Label(j, i+2, dataarr2[i][j], wcfGeneral);//从第三行开始写数据
                    sheet2.addCell(label);//填充单元格
                }
            }
            //列宽
            sheet2.setColumnView(0, 10);// 设置单元格宽度
            sheet2.setColumnView(1, 40);// 设置单元格宽度
            sheet2.setColumnView(2, 30);// 设置单元格宽度
            sheet2.setColumnView(3, 20);// 设置单元格宽度 //sheet2写入表头
            sheet2.setColumnView(4, 20);// 设置单元格宽度 //sheet2写入表头

            //写入
            workbook.write();
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            try {
                workbook.close();//释放资源
                outputStream.close();//--这个应该不用关吧
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
