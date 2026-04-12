let utenteNome = "";
let utenteEmail = "";

let queryString = window.location.search;
if (queryString !== "") {
    let qString = queryString.substring(1);
    let coppie = qString.split("&");

    for (let k = 0; k < coppie.length; k++) {
        let coppia = coppie[k].split("=");
        let chiave = coppia[0];
        let valore = coppia[1];

        if (chiave === "nome") {
            utenteNome = decodeURIComponent(valore);
            if (document.getElementById("nome-saluto")) {
                document.getElementById("nome-saluto").textContent = utenteNome;
            }
        } else if (chiave === "email") {
            utenteEmail = decodeURIComponent(valore);
        }
    }
}


const fileInput = document.getElementById("csv-file");
const fileNameDisplay = document.getElementById("file-name");
const btnLoadCsv = document.getElementById("btn-load-csv");

let prodottiPronti = [];

fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    fileNameDisplay.textContent = file.name;
    btnLoadCsv.disabled = false;

    const reader = new FileReader();

    reader.onload = function (e) {
        const testo = e.target.result;
        const dati = parseCSV(testo);
        prodottiPronti = dati;
    };

    reader.readAsText(file);
});

function parseCSV(testo) {
    const righe = testo.split("\n");
    let parsedProducts = [];

    const headerRow = righe[0].split(',');
    let headers = [];
    for (var h = 0; h < headerRow.length; h++) {
        headers.push(headerRow[h].toLowerCase().trim());
    }

    for (var i = 1; i < righe.length; i++) {
        if (righe[i].trim() === "") continue;

        let row = righe[i].split(',');
        let product = {};

        for (var j = 0; j < headers.length; j++) {
            let val = row[j];
            if (val !== undefined) {
                val = val.trim();
                let virgoletta = '"';
                if (val[0] === virgoletta && val[val.length - 1] === virgoletta) {
                    val = val.substring(1, val.length - 1);
                }
                product[headers[j]] = val;
            } else {
                product[headers[j]] = "";
            }
        }

        product.id = 'prod_' + i;
        parsedProducts.push(product);
    }

    return parsedProducts;
}

btnLoadCsv.onclick = function () {
    trasmettiTuttoAlCatalogo(prodottiPronti);
};

function trasmettiTuttoAlCatalogo(parsedProducts) {
    let url = "catalogo.html?";

    url += "nome=" + encodeURIComponent(utenteNome) + "&";
    url += "email=" + encodeURIComponent(utenteEmail) + "&";
    for (let i = 0; i < parsedProducts.length; i++) {
        let p = parsedProducts[i];

        for (let chiave in p) {
            let chiaveUnificata = "prod" + i + "_" + chiave;
            url += chiaveUnificata + "=" + encodeURIComponent(p[chiave]) + "&";
        }
    }

    url += "totProdotti=" + parsedProducts.length;

    window.location.href = url;
}
