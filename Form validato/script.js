function valida() {

    const nome = document.invio.nome.value;
    const password = document.invio.password.value;
    const conferma = document.invio.conferma.value;
    const telefono = document.invio.telefono.value;
    const email = document.invio.email.value;

    const email_reg_exp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;

    if (!nome) {
        alert("Devi inserire un nome");
        document.invio.nome.focus();
        return false;
    }


    if (isNaN(telefono) || !telefono) {
        alert("Devi inserire il telefono, attenzione deve essere numerico!");
        document.invio.telefono.value = "";
        document.invio.telefono.focus();
        return false;
    }

    if (!email_reg_exp.test(email) || !email) {
        alert("Devi inserire un indirizzo mail corretto");
        document.invio.email.focus();
        return false;
    }


    if (password.length < 6 || !password) {
        alert("Scegli una password, minimo 6 caratteri");
        document.invio.password.focus();
        return false;
    }


    if (!/^[A-Z]/.test(password)) {
        alert("La password deve iniziare con una lettera Maiuscola.");
        document.invio.password.focus();
        return false;
    }


    if (!/[@#?$\-_]/.test(password)) {
        alert("La password deve contenere almeno un carattere speciale tra: @, #, ?, $, -, _");
        document.invio.password.focus();
        return false;
    }


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

        document.invio.action = "#";
        document.invio.submit();
    }
}