Box = function (id) {
    this.id = id;
    this.prev = this.next = null;
};

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
