
function barSvg(aData) {
    let oSvg = document.getElementById("bar_svg");
    let sSvg = `<rect x="0" y="0" width="800" height="400" style="" fill="transparent"/>
    <line x1="25" y1="25" x2="25" y2="375" stroke="black" stroke-width="1"/>
    <line x1="25" y1="375" x2="775" y2="375" stroke="black" stroke-width="1"/>`;
    let h_axis_width = "750";//横轴宽
    let v_axis_width = "350";//纵轴宽
    let bar_num = aData.length; //柱子个数
    let outer_bar_width = Math.floor(h_axis_width / bar_num);//柱体加两边间距宽度
    let space = parseInt(outer_bar_width/5);//单边间距宽度
    let bar_width = outer_bar_width - 2*space;//柱体宽度
    let data_max = Math.max(...aData); //获取数据最大值
    let v_proportion = (parseInt(v_axis_width / data_max*10))/10; //纵向数据获取折算比例
    let max_scale = Math.ceil((data_max * v_proportion)/10)*10; //纵向数据最大刻度线
    // console.log(bar_num, outer_bar_width, space, bar_width, data_max, v_proportion, max_scale);
    for (let i = 0; i < 4; i++) {
        sSvg = sSvg + `<line x1="23" y1="${25 + (v_axis_width - max_scale) + (max_scale / 4) * i}" x2="775" y2="${25 + (v_axis_width - max_scale) + (max_scale / 4) * i}" stroke="#b1a5a5" stroke-width="1"/>
        <text x="0" y="${25 + (v_axis_width - max_scale) + (max_scale / 4) * i}" font-size="10"  fill="black">${((max_scale - (max_scale / 4) * i)/v_proportion).toFixed(1)}</text>`; 
    }//绘制纵坐标辅助线及数值
    for (let i = 0; i < bar_num; i++) {
        sSvg = sSvg + `<line x1="${25 + space + bar_width / 2 + i * outer_bar_width}" y1="375" x2="${25 +space + bar_width / 2 + i * outer_bar_width}" y2="382" stroke="black" stroke-width="1"/>
        <text x="${25 +space + bar_width / 2 + i * outer_bar_width}" y="395" font-size="10"  fill="black" text-anchor="middle">${i+1}月</text>`;
    }//绘制横坐标辅助线及数值
    for (let i = 0; i < bar_num; i++) {
        sSvg = sSvg + `<rect x="${25 + space + i * outer_bar_width}" y="${25 +(v_axis_width-aData[i] * v_proportion)}" width="${bar_width}" height="${aData[i] * v_proportion}" stroke="rgb(55,162,218)" fill="rgb(55,162,218)"/>`;
    }//绘制柱子
    oSvg.innerHTML = sSvg;
}