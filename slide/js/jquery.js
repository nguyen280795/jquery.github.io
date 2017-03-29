$(function () {
    // Xác định số lượng hình của slide
    var count = $('.mySlides').length;

    // Khai báo biến dùng để đồng bộ hóa giữa hình ảnh và điều khiển
    var eindex = 4;
    var index = 0;

    // Function xử lý hiển thị cho hình slide và các nút điều khiển tương ứng với eindex
    // Được dùng lại một số lần ở các đoạn code bên dưới
    function setimagefocus() {
        $('.mySlides').stop().animate({opacity: 0});
        $('.mySlides:eq(' + eindex + ')').stop().animate({opacity: 1});
    }

    // function xử lý quay vòng hình ảnh
    function slideswap() {
        // Nếu vị trí hiện tại đã là hình cuối cùng của slide thì sẽ chuyển eindex về -1
        // để sau eindex++ thì eindex sẽ là 0, tương ứng với hình slide đầu tiên
        eindex++;
        if (eindex >= count) {
            eindex = 0;
        }

        checkDiv(eindex);
        setimagefocus();

    }

    //đánh dấu ảnh đang xuất hiện
    function checkDiv(n) {
        for (i = 0; i < count; i++) {
            $("#icon-" + (i)).removeClass("border-icon-img");
        }
        $("#icon-" + (n)).addClass("border-icon-img");
        if (n === 0)
            $("#icon-4").removeClass("border-icon-img");
        console.log(n);
    }

    start_slideswap();
    // Thay đổi giá trị biến timeinterval bên dưới để thay đổi thời gian chuyển đổi giữa 2 hình
    function start_slideswap() {
        checkDiv(eindex);
        timeinterval = 1000;
        play = setInterval(slideswap, timeinterval);
    }

    // Xử lý khi đưa chuột vào slide thì dừng lại quá trình tự động chuyển hình
    $(".slider").hover(function () {
        clearInterval(play);
    }, function () {
        start_slideswap();
    });
    // Xử lý khi click nút next và prev
    $('.prev-slider').click(function () {
        // Nếu vị trí hiện tại đã là hình đầu tiên của slide thì sẽ chuyển eindex về hình cuối
        eindex--;
        if (eindex === -1) {
            eindex = count - 1;
        }
        checkDiv(eindex);
        setimagefocus();

    });
    $('.next-slider').click(function () {

        // Nếu vị trí hiện tại đã là hình đầu tiên của slide thì sẽ chuyển eindex về hình cuối
        eindex++;
        if (eindex >= count) {
            eindex = 0;
        }
        checkDiv(eindex);
        setimagefocus();

    });

    $('.click-img').click(function () {
        clearInterval(play);
        play = setInterval(slideswap, timeinterval);
        eindex = $(this).attr('stt') - 1;
        eindex++;
        setimagefocus();
        console.log(eindex);
        checkDiv(eindex);
    });
});