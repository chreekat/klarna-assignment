// No map for NodeLists. :(
map = function(listish, f) {
    acc = [];
    for (i = 0; i < listish.length; i++) {
        acc.push(f(listish[i]));
    }
};
// no indexOf for classlists, either. :/
indexOf = function(listish, obj) {
    for (i = 0; i < listish.length; i++) {
        if (listish[i] === obj) {
            return i;
        }
    }
    return -1;
}

setContainerBorder = function (doSet) {
    map(
        document.querySelectorAll("div.container1, div.container2"),
        function (cont) { cont.classList.toggle("border", doSet); }
    );
};

isBox = function (node) {
    return node !== null && indexOf(node.classList, "box") >= 0;
}

updateBg = function (ev) {
    // If we're inside a box, set border
    if (ev.target.querySelector("div.box") == null) {
        setContainerBorder(true);
    } else {
        setContainerBorder(false);
    }
};

document.addEventListener("mouseover", updateBg);

container = document.querySelector("div.container2");
htmlBoxList([1,2,3,4,5,6,7]).map(function (el) {
    container.appendChild(el);
});
