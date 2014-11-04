describe("Box", function () {
    describe("Box.fromList", function () {
        ids = [1,2,3];
        it("makes a linked list", function () {
            head = Box.fromList(ids);
            expect(head.id).toBe(1);
            expect(head.next.id).toBe(2);
            expect(head.next.next.id).toBe(3);
        });
        it("...with back links", function () {
            head = Box.fromList(ids);
            expect(head.next.prev.id).toBe(1);
            expect(head.next.next.prev.id).toBe(2);
        });
    });

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

    describe("toList", function () {
        it("packs up this and all next elements into a list of ids", function () {
            a = new Box(3);
            b = new Box(4);
            c = new Box(5);
            e = new Box(8);
            a.insertAfter(b);
            a.insertAfter(c);
            e.insertAfter(a);
            ids = a.toList();
            expect(ids).toEqual([3,5,4]);
        });

        it("complements fromList", function () {
            ids = [8,8,9];
            expect(Box.fromList(ids).toList()).toEqual(ids);
        });
    });
})
