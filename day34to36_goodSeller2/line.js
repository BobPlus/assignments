let line_chart = {
    canvas_width: 800, //画布宽
    canvas_height: 400, //画布高
    h_axis_width: 750, //横轴宽
    v_axis_width: 350, //纵轴宽
    aData_p: [], //处理后的数据数组
    point_num: 12, //数据点个数(默认值)
    point_space: 5, //数据点间距(默认值)
    data_max: 350, //数据点最大值
    v_proportion: 1, //纵向数据折算比例
    max_scale: 350, //纵向最大刻度线像素值
    line_num: 1, //折线条数
    color_arr: ["#f13", "#f1a", "#f1f", "#81f", "#21f", "#18f", "#1fe", "#1f7", "#7f1", "#ff1", "#f81", "#543"], //颜色数组
    setData: function (aData) {
        if (typeof aData[0] !== "object") {
            //绘制单折线图，直接传入数据点数值数组
            this.aData_p = aData;
            this.point_num = this.aData_p.length;
            this.data_max = Math.max(...this.aData_p); //获取数据最大值
            this.line_num = 1;
        } else {
            //绘制多折线图，传入筛选后的对象数组
            this.point_num = aData[0].sale.length;
            // this.aData_p = [];//清空上一次配置对象属性时的数组?
            this.aData_p = (function (arr) {
                let result = [];
                for (let i = 0; i < arr.length; i++) {
                    result.push(arr[i].sale);
                }
                return result;
            })(aData);
            this.line_num = this.aData_p.length;
            this.data_max = (function (arr) {
                let data_arr = [];
                for (let sub_arr of arr) {
                    data_arr.push(Math.max(...sub_arr));
                }
                let result = Math.max(...data_arr);
                return result;
            })(this.aData_p); //获取数据最大值
        }
        this.point_space = Math.floor(this.h_axis_width / (this.point_num - 1)); //设置数据点间距
        this.v_proportion = (parseInt(this.v_axis_width / this.data_max * 100)) / 100; //纵向数据获取折算比例
        this.max_scale = Math.ceil(this.data_max * this.v_proportion); //纵向最大刻度线像素值
    },
    drawPolyLine: function () {
        let ctx = document.getElementById("canvas").getContext("2d");
        ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
        //完成坐标系及辅助线，切换坐标原点
        (drawCoordinate.bind(this))();
        //完成折线图
        if (this.line_num == 1) {
            (drawOnePolyLine.bind(this))(); //画单折线图
        } else {
            (drawMultiPolyLine.bind(this))(); //画多折线图
        }

        function drawCoordinate() {
            ctx.beginPath();
            ctx.moveTo(25, 25);
            ctx.lineTo(25, 375);
            ctx.lineTo(775, 375);
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.translate(25, 375); //切换坐标原点,便于画折线
            ctx.font = "10px sans-serif";
            //绘制横辅助线
            ctx.beginPath();
            ctx.strokeStyle = '#b1a5a5';
            for (let i = 0; i < 4; i++) {
                ctx.moveTo(0, -(this.max_scale - i * this.max_scale / 4));
                ctx.lineTo(750, -(this.max_scale - i * this.max_scale / 4));
                ctx.stroke();
                ctx.fillText(((this.max_scale - i * this.max_scale / 4) / this.v_proportion).toFixed(1), -25, -(this.max_scale - i * this.max_scale / 4));
            }
            ctx.fillText(0, -25, 0); //补充原点数据
            //绘制纵辅助线
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            for (let i = 0; i < this.point_num; i++) {
                ctx.moveTo(i * this.point_space, 0);
                ctx.lineTo(i * this.point_space, -5);
                ctx.stroke();
                ctx.fillText((i + 1) + "月", i * this.point_space - 6, 12);
            }
        }
        //画单折线函数
        function drawOnePolyLine() {
            // console.log("画单线啦");
            ctx.beginPath();
            ctx.strokeStyle = 'rgb(55,162,218)';
            for (let i = 0; i < this.point_num; i++) {
                if (i === 0) {
                    ctx.moveTo(i * this.point_space, -this.aData_p[i] * this.v_proportion);
                    ctx.arc(i * this.point_space, -this.aData_p[i] * this.v_proportion, 3, 0, Math.PI * 2, true);
                    ctx.stroke();
                    //移动到第一个数据点直接画一个圆
                } else {
                    ctx.moveTo((i - 1) * this.point_space, -this.aData_p[i - 1] * this.v_proportion);
                    ctx.lineTo(i * this.point_space, -this.aData_p[i] * this.v_proportion);
                    ctx.arc(i * this.point_space, -this.aData_p[i] * this.v_proportion, 3, 0, Math.PI * 2, true);
                    ctx.stroke();
                    //移动到上一个数据点，先划线后画圆
                }
            }
            ctx.translate(-25, -375);
            //切换回坐标原点，为下次作图做准备
        }
        //画多折线函数
        function drawMultiPolyLine() {
            for (let i = 0; i < this.line_num; i++) {
                ctx.beginPath();
                ctx.strokeStyle = this.color_arr[i];
                for (let j = 0; j < this.point_num; j++) {
                    if (j === 0) {
                        ctx.moveTo(j * this.point_space, -this.aData_p[i][j] * this.v_proportion);
                        ctx.arc(j * this.point_space, -this.aData_p[i][j] * this.v_proportion, 3, 0, Math.PI * 2, true);
                        ctx.stroke();
                        //移动到第一个数据点直接画一个圆
                    } else {
                        ctx.moveTo((j - 1) * this.point_space, -this.aData_p[i][j - 1] * this.v_proportion);
                        ctx.lineTo(j * this.point_space, -this.aData_p[i][j] * this.v_proportion);
                        ctx.arc(j * this.point_space, -this.aData_p[i][j] * this.v_proportion, 3, 0, Math.PI * 2, true);
                        ctx.stroke();
                        //移动到上一个数据点，先划线后画圆
                    }
                }
            }
            ctx.translate(-25, -375);
            //切换回坐标原点，为下次作图做准备
        }
    }
};
