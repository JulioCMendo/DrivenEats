let selections = 0;

function processOrder(action){
  if(action === "confirm"){

  }
  else if(action === "cancel"){
    const confirmOrder = document.querySelector(".confirm-order");
    const container = document.querySelector(".container");
    const body = document.body;
    if (!confirmOrder.classList.contains("display-none")) {
      confirmOrder.classList.add("display-none");
    }
    if (container.classList.contains("disable-menu")) {
      container.classList.remove("disable-menu");
    }
    if (body.classList.contains("disable-scroll")) {
      body.classList.remove("disable-scroll");
    }
  }
}

function makeOrder(){
  const confirmOrder = document.querySelector(".confirm-order");
  const container = document.querySelector(".container");
  const body = document.body;
  if (confirmOrder.classList.contains("display-none")) {
    confirmOrder.classList.remove("display-none");
  }
  if (!container.classList.contains("disable-menu")) {
    container.classList.add("disable-menu");
  }
  if (!body.classList.contains("disable-scroll")){
    body.classList.add("disable-scroll");
  }
}

function enableButton(action) {
  const orderButton = document.getElementById("order-button");
  if (action === "enable") { 
    orderButton.innerHTML = "<p>Fechar pedido</p>";
    orderButton.style.background = '#32B72F';
    orderButton.children[0].classList.add("bold");
    orderButton.classList.remove("disable-click");
    orderButton.classList.add("clickable");
  }

  else if (action === "disable") {
    orderButton.innerHTML = "<p>Selecione os 3 itens para fechar o pedido</p>";
    orderButton.style.background = '#CBCBCB';
    if (orderButton.children[0].classList.contains("bold")) {
      orderButton.children[0].classList.remove("bold");
    }
    if (!orderButton.classList.contains("disable-click")){
      orderButton.classList.add("disable-click");
      orderButton.classList.remove("clickable");
    }
  }
}

function getTotal(){
  const getOrder = document.querySelector(".new-order");
  const displayTotal = document.getElementById("total");
  const prices = getOrder.querySelectorAll(".item-price");
  let total = 0;
  for(let price of prices){
    total += parseFloat(price.innerHTML.replace(/\$|R/g, "").replace(/,/g,'.'));
  }
  displayTotal.innerHTML ="<p>TOTAL</p>" + "<p>R$" + total.toFixed(2).replace(/\./g,',') + "</p>";
}

function updateSelections(value, itemName, itemPrice, menu){
  const newMenu = "." + menu;

  const newOrder = document.querySelector(".new-order");
  const nameClone = itemName.cloneNode(true);
  const priceClone = itemPrice.cloneNode(true);
  priceClone.innerHTML = priceClone.innerHTML.replace(/\$|R/g, "");

  let newDiv = document.createElement('div');
  newDiv.classList.add("flex-row", "between", menu);
  newDiv.appendChild(nameClone);
  newDiv.appendChild(priceClone);

  if (value === "add") { 
    selections++;
    newOrder.appendChild(newDiv);
  }
  else if (value === "sub") {
    selections--;
    newOrder.querySelector(newMenu).remove();
  }

  if (selections === 3){
    enableButton("enable");
    getTotal();
  }
  else if (selections < 3){
    enableButton("disable");
  }
}

function selectOne(selection, menu) {
  const menu1 = document.getElementById("menu-1");
  const menu2 = document.getElementById("menu-2");
  const menu3 = document.getElementById("menu-3");

  const itemName = selection.querySelector(".item-name");
  const itemPrice = selection.querySelector(".item-price");

  if(menu === "menu-1") {
    for (const child of menu1.children) {
      const selected = child.classList.contains('selected');
      if (selected === true  && child === selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none');
        updateSelections('sub',itemName,itemPrice,"menu-1");
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none');
        updateSelections('sub',itemName,itemPrice,"menu-1");
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.children[0].classList.remove('display-none');
        updateSelections('add',itemName,itemPrice,"menu-1");
      }
    }
  }

  else if(menu === "menu-2") {

    for (const child of menu2.children) {
      const selected = child.classList.contains('selected');
      if (selected === true  && child === selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none');
        updateSelections('sub',itemName,itemPrice,"menu-2");
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none');
        updateSelections('sub',itemName,itemPrice,"menu-2");
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.children[0].classList.remove('display-none');
        updateSelections('add',itemName,itemPrice,"menu-2");
      }
    }
  }

  else if(menu === "menu-3") {

    for (const child of menu3.children) {
      const selected = child.classList.contains('selected');
      if (selected === true  && child === selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none');
        updateSelections('sub',itemName,itemPrice,"menu-3");
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none');
        updateSelections('sub',itemName,itemPrice,"menu-3");
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.children[0].classList.remove('display-none');
        updateSelections('add',itemName,itemPrice,"menu-3");
      }
    }
  }

}