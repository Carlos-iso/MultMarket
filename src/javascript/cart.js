function calcularTotal() {
	const totalDiv = document.querySelector(".total_carrinho");
	const checkboxes = document.querySelectorAll(".checkbox_item:checked");

	let total = 0;

	const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

	checkboxes.forEach((checkbox) => {
		const id = Number(checkbox.dataset.id);
		const item = carrinho.find((item) => item.id === id);
		if (item) total += item.price;
	});

	if (totalDiv) {
		totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
	}
}

function renderCarrinho() {
	const list = document.querySelector("#ul-cart");
	const totalDiv = document.querySelector(".total_carrinho");
	const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

	if (!list) {
		console.error("Elemento 'ul' não encontrado no DOM.");
		return;
	}

	list.innerHTML = "";

	carrinho.forEach((item) => {
		const li = document.createElement("li");
		li.className = "iten-cart";
		li.innerHTML = `
        <div class="item-esquerda">
        <input type="checkbox" class="checkbox_item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="item-info">
            <p>${item.title}</p>
            <p class="item-preco">R$ ${item.price.toFixed(2)}</p>
        </div>
        <button class="lixeira" data-id="${item.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
        `;
		list.appendChild(li);
	});
	calcularTotal();
}

function setupCartEvents() {
	const list = document.querySelector("#ul-cart");

	list.addEventListener("click", function (event) {
		if (event.target.closest(".lixeira")) {
			const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

			const id = event.target.closest(".lixeira").dataset.id;
			const index = carrinho.findIndex((item) => item.id === Number(id));

			if (index !== -1) {
				carrinho.splice(index, 1);
				localStorage.setItem("carrinho", JSON.stringify(carrinho));
				renderCarrinho();
			}
		}
	});

	list.addEventListener("change", function (event) {
		if (event.target.classList.contains("checkbox_item")) {
			calcularTotal();
		}
	});
}

async function openCart() {
	await loadApp("cart");
	setupCartEvents();
	renderCarrinho();
}
