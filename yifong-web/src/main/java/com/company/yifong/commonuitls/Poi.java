package com.company.yifong.commonuitls;

import java.io.FileInputStream;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

public class Poi {
	// ReadExcel.java

	private String filePath = "C:\\Users\\Jay\\Downloads\\客戶代號.xlsx";
	String[] strData = new String[3];

	public void readExcel() throws IOException {
		FileInputStream fis = new FileInputStream(filePath);
		POIFSFileSystem fs = new POIFSFileSystem(fis);
		HSSFWorkbook wb = new HSSFWorkbook(fs);
		HSSFSheet sheet = wb.getSheetAt(0); // 取得Excel第一個sheet(從0開始)
		HSSFCell cell;

		// // getPhysicalNumberOfRows這個比較好 //getLastRowNum:這個好像會差1筆
		// for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) { // 由於第 0 Row 為 title, 故 i 從 1 開始
		// HSSFRow row = sheet.getRow(i); // 取得第 i Row
		// for (int j = 0; j < 3; j++) {
		// cell = row.getCell(j);
		// strData[j] = cell.toString();
		// }
		// System.out.println("Name = " + strData[0] + ", Passwd = " + strData[1] + ", Email = " + strData[2]);
		// }

		fis.close();
	}

}