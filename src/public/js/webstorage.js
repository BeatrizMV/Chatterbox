// INDEX

const form = document.querySelector('.tab-content');

const getLoginName = document.querySelector('#login_username');
const getLoginEmail = document.querySelector('#login_email');

const getSignInName = document.querySelector('#login_username');
const getSignInEmail = document.querySelector('#login_email');

const submitLoginBtn = document.querySelector('#guardar_claves_login');
const submitSignInBtn = document.querySelector('#guardar_claves_signin');

form.addEventListener("submit", function(e) {
    e.preventDefault();
});

submitLoginBtn.addEventListener('click', function() {
    localStorage.setItem('name', getLoginName.value);

});

submitLoginBtn.addEventListener('click', function() {
    localStorage.setItem('email', getLoginEmail.value);

});

submitSignInBtn.addEventListener('click', function() {
    localStorage.setItem('name', getSignInName.value);

});

submitSignInBtn.addEventListener('click', function() {
    localStorage.setItem('email', getSignInEmail.value);

});

// SALA

const getRoom = document.querySelector('#buscasala');
const submitSearchRoom = document.querySelector('#localstorageSalas');

submitSearchRoom.addEventListener('click', function() {
    localStorage.setItem('name', getRoom.value);

});