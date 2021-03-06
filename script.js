let selections = 0;

function processOrder(action){
  if(action === "confirm"){
    // If order is confirmed, create Wpp string with order

    let wpp = "https://wa.me/5599999999999?text=";
    const menuOneName = document.querySelector(".new-order").querySelector(".menu-1").querySelector(".item-name").innerHTML;
    const menuTwoName = document.querySelector(".new-order").querySelector(".menu-2").querySelector(".item-name").innerHTML;
    const menuThreeName = document.querySelector(".new-order").querySelector(".menu-3").querySelector(".item-name").innerHTML;
    const total = document.getElementById("total").children[1].innerHTML;
    let string = "";
    string = "Olá, gostaria de fazer o pedido:\n- Prato: ";
    string += menuOneName;
    string += "\n- Bebida: ";
    string += menuTwoName;
    string += "\n- Sobremesa: ";
    string += menuThreeName;
    string += "\nTotal: ";
    string += total;
    const clientName = prompt("Qual seu nome?");
    const clientAddress = prompt("E qual seu endereço?");
    string += "\n\nNome: "
    string += clientName;
    string += "\nEndereço: ";
    string += clientAddress;
    wpp += encodeURIComponent(string);
    // console.log(string);
    window.open(wpp);
  }

  else if(action === "cancel"){
    //If order is cancelled, hides order summary screen, enables menu

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
    const menu1 = document.querySelector(".menu-1");
    setTimeout(scrollTo, 150, menu1);
  }
}

function openOrderSummary(){
  //Unhides order summary

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
  //Enables button click, swaps html text

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
  //Calculates total

  const getOrder = document.querySelector(".new-order");
  const displayTotal = document.getElementById("total");
  const prices = getOrder.querySelectorAll(".item-price");
  let total = 0;

  //Formats price string to a float
  for(let price of prices){
    total += parseFloat(price.innerHTML.replace(/\$|R/g, "").replace(/,/g,'.'));
  }
  displayTotal.innerHTML ="<p>TOTAL</p>" + "<p>R$" + total.toFixed(2).replace(/\./g,',') + "</p>";
}

function scrollTo(element) {
  // Simple window scroll, offset w/ flex gap

  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop - 17
  });
}

function updateSelections(value, itemName, itemPrice, menu){

  const newMenu = "." + menu;

  const newOrder = document.querySelector(".new-order");

  //Clones relevant nodes with children
  const nameClone = itemName.cloneNode(true);
  const priceClone = itemPrice.cloneNode(true);

  //Formats price string to remove "R$"
  priceClone.innerHTML = priceClone.innerHTML.replace(/\$|R/g, "");

  //Makes a new div with name and price for the selected item
  let newDiv = document.createElement('div');
  newDiv.classList.add("flex-row", "between", menu);
  newDiv.appendChild(nameClone);
  newDiv.appendChild(priceClone);

  //Appends if it is selected
  if (value === "add") { 
    selections++;
    newOrder.appendChild(newDiv);
  }

  //Removes if it is deselected
  else if (value === "sub") {
    selections--;
    newOrder.querySelector(newMenu).remove();
  }


  //After selecting an item, checks if button should be enabled or disabled
  if (selections === 3){
    enableButton("enable");
    getTotal();
  }
  else if (selections < 3){
    enableButton("disable");
  }
}

function selectOne(selection, menu) {
  //Adds styling to selected items, calls function that updates order based on selected or deselected items

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
        child.querySelector("ion-icon").classList.add('display-none');

        updateSelections('sub',itemName,itemPrice,"menu-1");
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.querySelector("ion-icon").classList.add('display-none');

        updateSelections('sub',itemName,itemPrice,"menu-1");
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.querySelector("ion-icon").classList.remove('display-none');

        updateSelections('add',itemName,itemPrice,"menu-1");

        //Scrolls down to next menu
        setTimeout(scrollTo, 150, menu2);
      }
    }
  }

  else if(menu === "menu-2") {

    for (const child of menu2.children) {
      const selected = child.classList.contains('selected');
      if (selected === true  && child === selection) {
        child.classList.remove('selected');
        child.querySelector("ion-icon").classList.add('display-none');

        updateSelections('sub',itemName,itemPrice,"menu-2");
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.querySelector("ion-icon").classList.add('display-none');

        updateSelections('sub',itemName,itemPrice,"menu-2");
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.querySelector("ion-icon").classList.remove('display-none');
        
        updateSelections('add',itemName,itemPrice,"menu-2");
        
        //Scrolls down to next menu
        setTimeout(scrollTo, 150, menu3);
      }
    }
  }

  else if(menu === "menu-3") {

    for (const child of menu3.children) {
      const selected = child.classList.contains('selected');
      if (selected === true  && child === selection) {
        child.classList.remove('selected');
        child.querySelector("ion-icon").classList.add('display-none');

        updateSelections('sub',itemName,itemPrice,"menu-3");
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.querySelector("ion-icon").classList.add('display-none');

        updateSelections('sub',itemName,itemPrice,"menu-3");
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.querySelector("ion-icon").classList.remove('display-none');
        
        updateSelections('add',itemName,itemPrice,"menu-3");
      }
    }
  }

}