var exportData;
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
var deleteDoc;
var setDoc;
var onSnapshot;
var realdb;
var ref;
var get;
var child;
var onValue;
var runTransaction;
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
    setDoc = exportData.setDoc;
    deleteDoc = exportData.deleteDoc;
    onSnapshot = exportData.onSnapshot;
    realdb = exportData.realdb;
    ref = exportData.ref;
    get = exportData.get;
    child = exportData.child;
    onValue = exportData.onValue;
    runTransaction = exportData.runTransaction;

    var getaUth = auth.getAuth();
    auth.onAuthStateChanged(getaUth, async function (user) {
        if (user) {
            GetPasswords(user.email);
            $('#email').val(user.email);
        }
        else{
            // $('#email').val("admin@gmail.com");
            // createTable("admin@gmail.com");
        }
    })
})
async function GetPasswords(email) {
    $("#table-1").DataTable().destroy();
    $("#dataTable").html('');
    const usersRef = collection(db, "passwords");
    const q = query(usersRef, where("created_by","==", email));
    const querySnapshot = await getDocs(q);
    $('#PasswordsCount').html(querySnapshot.size);
}
