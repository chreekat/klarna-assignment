Box = function (id) {
    this.id = id;
    this.prev = this.next = null;
};

Box.fromList = function (ids) {
    head = new Box(ids[0]);
    cur = head;
    for(i = 1; i < ids.length; i++) {
        cur.next = new Box(ids[i]);
        cur.next.prev = cur;
        cur = cur.next;
    }
    return head;
}

Box.prototype.insertAfter = function (newBox) {
    if (this.next !== null) {
        this.next.prev = newBox;
        newBox.next = this.next;
    }
    this.next = newBox;
    newBox.prev = this;
};

Box.prototype.delete = function () {
    if (this.prev !== null) {
        this.prev.next = this.next;
    }
    if (this.next !== null) {
        this.next.prev = this.prev;
    }
};

Box.prototype.toHtml = function (showLeft, showRight) {
    nextid = previd = "";
    if (showLeft && this.prev !== null) {
        previd = prev.id;
    }
    if (showRight && this.next !== null) {
        nextid = next.id;
    }
    n = document.createElement("div");
    n.classList.add("box");
    n.innerHTML
        = "<div class='box-header'>"
        +       "<span class='box-title'>"
        +             "[" + this.id + "]"
        +       "</span>"
        +       "<span class='box-closer'>x</span>"
        +   "</div>"
        +   "<div class='box-content'>"
        +       "<div class='box-neighbor-left'>"
        +           previd
        +       "</div>"
        +       "<div class='box-neighbor-right'>"
        +           nextid
        +       "</div>"
        +   "</div>"
        ;
    return n;
};
