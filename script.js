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

function updateSelections(value){
  if (value === "add") { 
    selections++;
  }
  else if (value === "sub") {
    selections--;
  }
  if (selections === 3){
    enableButton("enable");
  }
  else if (selections < 3){
    enableButton("disable");
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

function selectOne(selection, menu) {
  const menu1 = document.getElementById("menu-1");
  const menu2 = document.getElementById("menu-2");
  const menu3 = document.getElementById("menu-3");

  if(menu === 'menu-1') {
    for (const child of menu1.children) {
      const selected = child.classList.contains('selected');
      if (selected === true  && child === selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none')
        updateSelections('sub');
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none')
        updateSelections('sub');
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.children[0].classList.remove('display-none')
        updateSelections('add');
      }
    }
  }

  else if(menu === 'menu-2') {

    for (const child of menu2.children) {
      const selected = child.classList.contains('selected');
      if (selected === true  && child === selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none')
        updateSelections('sub');
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none')
        updateSelections('sub')
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.children[0].classList.remove('display-none')
        updateSelections('add')
      }
    }
  }

  else if(menu === 'menu-3') {

    for (const child of menu3.children) {
      const selected = child.classList.contains('selected');
      if (selected === true  && child === selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none')
        updateSelections('sub')
      }
      else if (selected === true && child !== selection) {
        child.classList.remove('selected');
        child.children[0].classList.add('display-none')
        updateSelections('sub')
      }
      else if (selected === false && child === selection) {
        child.classList.add('selected');
        child.children[0].classList.remove('display-none')
        updateSelections('add')
      }
    }
  }

}