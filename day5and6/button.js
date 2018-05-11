var btn1 = document.getElementById("style1");
var btn2 = document.getElementById("style2");
var btn3 = document.getElementById("style3");
var link1 = document.getElementById("link1");
btn1.onclick = function () {
    link1.href = "style_1.css";    
}
btn2.onclick = function () {
    link1.href = "style_2.css";
}
btn3.onclick = function () {
    link1.href = "style_3.css";
}