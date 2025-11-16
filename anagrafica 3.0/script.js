function stampa() {
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


    if (materie.length > 3) {
        alert("Puoi selezionare al massimo 3 materie.");
        return;
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

    const persona = {
        nome: nome,
        cognome: cognome,
        eta: eta,
        dataNascita: dataNascita,
        sesso: sesso,
        provincia: provincia,
        generazione: generazione,
        mezzi: mezzi,
        materie: materie,
        indirizzo: {
            via: indirizzo,
            citta: citta,
            cap: cap
        }
    };

    let mezziPosseduti;
    if (persona.mezzi.length > 0) {
        mezziPosseduti = persona.mezzi.join(", ");
    } else {
        mezziPosseduti = "Nessuno";
    }

    let materiePreferite;
    if (persona.materie.length > 0) {
        materiePreferite = persona.materie.join(", ");
    } else {
        materiePreferite = "Nessuna";
    }

    document.getElementById("output").innerHTML = `
      <h2>Dati Inseriti</h2>
      <p><strong>Nome:</strong> ${persona.nome}</p>
      <p><strong>Cognome:</strong> ${persona.cognome}</p>
      <p><strong>Indirizzo:</strong> ${persona.indirizzo.via}</p>
      <p><strong>Città:</strong> ${persona.indirizzo.citta}</p>
      <p><strong>CAP:</strong> ${persona.indirizzo.cap}</p>
      <p><strong>Età:</strong> ${persona.eta || "Non specificata"}</p>
      <p><strong>Data di nascita:</strong> ${persona.dataNascita || "Non indicata"}</p>
      <p><strong>Sesso:</strong> ${persona.sesso}</p>
      <p><strong>Provincia:</strong> ${persona.provincia}</p>
      <p><strong>Mezzi posseduti:</strong> ${mezziPosseduti}</p>
      <p><strong>Materie preferite:</strong> ${materiePreferite}</p>
      <p><strong>Generazione:</strong> ${persona.generazione}</p>
    `;
}
