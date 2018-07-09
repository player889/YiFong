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
//			let icon = commonUtils.getSkypIcon();
			let icon = '';
			
			address =(typeof address === 'undefined') ?  '' : address;
			
			let checkbox = `${template.radio(index,checked)}`;
			let input = `<input type="text" class="form-control " value="${no}" id="no${index}"/>`;
			let nameSpan = `<span id="name${index}">${name}</span>`;
			let addressSpan = `<span id="address${index}">${address}</span>`;
			let phoneSpan = `<span id="phone${index}">${phone}${icon}</span>`;
			let btn = template.fnBtn(index, seq); 
			
			let td0 = `<td class="align-middle">${checkbox}</td>`;
			let td1 =  `<td class="align-middle" style="width:10%">${input}</td>`;
		
			let td2 = `${template.addTd(nameSpan)}`;
			let td3 = `${template.addTd(addressSpan)}`;
			let td4 = `${template.addTd(phoneSpan)}`;
			let td5 = `${template.addTd(btn)}`;
			
			html += `<tr>${td0}${td1}${td2}${td3}${td4}${td5}</tr>`;
			index++;
		}
		return html;
	}
	addTd(html) {
		return `<td class="align-middle">${html}</td>`;
	}
	radio(index, checked = '') {
		return `<div class="form-inline centerBlock"><label class="switch"><input type="checkbox" id="used${index}" ${checked}> <span class="slider"></span> </label> </div>`;
	}
	
// fnBtn(seq, no, name, address, phone, used) {
// let btn = `<input type="button" class="btn btn-outline-warning" value="修改" data-toggle="modal"
// data-target="#editModal"
// data-seq=${seq}
// data-no=${no}
// data-name=${name}
// data-address=${address}
// data-phone=${phone}
// data-used=${used}
// />`;
	fnBtn(index, seq) {
		return `<input type="button" class="btn btn-outline-warning" value="修改" onclick="cy.doEdit(${index}, ${seq})"/>`;
	}
}

let template = new CYTemplate();