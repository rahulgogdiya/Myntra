let bagItemObjects;

onLode();

function onLode() {
  lodebagItemObject();
  displayBagItem();
  displayBagsummry();
}

function lodebagItemObject() {
  console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBagItem() {
  let containerElement = document.querySelector(".bag-items-container");

  let innerHTML = "";
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHtml(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  console.log("deleted");
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  lodebagItemObject();
  displayBagicon();
  displayBagItem();
  displayBagsummry()
}

function generateItemHtml(item) {
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}" alt="" />
    </div>

    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>

      <div class="return-period">
        <span class="return-period-days">
          ${item.return_period} Days <span>return available</span>
        </span>
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>

    </div>
    <div class="remove-from-cart" onClick="removeFromBag(${item.id})">X</div>
  </div>
    `;
}

// ---------------------------------------------
function displayBagsummry() {
  let bagsummryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemObjects.length;
  let Totalmrp = 0;
  let totalDiscount = 0;
 

  bagItemObjects.forEach(bagitem => {
    Totalmrp += bagitem.original_price;
    totalDiscount += bagitem.original_price - bagitem.current_price;
  })
  const convenience = 99;

  let finalpayment = Totalmrp - totalDiscount + convenience;

  bagsummryElement.innerHTML = `   <div class="bag-details-container">
  <div class="price-header">Price Details (${totalItem} items)</div>
  <div class="price-item">
    <span class="price-item-tag">Tpotal MRP</span>
    <span class="price-item-value priceDetail-base-discount ">₹ ${Totalmrp}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on mrp</span>
    <span class="price-item-value priceDetail-base-discount "> - ₹ ${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Conversion Fee</span>
    <span class="price-item-value priceDetail-base-discount "> ₹ ${convenience}</span>
  </div>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value priceDetail-base-discount ">₹ ${finalpayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div>PLACE ORDER</div>
</button>`;
}
