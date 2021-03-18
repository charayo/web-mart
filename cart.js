(function ($) {
    let cart = [];

    if (localStorage.getItem('cartItems')) {
        cart = JSON.parse(localStorage.getItem('cartItems'));
        document.getElementById("cartVal").innerHTML = `${cart.length} ITEMS`;
        for (let index = 0; index < cart.length; index++) {
            document.getElementById("cartJsTarg").innerHTML += (`
            <div class="container card mt-2 mb-3 shadow-lg w-50" id="cartCard${index}">
                <div class="">
                    <div class="row mb-2 text-center">
                        <div class="col-md-4 text-cen" id="imageTarget">
                            <img id="imageId" class="w-75 mt-4" src="${cart[index].itemImgSrc}" alt="product-image">
                        </div>
                        <div class="col-md-8" id="descrTarget">
                            <div class="pt-4">
                                <h4 class="">${cart[index].itemName}</h4>
                                <p class="">${cart[index].itemPrice}</p>
                                <hr>
                                <input type="button" value="Remove from Cart" class="btn btn-danger removeFromCart" id="removeFromCart">
                            </div>                                
                        </div>
                    </div>
                </div>
            </div>
        `)
        }
    }
    // console.log(cart);
    let rmvBtn = document.querySelectorAll(".removeFromCart");
    rmvBtn.forEach((element,index) => {        
        element.addEventListener('click', () => {
            cart.splice(index,1);
            localStorage.setItem("cartItems", JSON.stringify(cart));
            localStorage.setItem("orderedItems", JSON.stringify(cart));
            $(`#cartCard${index}`).remove();
             
            cartNum = localStorage.getItem('cartCount');
            localStorage.removeItem('cartCount')
            cartNum--;
            document.getElementById("cartVal").innerHTML = `${cartNum} ITEM(S)`; 
            localStorage.setItem("cartCount", cartNum);
            localStorage.setItem("orderedCount", cartNum);
            $("#cartUpdate").html(cartNum);
            console.log(cart);
        })
        var b = querySelectorAll('.post');
        var image = element

        let array = [];
        $('#postImg')
        let postDetails= {
            postImage:image,
        }
    });
})(jQuery);