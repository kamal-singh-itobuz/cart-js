import {dataTshirt} from "./data.mjs";
let data = dataTshirt();
console.log("Hello")
const content = document.getElementById('main');

for(let i=0; i<data.length; i++) {
    const tShirt = data[i];
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    let cardInnerDiv = document.createElement('div');
    let imgTag = document.createElement('img');
    imgTag.setAttribute('src', tShirt.picture);
    imgTag.setAttribute('alt', "tshirt image");
    cardInnerDiv.appendChild(imgTag);

    let descpDiv = document.createElement('div');
    let tshirtTitle = document.createElement('h3');
    tshirtTitle.innerText = tShirt.name;
    let tshirtPrice = document.createElement('p');
    tshirtPrice.innerText = tShirt.price;
    let tshirtBtn = document.createElement('button');
    tshirtBtn.innerText = 'Add to Cart';
    tshirtBtn.setAttribute('class', 'add-cart-btn');
    descpDiv.appendChild(tshirtTitle);
    descpDiv.appendChild(tshirtPrice);
    descpDiv.appendChild(tshirtBtn);

    cardInnerDiv.appendChild(descpDiv);

    cardDiv.appendChild(cardInnerDiv);

    content.appendChild(cardDiv);

}

