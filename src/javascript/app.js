async function initApp() {
	const token = localStorage.getItem("access_token");

	if (!token) {
		window.location.href = "/pages/login.html";
		return;
	}

	await loadHeader("header");
	await loadApp("catalog");
	await loadFooter("footer");

	initCatalog(); // MUITO IMPORTANTE
}

initApp();
