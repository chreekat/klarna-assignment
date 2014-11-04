describe("Box", function () {
    describe("insertAfter", function () {
        it("preserves links", function () {
            a = new Box(3);
            b = new Box(4);
            c = new Box(5);
            a.insertAfter(b);
            a.insertAfter(c);
            expect(a.next).toBe(c);
            expect(c.prev).toBe(a);
            expect(c.next).toBe(b);
            expect(b.prev).toBe(c);
        });
    });

    describe("delete", function () {
        it("patches up the list", function () {
            a = new Box(3);
            b = new Box(4);
            c = new Box(5);
            a.insertAfter(b);
            a.insertAfter(c);
            c.delete();
            expect(a.next).toBe(b);
            expect(b.prev).toBe(a);
        });
    });

    describe("fromList", function () {
        it("makes a linked list");
        it("...with back links");
    });

})
