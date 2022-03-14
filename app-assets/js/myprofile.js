var exportData;
var storage;
var db;
var collection;
var doc;
var getDoc;
var getDocs;
var auth;
var query;
var where;
var orderBy;
var updateDoc;
var addDoc;
var setDoc;
$(async function () {
    await import('/app-assets/js/firebase.js').then(function (exports) {
        exportData = exports;
    });
    db = exportData.db;
    doc = exportData.doc;
    collection = exportData.collection;
    getDoc = exportData.getDoc;
    getDocs = exportData.getDocs;
    query = exportData.query;
    where = exportData.where;
    orderBy = exportData.orderBy;
    auth = exportData.auth;
    updateDoc = exportData.updateDoc;
    addDoc = exportData.addDoc;
    setDoc = exportData.setDoc;
    storage = exportData.storage;
})
function change_tab(type) {
    $(".mytabs").removeClass('show');
    if (type == 1) {
        $("#show1").addClass('show');
        $("#tab1").show();
        $("#tab2").hide();
    }
    else if (type == 2) {
        $("#show2").addClass('show');
        $("#tab1").hide();
        $("#tab2").show();
    }
}
function shower(type) {
    if (type == 1) {
        $("#closer").show();
        $("#shower").hide();
        $("#editBasicForm").find('input').attr('disabled', false);
    }
    else {
        $("#editBasicForm").find('input').attr('disabled', true);
        $("#closer").hide();
        $("#shower").show();
    }
}

$("#editPasswordForm").submit(function (e) {
    e.preventDefault();
    uid = $("#uid").val();
    if ($(this).find("#password").val() != $(this).find("#password2").val()) {
        sweetMessage("Error", "Passwords do not match", "warning", 4000);
        $(this).find("#password").addClass('is-invalid');
        $(this).find("#password2").addClass('is-invalid');
    }
    else if ($(this).find("#password").val().length < 6) {
        sweetMessage("Error", "Password length must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character.", "warning", 4000);
        $(this).find("#password").addClass('is-invalid');
        $(this).find("#password2").addClass('is-invalid');
    }
    else {
        $(this).find("#password").removeClass('is-invalid');
        $(this).find("#password2").removeClass('is-invalid');
        $(this).find("#password").addClass('is-valid');
        $(this).find("#password2").addClass('is-valid');
        $("#updatePwdBtn").addClass('btn-progress');
        var getaUth = auth.getAuth();
        const user = getaUth.currentUser;
        auth.updatePassword(user, $(this).find("#password").val()).then(() => {
            sweetMessage("Successfull!", "Password updated successfully!", "success", 4000);
            $("#updatePwdBtn").removeClass('btn-progress');
        }).catch((error) => {
            sweetMessage("Warning!", "Please Login again to reset" + error, "error", 4000);
        });
    }
});

$("#editBasicForm").submit(function (e) {
    e.preventDefault();
    var email = $("#email").val();
    if ($(this).find("#first_name").val() == "") {
        sweetMessage("Error", "Enter your first name", "warning", 5000);
        return false;
    }
    else if ($(this).find("#last_name").val() == "") {
        sweetMessage("Error", "Enter your last name", "warning", 5000);
        return false;
    }
    else if ($(this).find("#phone").val() == "") {
        sweetMessage("Error", "Enter your phone number", "warning", 5000);
        return false;
    }
    $("#basicSbBtn").addClass('btn-progress');

    var usrRef = doc(db, "users", email);
    updateDoc(usrRef,{
        first_name: $(this).find("#first_name").val(),
        last_name: $(this).find("#last_name").val(),
        phone: $(this).find("#phone").val(),
    })
        .then(function (ref) {
            sweetMessage("Success", "Account details have been updated", "success", 5000);
            $("#basicSbBtn").removeClass('btn-progress');
            $("#editBasicForm").find('input').attr('disabled', true);
            $("#closer").hide();
            $("#shower").show();
            setTimeout(function () {
                location.reload();
            }, 5000);
        })
        .catch(function (error) {
            $("#basicSbBtn").removeClass('btn-progress');
            sweetMessage("Warning!", error, "error", 50000);
        });

});