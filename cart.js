(function ($) {
    let cart = [];
    let cartQty;
    let buildCartPg = () => {
        document.getElementById("cartVal").innerHTML = `${cart.length} ITEMS`;

        for (let index = 0; index < cart.length; index++) {
            if (localStorage.getItem('logged')) {
                cartQty = localStorage.getItem(`${username}${cart[index].codeName}`);
            } else {
                cartQty = localStorage.getItem(`${cart[index].codeName}`);
            }

            document.getElementById("cartJsTarg").innerHTML += (`
            <div class="container card mt-2 mb-3 shadow-sm w-50" id="cartCard${index}">
                <div class="row mb-2 text-center">
                    <div class="col-md-4 text-cen" id="imageTarget">
                        <img id="imageId" class="w-75 mt-4" src="${cart[index].itemImgSrc}" alt="product-image">
                    </div>
                    <div class="col-md-8" id="descrTarget">
                        <div class="pt-4">
                            <h4 class="">${cart[index].itemName}</h4>
                            <p class="">${cart[index].itemPrice}</p>
                            <hr>
                            <button id="minusBtn" disabled class="btn btn-default minusBtn border mr-1 mybg">&minus;</button><span id="itemNum" class="border pt-1 pr-2 pl-2 pb-2 mt-3 rounded font-weight-bold">${cartQty}</span><button id="plusBtn" class="btn btn-default border ml-1 mybg plusBtn">&plus;</button>
                            <div class="w-100 rmvPar" id="rmvPar" name ='${cart[index].codeName}'><input type="button" value="Remove from Cart" class=" mx-auto btn btn-danger removeFromCart form-control d-block mt-1" id="removeFromCart"></div>
                        </div>                                
                    </div>
                </div>
            </div>
        `)
        }
    }




    if (localStorage.getItem('cartItems')) {
        cart = JSON.parse(localStorage.getItem('cartItems'));
        buildCartPg();
    }
    if (localStorage.getItem('logged')) {
        username = localStorage.getItem('presentUser');
        if (localStorage.getItem(`${username}cartItems`)) {
            cart = JSON.parse(localStorage.getItem(`${username}cartItems`));
            buildCartPg();
        }
    }

    // Removing item from the cart
    let rmvBtn = document.querySelectorAll(".removeFromCart");
    rmvBtn.forEach((element, index) => {
        element.addEventListener('click', () => {

            let toDel = element.parentElement.getAttribute('name');
            if (localStorage.getItem('logged')) {
                localStorage.removeItem(`${username}${toDel}`);
            } else {
                localStorage.removeItem(`${toDel}`);
            }
            cart.splice(index, 1);
            if (localStorage.getItem('logged')) {
                localStorage.setItem(`${username}cartItems`, JSON.stringify(cart));
                localStorage.setItem(`${username}orderedItems`, JSON.stringify(cart));
            } else {
                localStorage.setItem("cartItems", JSON.stringify(cart));
                localStorage.setItem("orderedItems", JSON.stringify(cart));
            }

            $(`#cartCard${index}`).remove();

            
            if (localStorage.getItem('logged')) {
                localStorage.removeItem(`${username}cartCount`);
                cartNum--;
                document.getElementById("cartVal").innerHTML = `${cartNum} ITEM(S)`;
                localStorage.setItem("cartCount", cartNum);
                localStorage.setItem("orderedCount", cartNum);
                $("#cartUpdate").html(cartNum);
                window.location.href = 'cart.html';
            } else {
                cartNum = localStorage.getItem('cartCount');
                // localStorage.removeItem('cartCount');
                cartNum--;
                document.getElementById("cartVal").innerHTML = `${cartNum} ITEM(S)`;
                localStorage.setItem("cartCount", cartNum);
                localStorage.setItem("orderedCount", cartNum);
                $("#cartUpdate").html(cartNum);
                window.location.href = 'cart.html';
            }


        })

    });
    let itemNums = document.querySelectorAll('#itemNum');
    itemNums.forEach(element=>{
        if(element.innerHTML > '1'){
            element.previousElementSibling.removeAttribute('disabled');
        }
    })
})(jQuery);