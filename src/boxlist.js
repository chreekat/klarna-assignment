Box = function (id) {
    this.id = id;
    this.prev = this.next = null;
};

Box.prototype.insertAfter = function (newBox) {
    if (this.next !== null) {
        newBox.next = this.next;
    }
    this.next = newBox;
};
