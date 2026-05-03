const components = {
	header: "/pages/header.html",
	home: "/pages/home.html",
	profile: "/pages/profile.html",
	settings: "/pages/settings.html",
};

async function navigate(page) {
	const path = components[page];

	if (!path) {
		document.getElementById("app").innerHTML = "<h1>Página não encontrada</h1>";
		return;
	}

	try {
		const response = await fetch(path);
		const html = await response.text();

		document.getElementById("app").innerHTML = html;

		// Atualiza URL sem recarregar
		window.history.pushState({}, "", `#${page}`);
	} catch (error) {
		console.error("Erro ao carregar página:", error);
	}
}
async function loadHeader() {
	try {
		const response = await fetch("/components/header.html");
		const html = await response.text();
		document.getElementById("header").innerHTML = html;
	} catch (error) {
		console.error("Erro ao carregar header:", error);
	}
}

async function loadFooter() {
	try {
		const response = await fetch("/components/footer.html");
		const html = await response.text();
		document.getElementById("footer").innerHTML = html;
	} catch (error) {
		console.error("Erro ao carregar footer:", error);
	}
}

// Carrega header e footer ao iniciar
window.addEventListener("load", () => {
	loadHeader();
	loadFooter();
});
