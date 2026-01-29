function valida() {
    // Variabili associate ai campi del modulo
    const nome = document.invio.nome.value;
    const password = document.invio.password.value;
    const conferma = document.invio.conferma.value;
    const telefono = document.invio.telefono.value;
    const email = document.invio.email.value;

    // Espressione regolare dell'email
    const email_reg_exp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;

    // --- CONTROLLO NOME ---
    if (!nome) {
        alert("Devi inserire un nome");
        document.invio.nome.focus();
        return false;
    }

    // --- CONTROLLO TELEFONO ---
    if (isNaN(telefono) || !telefono) {
        alert("Devi inserire il telefono, attenzione deve essere numerico!");
        document.invio.telefono.value = "";
        document.invio.telefono.focus();
        return false;
    }

    // --- CONTROLLO EMAIL ---
    if (!email_reg_exp.test(email) || !email) {
        alert("Devi inserire un indirizzo mail corretto");
        document.invio.email.focus();
        return false;
    }

    // --- CONTROLLO PASSWORD ---
    
    // 1. Lunghezza minima
    if (password.length < 6 || !password) {
        alert("Scegli una password, minimo 6 caratteri");
        document.invio.password.focus();
        return false;
    }

    // 2. Controllo Prima Lettera Maiuscola
    // Verifica se l'inizio della stringa (^) è una lettera NON maiuscola
    if (!/^[A-Z]/.test(password)) {
        alert("La password deve iniziare con una lettera Maiuscola.");
        document.invio.password.focus();
        return false;
    }

    // 3. Controllo Carattere Speciale
    // Verifica la presenza di almeno uno tra: @, #, ?, $, -, _
    if (!/[@#?$\-_]/.test(password)) {
        alert("La password deve contenere almeno un carattere speciale tra: @, #, ?, $, -, _");
        document.invio.password.focus();
        return false;
    }

    // --- CONTROLLO CONFERMA PASSWORD ---
    if (!conferma) {
        alert("Devi confermare la password");
        document.invio.conferma.focus();
        return false;
    }

    if (password !== conferma) {
        alert("La conferma password non corrisponde");
        document.invio.conferma.value = "";
        document.invio.conferma.focus();
        return false;
    } else {
        // Se tutti i controlli sono superati
        document.invio.action = "#";
        document.invio.submit();
    }
}