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
function showHobbys() {
    target2.textContent = "篮球羽毛球什么的都可以！";
}
interestBtn.addEventListener("click", showInterest);
hobbyBtn.addEventListener("click", showHobbys);