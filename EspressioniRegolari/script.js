let persone = [];
let id = 0;

const regexNomeCognome = /^[a-zA-Z]+$/;
const regexCAP = /^[0-9]+$/;
const regexUsername = /^.{3,16}$/;
const regexPassword = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
function validaCampi() {
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const cap = document.getElementById("cap").value;
    const username = document.getElementById("username").value;
    
    let valido = true;
    if (!regexNomeCognome.test(nome)) {
        alert("Il nome deve contenere solo lettere maiuscole e minuscole!");
        valido = false;
    }
    
    if (!regexNomeCognome.test(cognome)) {
        alert("Il cognome deve contenere solo lettere maiuscole e minuscole!");
        valido = false;
    }
   
    if (cap && !regexCAP.test(cap)) {
        alert("Il CAP deve contenere solo numeri!");
        valido = false;
    }

    if (username && !regexUsername.test(username)) {
        document.getElementById("usernameError").textContent = "L'username deve essere tra 3 e 16 caratteri!";
        valido = false;
    } else {
        document.getElementById("usernameError").textContent = "";
    }
    
    return valido;
}



function stampa() {

    if (!validaCampi()) {
        return;
    }
    
    id = id + 1;
    document.getElementById("inputId").value = id;
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const indirizzo = document.getElementById("indirizzo").value;
    const citta = document.getElementById("citta").value;
    const cap = document.getElementById("cap").value;
    const eta = parseInt(document.getElementById("eta").value);
    const dataNascita = document.getElementById("dataNascita").value;

    var radios = document.getElementsByName("sesso");
    var sesso = "Non specificato";
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            sesso = radios[i].value;
            break;
        }
    }

    const provincia = document.getElementById("provincia").value;

    var checkbox = document.getElementsByName("mezzi");
    var mezzi = [];
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            mezzi.push(checkbox[i].value);
        }
    }


    let materie = [];
    let selected = document.getElementById("materie").selectedOptions;

    for (let i = 0; i < selected.length; i++) {
        let opzione = selected[i];
        materie.push(opzione.value);
    }


    let mezziPosseduti;
    if (mezzi.length > 0) {
        mezziPosseduti = mezzi.join(", ");
    } else {
        mezziPosseduti = "Nessuno";
    }

    let materiePreferite;
    if (materie.length > 0) {
        materiePreferite = materie.join(", ");
    } else {
        materiePreferite = "Nessuna";
    }

    let generazione = "";
    switch (true) {
        case eta <= 12:
            generazione = "Generazione Alpha";
            break;
        case (eta >= 13 && eta <= 28):
            generazione = "Generazione Z";
            break;
        case (eta >= 29 && eta <= 44):
            generazione = "Millennials";
            break;
        case (eta >= 45 && eta <= 60):
            generazione = "Generazione X";
            break;
        default:
            generazione = "Boh!";
    }

    const username = document.getElementById("username").value;
    
    const persona = {
        id: id,
        nome: nome,
        cognome: cognome,
        eta: eta,
        dataNascita: dataNascita,
        sesso: sesso,
        provincia: provincia,
        generazione: generazione,
        mezziPosseduti: mezziPosseduti,
        materiePreferite: materiePreferite,
        username: username,

        indirizzo: {
            via: indirizzo,
            citta: citta,
            cap: cap
        }
    };

    document.getElementById("output").innerHTML =
        "<h2>Dati Inseriti</h2>" +
        "<p><strong>Nome:</strong> " + persona.nome + "</p>" +
        "<p><strong>Cognome:</strong> " + persona.cognome + "</p>" +
        "<p><strong>Indirizzo:</strong> " + persona.indirizzo.via + "</p>" +
        "<p><strong>Città:</strong> " + persona.indirizzo.citta + "</p>" +
        "<p><strong>CAP:</strong> " + persona.indirizzo.cap + "</p>" +
        "<p><strong>Età:</strong> " + (persona.eta || "Non specificata") + "</p>" +
        "<p><strong>Data di nascita:</strong> " + (persona.dataNascita || "Non indicata") + "</p>" +
        "<p><strong>Sesso:</strong> " + persona.sesso + "</p>" +
        "<p><strong>Provincia:</strong> " + persona.provincia + "</p>" +
        "<p><strong>Mezzi posseduti:</strong> " + persona.mezziPosseduti + "</p>" +
        "<p><strong>Materie preferite:</strong> " + persona.materiePreferite + "</p>" +
        "<p><strong>Generazione:</strong> " + persona.generazione + "</p>" +
        "<p><strong>Username:</strong> " + (persona.username || "Non specificato") + "</p>" +
        "<hr><p><em>Persona aggiunta alla lista! Totale persone: " + (persone.length + 1) + "</em></p>";
    persone.push(persona);
}

function trasmettiTutto() {
    if (persone.length === 0) {
        alert("Aggiungi almeno una persona alla lista prima di trasmettere!");
        return;
    }
    
    var passwordInserita = prompt("Inserisci la password per trasmettere i dati:");

    if (passwordInserita === null) {
        return;
    }

    if (passwordInserita !== "Ciaofratell@100") {
        document.getElementById("output").innerHTML = 
            "<h2>Errore</h2>" +
            "<p style='color: red; font-size: 1.2rem; text-align: center;'><strong>password sbagliata</strong></p>";
        return;
    }
    
    var url = "destinatarioCreaTabella.html?txtR=" + persone.length + "&txtC=13&";

    for (var i = 0; i < persone.length; i++) {
        var p = persone[i];
        url += "id=" + encodeURIComponent(p.id) + "&";
        url += "nome=" + encodeURIComponent(p.nome) + "&";
        url += "cognome=" + encodeURIComponent(p.cognome) + "&";
        url += "indirizzo=" + encodeURIComponent(p.indirizzo.via) + "&";
        url += "citta=" + encodeURIComponent(p.indirizzo.citta) + "&";
        url += "cap=" + encodeURIComponent(p.indirizzo.cap) + "&";
        url += "eta=" + encodeURIComponent(p.eta) + "&";
        url += "dataNascita=" + encodeURIComponent(p.dataNascita) + "&";
        url += "sesso=" + encodeURIComponent(p.sesso) + "&";
        url += "provincia=" + encodeURIComponent(p.provincia) + "&";
        url += "mezzi=" + encodeURIComponent(p.mezziPosseduti) + "&";
        url += "materie=" + encodeURIComponent(p.materiePreferite) + "&";
        url += "username=" + encodeURIComponent(p.username) + "&";
    }

    window.location.href = url;
}
