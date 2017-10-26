//Freecoin移除所有已經領過的。
var rows = $('#freecoins_table > tbody > tr');

   var paidRows = rows.filter(function () {
        return $(this).children(':nth-child(3)').text() !== 'ready';
    });
paidRows.remove();

//清除所有跳出的modal
var mes=$('.messi');
var mesm=$('.messi-modal');
mes.remove();
mesm.remove();
var rows = $('#freecoins_table > tbody > tr');

   var paidRows = rows.filter(function () {
        return $(this).children(':nth-child(3)').text() !== 'ready';
    });
paidRows.remove();

//點擊所有getCoin按鈕
$('.clGetFreeCoins').each(function (index) {
    setTimeout(function () {
        $(this).click();
    }.bind(this), index * 1E3);
});

