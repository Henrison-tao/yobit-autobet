$(function() {
    var levels = [ 100, 10, 1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001, 0.00000001 ];
    var readyRows = [], levelRows = [];

    function isCaptchaVisible() {
        return 0 < $('#window_captcha:visible').length;
    }

    function restoreRows() {
        $('#freecoins_table > tbody > tr:hidden').show();
    }

    function hidePaidRows() {
        var rows = $('#freecoins_table > tbody > tr');
        readyRows = rows.filter(function () {
            return $(this).children(':nth-child(3)').text() === 'ready';
        });
        var paidRows = rows.filter(function () {
            return $(this).children(':nth-child(3)').text() !== 'ready';
        });
        paidRows.hide();
    }

    function printSortedAmounts() {
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
    }

    function computeLevelRows() {
        levelRows = Array(levels.length).fill([]);
        levels.forEach(function (level, index) {
            levelRows[index] = readyRows.filter(function () {
                return parseFloat($(this).children(':nth-child(2)').text()) >= level;
            });
            readyRows = readyRows.filter(function () {
                return parseFloat($(this).children(':nth-child(2)').text()) < level;
            });
        });
        console.log(levelRows);
    }

    function hideLevelRows() {
        var hasRows = false;
        levelRows.forEach(function (level) {
            if (!hasRows && level.length) {
                hasRows = true;
            } else {
                level.hide();
            }
        });
    }

    function clickFirstButton() {
        var buttons = $('.clGetFreeCoins:visible');
        $(buttons.splice(0, 1)).click();
        setTimeout(function () {
            if (isCaptchaVisible()) {
                solveCaptchaDelay();
            } else if (!buttons.length) {
                restoreRows();
                setTimeout(startSequence, 5E3);
            } else {
                clickRowButtons(buttons);
            }
        }, 5E3);
    }

    function solveCaptchaDelay() {
        if (isCaptchaVisible()) {
            setTimeout(solveCaptchaDelay, 5E3);
        } else {
            restoreRows();
            setTimeout(startSequence, 5E3);
        }
    }

    function clickRowButtons(buttons) {
        buttons.each(function (index) {
            setTimeout(function () {
                if (isCaptchaVisible()) {
                    stopTimers();
                    solveCaptchaDelay();
                } else {
                    $(this).click();
                    if ($(this).is(buttons.last())) {
                        setTimeout(restoreRows, 5E3);
                        setTimeout(startSequence, 10E3);
                    }
                }
            }.bind(this), index * 5E3);
        });
    }

    window.stopTimers = function () {
        for (var i = 1; i < 100000; i++) {
            clearTimeout(i);
        }
    };

    window.startSequence = function () {
        hidePaidRows();
        printSortedAmounts();
        computeLevelRows();
        hideLevelRows();
        clickFirstButton();
    };

    startSequence();
});