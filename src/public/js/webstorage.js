// NOMBRE & EMAIL

$(document).on("ready", function() {
    if (window.localStorage != null) {
        //Recuperar claves
        obtener_claves_local();
        local();
    }


    function obtener_claves_local() {
        if (window.localStorage != "undefined") {
            //Recuperar claves y escribirlas en los input correspondientes
            var usuario = localStorage.getItem("usuario");
            $('#login_username').val(usuario);
            var email = localStorage["email"];
            $('#login_email').val(email);
        }
    }

    function guardar_claves_local() {
        if (window.localStorage != "undefined") {
            //Guardar claves con los valores de los inputs
            var usuario = $('#login_username').val();
            localStorage.setItem("usuario", usuario);
            var email = $('##login_email').val();
            localStorage.setItem("email", email);
        }
    }

    function local() {
        $('#guardar_claves_local').on("click", function() {
            guardar_claves_local();
        });
    }

});