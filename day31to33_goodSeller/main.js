window.onload = init;
function init() {
    //生成html数据
    let region_check_arr = [{ id: "east", name: "region", value: "华东" }, { id: "south", name: "region", value: "华南" }, { id: "north", name: "region", value: "华北" }];
    let product_check_arr = [{ id: "phone", name: "product", value: "手机" }, { id: "laptop", name: "product", value: "笔记本" }, { id: "speaker", name: "product", value: "智能音箱" }];
    //获取选择框容器
    let region_check_wrapper = document.getElementById("region-check-wrapper");
    let product_check_wrapper = document.getElementById("product-check-wrapper");
    //获取表格容器
    let table_wrapper = document.getElementById("table-wrapper");
    //先执行html生成器，提供html内容
    checkboxgGenerator(region_check_wrapper, region_check_arr);
    checkboxgGenerator(product_check_wrapper, product_check_arr);
    //为容器点击事件绑定渲染表格函数
    region_check_wrapper.addEventListener("click", RenderNewTable, false);
    product_check_wrapper.addEventListener("click", RenderNewTable, false);
    //checkbox生成器
    function checkboxgGenerator(wrapper, para_arr) {
        let sHtml = `<div>
            <input type = "checkbox" id = "all" name=${para_arr[1].name} value="all" data-checkbox-type="all"/>
                <label for="all">所有项</label>
            </div>`;
        for (let i = 0; i < para_arr.length; i++) {
            sHtml = sHtml + `<div>
                <input type="checkbox" id = ${para_arr[i].id} name=${para_arr[i].name} value=${para_arr[i].value} data-checkbox-type="single"/>
                <label for=${para_arr[i].id}>${para_arr[i].value}</label>
            </div>`;
        }
        wrapper.innerHTML = sHtml;
        wrapper.addEventListener("click", checkLogic, false);
        let cInputs = wrapper.getElementsByTagName("input");
        //全选单选逻辑实现函数
        function checkLogic(e) {
            let check_num = 0;
            if (e.target.id === "all") {
                for (let i = 0; i < cInputs.length; i++) {
                    cInputs[i].checked = true;
                }
            } else {
                for (let i = 1; i < cInputs.length; i++) {
                    //设置i=1从第二项开始查找，只对单选项做统计
                    if (cInputs[i].checked === true) {
                        check_num++;
                    }
                }
                if (check_num === 0) {
                    e.preventDefault();
                }
                if (check_num === 3) {
                    cInputs[0].checked = true;
                } else {
                    cInputs[0].checked = false;
                }
            }
        }
    }
    //渲染表格函数
    function RenderNewTable() {
        let region_inputs = region_check_wrapper.getElementsByTagName("input");
        let product_inputs = product_check_wrapper.getElementsByTagName("input");
        let oUser_check = dataFilter(region_inputs, product_inputs);
        let aDate_pro = dataProcessor(oUser_check, sourceData);
        let sTable_html = tableHtmlGenerator(oUser_check, aDate_pro);
        table_wrapper.innerHTML = sTable_html;
    }
    //选项筛选函数
    function dataFilter(region_area, product_area) {
        let user_checked_result = {};
        let region_arr = [];
        let product_arr = [];
        for (let i = 1; i < region_area.length; i++) {
            if (region_area[i].checked === true) {
                region_arr.push(region_area[i]);
            }
        }
        // console.log(region_arr);
        for (let i = 1; i < product_area.length; i++) {
            if (product_area[i].checked === true) {
                product_arr.push(product_area[i]);
            }
        }
        user_checked_result.region = region_arr;
        user_checked_result.product = product_arr;
        return user_checked_result;
    }

    //数据处理函数
    function dataProcessor(ofilter, source_data) {
        let result = [];
        let bridge = [];
        //两项筛选都不存在或者两边全选
        if ((ofilter.region.length === 0 && ofilter.product.length === 0) || (ofilter.region.length === 3 && ofilter.product.length === 3)) {
            result = source_data;
        } else {
            for (let i = 0; i < ofilter.region.length; i++) {
                for (let j = 0; j < source_data.length; j++) {
                    if (source_data[j].region == ofilter.region[i].value) {
                        bridge.push(source_data[j]);
                    }
                }
            }
            for (let i = 0; i < ofilter.product.length; i++) {
                for (let j = 0; j < bridge.length; j++) {
                    if (bridge[j].product == ofilter.product[i].value) {
                        result.push(bridge[j]);
                    }
                }

            }
        }
        return result;
    }
    //表格html生成器
    function tableHtmlGenerator(ofilter, afiltered_data) {
        let table_html = "";
        //当商品和地区都只选择一个的情况下，以商品为第一列，地区为第二列
        if (ofilter.region.length === 1 && ofilter.product.length === 1) {
            table_html = `<table>
            <tr>
                <th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>
            </tr>
            <tr>
                <td>${afiltered_data[0].product}</td><td>${afiltered_data[0].region}</td><td>${afiltered_data[0].sale[0]}</td><td>${afiltered_data[0].sale[1]}</td><td>${afiltered_data[0].sale[2]}</td><td>${afiltered_data[0].sale[3]}</td><td>${afiltered_data[0].sale[4]}</td><td>${afiltered_data[0].sale[5]}</td><td>${afiltered_data[0].sale[6]}</td><td>${afiltered_data[0].sale[7]}</td><td>${afiltered_data[0].sale[8]}</td><td>${afiltered_data[0].sale[9]}</td><td>${afiltered_data[0].sale[10]}</td><td>${afiltered_data[0].sale[11]}</td>
            </tr>
            </table>`;
        }
        //当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，并且把商品这一列的单元格做一个合并，只保留一个商品名称
        if (ofilter.region.length > 1 && ofilter.product.length === 1) {
            let region_num = ofilter.region.length;
            let supplementary_html = "";
            for (let i = 1; i < region_num; i++) {
                supplementary_html = supplementary_html + `<tr>
                <td>${afiltered_data[i].region}</td><td>${afiltered_data[i].sale[0]}</td><td>${afiltered_data[i].sale[1]}</td><td>${afiltered_data[i].sale[2]}</td><td>${afiltered_data[i].sale[3]}</td><td>${afiltered_data[i].sale[4]}</td><td>${afiltered_data[i].sale[5]}</td><td>${afiltered_data[i].sale[6]}</td><td>${afiltered_data[i].sale[7]}</td><td>${afiltered_data[i].sale[8]}</td><td>${afiltered_data[i].sale[9]}</td><td>${afiltered_data[i].sale[10]}</td><td>${afiltered_data[i].sale[11]}</td>
            </tr>`;
            }
            table_html = `<table>
            <tr>
                <th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>
            </tr>
            <tr>
                <td rowspan = ${region_num}>${afiltered_data[0].product}</td><td>${afiltered_data[0].region}</td><td>${afiltered_data[0].sale[0]}</td><td>${afiltered_data[0].sale[1]}</td><td>${afiltered_data[0].sale[2]}</td><td>${afiltered_data[0].sale[3]}</td><td>${afiltered_data[0].sale[4]}</td><td>${afiltered_data[0].sale[5]}</td><td>${afiltered_data[0].sale[6]}</td><td>${afiltered_data[0].sale[7]}</td><td>${afiltered_data[0].sale[8]}</td><td>${afiltered_data[0].sale[9]}</td><td>${afiltered_data[0].sale[10]}</td><td>${afiltered_data[0].sale[11]}</td>
            </tr>
            ${supplementary_html}
            </table>`;
        }
        //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
        if (ofilter.region.length === 1 && ofilter.product.length > 1) {
            let product_num = ofilter.product.length;
            let supplementary_html = "";
            for (let i = 1; i < product_num; i++) {
                supplementary_html = supplementary_html + `<tr>
                <td>${afiltered_data[i].product}</td><td>${afiltered_data[i].sale[0]}</td><td>${afiltered_data[i].sale[1]}</td><td>${afiltered_data[i].sale[2]}</td><td>${afiltered_data[i].sale[3]}</td><td>${afiltered_data[i].sale[4]}</td><td>${afiltered_data[i].sale[5]}</td><td>${afiltered_data[i].sale[6]}</td><td>${afiltered_data[i].sale[7]}</td><td>${afiltered_data[i].sale[8]}</td><td>${afiltered_data[i].sale[9]}</td><td>${afiltered_data[i].sale[10]}</td><td>${afiltered_data[i].sale[11]}</td>
            </tr>`;
            }
            table_html = `<table>
            <tr>
                <th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>
            </tr>
            <tr>
                <td rowspan = ${product_num}>${afiltered_data[0].region}</td><td>${afiltered_data[0].product}</td><td>${afiltered_data[0].sale[0]}</td><td>${afiltered_data[0].sale[1]}</td><td>${afiltered_data[0].sale[2]}</td><td>${afiltered_data[0].sale[3]}</td><td>${afiltered_data[0].sale[4]}</td><td>${afiltered_data[0].sale[5]}</td><td>${afiltered_data[0].sale[6]}</td><td>${afiltered_data[0].sale[7]}</td><td>${afiltered_data[0].sale[8]}</td><td>${afiltered_data[0].sale[9]}</td><td>${afiltered_data[0].sale[10]}</td><td>${afiltered_data[0].sale[11]}</td>
            </tr>
            ${supplementary_html}
            </table>`;
        }
        //当商品和地区都选择了多于一个的情况下，以商品为第一列，地区为第二列，商品列对同样的商品单元格进行合并
        if (ofilter.region.length > 1 && ofilter.product.length > 1) {
            let region_num = ofilter.region.length;
            let product_num = ofilter.product.length;
            let supplementary_html = "";
            for (let i = 0; i < product_num; i++) {
                for (let j = 0; j < region_num; j++) {
                    if (!supplementary_html.includes(ofilter.product[i].value)) {
                        supplementary_html = supplementary_html + `<tr>
                <td rowspan = ${region_num}>${afiltered_data[(region_num * i + j)].product}</td><td>${afiltered_data[(region_num * i + j)].region}</td><td>${afiltered_data[(region_num * i + j)].sale[0]}</td><td>${afiltered_data[(region_num * i + j)].sale[1]}</td><td>${afiltered_data[(region_num * i + j)].sale[2]}</td><td>${afiltered_data[(region_num * i + j)].sale[3]}</td><td>${afiltered_data[(region_num * i + j)].sale[4]}</td><td>${afiltered_data[(region_num * i + j)].sale[5]}</td><td>${afiltered_data[(region_num * i + j)].sale[6]}</td><td>${afiltered_data[(region_num * i + j)].sale[7]}</td><td>${afiltered_data[(region_num * i + j)].sale[8]}</td><td>${afiltered_data[(region_num * i + j)].sale[9]}</td><td>${afiltered_data[(region_num * i + j)].sale[10]}</td><td>${afiltered_data[(region_num * i + j)].sale[11]}</td>
            </tr>`;
                    } else {
                        supplementary_html = supplementary_html + `<tr>
                        <td>${afiltered_data[(region_num * i + j)].region}</td><td>${afiltered_data[(region_num * i + j)].sale[0]}</td><td>${afiltered_data[(region_num * i + j)].sale[1]}</td><td>${afiltered_data[(region_num * i + j)].sale[2]}</td><td>${afiltered_data[(region_num * i + j)].sale[3]}</td><td>${afiltered_data[(region_num * i + j)].sale[4]}</td><td>${afiltered_data[(region_num * i + j)].sale[5]}</td><td>${afiltered_data[(region_num * i + j)].sale[6]}</td><td>${afiltered_data[(region_num * i + j)].sale[7]}</td><td>${afiltered_data[(region_num * i + j)].sale[8]}</td><td>${afiltered_data[(region_num * i + j)].sale[9]}</td><td>${afiltered_data[(region_num * i + j)].sale[10]}</td><td>${afiltered_data[(region_num * i + j)].sale[11]}</td>
            </tr>`;
                    }
                }

            }
            table_html = `<table>
            <tr>
                <th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>
            </tr>
            ${supplementary_html}
            </table>`;
        }
        return table_html;
    }
}
