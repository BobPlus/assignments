window.addEventListener("load",onLoad,false);
function onLoad() {
    var btn1 = document.getElementById("style1");
    var btn2 = document.getElementById("style2");
    var btn3 = document.getElementById("style3");
    var link1 = document.getElementById("link1");

    var interestBtn = document.getElementById("interest");
    var hobbyBtn = document.getElementById("hobby");
    var target1 = document.querySelector("li.interest>span:nth-child(2)");
    var target2 = document.querySelector("li.hobby>span:nth-child(2)");
    
    btn1.onclick = function () {
        link1.href = "style_1.css";
    };
    btn2.onclick = function () {
        link1.href = "style_2.css";
    };
    btn3.onclick = function () {
        link1.href = "style_3.css";
    };
    function showInterest() {
        target1.textContent = "当然是前端开发啦！";
    }
    function hideInterest() {
        target1.textContent = "没啦";
    }
    function showHobbys() {
        target2.textContent = "篮球羽毛球什么都可以";
    }
    function hideHobbys() {
        target2.textContent = "没啦";
    }
    interestBtn.addEventListener("click", showInterest, false);
    hobbyBtn.addEventListener("click", showHobbys, false);
    interestBtn.addEventListener("dblclick", hideInterest, false);
    hobbyBtn.addEventListener("dblclick", hideHobbys, false);

    //17-18需要加的时间模块
    let header = document.querySelector("body>header");
    let timingBlock = document.createElement("p");
    function showHi() {
        let date = new Date();
        let time = date.getHours();
        if (time <= 12) {
            timingBlock.textContent = "上午好，访客！";
        } else {
            timingBlock.textContent = "下午好，访客！";
        }
    }
    showHi();
    header.appendChild(timingBlock);
}

