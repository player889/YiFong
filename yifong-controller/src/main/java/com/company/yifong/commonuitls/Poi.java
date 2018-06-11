package com.company.yifong.commonuitls;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class Poi {
	public static void readXLSXFile() throws IOException {
		InputStream ExcelFileToRead = new FileInputStream("C:/Users/Jay/Downloads/code.xlsx");
		XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);

		XSSFSheet sheet = wb.getSheetAt(0);
		//
		// int rowsCount = sheet.getLastRowNum();
		// for (int i = 0; i <= 10; i++) {
		// Row row = sheet.getRow(i);
		// int colCounts = row.getLastCellNum();
		// System.out.println("Total Number of Cols: " + colCounts);
		// for (int j = 0; j < colCounts; j++) {
		// Cell cell = row.getCell(j);
		// row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
		// // stuUser.setPhone(row.getCell(0).getStringCellValue());
		// System.out.println("[" + i + "," + j + "]=" + cell.getStringCellValue());
		// }
		// }

		XSSFRow row;
		XSSFCell cell;
		Iterator<Row> rows = sheet.rowIterator();
		while (rows.hasNext()) {
			row = (XSSFRow) rows.next();
			Iterator<Cell> cells = row.cellIterator();
			while (cells.hasNext()) {
				cell = (XSSFCell) cells.next();
				if (cell.getCellType() == XSSFCell.CELL_TYPE_STRING) {
					System.out.print(cell.getStringCellValue() + " ");
				} else if (cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC) {
					System.out.print(cell.getNumericCellValue() + " ");
				} else {
					// U Can Handel Boolean, Formula, Errors
				}
			}
			System.out.println();
		}

	}

	public static void main(String[] args) throws Exception {
		Poi.readXLSXFile();
	}
}