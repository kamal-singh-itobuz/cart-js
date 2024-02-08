let data = JSON.parse(localStorage.getItem('fav') || '[]');
console.log(data);
const content = document.getElementById("main");
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