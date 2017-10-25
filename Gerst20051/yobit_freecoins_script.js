$(function() {
    function restoreRows() {
        $('#freecoins_table > tbody > tr:hidden').show();
    }

    var levels = [ 100, 10, 1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001, 0.00000001 ];
    var rows = $('#freecoins_table > tbody > tr');
    var readyRows = rows.filter(function () {
        return $(this).children(':nth-child(3)').text() === 'ready';
    });
    var paidRows = rows.filter(function () {
        return $(this).children(':nth-child(3)').text() !== 'ready';
    });
    paidRows.hide();
    var amounts = [];
    readyRows.each(function () {
        var name = $(this).children(':nth-child(1)').text();
        var amount = parseFloat($(this).children(':nth-child(2)').text());
        var ready = $(this).children(':nth-child(3)').text();
        var button = $(this).children(':nth-child(4)').find('.clGetFreeCoins').first();
        amounts.push(amount);
    });
    amounts = amounts.sort(function (a, b) { return a - b; }).reverse().map(function (amount) {
        return amount.toFixed(8);
    });
    console.log(amounts);
    var levelRows = Array(levels.length).fill([]);
    levels.forEach(function (level, index) {
        levelRows[index] = readyRows.filter(function () {
            return parseFloat($(this).children(':nth-child(2)').text()) >= level;
        });
        readyRows = readyRows.filter(function () {
            return parseFloat($(this).children(':nth-child(2)').text()) < level;
        });
    });
    console.log(levelRows);
    var hasRows = false;
    levelRows.forEach(function (level) {
        if (!hasRows && level.length) {
            hasRows = true;
        } else {
            level.remove();
        }
    });
});