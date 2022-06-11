import "./excel/xspreadsheet.css";
import "./excel/xspreadsheet.js";
import * as XLSX from "./excel/xlsx.full.min.js";
import ExcelViewer from "./ExcelViewer.js";

window.XLSX = XLSX;
export default ExcelViewer;