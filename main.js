(function ($) {
    let cartValue = $("#cartUpdate").html();
    let cartItem = [];
    let i = 0;
    let fromLocalStorage;
    if (localStorage.getItem('cartItems')) {
        cartItem = JSON.parse(localStorage.getItem('cartItems'));
    }
    if (localStorage.getItem('cartCount')) {
        $("#cartUpdate").html(localStorage.getItem('cartCount'));
    }
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', false)
    } else if (localStorage.getItem('theme') == "true") {
        $('body').addClass('bg-black');
    }

    $(window).on('load', function () {
        $('#preloader-active').delay(1550).fadeOut('slow');
        $('body').delay(450).css({ 'overflow': 'visible' });
    });


    $("#toggleTim").on("click", () => {
        localStorage.getItem('theme')
        $('#toggleTim').toggleClass('btn-light');
        $('#toggleTim').toggleClass('btn-dark');
        if (localStorage.getItem('theme') == 'false') {
            $('body').addClass('bg-black');
            $('.path-link').removeClass('text-black');
            $('.path-link').addClass('text-white');
            $('.myIcon').addClass('text-white')
            localStorage.removeItem('theme')
            localStorage.setItem('theme', true)
        } else {
            $('.path-link').removeClass('text-white');
            $('.path-link').addClass('text-black');
            $('.myIcon').removeClass('text-white')
            $('body').removeClass('bg-black');
            localStorage.removeItem('theme')
            localStorage.setItem('theme', false)
        }
    })
    $("#formCancelBtn").on("click", () => {
        // window.location.href="index.html";
        alert('closed');
        window.location.href = "index.html";
    })
    $("#formSignupBtn").click(() => {
        alert('Succesfull Sign-up; Welcome!')
        window.location.href = "index.html";
    })
    $("#crtAccBtn").click(() => {
        window.location.href = "signup.html";
    })
    $("#addToCart").on("click", () => {
        i++;
        let itemName = $("#itemName").html();
        let itemPrice = $("#itemPrice").html();
        let imageSrc = $("#imageId").attr('src');
        
        let item = {
            itemName: itemName,
            itemPrice: itemPrice,
            itemImgSrc: imageSrc
        }
        cartItem.push(item);
        localStorage.setItem("cartItems", JSON.stringify(cartItem));

        if (localStorage.getItem('cartCount')) {
            cartValue = localStorage.getItem('cartCount');
        }
        cartValue++;
        $("#cartUpdate").html(cartValue);
        localStorage.setItem("cartCount", cartValue)
        console.log(cartItem);
    })
    $('#loginBtn').on('click',()=>{
        let name = $('#userIdInp').val();
        alert('welcome back! ' + name);
    })


})(jQuery);