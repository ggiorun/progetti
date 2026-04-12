
const regexNomeCognome = /^[a-zA-Z]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function salvaRegistrazione() {
    let nome = document.getElementById("reg-name").value;
    let email = document.getElementById("reg-email").value;
    if (nome === "" || email === "") {
        alert("Inserisci tutti i dati per registrarti!");
        return;
    }

    if (!regexNomeCognome.test(nome)) {
        alert("Il nome deve contenere solo lettere!");
        return;
    }
    if (!regexEmail.test(email)) {
        alert("Inserisci un indirizzo email valido!");
        return;
    }
    let urlTarget = "upload.html?nome=" + encodeURIComponent(nome) +
        "&email=" + encodeURIComponent(email);

    window.location.href = urlTarget;
}