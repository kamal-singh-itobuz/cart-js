let data = JSON.parse(localStorage.getItem('fav') || '[]');
let size = data.length;
const content = document.getElementById("mainCart");
const header = document.getElementsByClassName('header')[0];

let homeLink = document.createElement('a');
homeLink.setAttribute('href', '../index.html');
homeLink.innerText = "Home";
header.appendChild(homeLink);


function qtyProduct(ind) {
    data = JSON.parse(localStorage.getItem('fav') || '[]');
    return data[ind].quantity;
}


function emptyCart() {
    let emptyDiv = document.createElement("div");
    emptyDiv.setAttribute('class', 'empty-div');
    let para = document.createElement('p');
    para.innerText = "You don't have any Item in cart. Please add some items...";
    homeLink.innerText = "Go to home ->";

    emptyDiv.appendChild(para);
    emptyDiv.appendChild(homeLink);
    content.appendChild(emptyDiv);
}


if (size === 0) {
    totalAmountSection.style.display = "none";
    emptyCart();
}

for (let i = 0; i < size; i++) {
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
    let priceValue = document.createElement('span');
    priceValue.setAttribute('class', 'price');
    priceValue.innerText = tShirt.price * qtyProduct(i);
    tshirtPrice.innerText = "Rs. ";
    tshirtPrice.appendChild(priceValue);
    let tshirtBtn = document.createElement("button");
    tshirtBtn.innerText = "Add to Cart";
    tshirtBtn.setAttribute("class", "add-cart-btn");

    let plusMinusDiv = document.createElement('div');
    plusMinusDiv.setAttribute('class', 'plus-minus-btn');
    let plus = document.createElement('button');
    plus.setAttribute('class', 'plus-btn');
    plus.innerText = "+";
    // quantity available in cart
    let qty = qtyProduct(i);
    let counter = document.createElement('span');
    counter.setAttribute('class', 'counter');
    counter.innerText = qty; ////////////////
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

function totalMoney() {
    let ans = 0;
    data.forEach(element => {
        ans += element.price;
    });
    return ans;
}

const totalAmountSection = document.getElementsByClassName('total-amount-section')[0];
const totalAmountBtn = document.getElementById('total-amount-btn');
let totalAmountText = document.createElement('p');
totalAmountText.setAttribute('class', 'amount-text');
totalAmountText.innerText = "Total Amount to pay : ";
let totalAmount = document.createElement('span');
totalAmount.setAttribute('class', 'amount');
totalAmountText.appendChild(totalAmount);
totalAmountSection.appendChild(totalAmountText);

totalAmountBtn.addEventListener('click', () => {
    let amount = totalMoney();
    totalAmount.innerText = amount;
});


const card = document.getElementsByClassName("card");
const plusBtn = document.getElementsByClassName("plus-btn");
const minusBtn = document.getElementsByClassName("minus-btn");
const counter = document.getElementsByClassName("counter");
const price = document.getElementsByClassName("price");


function addToLocalStorage(ind) {
    data = JSON.parse(localStorage.getItem('fav') || '[]');
    let indToUpdate = ind;
    let qty = data[indToUpdate].quantity + 1;
    data[indToUpdate].quantity = qty;
    counter[ind].innerText = qty;
    let pricePerPeice = Number(price[ind].innerText)/(qty-1);
    price[ind].innerText = Number(price[ind].innerText) + pricePerPeice;
    data[indToUpdate].price = Number(price[ind].innerText);
    let stringified = JSON.stringify(data);
    localStorage.setItem("fav", stringified);
}
function deleteFromLocalStorage(ind) {
    data = JSON.parse(localStorage.getItem('fav') || '[]');
    let indToDelete = ind;
    let qty = data[indToDelete].quantity - 1;
    if (qty === 0) {
        data.splice(indToDelete, 1);
        card[ind].style.display = "none";
    }
    else {
        data[indToDelete].quantity = qty;
        counter[ind].innerText = qty;
        let pricePerPeice = Number(price[ind].innerText)/(qty+1);
        price[ind].innerText = Number(price[ind].innerText) - pricePerPeice;
        data[indToDelete].price = Number(price[ind].innerText);
    }
    
    size = data.length;
    if (size === 0) {
        totalAmountSection.style.display = "none";
        emptyCart();
    }
    let stringified = JSON.stringify(data);
    localStorage.setItem("fav", stringified);
}

for (let i = 0; i < size; i++) {
    plusBtn[i].addEventListener('click', () => {
        addToLocalStorage(i);
    })
    minusBtn[i].addEventListener('click', () => {
        deleteFromLocalStorage(i);
    })
}