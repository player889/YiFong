class CYTemplate {

	constructor() {}

	createRow(data) {
		let html = ``;
		let index = 0;
		for (let {
			no: no,
			name: name,
			address: address,
			phone: phone,
			used: used
		}
			of data) {

			let checked = (used) ? `checked` : ``;
			let icon = commonUtils.getSkypIcon();
			
			let td1 = `${template.addTd(name)}`;
			let td2 = `${template.addTd(address)}`;
			
			let td3 = `${template.addTd(phone + icon)}`;
			let td4 = `${template.addTd(template.radio(index,checked))}}`;
			let td5 = `${template.fnBtn(no,name, address, phone, used)}`;

			html += `<tr>${td1}${td2}${td3}${td4}${td5}</tr>`;
			index++;
		}
		return html;
	}
	addTd(html) {
		return `<td class="align-middle">${html}</td>`;
	}
	radio(index, checked = '') {
		return `<div class="custom-control custom-checkbox form-inline">
				<input type="checkbox" class="custom-control-input" id="customCheck${index}" ${checked} disabled />
				<label class="custom-control-label" for="customCheck${index}"></label>
				</div>`;
	}
	fnBtn(no, name, address, phone, used) {
		let btn = `<input type="button" class="btn btn-outline-warning" value="修改" data-toggle="modal" data-target="#editModal"
			data-no=${no}
			data-name=${name}
			data-address=${address}
			data-phone=${phone}
			data-used=${used}
			/>`;
		return `${template.addTd(btn)}`;
	}
}

let template = new CYTemplate();