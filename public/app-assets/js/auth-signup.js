var exportData;
var db;
var collection;
var doc;
var getDoc;
var auth;
var setDoc;
$(async function () {
    await import('/app-assets/js/firebase.js').then(function (exports) {
        exportData = exports;
    });
    db = exportData.db;
    doc = exportData.doc;
    collection = exportData.collection;
    getDoc = exportData.getDoc;
    auth = exportData.auth;
    setDoc = exportData.setDoc;

    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
        // make auth and firestore references
        e.preventDefault();
        const getauth = auth.getAuth();
        // get user info
        const name = loginForm['login-name'].value;
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;
        if (email == "" || password == ""|| name == "") {
            $('#login-email').addClass('is-invalid');
            $('#login-name').addClass('is-invalid');
            $('#login-email').addClass('is-invalid');
            sweetMessage("Authentication Failed!", "Please Provide Login Credentials", "warning");
            return false;
        }
        if (email == "") {
            $('#login-email').addClass('is-invalid');
            sweetMessage("Authentication Failed!", "Please Provide Login Credentials", "warning");
            return false;
        }
        else if (name == "") {
            $('#login-name').addClass('is-invalid');
            sweetMessage("Authentication Failed!", "Please Provide Login Credentials", "warning");
            return false;
        }
        else if (!validateEmail(email)) {
            $('#login-email').addClass('is-invalid');
            sweetMessage("Authentication Failed!", "Please Provide Login Credentials", "warning");
            return false;
        }
        else if (password == "") {
            $('#login-email').removeClass('is-invalid');
            $('#login-password').addClass('is-invalid');
            $('#login-name').removeClass('is-invalid');
            sweetMessage("Authentication Failed!", "Please Provide Login Credentials", "warning");
            return false;
        }
        $('#login-email').removeClass('is-invalid');
        $('#login-password').removeClass('is-invalid');
        $('#login-name').removeClass('is-invalid');
        //auth.setPersistence(getauth, auth.browserSessionPersistence)
        //    .then((ref) => {
        //        console.log(ref);
                // log the user in
                auth.createUserWithEmailAndPassword(getauth, email, password).then((cred) => {
                    first();
                    async function first() {
                        console.log(cred.user);
                        var user = cred.user;
                        $('#login-button').addClass("btn-progress");
                        var email2 = email.toLowerCase();
                        await setDoc(doc(db, "users", email2), {
                            role:0,
                            user_email:email2,
                            image_url:"user_icon.jpg",
                            name:name,
                            createdAt:new Date(),
                            user_uid:user.uid,
                        })
                        TimerSweet("Authentication Successful!", "You are signed up", "success",1500);
                        setTimeout(function () {
                            second();
                        }, 1000);
                    }
                    function second() {
                        $('#login-button').removeClass("btn-progress");
                        window.location.href = "index.html";
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                        if (error.code == "auth/user-not-found") {
                            $('#login-email').addClass("is-invalid");
                            $('#login-password').addClass("is-invalid");
                        }
                        else if (error.code == "auth/wrong-password") {
                            $('#login-password').addClass("is-invalid");
                            $('#login-email').removeClass("is-invalid");
                        }
                        var errorMessage = error.message;
                        sweetMessage("Authentication Failed!", errorMessage, "warning");
                    });
            //})
            //.catch((error) => {
            //    console.log(error);
            //    // Handle Errors here.
            //    const errorCode = error.code;
            //    const errorMessage = error.message;
            //});
    });
})

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}