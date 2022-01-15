var exportData;
var db;
var collection;
var doc;
var getDoc;
var auth;
$(async function () {
    await import('/app-assets/js/firebase.js').then(function (exports) {
        exportData = exports;
    });
    db = exportData.db;
    doc = exportData.doc;
    collection = exportData.collection;
    getDoc = exportData.getDoc;
    auth = exportData.auth;
    var getaUth = auth.getAuth();
    auth.onAuthStateChanged(getaUth, async function (user) {
        if (user) {
            const docRef = doc(db, "users", user.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                var data = docSnap.data();
                $('#uid').val(docSnap.id);
                $('#email').val(docSnap.id);
                if (data.role == 0) {
                    $('.user-role').html("Admin");
                    $(".imageUrl").attr('src', data.image_url);
                    $(".userImage").attr('src', data.image_url);
                    $('#first_name').val(data.first_name);
                    $('#last_name').val(data.last_name);
                    $('#phone').val(data.phone);
                    if (data.first_name.length > 16) {
                        var substr = data.first_name.substr(0, 14)
                        $('#nav-user-name').html(substr + "..");
                    }
                    else {
                        $('#nav-user-name').html(data.first_name);
                    }
                    $('.userName').html(data.first_name);
                    $('.user-name').html(data.first_name);
                }
                else {
                    firebase
                        .auth()
                        .signOut()
                        .then(function () {
                            window.location = 'auth-login.html';
                        })
                        .catch(function (error) {
                        });
                }
            }
            $(".loader").fadeOut("slow");
        }
        else {
            console.log(user);
            window.location.href = "auth-login.html";
        }
    });
})


