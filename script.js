let bagItems;
onLoad();
function onLoad() {
  let bagItemStr = localStorage.getItem("bagItems");
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayBagicon();
  displayItemsOnHomePage();
}

function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector(".items_container");
  console.log(itemsContainerElement);
  if (!itemsContainerElement) {
    return;
  }
  let innerHTML = "";

  items.forEach((item) => {
    innerHTML += `      <div class="item_container">
  <img class="item_img" src="${item.image}"alt="">
  <div class="reting">
  ${item.rating.stars} ⭐ |${item.rating.count} 
  </div>
  <div class="company">
   ${item.company}
  </div>
  <div class="item_name">
  ${item.item_name}
  </div>
  <div class="price">
    <span class="current_price">Rs ${item.current_price}</span>
    <span class="Orignal_price">${item.original_price}</span>
    <span class="discount">${item.discount_percentage}%</span>
  </div>
  <button class="btn_add_bag" onclick="addtobag(${item.id})">Add to Bag</button>
  </div>`;
  });

  itemsContainerElement.innerHTML = innerHTML;
}

//------------------------------------------------bag

function addtobag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagicon();
}

function displayBagicon() {
  let bagitemcount = document.querySelector(".bag_item_count");
  if (bagItems.length > 0) {
    bagitemcount.style.visibility = "visible";
    bagitemcount.innerText = bagItems.length;
  } else {
    bagitemcount.style.visibility = "hidden";
  }
}
