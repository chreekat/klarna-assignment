htmlBox = function (id, left, right) {
    n = document.createElement("div");
    n.classList.add("box");
    n.innerHTML
        = "<div class='box-header'>"
        +       "<span class='box-title'>"
        +             "[" + id + "]"
        +       "</span>"
        +       "<span class='box-closer'>x</span>"
        +   "</div>"
        +   "<div class='box-content'>"
        +       "<div class='box-neighbor-left'>"
        +           left
        +       "</div>"
        +       "<div class='box-neighbor-right'>"
        +           right
        +       "</div>"
        +   "</div>"
        ;
    return n;
};

htmlBoxList = function (list) {
    els = [];
    for (i = 0; i < list.length; i++) {
        left = right = "";
        if ([1,2,4].indexOf(i%6) >= 0) {
            left = list[i-1];
        }
        if ((i+1 !== list.length) && ([0,1,3].indexOf(i%6) >= 0)) {
            right = list[i+1];
        }
        els.push(htmlBox(list[i], left, right));
    }
    return els;
}
