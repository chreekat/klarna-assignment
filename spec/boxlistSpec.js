describe("Box", function () {
    describe("insertAfter", function () {
        it("preserves links", function () {
            a = new Box(3);
            b = new Box(4);
            c = new Box(5);
            a.insertAfter(b);
            a.insertAfter(c);
            expect(a.next).toBe(c);
            expect(c.next).toBe(b);
        });
    });
});
