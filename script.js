'use strict';

const admPass = 'TakeNotBake';
const adminAddProduct = document.getElementById('adminAddPro');
const adminDeleteProducts = document.querySelectorAll(".text-danger");
const adminDeleteAllProducts = document.querySelector(".btn.btn-danger");
const youAdmin = document.getElementById('youAdmin');
const buyBut = document.querySelectorAll(".btn.btn-success");
const basketGoods = document.querySelector(".art");
const basketPrices = document.querySelector(".pri");
const resetBasketBut = document.querySelector(".btn.btn-light");
const finalMessageString = 'Your order totalling <span style="color:blue" id="final"> </span> is ready. Expect your delivery in aproximately <span style="color:orange" id="time"> </span> minutes.'
let purBasket = [];

function buyProd() {
  let itemPrice = this.previousElementSibling.innerHTML.replace(/^\D+|\D+$/g, "");
  let itemName = this.previousElementSibling.innerHTML.replace('Name: ','').replace(' Price:','').replace(' lv','').replace(itemPrice,'');

  addToBasket(itemName, itemPrice);
  basketDisplay();
}

function addToBasket(purchase, price){
  purBasket.push({[purchase]:price});
}

function basketDisplay(){
  while (basketGoods.children.length > 1) {
    basketGoods.firstElementChild.remove();
  }
  while (basketPrices.children.length > 1) {
    basketPrices.firstElementChild.remove();
  }
  let totalPrice = 0;
  for (let i of purBasket) {
    let curGoodLi = document.createElement('li');
    let curPriceLi = document.createElement('li');
    curGoodLi.className = "list-group-item list-group-item-primary d-flex justify-content-between align-items-center";
    curPriceLi.className = "list-group-item list-group-item-primary text-right"
    curGoodLi.innerHTML = String(Object.keys(i)).trim();
    basketGoods.prepend(curGoodLi);
    curPriceLi.innerHTML = String(Object.values(i)).trim();
    basketPrices.prepend(curPriceLi);
    totalPrice += Number(String(Object.values(i)).trim());
    basketPrices.lastElementChild.innerHTML = String(totalPrice)+' lv'
    //console.log(totalPrice);
    //console.log(String(Object.keys(i)).trim());
    //console.log(String(Object.values(i)).trim());
  }
}

function makeInvisible(element){
  element.classList.add('invisible');
}

function makeVisible(element){
  element.classList.remove('invisible');
}

function getAdminPass(){
  return prompt('Please input password');
}

function checkAdmin(pass){
  if (pass == admPass) return true;
  return false;
}

function displaySuccess(){
  alert('Thank you! You can use the admin functions for adding/deleting products now')
}

function displayError(){
  alert('Wrong password! Try again!')
}

function clearBasket(){
  purBasket.length = 0;
  while (basketGoods.children.length > 1) {
    basketGoods.firstElementChild.remove();
  }
  while (basketPrices.children.length > 1) {
    basketPrices.firstElementChild.remove();
  }
  basketPrices.lastElementChild.innerHTML = '0 lv';
}


youAdmin.addEventListener('click', function () {
  if (checkAdmin(getAdminPass())) {
    displaySuccess();
    makeVisible(adminAddProduct);
    adminDeleteProducts.forEach(makeVisible);
    makeVisible(adminDeleteAllProducts);
    } else {
        displayError();
    }
  }
)

function finalPurchaseSh(){
  if (basketPrices.lastElementChild.innerHTML != '0 lv'){
    $(final).text(basketPrices.lastElementChild.innerHTML);
    $(time).text(randomNumber(14,61));
  } else {
    $(finalMessage).html('You have not choosen any product. Please try again!')
  }
}

function finalPurchaseHi(){
  $(finalMessage).html(finalMessageString);
}

// Function to generate random number  
function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min);
}  

buyBut.forEach(el => el.addEventListener('click', buyProd));
resetBasketBut.addEventListener('click', clearBasket);
makeInvisible(adminAddProduct);
makeInvisible(adminDeleteAllProducts);
adminDeleteProducts.forEach(makeInvisible);
$('#exampleModal2').on('show.bs.modal',finalPurchaseSh);
$('#exampleModal2').on('hidden.bs.modal',finalPurchaseHi);