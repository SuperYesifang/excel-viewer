const convert = wb => {
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
};

function open(buffer, ext) {
    (async () => {
        const ab = new Uint8Array(buffer).buffer
        const wb = ext.toLowerCase() == ".csv" ? XLSX.read(new TextDecoder("utf-8").decode(ab), { type: "string", raw: true }) : XLSX.read(ab, { type: "array" });
        var { sheets, maxLength } = convert(wb);
        window.s = x_spreadsheet("#xspreadsheet", {
            row: {
                len: maxLength + 50,
                height: 30,
            },
            style: {
                align: 'center'
            }
        }).loadData(sheets);
        window.modeBtn.addEventListener("click", () => {
            console.log(sheets, window.s, window.s.getData())
            let data = window.s.getData();
            x_spreadsheet("#xspreadsheet", {
                row: {
                    len: maxLength + 50,
                    height: 30,
                },
                style: {
                    align: 'center'
                }
            }).loadData(data);
        })
    })();
}

let url = window.location.search.match(/(?<=file=).+(?=&|$)/);
if (url && url.length) {
    url = decodeURIComponent(url[0]);
    let ext;
    if (/^blob/.test(url)) {
        let urls = url.match(/.+(?=\.[^.]+$)/);
        let exts = url.match(/(?<=.+.)[^.]+$/);
        if (urls && exts && urls.length && exts.length) {
            url = urls[0];
            ext = exts[0];
        }
    } else {
        ext = url.match(/(?<=\.)[^.]+$/);
        let name = url.match(/(?<=\/)[^\/]+?(?=\.[^.]+$)/);
        if (name && name.length && ext && ext.length) {
            ext = ext[0];
        }
    }
    if (url && ext && typeof url == "string" && typeof ext == "string") {
        fetch(url).then(res => res.arrayBuffer()).then(res => open(res, ext));
    }
}