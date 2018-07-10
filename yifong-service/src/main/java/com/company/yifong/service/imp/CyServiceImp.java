package com.company.yifong.service.imp;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.domain.request.CyRequest;
import com.company.yifong.entity.Cy;
import com.company.yifong.repository.CyRepository;
import com.company.yifong.service.CyService;

@Service
@Transactional(rollbackFor = Exception.class)
public class CyServiceImp implements CyService {

	@Autowired
	private CyRepository cyRepository;

	public List<Cy> query(CyRequest vo) {
		return cyRepository.findByAreaOrderByUsedDesc(vo.getArea());
	}

	public void edit(CyRequest vo) {
		try {
			cyRepository.updateUsedBySeq(vo.getSeq(), vo.getUsed(), vo.getNo(), vo.getName(), vo.getAddress(), vo.getPhone());
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("代碼不得重複");
		}
	}

	public void save(CyRequest vo) {
		try {
			Cy dest = new Cy();
			BeanUtils.copyProperties(vo, dest, "seq");
			cyRepository.saveAndFlush(dest);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("代碼不得重複");
		}
	}

	public void delete(CyRequest vo) {
		cyRepository.removeByNo(vo.getNo());
	}

}
