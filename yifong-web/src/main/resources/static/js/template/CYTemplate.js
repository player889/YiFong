class CYTemplate {

	constructor() {}

	createRow(data) {
		
		if($.isEmptyObject(data)){
			$('#content').addClass("d-none")
			commonUtils.doAlert('info', '查無資料');
			return;
		}
		
		let html = ``;
		let index = 0;
		for (let {
			seq: seq,
			no: no,
			name: name,
			address: address,
			phone: phone,
			used: used
		}
			of data) {

			let checked = (used) ? `checked` : ``;
// let icon = commonUtils.getSkypIcon();
			let icon = '';
			
			address = (typeof address === 'undefined') ?  '' : address;
			
			let checkbox = `${template.radio(index,checked)}`;
			let input = `<input type="text" class="form-control" value="${no}" id="no${index}"/>`;
			let nameSpan = `<input type="text" class="form-control" value="${name}" id="name${index}"/>`;
			let addressSpan = `<input type="text" class="form-control" value="${address}" id="address${index}"/>`;
			let phoneSpan = `<input type="text" class="form-control" value="${phone}" id="phone${index}"/>`;
			let btn = template.fnBtn(index, seq); 
			
			let td0 = `<td class="align-middle" style="width:5%">${checkbox}</td>`;
			let td1 = `<td class="align-middle" style="width:10%">${input}</td>`;
			let td2 = `<td class="align-middle" style="width:10%">${nameSpan}</td>`;
			let td3 = `<td class="align-middle" style="width:25%">${addressSpan}</td>`;
			let td4 = `<td class="align-middle" style="width:10%">${phoneSpan}</td>`;
			let td5 = `<td class="align-middle" style="width:10%">${btn}</td>`;
			
			html += `<tr>${td0}${td1}${td2}${td3}${td4}${td5}</tr>`;
			index++;
		}
		return html;
	}
	radio(index, checked = '') {
		return `<div class="form-inline centerBlock"><label class="switch"><input type="checkbox" id="used${index}" ${checked}> <span class="slider"></span> </label> </div>`;
	}
	fnBtn(index, seq) {
		return `<input type="button" class="btn btn-outline-warning" value="修改" onclick="cy.doEdit(${index}, ${seq})"/>`;
	}
}

let template = new CYTemplate();