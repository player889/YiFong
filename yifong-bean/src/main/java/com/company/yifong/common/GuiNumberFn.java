package com.company.yifong.common;

import java.util.Random;

public class GuiNumberFn {
	/**
	 * 驗証公司統編時, 所使用的邏輯乘數.
	 */
	private static int[] COMPANY_ID_LOGIC_MULTIPLIER = { 1, 2, 1, 2, 1, 2, 4, 1 };

	/**
	 * 驗証公司統編是否符合現行規則.
	 * 
	 * @param aCompanyId
	 *            傳入所要驗証的公司統編.
	 * @return 回傳公司統編是否正確, true 代表正確.
	 */
	public static boolean checkCompanyId(String aCompanyId) {
		try {
			int aSum = 0;

			for (int i = 0; i < COMPANY_ID_LOGIC_MULTIPLIER.length; i++) {
				// 公司統編與邏輯乘數相乘.
				int aMultiply = Integer.parseInt(aCompanyId.substring(i, i + 1)) * COMPANY_ID_LOGIC_MULTIPLIER[i];

				// 將相乘的結果, 取十位數及個位數相加.
				int aAddition = ((aMultiply / 10) + (aMultiply % 10));

				// 如果公司統編的第 7 位是 7 時, 會造成相加結果為 10 的特殊情況, 所以直接以 1 代替進行加總.
				aSum += (aAddition == 10) ? 1 : aAddition;
			}

			// 判斷總和的餘數, 假使為 0 公司統編正確回傳 true, 其它值則反之.
			return (aSum % 10 == 0);
		} catch (Throwable e) {
			// 如果 aCompanyId 參數為 null, 或者不是八位數, 或為其它非數值字串, 均傳回 false.
			return false;
		}
	}

	/**
	 * 產生經現行規則驗証後的公司統編, 但並不代表此公司統編有被登記使用.
	 * 
	 * @return 回傳公司統編.
	 */
	public static String createCompanyId() {
		boolean aFlag = false;
		Random aRandom = new Random();
		String aCompanyId = null;

		// 如果所產生的公司統編正確 aFlag = true, 就離開 do..while 迴圈.
		do {
			// 使用亂數, 產生 8 位數的公司統編.
			aCompanyId = new Integer(aRandom.nextInt(99999999)).toString();

			// 假如公司統編長度小於 8, 就產生新的公司統編.
			if (aCompanyId.length() < 8) {
				continue;
			}

			// 呼叫 checkCompanyId(), 並將回傳的結果儲存於布林變數中.
			aFlag = checkCompanyId(aCompanyId);
		} while (!aFlag);

		return aCompanyId;
	}
}
