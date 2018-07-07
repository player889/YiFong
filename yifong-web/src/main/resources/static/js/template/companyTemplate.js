class companyTemplate {

	addInputGroup(type, html) {
		let output = ``;
		let icon = ``;
		switch (type) {
		case 'currency':
			icon = `<span class="input-group-text"><img src="images/dollar.png" width="20" height="20"></span>`;
			html = `<div class="input-group"><div class="input-group-prepend">${icon}</div>${html}</div>`;
			break;
		}
		return this.addTd(html);
	}
	addInput(name, value, clazz = '') {
		let html = `<input type="text" class="form-control ${clazz}" name="${name}" value="${value}" />`;
		return this.addInputGroup(clazz, html);
	}
	addTd(html) {
		return `<td>${html}</td>`;
	}
	getCNTRSizeDDL(val) {
		return this.addTd(commonUtils.createOptions('form3-companycharges[size]', this._CNTRSize, val));
	}
	getDestDDL(val) {
		return this.addTd(commonUtils.createOptions('form3-companycharges[dest]', this._dest, parseInt(val)));
	}
	getchargesContentHTML(size = '', ds = '', pay = '', fee = '', os = '') {
		let payTxtInput = this.addInput("form3-companycharges[pay]", pay, 'currency');
		let feeTxtInput = this.addInput("form3-companycharges[fee]", fee, 'currency');
		let osTxtInput = this.addInput('form3-companycharges[os]', os, 'currency');
		return `<tr>${this.getDestDDL(ds)}${this.getCNTRSizeDDL(size)}${payTxtInput}${feeTxtInput}${osTxtInput}</tr>`;
	}
	getEditchargesContentHTML(charges) {
		let html = `<table class="table table-sm">
						<thead>
							<tr>
								<th scope="col" style="width:15%">地點</th>
								<th scope="col" style="width:20%">櫃子呎吋</th>
								<th scope="col">應收費用</th>
								<th scope="col">司機運費</th>
								<th scope="col">外調運費</th>
							</tr>
						</thead>
						<tbody>
							${this.addchargesRowHTML(charges)}
						<tr>
							<td><input type="button" class="btn btn-outline-success" value="新增運費" onclick="c.addEmptyRow();" /></td>
						</tr>
						</tbody>
					</table>`;
		return html;
	}
	addchargesRowHTML(charges) {
		let html = ``;
		if (false === $.isEmptyObject(charges)) {
			for (let {
				size: size,
				dest: ds,
				pay: pay,
				fee: fee,
				os: os
			}
				of charges) {
				html += this.getchargesContentHTML(size, ds, pay, fee, os);
			}
		}
		return html;
	}
	getDestinationIndex(key) {
		return this._dest.indexOf(key);
	}
	getCompanyInformation(data, showHrefIndex) {
		return this.getCompanyListHTML(data, showHrefIndex) + this.getCompanyInfoHTML(data, showHrefIndex);
	}
	getCompanyListHTML(data, showHrefIndex) {
		let html = ``;
		html += `<div class="row" id="content">`;
		html += `<div class="col-2">`;
		html += `	<div class="list-group" id="companyList" role="tablist">`;

		let index = 0;
		for (let {
			no: no,
			shortName: name
		}
			of data) {
			let show = ( index === showHrefIndex) ? 'show active' : '';
			html += `<a class="list-group-item list-group-item-action ${show}" href="#info_${index}" role="tab" data-toggle="list" id="infoList_${index}">${no} ${name}</a>`;
			index++;
		}

		html += `	</div>`;
		html += `</div>`;
		return html;
	}
	getCompanyInfoHTML(data, showHrefIndex) {
		let index = 0;
		let html = ``;
		html += `<div class="col-10 scrollBar"><div class="tab-content">`;

		for (let {
			no: no,
			fullName: name,
			address: address,
			phone: ph,
			guiNumber: gn,
			memo: me,
			charges: charges
		}
			of data) {
			let show = ( index === showHrefIndex) ? 'show active' : '';
			let chargesHTML = (true === $.isEmptyObject(charges)) ? `` : this.getViewchargesContentHTML(charges);
			let textArea = 	(me === undefined) ? '' : me.replace(/\n/g,"<br/>");
			html +=
			`<div class="tab-pane fade ${show}" id="info_${index}" role="tabpanel" aria-labelledby="infoList_${index}">
					<div class="card">
						<div class="card-body">
							<input type="button" class="btn btn-outline-warning float-right" value="修改" onclick="c.doEditModal('${index}');"/>
							${name}<br>${address}<br>${this.phoneFilter(ph)}<br>${commonUtils.getValue(gn)}<br>${textArea}
							${chargesHTML}
						</div>
					</div>
				</div>`;
			index++;
		}

		html += `</div></div>`;

		return html;
	}
	getViewchargesContentHTML(charges) {

		let html = `<table class="table table-sm table-condensed">
						<thead>
							<tr>
								<th scope="col" style="width:15%">地點</th>
								<th scope="col" style="width:20%">櫃子呎吋</th>
								<th scope="col">應收費用</th>
								<th scope="col">司機運費</th>
								<th scope="col">外調運費</th>
							</tr>
						</thead>
						<tbody>`;
		for (let {
			size: size,
			dest: ds,
			pay: pay,
			fee: fee,
			os: os
		}
			of charges) {
			html += `<tr><td>${this._dest[parseInt(ds)]}</td><td>${this._CNTRSize[size]}</td><td>${$.number(pay)}</td><td>${$.number(fee)}</td><td>${$.number(os)}</td></tr>`;
		}

		html += `</tbody></table>`;
		return html;
	}

}