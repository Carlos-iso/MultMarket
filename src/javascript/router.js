const components = {
	header: "/pages/header.html",
	cart: "/pages/cart.html",
	home: "/index.html",
	catalog: "/pages/catalog.html",
	profile: "/pages/profile.html",
	footer: "/pages/footer.html",
};

async function loadHeader(page) {
	const path = components[page];
	if (!path) {
		document.querySelector("#header").innerHTML = "<h1>Página não encontrada</h1>";
		return;
	}
	try {
		const response = await fetch(path);
		const html = await response.text();
		document.querySelector("#header").innerHTML = html;
	} catch (error) {
		console.error("Erro ao carregar header:", error);
	}
}

async function loadApp(page) {
	const path = components[page];
	if (!path) {
		document.querySelector("#app").innerHTML = "<h1>Página não encontrada</h1>";
		return;
	}
	try {
		const response = await fetch(path);
		const html = await response.text();
		document.querySelector("#app").innerHTML = html;
	} catch (error) {
		console.error("Erro ao carregar página:", error);
	}
}

async function loadFooter(page) {
	const path = components[page];
	try {
		const response = await fetch(path);
		const html = await response.text();
		document.querySelector("#footer").innerHTML = html;
	} catch (error) {
		console.error("Erro ao carregar footer:", error);
	}
}
