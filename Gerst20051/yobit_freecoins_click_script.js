$('.clGetFreeCoins').each(function (index) {
    setTimeout(function () {
        $(this).click();
    }.bind(this), index * 1E3);
});