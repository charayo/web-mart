(function ($) {
    let cartValue = $("#cartUpdate").html();
    let cartItem = [];
    let i = 0;
    if (localStorage.getItem('logged')) {
        if (localStorage.getItem('user')) {
            let userDetails = JSON.parse(localStorage.getItem('user'));
            $('#navbarDropdown').html(userDetails.userId);
            $('#signOut').removeClass('d-none');
            $('#indexCrtAcc').addClass('d-none');
            $('#indexLogin').addClass('d-none');

        }
    }
    if(localStorage.getItem('user') && !localStorage.getItem('logged')){
        $('#myModal').modal('show');
    }

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

    //For the Site Theme
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
    //------------------------------

    //The sign-up page
    $("#formCancelBtn").on("click", () => {
        // window.location.href="index.html";
        alert('closed');
        window.location.href = "index.html";
    })
    //Craeting a user account
    // $("#formSignupBtn").click(() => {
    //     window.location.href = "index.html";
    // })
    // $("#crtAccBtn").click(() => {
    //     window.location.href = "signup.html";
    // })
    //--------------------------

    //Adding items into the cart
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
        localStorage.setItem("orderedItems", JSON.stringify(cartItem));

        if (localStorage.getItem('cartCount')) {
            cartValue = localStorage.getItem('cartCount');
        }
        cartValue++;
        $("#cartUpdate").html(cartValue);
        localStorage.setItem("cartCount", cartValue)
        localStorage.setItem("orderedCount", cartValue)
    })
    //-------------------------------

    //For Login Page
    $('#loginBtn').on('click', () => {
        let name = $('#userIdInp').val();
        alert('welcome back! ' + name);
    })
    //------------------------


    // For Payment page
    $('#payBtn').on('click', () => {
        // alert('pay');
        if ($('#snInp').val().length >= 12 && $('#yearInp').val().length >= 4 && $('#cvvInp').val().length == 3) {
            let num = 10;
            let redirect = () => {
                location.href = 'index.html'
            }
            localStorage.removeItem('cartItems')
            localStorage.removeItem('cartCount')
            localStorage.setItem('orderMade', true)
            $('#alert').removeClass('d-none');
            setTimeout(redirect, 10000);
            let countDwn = () => {
                $('#countDwn').html(num);
                if (num > 0) {
                    num--;
                }
            }
            let myTime = setInterval(countDwn, 1000);
            if (num == 0) {
                clearInterval(myTime);
            }

        } else {
            alert('please fill properly');
        }
    })
    //-----------------------------------

    //For signout button
    $('#signOutBtn').on('click', () => {
        // localStorage.removeItem('user');
        window.location.href = "index.html";
        $('#navbarDropdown').html('Login');
        $('#signOut').addClass('d-none');
        $('#indexCrtAcc').removeClass('d-none');
        $('#indexLogin').removeClass('d-none');

    })
    //-----------------
    //For Sign up Page
    let getUserDetails = () => {
        let password = $('#userPass').val();
        let email = $('#userEmail').val();
        let username = $('#userId').val();
        let passVali = /(?=.*[0-9])(?=.*[-_@])(?=.*[A-Z])[a-zA-Z0-9@-_@]{8,16}$/;
        let test = passVali.test(password);
        let mailVali = /[a-zA-Z0-9]{3,15}[@]{1}[a-zA-Z]{3,10}[.]{1}[a-zA-Z]{2,4}$/
        let mailCheck = mailVali.test(email);
        if (test && mailCheck) {
            let userDetails = {
                userPass: password,
                userEmail: email,
                userId: username,
            }
            console.log(userDetails);
            localStorage.setItem('user', JSON.stringify(userDetails));
            window.location.href = "index.html";
            

        } else {
            $('#signUpForm').effect('shake');
            $('#wrongPassAlert').removeClass('d-none');
        }
    }
    $('#formSignupBtn').on('click', () => {
        getUserDetails();
    })
    //---------------------------
    // $('#prom').on('click', ()=>{
    //     alert();
    // })
})(jQuery);