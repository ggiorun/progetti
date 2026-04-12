let prodotti = [];
let carrello = [];

let utenteNome = "";
let utenteEmail = "";
let totProdotti = 0;

let queryString = window.location.search;
let tutteLeVariabili = [];

if (queryString !== "") {
    let qString = queryString.substring(1);
    let coppie = qString.split("&");
    
    for (let k = 0; k < coppie.length; k++) {
        let arrayTemporaneo = coppie[k].split("=");
        if (arrayTemporaneo.length > 1) {
            let chiave = arrayTemporaneo[0];
            let valore = decodeURIComponent(arrayTemporaneo[1]);
            
            if (chiave === "nome") { utenteNome = valore; }
            else if (chiave === "email") { utenteEmail = valore; }
            else if (chiave === "totProdotti") { totProdotti = parseInt(valore); }
            else { tutteLeVariabili.push({ k: chiave, v: valore }); }
        }
    }
    
    for (let i = 0; i < totProdotti; i++) {
        let prodottoTrovato = {};
        for (let j = 0; j < tutteLeVariabili.length; j++) {
            let chiaveAttuale = tutteLeVariabili[j].k;
            let valAttuale = tutteLeVariabili[j].v;
            let prefisso = "prod" + i + "_";
            let grandezzaPrefisso = prefisso.length;
            
            if (chiaveAttuale.substring(0, grandezzaPrefisso) === prefisso) {
                let nomeCampoReale = chiaveAttuale.substring(grandezzaPrefisso);
                prodottoTrovato[nomeCampoReale] = valAttuale;
            }
        }
        prodotti.push(prodottoTrovato);
    }
    
    let estrattoreCart = "";
    for (let j = 0; j < tutteLeVariabili.length; j++) {
        if (tutteLeVariabili[j].k === "cart_ids") {
            estrattoreCart = tutteLeVariabili[j].v;
        }
    }
    if (estrattoreCart !== "") {
        let identitificatori = estrattoreCart.split(",");
        for (let idn = 0; idn < identitificatori.length; idn++) {
            let mioId = identitificatori[idn];
            for (let px = 0; px < prodotti.length; px++) {
                if (prodotti[px].id === mioId) {
                    carrello.push(prodotti[px]);
                }
            }
        }
        document.getElementById("cart-count").textContent = carrello.length;
    }
}

function tornaAlCatalogo() {
    let url = "catalogo.html?";
    url += "nome=" + encodeURIComponent(utenteNome) + "&";
    url += "email=" + encodeURIComponent(utenteEmail) + "&";
    
    for (let i = 0; i < prodotti.length; i++) {
        let p = prodotti[i];
        for (let chiave in p) {
            let chiaveUnificata = "prod" + i + "_" + chiave;
            url += chiaveUnificata + "=" + encodeURIComponent(p[chiave]) + "&";
        }
    }
    url += "totProdotti=" + prodotti.length + "&";
    
    let idNelCarrello = [];
    for (let c = 0; c < carrello.length; c++) {
        idNelCarrello.push(carrello[c].id);
    }
    
    if (idNelCarrello.length > 0) {
        url += "cart_ids=" + encodeURIComponent(idNelCarrello.join(",")) + "&";
    }
    
    window.location.href = url;
}

function rimuoviDalCarrello(indice) {
    let nuovoCarrello = [];
    for (let i = 0; i < carrello.length; i++) {
        if (i !== indice) {
            nuovoCarrello.push(carrello[i]);
        }
    }
    carrello = nuovoCarrello;
    
    document.getElementById("cart-count").textContent = carrello.length;
    renderCart();
}

function renderCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let cartSummary = document.getElementById("cart-summary");
    
    if (carrello.length === 0) {
        cartItemsContainer.innerHTML = "<p>Il carrello è vuoto. Torna al catalogo e aggiungi qualche prodotto per procedere con l'acquisto.</p>";
        cartSummary.style.display = "none";
        return;
    }

    cartSummary.style.display = "block";
    let total = 0;
    
    let htmlString = "";

    for (let i = 0; i < carrello.length; i++) {
        let prod = carrello[i];
        
        let title = "Prodotto Sconosciuto";
        if (prod.titolo) { title = prod.titolo; }
        else if (prod.nome) { title = prod.nome; }

        let categoria = "Prodotto";
        if (prod.categoria) { categoria = prod.categoria; }

        let priceStr = "0";
        if (prod.prezzo) { priceStr = prod.prezzo; }
        else if (prod.price) { priceStr = prod.price; }
        
        let priceArr = priceStr.split(",");
        if (priceArr.length > 1) {
            priceStr = priceArr[0] + "." + priceArr[1];
        }
        
        let priceVal = parseFloat(priceStr);
        if (!priceVal) { priceVal = 0; }
        total = total + priceVal;

        htmlString = htmlString +
            "<div class='cart-item fade-in'>" +
            "<div style='display: flex; align-items: center;'>" +
            "<span class='product-type' style='margin-right: 15px; margin-bottom: 0;'>" + categoria + "</span>" +
            "<span class='cart-item-title'>" + title + "</span>" +
            "</div>" +
            "<div style='display: flex; align-items: center;'>" +
            "<span class='cart-item-price'>€ " + priceVal + "</span>" +
            "<button class='remove-btn' style='margin-left: 20px;' onclick='rimuoviDalCarrello(" + i + ")'>Rimuovi</button>" +
            "</div>" +
            "</div>";
    }

    cartItemsContainer.innerHTML = htmlString;
    document.getElementById("cart-total").textContent = total;
}

function perfezionaAcquisto() {
    if (carrello.length === 0) {
        return;
    }

    let doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(59, 130, 246);
    doc.text("Riepilogo Ordine - ShopPremium", 15, 20);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Dati Cliente:", 15, 35);
    
    doc.setFontSize(12);
    doc.text("Nome: " + utenteNome, 15, 45);
    doc.text("Email: " + utenteEmail, 15, 52);
    
    doc.setFontSize(14);
    doc.text("Prodotti Acquistati:", 15, 70);
    
    doc.setFontSize(11);
    let y = 80;
    let total = 0;
    
    for (let i = 0; i < carrello.length; i++) {
        let prod = carrello[i];
        let title = "Prodotto Sconosciuto";
        if (prod.titolo) { title = prod.titolo; }
        else if (prod.nome) { title = prod.nome; }
        
        let cat = "Articolo";
        if (prod.categoria) { cat = prod.categoria; }

        let priceStr = "0";
        if (prod.prezzo) { priceStr = prod.prezzo; }
        else if (prod.price) { priceStr = prod.price; }
        
        let priceArr = priceStr.split(",");
        if (priceArr.length > 1) {
            priceStr = priceArr[0] + "." + priceArr[1];
        }
        
        let priceVal = parseFloat(priceStr);
        if (!priceVal) { priceVal = 0; }
        total = total + priceVal;

        let lineItem = (i + 1) + ". [" + cat.toUpperCase() + "] " + title + " - €" + priceVal;
        doc.text(lineItem, 15, y);
        y = y + 8;
        
        if (y > 275) {
            doc.addPage();
            y = 20;
        }
    }
    
    y = y + 10;
    doc.setFontSize(16);
    doc.setTextColor(16, 185, 129);
    doc.text("Totale Pagato: €" + total, 15, y);

    doc.save("Riepilogo_Acquisto_ShopPremium.pdf");

    carrello = [];
    document.getElementById("cart-count").textContent = "0";
    alert("Acquisto perfezionato con successo!");
    
    tornaAlCatalogo();
}

renderCart();
