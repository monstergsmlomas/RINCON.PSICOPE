document.addEventListener("DOMContentLoaded", function () {

// Confirmar que el archivo está conectado
console.log("JS cargado correctamente");

// ===== CARRITO =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const checkoutBtn = document.querySelector(".checkout-btn");

// Guardar carrito
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Renderizar carrito
function renderCart() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>$${item.price.toLocaleString()}</p>
      </div>
      <button class="remove-item" data-index="${index}">✖</button>
    `;

    cartItemsContainer.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerHTML = `<strong>Total: $${total.toLocaleString()}</strong>`;

  cartItemsContainer.appendChild(totalDiv);
}

// Agregar producto
buttons.forEach(button => {
  button.addEventListener("click", () => {

    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: parseInt(button.dataset.price)
    };

    cart.push(product);
    saveCart();
    renderCart();

    const toast = document.getElementById("toast");
    toast.textContent = "Producto agregado al carrito 🛒";
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  });
});

// Eliminar producto
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("remove-item")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }
});

// ===== Abrir y cerrar carrito =====

const cartButton = document.querySelector(".cart-button");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");

if (cartButton && cartPanel) {
  cartButton.addEventListener("click", () => {
    cartPanel.classList.add("active");
  });
}

if (closeCart && cartPanel) {
  closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
  });
}

// ===== Scroll botón hero =====

const botonCTA = document.querySelector('.cta');

if (botonCTA) {
  botonCTA.addEventListener('click', function () {
    const seccionProductos = document.getElementById('productos');
    if (seccionProductos) {
      seccionProductos.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

// Render inicial
renderCart();

// ===== Checkout simulado =====

const checkoutModal = document.querySelector(".checkout-modal");
const confirmCheckout = document.querySelector(".confirm-checkout");
const closeCheckout = document.querySelector(".close-checkout");

if (checkoutBtn && checkoutModal) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }
    checkoutModal.classList.add("active");
  });
}

if (closeCheckout && checkoutModal) {
  closeCheckout.addEventListener("click", () => {
    checkoutModal.classList.remove("active");
  });
}

if (confirmCheckout) {
  confirmCheckout.addEventListener("click", () => {

    const name = document.getElementById("customer-name").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const payment = document.getElementById("payment-method").value;

    if (!name || !email || !payment) {
      alert("Por favor completá todos los campos.");
      return;
    }

    checkoutModal.classList.remove("active");

    alert("🎉 Compra realizada con éxito (simulación)");

    cart = [];
    saveCart();
    renderCart();
  });
}

// ===== Rotación automática testimonios =====

const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;

function showNextTestimonial() {
  testimonials[currentTestimonial].classList.remove("active");

  currentTestimonial++;

  if (currentTestimonial >= testimonials.length) {
    currentTestimonial = 0;
  }

  testimonials[currentTestimonial].classList.add("active");
}

if (testimonials.length > 0) {
  setInterval(showNextTestimonial, 4000);
}

// ===== Modal detalles =====

const detailButtons = document.querySelectorAll(".view-details");
const detailsModal = document.querySelector(".details-modal");
const closeDetails = document.querySelector(".close-details");

const detailsTitle = document.getElementById("details-title");
const detailsDescription = document.getElementById("details-description");
const detailsImage = document.getElementById("details-image");

detailButtons.forEach(button => {
  button.addEventListener("click", () => {

    detailsTitle.textContent = button.dataset.name;
    detailsDescription.textContent = button.dataset.description;
    detailsImage.src = button.dataset.image;

    detailsModal.classList.add("active");
  });
});

if (closeDetails) {
  closeDetails.addEventListener("click", () => {
    detailsModal.classList.remove("active");
  });
}

});
