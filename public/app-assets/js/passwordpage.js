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
var addDoc;
var setDoc;
$(async function () {
    await import('/assets/Firebase/Firebase.js').then(function (exports) {
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
    createTable();
})
async function createTable() {
    $("#table-1").DataTable().destroy();
    $("#dataTable").html('');
    const usersRef = collection(db, "HelpCenter");
    const q = query(usersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    try {
        if (querySnapshot.size > 0) {
            var count = 0;
            querySnapshot.forEach(function (doc) {
                count++;
                console.log(count);
                var data = doc.data();

                var created_at = data.createdAt.toDate();
                created_at = $.format.date(created_at, 'd-MMM-yyyy');
                var website = data.subject;
                var dateOfBirth = data.dateOfBirth;
                var fullName = data.fullName;
                var phoneNumber = data.phoneNumber;
                var description = data.description;
                var email = data.email;
                //Address Node
                var nodeId = "m-" + doc.id;
                var values = '<input type="hidden" id="m-' + doc.id + '" value="' + description + '" />';
                var row = '<tr data-row="1"><td><p class="mb-0 font-13 pdt10 text-center">' + fullName + '</p></td><td><p class="mb-0 font-13 pdt10 text-center">' + email + '</p></td><td>' + subject + '</td><td>' + phoneNumber + '</td><td>' + dateOfBirth + '</td><td>' + addressAction + '</td><td>' + created_at + '</td><td> ' + label + '</td><td>' + action + values + '</td></tr>';
                $('#dataTable').append(row);
            })
        }
        else {
            MixinSweet("No data to show", "", "info", 2000);
        }
        $('#table-1').DataTable();
    }
    catch (ex) {
        console.log(ex);
    }
}