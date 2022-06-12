function ExcelViewer(el, url, opts = {}) {
	this.el = el;
	this.url = url;
	this.ext = "";
	this.buffer = null;
	this.opts = Object.assign(this.defaultOpts, opts);
	this.init();
}

ExcelViewer.prototype.defaultOpts = {
	theme: "light",
	themeBtn: true,
	lang: "en"
}

ExcelViewer.prototype.init = async function () {
	if (typeof this.url == "string") {
		this.url = decodeURIComponent(this.url);
		let names = this.url.match(/(?<=\/)[^/]+(?=\.[^.]+$)/);
		if (names && names.length) this.name = names[0];
		if (/^blob/.test(this.url)) {
			let urls = this.url.match(/.+(?=\.[^.]+$)/);
			let exts = this.url.match(/(?<=.+.)[^.]+$/);
			if (urls && exts && urls.length && exts.length) {
				this.url = urls[0];
				this.ext = exts[0];
			}
		} else {
			let exts = this.url.match(/(?<=\.)[^.]+$/);
			if (exts && exts.length) this.ext = exts[0];
		}
		let res = await fetch(this.url);
		if (res) this.buffer = await res.arrayBuffer();
	} else {
		this.buffer = this.url;
	}
	document.documentElement.setAttribute("data-excel-viewer-theme", this.opts.theme);
	document.documentElement.setAttribute("data-excel-viewer-lang", this.opts.lang);
	if (this.opts.themeBtn) window._excel_viewer_theme_btn = true;
	this.render();
}

ExcelViewer.prototype.render = function () {
	if (!this.buffer) return;
    const ab = new Uint8Array(this.buffer).buffer
    const wb = this.ext.toLowerCase() == ".csv" ? XLSX.read(new TextDecoder("utf-8").decode(ab), { type: "string", raw: true }) : XLSX.read(ab, { type: "array" });
    var { sheets, maxLength } = this.convert(wb);
    this.spreadsheet_s = x_spreadsheet(this.el, {
        row: { len: maxLength + 50, height: 30 },
        style: { align: 'center' }
	}).loadData(sheets);
	if (this.opts.themeBtn) {
		window._excel_viewer_theme_btn.addEventListener("click", () => {
			let data = this.spreadsheet_s.getData();
			this.spreadsheet_s = x_spreadsheet(this.el, {
				row: {
					len: maxLength + 50,
					height: 30,
				},
				style: {
					align: 'center'
				}
			}).loadData(data);
			if (window._excel_viewer_theme_mode_tips_el) window._excel_viewer_theme_mode_tips_el.remove();
		})
	}
}

ExcelViewer.prototype.convert = function (wb) {
    const sheets = [];
    let maxLength = 0;
    wb.SheetNames.forEach(name => {
        const sheet = { name, rows: {} };
        const ws = wb.Sheets[name];
        const rows = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 });
        if (maxLength < rows.length) maxLength = rows.length
        sheet.rows = rows.reduce((map, row, i) => {
            map[i] = {
                cells: row.reduce((colMap, column, j) => {
                    colMap[j] = { text: column }
                    return colMap
                }, {})
            }
            return map
        }, {})
        sheets.push(sheet);
    });
    return { sheets, maxLength };
}

export default ExcelViewer;