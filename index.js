

 // ADD CART FUNCTION

 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  if (cartItemsContainer && cartTotalEl) {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      li.innerHTML = `
        ${item.name} - ₹${item.price}
        <button class="remove-item  btn-sm" data-index="${index}">❌</button>
      `;

      cartItemsContainer.appendChild(li);
      total += item.price;
    });

    cartTotalEl.textContent = total.toFixed(2);

    // remove button attach here
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
      });
    });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));

      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} added to cart!`);
      updateCart(); // Refresh UI
    });
  });

  updateCart(); // Initial cart load
});

//  remove cart

const removeButtons = document.querySelectorAll(".remove-item");
removeButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const index = parseInt(e.target.getAttribute("data-index"));
    cart.splice(index, 1); // Remove item
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    updateCart(); // Refresh the cart display
  });
});  


//order details


document.getElementById("order-now-btn").addEventListener("click", () => {
  let total = 0;

  // total calculate
  cart.forEach(item => {
    total += item.price;
  });

  // GST 12%
  const gst = total * 0.12;

  //sgst 6%
  const SGST = total * 0.03;

  // Discount 10%
  const discount = total * 0.10;

  // Final Total = total + gst - discount
  const finalTotal = total + gst + SGST - discount;

  // order in alert
  
  alert(`🧾 Order Summary:
---------------------------------
🛍️ Total: ₹${total.toFixed(2)}
🧾 GST (12%): ₹${gst.toFixed(2)}
🧾 SGST (3%): ₹${SGST.toFixed(2)}
🎁 Discount (10%): -₹${discount.toFixed(2)}
---------------------------------
💰 Final Total: ₹${finalTotal.toFixed(2)}
`);
});







