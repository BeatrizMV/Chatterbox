// INDEX

const form = document.querySelector('.tab-content');

const getLoginName = document.querySelector('#login_username');
const getLoginEmail = document.querySelector('#login_email');

const getSignInName = document.querySelector('#signin_username');
const getSignInEmail = document.querySelector('#signin_email');

const submitLoginBtn = document.querySelector('#guardar_claves_login');
const submitSignInBtn = document.querySelector('#guardar_claves_signin');


form.addEventListener("submit", function(e) {
    e.preventDefault();
});

submitLoginBtn.addEventListener('click', function() {
    localStorage.setItem('name', getLoginName.value);
    localStorage.setItem('email', getLoginEmail.value);

});

submitSignInBtn.addEventListener('click', function() {
    console.log("clicked on sign in");
    localStorage.setItem('name', getSignInName.value);
    localStorage.setItem('email', getSignInEmail.value);
    //AVATAR
    const inputAvatar = document.querySelector("#avatar");
    const file = inputAvatar.files[0];
    console.log(file);

    const reader = new FileReader();
    reader.onloadend = () => {
        // convert file to base64 String
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        // store file
        localStorage.setItem('avatar', base64String);
    };
    reader.readAsDataURL(file);
});

// SALA

const getRoom = document.querySelector('#buscasala');
const submitSearchRoom = document.querySelector('#localstorageSalas');

if(submitSearchRoom) {
    submitSearchRoom.addEventListener('click', function() {
        localStorage.setItem('name', getRoom.value);

    });
}