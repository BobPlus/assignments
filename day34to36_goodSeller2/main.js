window.onload = init;

function init() {
    //生成html数据
    let region_check_arr = [{
        id: "east",
        name: "region",
        value: "华东"
    }, {
        id: "south",
        name: "region",
        value: "华南"
    }, {
        id: "north",
        name: "region",
        value: "华北"
    }];
    let product_check_arr = [{
        id: "phone",
        name: "product",
        value: "手机"
    }, {
        id: "laptop",
        name: "product",
        value: "笔记本"
    }, {
        id: "speaker",
        name: "product",
        value: "智能音箱"
    }];
    //获取选择框容器
    let region_check_wrapper = document.getElementById("region-check-wrapper");
    let product_check_wrapper = document.getElementById("product-check-wrapper");
    //获取表单容器
    let table_form = document.getElementById("table_form");
    //获取表格容器
    let table_wrapper = document.getElementById("table-wrapper");
    //获取保存按钮
    let save_button = document.querySelector("button[form = 'table_form']");
    //设置状态栈，保存用户的选择
    let aUser_check_stack = [];
    //先执行html生成器，提供html内容
    checkboxgGenerator(region_check_wrapper, region_check_arr);
    checkboxgGenerator(product_check_wrapper, product_check_arr);
    //为容器点击事件绑定设置状态函数
    // region_check_wrapper.addEventListener("click", processHash, false);
    // product_check_wrapper.addEventListener("click", processHash, false);
    // //为hash变动增加事件，渲染页面
    // window.addEventListener("hashchange", renderPage, false);
    //为容器点击事件绑定渲染表格函数
    region_check_wrapper.addEventListener("click", RenderNewTable, false);
    product_check_wrapper.addEventListener("click", RenderNewTable, false);
    //为表格绑定鼠标滑动生成图表事件
    table_wrapper.addEventListener("mouseover", RenderNewChart, false);
    // table_wrapper.addEventListener("mouseover", mouseText, false);
    //鼠标移出，绘制多折线图
    table_form.addEventListener("mouseleave", RenderNewTable, false);
    //点击单元格，呼出输入框进行数据处理
    table_wrapper.addEventListener("dblclick", tdClickDeal, false);
    //点击单元格，确认取消处理
    table_wrapper.addEventListener("click", inputClickDeal, false);
    //点击保存，存储表格数据至localStorage,点击确认时也会发生保存数据，便于从新绘制表格及图表
    save_button.addEventListener("click", saveTableData, false);
    // function mouseText(e) {
    //     console.log(e.target.nodeName);
    // }
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
                    e.target.checked = true;
                }
                if (check_num === 3) {
                    cInputs[0].checked = true;
                } else {
                    cInputs[0].checked = false;
                }
            }
        }
    }
    // //设置hash函数
    // function processHash() {
    //     if (table_wrapper.getElementsByTagName("input").length !== 0) {
    //          let undone_input = table_wrapper.getElementsByTagName("input")[0];
    //         undone_input.parentNode.innerHTML = `${tdClickDeal.current_td}`;
    //     } //设置hash前先对未做处理的输入框进行自动处理
    //     let region_inputs = region_check_wrapper.getElementsByTagName("input");
    //     let product_inputs = product_check_wrapper.getElementsByTagName("input");
    //     let oUser_check = dataFilter(region_inputs, product_inputs);
    //     //如果地区和商品都有选择且状态栈中没有这种选择，则设置一个hash，为对象在状态栈中对应的索引
    //     // console.log(oUser_check);
    //     console.log(aUser_check_stack);
    //     // console.log("----------");
    //     if ((oUser_check.region.length !== 0) && (oUser_check.product.length !== 0)) {
    //         let oUser_check_string = JSON.stringify(oUser_check);
    //         if (aUser_check_stack.includes(oUser_check_string)) { //includes不检测对象，思路为转换为json再检测，
    //             //如果状态栈有hash值，设置当前hash值为该值
    //             location.hash = `#${aUser_check_stack.indexOf(oUser_check_string)}`;
    //         }else{
    //             aUser_check_stack.push(oUser_check_string);
    //             location.hash = `#${aUser_check_stack.indexOf(oUser_check_string)}`;
    //         }
    //     }
    // }
    //hash改变，重绘页面
    // function renderPage() {
    //     let hash_value = location.hash.slice(1);
    //     //获取用户输入状态
    //     let oUser_check_string = aUser_check_stack[hash_value];
    //     let oUser_check = JSON.parse(oUser_check_string);
    //     //确定好选项后，从ls中读取数据
    //     let storage = window.localStorage;
    //     let saved_data_string = storage.getItem("table_data");
    //     let saved_data_obj = JSON.parse(saved_data_string);
    //     // console.log(saved_data_obj);
    //     let aDate_pro = dataProcessor(oUser_check, saved_data_obj, sourceData);
    //     console.log(oUser_check);
    //     console.log(aDate_pro);
    //     // console.log("----------");
    //     let sTable_html = tableHtmlGenerator(oUser_check, aDate_pro);
    //     table_wrapper.innerHTML = sTable_html;
    //     if (aDate_pro.length > 1) {
    //         //画多线时调用对象的方法
    //         line_chart.setData(aDate_pro);
    //         // console.log(line_chart);
    //         line_chart.drawPolyLine();
    //     }
        
    // }
    //渲染表格函数
    function RenderNewTable() {
        if (table_wrapper.getElementsByTagName("input").length !== 0) {
            let undone_input = table_wrapper.getElementsByTagName("input")[0];
            undone_input.parentNode.innerHTML = `${tdClickDeal.current_td}`;
        }//先对未做处理的输入框进行自动处理，然后重绘表格
        let region_inputs = region_check_wrapper.getElementsByTagName("input");
        let product_inputs = product_check_wrapper.getElementsByTagName("input");
        let oUser_check = dataFilter(region_inputs, product_inputs);
        //确定好选项后，从ls中读取数据
        let storage = window.localStorage;
        let saved_data_string = storage.getItem("table_data");
        let saved_data_obj = JSON.parse(saved_data_string);
        // console.log(saved_data_obj);
        let aDate_pro = dataProcessor(oUser_check, saved_data_obj, sourceData);
        // console.log(oUser_check);
        // console.log(aDate_pro);
        // console.log("----------");
        let sTable_html = tableHtmlGenerator(oUser_check, aDate_pro);
        table_wrapper.innerHTML = sTable_html;
        if (aDate_pro.length > 1) {
            //画多线时调用对象的方法
            line_chart.setData(aDate_pro);
            // console.log(line_chart);
            line_chart.drawPolyLine();
        }
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
    function dataProcessor(ofilter,saved_data,source_data) {
        let result = [];
        let bridge = [];
        //两边全选
        if (ofilter.region.length === 3 && ofilter.product.length === 3) {
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
        }//先从默认数据中获取，下面根据保存的数据进行替换
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < saved_data.length; j++) {
                if (result[i].product === saved_data[j].product && result[i].region === saved_data[j].region) {
                    result[i] = saved_data[j];
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
            <tr data-product = "${afiltered_data[0].product}" data-region = "${afiltered_data[0].region}">
                <th>${afiltered_data[0].product}</th><th>${afiltered_data[0].region}</th><td>${afiltered_data[0].sale[0]}</td><td>${afiltered_data[0].sale[1]}</td><td>${afiltered_data[0].sale[2]}</td><td>${afiltered_data[0].sale[3]}</td><td>${afiltered_data[0].sale[4]}</td><td>${afiltered_data[0].sale[5]}</td><td>${afiltered_data[0].sale[6]}</td><td>${afiltered_data[0].sale[7]}</td><td>${afiltered_data[0].sale[8]}</td><td>${afiltered_data[0].sale[9]}</td><td>${afiltered_data[0].sale[10]}</td><td>${afiltered_data[0].sale[11]}</td>
            </tr>
            </table>`;
        }
        //当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，并且把商品这一列的单元格做一个合并，只保留一个商品名称
        if (ofilter.region.length > 1 && ofilter.product.length === 1) {
            let region_num = ofilter.region.length;
            let supplementary_html = "";
            for (let i = 1; i < region_num; i++) {
                supplementary_html = supplementary_html + `<tr data-product = "${afiltered_data[i].product}" data-region = "${afiltered_data[i].region}">
                <th>${afiltered_data[i].region}</th><td>${afiltered_data[i].sale[0]}</td><td>${afiltered_data[i].sale[1]}</td><td>${afiltered_data[i].sale[2]}</td><td>${afiltered_data[i].sale[3]}</td><td>${afiltered_data[i].sale[4]}</td><td>${afiltered_data[i].sale[5]}</td><td>${afiltered_data[i].sale[6]}</td><td>${afiltered_data[i].sale[7]}</td><td>${afiltered_data[i].sale[8]}</td><td>${afiltered_data[i].sale[9]}</td><td>${afiltered_data[i].sale[10]}</td><td>${afiltered_data[i].sale[11]}</td>
            </tr>`;
            }
            table_html = `<table>
            <tr>
                <th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>
            </tr>
            <tr data-product = "${afiltered_data[0].product}" data-region = "${afiltered_data[0].region}">
                <th rowspan = ${region_num}>${afiltered_data[0].product}</th><th>${afiltered_data[0].region}</th><td>${afiltered_data[0].sale[0]}</td><td>${afiltered_data[0].sale[1]}</td><td>${afiltered_data[0].sale[2]}</td><td>${afiltered_data[0].sale[3]}</td><td>${afiltered_data[0].sale[4]}</td><td>${afiltered_data[0].sale[5]}</td><td>${afiltered_data[0].sale[6]}</td><td>${afiltered_data[0].sale[7]}</td><td>${afiltered_data[0].sale[8]}</td><td>${afiltered_data[0].sale[9]}</td><td>${afiltered_data[0].sale[10]}</td><td>${afiltered_data[0].sale[11]}</td>
            </tr>
            ${supplementary_html}
            </table>`;
        }
        //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
        if (ofilter.region.length === 1 && ofilter.product.length > 1) {
            let product_num = ofilter.product.length;
            let supplementary_html = "";
            for (let i = 1; i < product_num; i++) {
                supplementary_html = supplementary_html + `<tr data-product = "${afiltered_data[i].product}" data-region = "${afiltered_data[i].region}">
                <th>${afiltered_data[i].product}</th><td>${afiltered_data[i].sale[0]}</td><td>${afiltered_data[i].sale[1]}</td><td>${afiltered_data[i].sale[2]}</td><td>${afiltered_data[i].sale[3]}</td><td>${afiltered_data[i].sale[4]}</td><td>${afiltered_data[i].sale[5]}</td><td>${afiltered_data[i].sale[6]}</td><td>${afiltered_data[i].sale[7]}</td><td>${afiltered_data[i].sale[8]}</td><td>${afiltered_data[i].sale[9]}</td><td>${afiltered_data[i].sale[10]}</td><td>${afiltered_data[i].sale[11]}</td>
            </tr>`;
            }
            table_html = `<table>
            <tr>
                <th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>
            </tr>
            <tr data-product = "${afiltered_data[0].product}" data-region = "${afiltered_data[0].region}">
                <th rowspan = ${product_num}>${afiltered_data[0].region}</th><th>${afiltered_data[0].product}</th><td>${afiltered_data[0].sale[0]}</td><td>${afiltered_data[0].sale[1]}</td><td>${afiltered_data[0].sale[2]}</td><td>${afiltered_data[0].sale[3]}</td><td>${afiltered_data[0].sale[4]}</td><td>${afiltered_data[0].sale[5]}</td><td>${afiltered_data[0].sale[6]}</td><td>${afiltered_data[0].sale[7]}</td><td>${afiltered_data[0].sale[8]}</td><td>${afiltered_data[0].sale[9]}</td><td>${afiltered_data[0].sale[10]}</td><td>${afiltered_data[0].sale[11]}</td>
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
                        supplementary_html = supplementary_html + `<tr data-product = "${afiltered_data[(region_num * i + j)].product}" data-region = "${afiltered_data[(region_num * i + j)].region}">
                <th rowspan = ${region_num}>${afiltered_data[(region_num * i + j)].product}</th><th>${afiltered_data[(region_num * i + j)].region}</th><td>${afiltered_data[(region_num * i + j)].sale[0]}</td><td>${afiltered_data[(region_num * i + j)].sale[1]}</td><td>${afiltered_data[(region_num * i + j)].sale[2]}</td><td>${afiltered_data[(region_num * i + j)].sale[3]}</td><td>${afiltered_data[(region_num * i + j)].sale[4]}</td><td>${afiltered_data[(region_num * i + j)].sale[5]}</td><td>${afiltered_data[(region_num * i + j)].sale[6]}</td><td>${afiltered_data[(region_num * i + j)].sale[7]}</td><td>${afiltered_data[(region_num * i + j)].sale[8]}</td><td>${afiltered_data[(region_num * i + j)].sale[9]}</td><td>${afiltered_data[(region_num * i + j)].sale[10]}</td><td>${afiltered_data[(region_num * i + j)].sale[11]}</td>
            </tr>`;
                    } else {
                        supplementary_html = supplementary_html + `<tr data-product = "${afiltered_data[(region_num * i + j)].product}" data-region = "${afiltered_data[(region_num * i + j)].region}">
                        <th>${afiltered_data[(region_num * i + j)].region}</th><td>${afiltered_data[(region_num * i + j)].sale[0]}</td><td>${afiltered_data[(region_num * i + j)].sale[1]}</td><td>${afiltered_data[(region_num * i + j)].sale[2]}</td><td>${afiltered_data[(region_num * i + j)].sale[3]}</td><td>${afiltered_data[(region_num * i + j)].sale[4]}</td><td>${afiltered_data[(region_num * i + j)].sale[5]}</td><td>${afiltered_data[(region_num * i + j)].sale[6]}</td><td>${afiltered_data[(region_num * i + j)].sale[7]}</td><td>${afiltered_data[(region_num * i + j)].sale[8]}</td><td>${afiltered_data[(region_num * i + j)].sale[9]}</td><td>${afiltered_data[(region_num * i + j)].sale[10]}</td><td>${afiltered_data[(region_num * i + j)].sale[11]}</td>
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
    //渲染图表函数
    function RenderNewChart(e) {
        let aTd = [];
        if (e.target.nodeName === "TD" && table_wrapper.getElementsByTagName("input").length == 0) {
            for (let i = 0; i < e.target.parentNode.cells.length; i++) {
                if (e.target.parentNode.cells[i].nodeName === "TD") {
                    aTd.push(e.target.parentNode.cells[i].textContent);
                }
            }
        }
        // console.log(aTd);
        if (aTd.length === 12) {
            line_chart.setData(aTd);
            // console.log(line_chart);
            line_chart.drawPolyLine(aTd);
            //画单线
            barSvg(aTd);
        }
    }
    //保存表格数据至LS函数
    function saveTableData() {
        // `[{"product":"手机","region":"华东","sale":[120,100,140,160,180,185,190,210,230,245,255,270]},{"product":"手机","region":"华北","sale":[80,70,90,110,130,145,150,160,170,185,190,200]}]`;
        let obj_string = "";
        let aux_string = "";
        let aObj = [];
        let storage = window.localStorage;
        let oTable = table_wrapper.getElementsByTagName("table")[0];
        let aRows = oTable.rows;
        for (let i = 1; i < aRows.length; i++) {
            let aSale = [];
            for (let j = 0; j < aRows[i].cells.length; j++) {
                if (aRows[i].cells[j].nodeName === "TD") {
                    aSale.push(Number(aRows[i].cells[j].textContent));
                }
            }
            aObj[i - 1] = `{"product":"${aRows[i].dataset.product}","region":"${aRows[i].dataset.region}","sale":[${aSale}]}`;
        }
        aux_string = aObj.join(",");
        obj_string = `[${aux_string}]`;
        storage.setItem("table_data", obj_string);
        // console.log(obj_string);
    }
    //双击单元格数据转换成输入框、输入框点击确定或取消的处理函数
    function tdClickDeal(e) {
        if (e.target.nodeName === "TD") {
            if (table_wrapper.getElementsByTagName("input").length !== 0) {
                alert("请对当前输入框编辑后再编辑其他输入框");
            } else {
                tdClickDeal.current_td = e.target.textContent;
                e.target.innerHTML = `<input type="text" data-parent="td" value="${tdClickDeal.current_td}"><button id="confirm">确认</button><button id="cancel">取消</button>`;
            }
        }
    }
    //点击单元格内确定或取消的处理函数
    function inputClickDeal(e) {
        let concurrent_input = table_wrapper.getElementsByTagName("input")[0];
        let pattern = /^\d+$/;
        if (e.target.id === "confirm") {
            let newNumber = concurrent_input.value;
            if (pattern.test(newNumber)) {
                e.target.parentNode.innerHTML = `${newNumber}`;
                saveTableData(); //调用保存函数，保存结果到ls中
            } else {
                alert("请输入一个正整数");
                e.target.parentNode.innerHTML = `${tdClickDeal.current_td}`;
            }
        } else if (e.target.id === "cancel") {
            e.target.parentNode.innerHTML = `${tdClickDeal.current_td}`;
            console.log("取消");
        } else {
            //啥也不干
        }
    }
}
