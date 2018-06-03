var util = (function () {

    return {
        extend: function (o1, o2) {
            for (var i in o2) if (o1[i] == undefined) {
                o1[i] = o2[i];
            }
        },
        addClass: function (node, className) {
            var current = node.className || "";
            if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
                node.className = current ? (current + " " + className) : className;
            }
        },
        delClass: function (node, className) {
            var current = node.className || "";
            node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
        }
    };
})();