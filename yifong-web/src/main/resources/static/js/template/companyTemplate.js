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
		return this.addTd(commonUtils.createOptions('form3-companyCharges[size]', this._CNTRSize, val));
	}
	getDestDDL(val) {
		return this.addTd(commonUtils.createOptions('form3-companyCharges[dest]', this._dest, val));
	}
	getChargeContentHTML(size = '', ds = '', pay = '', fee = '', os = '') {
		let payTxtInput = this.addInput("form3-companyCharges[pay]", pay, 'currency');
		let feeTxtInput = this.addInput("form3-companyCharges[fee]", fee, 'currency');
		let osTxtInput = this.addInput('form3-companyCharges[os]', os, 'currency');
		return `<tr>${this.getDestDDL(ds)}${this.getCNTRSizeDDL(size)}${feeTxtInput}${payTxtInput}${osTxtInput}</tr>`;
	}
	getEditChargeContentHTML(charges) {
		let html = `<table class="table table-sm">
						<thead>
							<tr>
								<th scope="col" style="width:15%">地點</th>
								<th scope="col" style="width:20%">櫃子呎吋</th>
								<th scope="col">應收費用</th>
								<th scope="col">司機運費</th>
								<th scope="col">外調費用</th>
							</tr>
						</thead>
						<tbody>
							${this.addChargeRowHTML(charges)}
						<tr>
							<td><input type="button" class="btn btn-outline-success" value="新增運費" onclick="c.addEmptyRow();" /></td>
						</tr>
						</tbody>
					</table>`;
		return html;
	}
	addChargeRowHTML(charges) {
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
				html += this.getChargeContentHTML(size, ds, pay, fee, os);
			}
		}
		return html;
	}
	getDestinationIndex(key) {
		return this._dest.indexOf(key);
	}
	getCompanyInformation(data) {
		let show = (0 === data.length - 1) ? 'show active' : '';
		return this.getCompanyListHTML(data, show) + this.getCompanyInfoHTML(data, show);
	}
	getCompanyListHTML(data, show) {
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
			html += `<a class="list-group-item list-group-item-action ${show}" href="#info_${index}" role="tab" data-toggle="list" id="infoList_${index}">${no} ${name}</a>`;
			index++;
		}

		html += `	</div>`;
		html += `</div>`;
		return html;
	}
	getCompanyInfoHTML(data, show) {
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

			let chargeHTML = (true === $.isEmptyObject(charges)) ? `` : this.getViewChargeContentHTML(charges);

			html +=
			`<div class="tab-pane fade ${show}" id="info_${index}" role="tabpanel" aria-labelledby="infoList_${index}">
					<div class="card">
						<div class="card-body">
							<input type="button" class="btn btn-outline-warning float-right" value="修改" onclick="c.doEditModal('${index}');"/>
							${name}<br>${address}<br>${this.phoneFilter(ph)}<br>${commonUtils.getValue(gn)}<br>${commonUtils.getValue(me)}
							${chargeHTML}
						</div>
					</div>
				</div>`;
			index++;
		}

		html += `</div></div>`;

		return html;
	}
	getViewChargeContentHTML(charges) {

		let html = `<table class="table table-sm table-condensed">
						<thead>
							<tr>
								<th scope="col" style="width:15%">地點</th>
								<th scope="col" style="width:20%">櫃子呎吋</th>
								<th scope="col">應收費用</th>
								<th scope="col">司機運費</th>
								<th scope="col">外調費用</th>
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
			html += `<tr><td>${this._dest[parseInt(ds)]}</td><td>${this._CNTRSize[size]}</td><td>${fee}</td><td>${pay}</td><td>${os}</td></tr>`;
		}

		html += `</tbody></table>`;
		return html;
	}

}