function addHTML(data, content) {
    for (let i = 0; i < data.length; i++) {
        const tShirt = data[i];
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");
        let cardInnerDiv = document.createElement("div");
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", tShirt.picture);
        imgTag.setAttribute("alt", "tshirt image");
        cardInnerDiv.appendChild(imgTag);

        let descpDiv = document.createElement("div");
        descpDiv.setAttribute("class", "description");
        let tshirtTitle = document.createElement("p");
        tshirtTitle.innerText = tShirt.name;
        let tshirtPrice = document.createElement("p");
        tshirtPrice.innerText = "Rs. " + tShirt.price;
        let tshirtBtn = document.createElement("button");
        tshirtBtn.innerText = "Add to Cart";
        tshirtBtn.setAttribute("class", "add-cart-btn");

        let plusMinusDiv = document.createElement('div');
        plusMinusDiv.setAttribute('class', 'plus-minus-btn');
        let plus = document.createElement('button');
        plus.setAttribute('class', 'plus-btn');
        plus.innerText = "+";
        let counter = document.createElement('span');
        counter.setAttribute('class', 'counter');
        counter.innerText = "1";
        let minus = document.createElement('button');
        minus.setAttribute('class', 'minus-btn');
        minus.innerText = "-";
        plusMinusDiv.appendChild(plus);
        plusMinusDiv.appendChild(counter);
        plusMinusDiv.appendChild(minus);

        descpDiv.appendChild(tshirtTitle);
        descpDiv.appendChild(tshirtPrice);
        descpDiv.appendChild(tshirtBtn);
        descpDiv.appendChild(plusMinusDiv);

        cardInnerDiv.appendChild(descpDiv);

        cardDiv.appendChild(cardInnerDiv);

        content.appendChild(cardDiv);
    }
}
import { dataTshirt } from "./data.mjs";
let data = dataTshirt();
const content = document.getElementById("main");

addHTML(data, content);

const countInCart = document.getElementsByClassName("count-in-cart")[0];
const AddToCartBtn = document.getElementsByClassName("add-cart-btn");
const plusMinusBtn = document.getElementsByClassName("plus-minus-btn");
const plusBtn = document.getElementsByClassName("plus-btn");
const minusBtn = document.getElementsByClassName("minus-btn");
const counter = document.getElementsByClassName("counter");

let cartObjs = []; // an array of cards which is added to cart
function addToLocalStorage(ind) {
    cartObjs = JSON.parse(localStorage.getItem('fav') || '[]');
    let objId = data[ind].index;
    let indToUpdate = cartObjs.findIndex((ele) => ele.index === objId);
    if (indToUpdate === -1) {
        let obj = {
            index: objId,
            picture: data[ind].picture,
            name: data[ind].name,
            price: data[ind].price,
            quantity: 1,
        }
        cartObjs.push(obj);
        counter[ind].innerText = 1;
    }
    else {
        let qty = cartObjs[indToUpdate].quantity + 1;
        cartObjs[indToUpdate].quantity = qty;
        counter[ind].style.display = "block";
        counter[ind].innerText = qty;
    }
    counter[ind].style.display = "block";
    countInCart.innerText = cartObjs.length;
    let stringified = JSON.stringify(cartObjs);
    localStorage.setItem("fav", stringified);
}
function deleteFromLocalStorage(ind) {
    cartObjs = JSON.parse(localStorage.getItem('fav') || '[]');
    let objId = data[ind].index;
    let indToDelete = cartObjs.findIndex((ele) => ele.index === objId);
    if (indToDelete < 0) return;
    let qty = cartObjs[indToDelete].quantity - 1;
    if (qty === 0) {
        cartObjs.splice(indToDelete, 1);
        plusMinusBtn[ind].style.display = "none";
        AddToCartBtn[ind].style.display = "block";

    }
    else {
        cartObjs[indToDelete].quantity = qty;
        counter[ind].innerText = qty;
    }
    countInCart.innerText = cartObjs.length;
    let stringified = JSON.stringify(cartObjs);
    localStorage.setItem("fav", stringified);
}

cartObjs = JSON.parse(localStorage.getItem('fav') || '[]');
countInCart.innerText = cartObjs.length;

for (let i = 0; i < data.length; i++) {
    countInCart.innerText = cartObjs.length;
    AddToCartBtn[i].addEventListener('click', () => {
        addToLocalStorage(i);
        AddToCartBtn[i].style.display = "none";
        plusMinusBtn[i].style.display = "flex";
    })
    plusBtn[i].addEventListener('click', () => {
        addToLocalStorage(i);
    })
    minusBtn[i].addEventListener('click', () => {
        deleteFromLocalStorage(i);
    })
}

export default addHTML;