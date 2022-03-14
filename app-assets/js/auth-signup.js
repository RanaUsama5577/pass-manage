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
        const first_name = loginForm['login-first-name'].value;
        const last_name = loginForm['login-last-name'].value;
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;
        const phone = loginForm['login-phone'].value;
        const confirm_password = loginForm['login-confirm-password'].value;
        var regularExpression  =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        
        //if else statment for sign up form
        if (first_name == "" && last_name == "" && phone == "" && email == "" && password == "" && confirm_password == "")
        {
            sweetMessage("Error", "Enter all required credentials", "warning");
            return false;
        }

        else if (first_name == "") {
            $('#login-first-name').addClass('is-invalid');
            sweetMessage("Error", "Enter first name", "warning");
            return false;
        }
        
        else if (last_name == "") {
            $('#login-last-name').addClass('is-invalid');
            sweetMessage("Error", "Enter last name", "warning");
            return false;
        }

         else if (phone == "") {
            $('#login-phone').addClass('is-invalid');
            sweetMessage("Error", "Enter phone number", "warning");
            return false;
        }

        else if (email == ""){
            $('#login-email').addClass('is-invalid');
            sweetMessage("Error", "Enter email", "warning");
            return false;
        }

        else if (password == "") {
            $('#login-password').addClass('is-invalid');
            sweetMessage("Error", "Enter password", "warning");
            return false;
        }

        else if (confirm_password == "") {
            $('#login-confirm-password').addClass('is-invalid');
            sweetMessage("Error", "Re-Enter password", "warning");
            return false;
        }

        else if (!validateEmail(email)) {
            $('#login-email').addClass('is-invalid');
            sweetMessage("Error", "Provide valid email", "warning");
            return false;
        }

        else if (password !=  confirm_password) {
            $('#login-email').removeClass('is-invalid');
            $('#login-password').addClass('is-invalid');
            $('#login-first-name').removeClass('is-invalid');
            sweetMessage("Error", "Passwords should match", "warning");
            return false;
        }

        else if(!password.match(regularExpression)) {
            $('#login-password').addClass('is-invalid');
            sweetMessage("Error", "Password should contain at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character", "warning");
            return false;
        }

        $('#login-first-name').addClass('is-invalid');
        $('#login-last-name').addClass('is-invalid');
        $('#login-phone').addClass('is-invalid');
        $('#login-email').addClass('is-invalid');
        $('#login-password').addClass('is-invalid');
        $('#login-confirm-password').addClass('is-invalid');
        
        //end of if else for sign up form
        
    
       
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
                            first_name:first_name,
                            last_name:last_name,
                            phone:phone,
                            createdAt:new Date(),
                            user_uid:user.uid,
                        })
                        TimerSweet("Success", "You have signed up",1500);
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

//This is the gernral function to validate an email
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}