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

setContainerBg = function (doSet) {
    map(
        document.querySelectorAll("div.container1, div.container2"),
        function (cont) { cont.classList.toggle("background", doSet); }
    );
};

isBox = function (node) {
    return indexOf(node.classList, "box") >= 0;
}

updateBg = function (ev) {
    console.log(ev);
    if (isBox(ev.toElement) && !isBox(ev.fromElement)) {
        setContainerBg(true);
    } else if (!isBox(ev.toElement) && isBox(ev.fromElement)) {
        setContainerBg(false);
    }
};

document.addEventListener("mouseover", updateBg);

