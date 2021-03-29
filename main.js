(function ($) {
    let cartValue = $("#cartUpdate").html();
    let cartItem = [];
    let i = 0;
    let userDetails;
    let username = 'user';
    let cost;
    if (localStorage.getItem('logged')) {
        username = localStorage.getItem('presentUser');

    }
    // console.log(`${username}`);
    if (localStorage.getItem(`${username}`)) {
        userDetails = JSON.parse(localStorage.getItem(`${username}`));
        $('#navbarDropdown').html(userDetails.userId);
        $('#signOut').removeClass('d-none');
        $('#indexCrtAcc').addClass('d-none');
        $('#indexLogin').addClass('d-none');

    }
    //This Makes individual users to have a peculiar cartIems and cartcount as they have selected 
    if (localStorage.getItem('logged') && localStorage.getItem(`${username}cartItems`)) {
        cartItem = JSON.parse(localStorage.getItem(`${username}cartItems`));
    } else if (!localStorage.getItem('logged') && localStorage.getItem('cartItems')) {
        cartItem = JSON.parse(localStorage.getItem('cartItems'));
    }

    if (localStorage.getItem('logged') && localStorage.getItem(`${username}cartCount`)) {
        $("#cartUpdate").html(localStorage.getItem(`${username}cartCount`));
    } else if (!localStorage.getItem('logged') && localStorage.getItem('cartCount')) {
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
            // localStorage.removeItem('theme')
            localStorage.setItem('theme', true)
        } else {
            $('.path-link').removeClass('text-white');
            $('.path-link').addClass('text-black');
            $('.myIcon').removeClass('text-white')
            $('body').removeClass('bg-black');
            // localStorage.removeItem('theme');
            localStorage.setItem('theme', false)
        }
    })
    //------------------------------

    //The sign-up page
    $("#formCancelBtn").on("click", () => {
        // window.location.href="index.html";
        // alert('closed');
        window.location.href = "index.html";
    })
    //Creating a user account
    // $("#formSignupBtn").click(() => {
    //     window.location.href = "index.html";
    // })
    $("#crtAccBtn").click(() => {
        window.location.href = "signup.html";
    })
    //--------------------------

    //Adding items into the cart
    $("#addToCart").on("click", () => {
        let clickedName = $("#addToCartDiv").attr('name');
        // alert(clickedName);
        i++;
        let itemName = $("#itemName").html();
        let itemPrice = $("#itemPrice").html();
        let imageSrc = $("#imageId").attr('src');
        let pcs = 1;

        let item = {
            itemName: itemName,
            itemPrice: itemPrice,
            itemImgSrc: imageSrc,
            codeName: clickedName,
            pcs: pcs,
        }
        cartItem.push(item);
        if (localStorage.getItem('logged')) {
            localStorage.setItem(`${username}${clickedName}`, '1')
            localStorage.setItem(`${username}cartItems`, JSON.stringify(cartItem));
            localStorage.setItem(`${username}orderedItems`, JSON.stringify(cartItem));

            if (localStorage.getItem(`${username}cartCount`)) {
                cartValue = localStorage.getItem(`${username}cartCount`);
            }
            cartValue++;
            $("#cartUpdate").html(cartValue);
            localStorage.setItem(`${username}cartCount`, cartValue);
            localStorage.setItem(`${username}orderedCount`, cartValue);
            window.location.href = 'cart.html';
        } else {
            localStorage.setItem(`${clickedName}`, '1')
            localStorage.setItem("cartItems", JSON.stringify(cartItem));
            localStorage.setItem("orderedItems", JSON.stringify(cartItem));

            if (localStorage.getItem('cartCount')) {
                cartValue = localStorage.getItem('cartCount');
            }
            cartValue++;
            $("#cartUpdate").html(cartValue);
            localStorage.setItem("cartCount", cartValue);
            localStorage.setItem("orderedCount", cartValue);
            window.location.href = 'cart.html';
        }
    })
    //-------------------------------

    //For Login Page
    $('#loginBtn').on('click', () => {
        let username = $('#userIdInp').val();
        username = username.toLowerCase();
        if (localStorage.getItem(`${username}`)) {
            let loginCache = JSON.parse(localStorage.getItem(`${username}`));
            // let name = $('#userIdInp').val();
            let password = $('#passInp').val();
            let storedName = loginCache.userId;
            let storedPass = loginCache.userPass;
            let storedEmail = loginCache.userEmail;
            username = username.toLowerCase();
            storedName = storedName.toLowerCase();

            if (username == storedName && password == storedPass || username == storedEmail && password == storedPass) {
                localStorage.setItem('logged', true);
                localStorage.setItem('presentUser', `${username}`);
                alert('welcome back! ' + storedName);
                $('#myModal').modal('hide');
                window.location.href = "index.html";

            } else {
                $('#myModal').effect('shake');
            }

        } else {
            $('#myModal').effect('shake');
        }

    })
    //------------------------

    // For Payment page
    $('#payBtn').on('click', () => {
        if ($('#snInp').val().length >= 12 && $('#yearInp').val().length >= 4 && $('#cvvInp').val().length == 3) {
            let num = 10;
            let redirect = () => {
                location.href = 'index.html'
            }
            localStorage.removeItem(`${username}cartItems`)
            localStorage.removeItem(`${username}cartCount`)
            localStorage.setItem(`${username}orderMade`, true)
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
    //cart page
    let b;
    let totalPrice = 0;
    // let totalPrice = localStorage.getItem('currentPrice');
    let { log } = console;
    cost = 0;
    let addComma = (val) => {
        b = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    let priceReg = (orderObj) => {
        let quantity;
        for (let i = 0; i < orderObj.length; i++) {
            let price = orderObj[i].itemPrice;
            let codeName = orderObj[i].codeName;
            if(localStorage.getItem('logged')){
                quantity = Number(localStorage.getItem(`${username}${codeName}`));
            } else {
                quantity = Number(localStorage.getItem(`${codeName}`));
            }
            
            // alert(quantity)
            // let myPrice = price.slice(1,price.length);
            myPrice = price.replace(/₦/g, '');
            myPrice = parseFloat(myPrice.replace(/,/g, ''));
            totalPrice += myPrice * quantity;
            addComma(totalPrice);
            cost = b;
        }

        $('#payAmount').html(`Pay NGN${cost}`);
        $('#payBtnAmount').html(`₦${cost}`);
        $('#totalCost').html(`₦${cost}`);
        // if (!localStorage.getItem('currentPrice')) {
        //     $('#totalCost').html(`₦${cost}`);
        // }

    }

    if (localStorage.getItem(`${username}`)) {
        let payerId = JSON.parse(localStorage.getItem(`${username}`));
        $('#payerId').html(payerId.userId)
        if (localStorage.getItem(`${username}cartItems`)) {
            let orderObj = JSON.parse(localStorage.getItem(`${username}cartItems`));
            priceReg(orderObj);
        }
    } else if (localStorage.getItem(`cartItems`)) {
        let orderObj = JSON.parse(localStorage.getItem(`cartItems`));
        priceReg(orderObj);

    }

    //-----------------------------------

    //For signout button
    $('#signOutBtn').on('click', () => {
        localStorage.removeItem('logged');
        localStorage.removeItem('presentUser');
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
        username = username.toLowerCase();
        let passVali = /(?=.*[0-9])(?=.*[-_@])(?=.*[A-Z])[a-zA-Z0-9@-_@]{8,16}$/;
        let test = passVali.test(password);
        // console.log(test, password);@""
        let mailVali = /[a-zA-Z0-9]{3,15}[@]{1}[a-zA-Z]{3,10}[.]{1}[a-zA-Z]{2,4}$/;
        let mailCheck = mailVali.test(email);
        if (test && mailCheck) {
            let userDetails = {
                userPass: password,
                userEmail: email,
                userId: username,
            }
            // console.log(userDetails);
            localStorage.setItem(`${username}`, JSON.stringify(userDetails));
            localStorage.setItem('logged', true);
            localStorage.setItem('presentUser', `${username}`);
            alert('welcome! ' + username);
            $('#myModal').modal('hide');
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
    //Cart update
    $('body').on('click', (e) => {
        let cartCount = $("#cartUpdate").html();
        let codeName;  
        if (e.target.classList.contains('plusBtn')) {
            codeName = e.target.nextElementSibling.getAttribute('name');
            window.location.href = 'cart.html';
            let a = e.target.previousElementSibling.innerText;
            let minusbtn = e.target.previousElementSibling.previousElementSibling;
            a++;
            e.target.previousElementSibling.innerText = a;
            g = parseFloat(e.target.previousElementSibling.innerText);
            if(localStorage.getItem('logged')){
                localStorage.setItem(`${username}${codeName}`, g);
            } else{
                localStorage.setItem(`${codeName}`, g);
            }
            
            h = parseFloat(cartCount);
            cartCount = 1 + h;
            $("#cartUpdate").html(cartCount);
            if(localStorage.getItem('logged')){
                localStorage.setItem(`${username}cartCount`,cartCount);
                localStorage.setItem(`${username}orderedCount`,cartCount);
            } else{
                localStorage.setItem('cartCount',cartCount);
                localStorage.setItem('orderedCount',cartCount);
            }
            
            minusbtn.removeAttribute('disabled');
            let priceFunc = () => {
                let k = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
                aPrice = k.replace(/₦/g, '');
                bPrice = aPrice.replace(/,/g, '');
                bPrice = parseFloat(bPrice);
                // totalPrice = (totalPrice * (h+1))-myPrice;
                totalPrice += bPrice;
                addComma(totalPrice);
                cost = b;
            }
            priceFunc();
        } else if (e.target.classList.contains('minusBtn')) {
            let a = e.target.nextElementSibling.innerText;
            if (a > 1) {
                a--;
                // $("#cartUpdate").innerHTML -= a;
                e.target.nextElementSibling.innerText = a;
                g = parseFloat(e.target.nextElementSibling.innerText);
                h = parseFloat(cartCount);
                cartCount = h - 1;
                $("#cartUpdate").html(cartCount);
                if(localStorage.getItem('logged')){
                    localStorage.setItem(`${username}cartCount`,cartCount);
                } else {
                    localStorage.setItem('cartCount',cartCount);
                }
               
               
                //add ordered count
            } else if (a == '1') {
                e.target.setAttribute('disabled', true);
            }
        }

    })
    //-------------------------------------
    /*Things to do
    make the minus work
    make the minus btn active after plus
    update all for logged in user.
    make all pages links active
    optimize your code
    */
})(jQuery);