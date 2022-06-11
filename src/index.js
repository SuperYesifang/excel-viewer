/* eslint-disable */
import "../dist/excel/xspreadsheet.css";
import "../dist/excel/xspreadsheet.js";
import * as XLSX from "../dist/excel/xlsx.full.min.js";
import ExcelViewer from "./ExcelViewer.js";

window.XLSX = XLSX;
export default ExcelViewer;