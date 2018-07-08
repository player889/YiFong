package com.company.yifong.customized;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.commons.lang3.StringUtils;

import com.company.yifong.common.GuiNumberFn;

public class GuiNumberConstraintValidator implements ConstraintValidator<GuiNumber, String> {

	@Override
	public boolean isValid(String guiNumber, ConstraintValidatorContext context) {
		return (StringUtils.isBlank(guiNumber)) ? true : GuiNumberFn.checkCompanyId(guiNumber);
	}

}
