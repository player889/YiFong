package com.company.yifong.domain.status;

/**
 * return code and message.
 *
 * @Date 2018-05-28 17:45:44.610
 */
public enum ApiSatus {

	// @formatter:off
	ERR_SAVE("E001", "存檔錯誤"),
	ERR_QUERY("E002", "存檔錯誤"),
	ERR_UPDATE("E003", "更新錯誤"),
	ERR_DELETE("E004", "刪除錯誤"),
	ERR_REPORT("E005", "報表錯誤"),
	ERR_INPUT("E006", "輸入資料錯誤"),
	ERR_SECURITY("E007", "權限錯誤"),
	ERR_FILE("E008", "檔案錯誤"),
	ERR_NUMBER("E009", "格式錯誤"),
	ERR_NULL("E010", "NULL錯誤"),
	ERR_SYS("E999", "系統錯誤"),

	SUCC_INIT("S000","初始化成功"),
	SUCC_SAVE("S001", "存檔成功"),
	SUCC_QUERY("S002", "查詢成功"),
	SUCC_UPDATE("S003", "更新成功"),
	SUCC_DELETE("S004", "刪除成功"),
	SUCC_DATA_NOT_FOUND("S005", "查無資料");
	// @formatter:off
	
	
	private String code;
	private String message;

	ApiSatus(final String code, final String message) {
		this.code = code;
		this.message = message;
	}

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

}