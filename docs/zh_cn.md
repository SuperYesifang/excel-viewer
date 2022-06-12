# excel-viewer

![excel-viewer](https://img.shields.io/badge/excel--viewer-v1.0.1-%23C50008?logo=npm)
[![blog](https://img.shields.io/badge/blog-yesifang.com-orange?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABjFBMVEUAAAAIAQUiBhQVBA05CyK0I2z4MJTgKoV8GEoKAgZyFkT8MZfTKX4dBRFWEDP9MZfMJ3kGAQQHAQTlK4htFUEAHRMATDAAbUQAf1EAh1QAgFAAbUUATDAAHhNMDy7KJngAeUsAKBp9GEr4MJMDAQIAmWEAWzkABAOGGlD9MZYAcUgABQNoFD7mLIoAZUCdHl4ANiKiH2EpCBgAh1UAAgERAwrVKH9nFD0ALBwSAwuqIWXmK4pTEDIAWTgrCBp2F0eVHVmKG1NWETMAdEgAgVAAAQIAJTcATXIAZJQAbqUAap0AVoEAfE4AAQEAN1EAgMAAaEIACQ4Aap4ARiwACQ0AebMAmV8AEwwAAAAAZ5oAZT8AMkkAkFoAEQsAebMAl14AGCQAkl0ALx4AOlYAeEsAGRAATHAAbkUAll0All4AbkYAMB4ATXMABwQAIxYANiIAPicANyIAJBYAQF4AIjIAis0AAgMAhsYAZJYARWYAk9oAHy4ABQcAfbkAO1gAis3/MZgAmmEAld3///8EabibAAAAgHRSTlMACCIVObX54XwKcv3UHVb+zQYH5m0xfrTU4NW1fzJMy8hDffkD/pcHh/69CGjnqJ5ZoynfBBHWZ0kSqudTlCt2lotWwNUCQIOrvrWVzwFe3a4QtnQPz/0gAbKnVe4c0Psp9E9jximBtvj4t0+FCzpaZlo7bTruA+Wtdfs1CNdm7ZpKyEIAAAABYktHRIP8tM/SAAAAB3RJTUUH5QoVBh0NInrzjgAAATtJREFUOMt902VbwzAUBeDLcAYMhru7uzPcXYcP1+EyPMkvZ03TNk0TztfzNnL7BECeCFck/JOo6BiEYuPiVX2CG9EkJsn7ZA9iSUmV9d40ZCYdICMzKzsnNy+/wASFVo+KALCR4hIGSjlQVm4BXFFZRUE1B2q8HMC4tk4D9RxoABvAjRpwuS3QJADcrIkW6witImhrD4OOTtZ7ukAEuFtboqeXjqqvH5xgQL/qoG9oeET/FQIYdQxWAGNmMT4xOTU9MyuCOVbPLywSGhEs6f3yCiFysEr7tXWiABubWu/fIiqwTRfYISqwu0fBvgoc0DlCgCjA4ZF+hWMFODllMzizgfML2l5eXfuNGd7YAARv7+4fHoPc9J/swJlnrn+Rgdc3C4SkT+vd7D8+peDr2+h/FK838Ev3D4W//wNiKCWwWalJAwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0yMVQwNjoyOToxMyswMDowMP1Zb/cAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMjFUMDY6Mjk6MTMrMDA6MDCMBNdLAAAAAElFTkSuQmCC)](//yesifang.com)

> 这是一个excel文件查看器，支持xls、xlsx、csv格式，你可以用它在指定DOM渲染excel，也可以将它内嵌在iframe中。
>
> This is an excel file viewer that supports xls, xlsx, csv and ods. You can use it to render excel in the specified DOM or embedded it in the iframe.

<div align="center">
  <a href="https://nodei.co/npm/excel-viewer/"><img src="https://nodei.co/npm/excel-viewer.png?downloads=true&downloadRank=true&stars=true"></a>
</div>

[English Document](../README.md)

## 前言

这是一个Excel文件预览器，使用 [xlsx](https://github.com/SheetJS/sheetjs) 和 [xspreadsheet](https://github.com/myliang/spreadsheet)开发.

增加暗色主题模式，添加了明暗主题模式切换功能，增加了中文支持，支持iframe内嵌使用，实现开箱即用。

![image-readme-theme-light](./src/assets/image-readme-theme-light.png)

![image-readme-theme-dark](./src/assets/image-readme-theme-dark.png)

## 使用

`new ExcelViewer(el:string|HTMLElement, source:string|Buffer, options)`

+ el：用于预览Excel的容器元素。
  + `string`：容器选择器。
  + `HTMLElement`：容器DOM元素。
+ source：Excel文件源的buffer数据或是Excel文件的URL。
  + `string`：Excel文件的URL。
  + `Buffer`：Excel文件源的buffer数据。
+ options：更多拓展功能。

```js
new ExcelViewer("#excel-view", "http://example.com/test.xls", {
	theme: "dark",
	lang: "zh_cn"
});
```

### 配置


| 选项       | 类型                | 含义                                     |
| ------------ | --------------------- | ------------------------------------------ |
| `theme`    | `"light"`、`"dark"` | Excel预览器的主题模式。默认为：`"light"` |
| `themeBtn` | `boolean`           | 启用主题模式切换按钮。默认为：`true`     |
| `lang`     | `"en"`、`"zh_cn"`   | 预览器的语言。默认为：`"en"`             |

+ 支持语言


| lang      | 含义     |
| ----------- | ---------- |
| `"en"`    | 英语     |
| `"zh_cn"` | 简体中文 |

### iframe

```html
<iframe src="https://unpkg.com/excel-viewer@1.0.0/dist/index.html?file=http://example.com/test.xls"></iframe>
```

+ 查询参数


| 参数        | 含义                                                       |
| ------------- | ------------------------------------------------------------ |
| `file`      | Excel文件的URL。                                           |
| `theme`?    | Excel预览器的主题模式。可选值：`light`、`dark`             |
| `themeBtn`? | 启用主题模式切换按钮。可选值：`1 ` (true)、`0 ` (disabled) |
| `lang`?     | 预览器的语言。可选值：`en`、`zh_cn`                        |

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/excel-viewer@1.0.0/dist/excel/xspreadsheet.css">
<script src="https://unpkg.com/excel-viewer@1.0.0/dist/excel/xspreadsheet.js"></script>
<script src="https://unpkg.com/excel-viewer@1.0.0/dist/excel/xlsx.full.min.js"></script>
<script src="https://unpkg.com/excel-viewer@1.0.0/dist/excel-viewer.js"></script>
<script>
    new ExcelViewer("#excel-view", "http://example.com/test.xls", {
        theme: "dark",
        lang: "zh_cn"
    });
</script>
```

### ESM

```js
import ExcelViewer from "excel-viewer";

new ExcelViewer("#excel-view", "http://example.com/test.xls", {
    theme: "dark",
    lang: "zh_cn"
});
```

## 授权认证

如果你的Excel文件需要授权认证，以下内容可以帮助你。

### iframe

```html
<iframe id="excel-viewer"></iframe>

<script>
let iframe = document.getElementById("excel-viewer");
// 以 axios 为例
axios({
    url: "http://example.com/test.xls",
    method: "GET",
    headers: { "Authorization": "Your Authorization Token" }, // 授权认证token
    responseType: "blob"
}).then(blob => {
    let localUrl = URL.createObjectURL(blob) + ".xls"; // 添加Excel类型后缀
    iframe.src = "https://unpkg.com/excel-viewer@1.0.0/dist/index.html?file=" + localUrl;
})
</script>
```

### CDN

```html
<div id="excel-view"></div>

<script>
// 以 axios 为例
axios({
    url: "http://example.com/test.xls",
    method: "GET",
    headers: { "Authorization": "Your Authorization Token" }, // 授权认证token
    responseType: "arraybuffer"
}).then(res => {
    new ExcelViewer("#excel-view", res.data);
})
</script>
```

### ESM

```vue
<template>
	<div ref="excel-view"></div>
</template>
<script>
import axios from "axios";
import ExcelViewer from "excel-viewer";

// 以 vuejs 和 axios 为例子
export default {
    mounted() {
        let container = this.$refs["excel-view"];
  
        axios({
            url: "http://example.com/test.xls",
            method: "GET",
            headers: { "Authorization": "Your Authorization Token" }, // 授权认证token
            responseType: "arraybuffer"
        }).then(res => {
            new ExcelViewer(container, res.data);
        })
    }
}
</script>
```

## !!已知限制

如果您需要在一页上使用多个excel-viewer，ESM方法将无法为预览器设置不同的主题模式，也无法使用主题切换功能。您可以使用iframe嵌入式方法来完美地解决这个问题。

```html
<div id="excel-view1"></excel-view>
<div id="excel-view2"></excel-view>
<script>
    // 正确
    new ExcelViewer("#excel-view1", "http://example.com/test.xlsx", { theme: "dark", themeBtn: false });
    new ExcelViewer("#excel-view2", "http://example.com/test.xlsx", { theme: "dark", themeBtn: false });
    // 错误
    new ExcelViewer("#excel-view1", "http://example.com/test.xlsx", { theme: "dark", themeBtn: true }); // 错误，主题切换按钮需要禁用
    new ExcelViewer("#excel-view2", "http://example.com/test.xlsx", { theme: "light", themeBtn: false }); // 错误，多个预览器的主题模式必须保持相同
</script>
```