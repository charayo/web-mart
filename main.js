(function ($) {
    "use strict"
    $(window).on('load', function () {
        $('#preloader-active').delay(1550).fadeOut('slow');
        $('body').delay(450).css({ 'overflow': 'visible' });
    });


    $("#toggleTim").on("click", () => {
        $('#toggleTim').removeClass('fa-toggle-off','fa');
    })
    $("#formCancelBtn").on("click",()=>{
        // window.location.href="index.html";
        alert('closed');
        window.location.href="index.html";
    })
    $("#formSignupBtn").click(()=>{
        alert('Succesfull Sign-up; Welcome!')
        window.location.href="index.html";
    })
    $("#crtAccBtn").click(()=>{
        window.location.href="signup.html";
    })





})(jQuery);
//   let toggleBtn = ()=>{

//   }