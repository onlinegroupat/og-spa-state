describe('BasicSessionAuthStore.storage', function () {
    test('is in range', function () {
        var randomInt = MathUtil.getRandomInt(1, 9);
        expect(randomInt).toBeGreaterThanOrEqual(1);
        expect(randomInt).toBeLessThanOrEqual(9);
    });
    test('has no decimal digits', function () {
        var randomInt = MathUtil.getRandomInt(1, 9);
        expect(randomInt).toBe(Math.floor(randomInt));
    });
});
//# sourceMappingURL=BasicSessionAuthStore.test.js.map