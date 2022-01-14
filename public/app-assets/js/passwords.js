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
var deleteDoc;
var storage;
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

    var getaUth = auth.getAuth();
    auth.onAuthStateChanged(getaUth, async function (user) {
        if (user) {
            createTable(user.email);
            $('#email').val(user.email);
        }
        else{
            $('#email').val("admin@gmail.com");
            createTable("admin@gmail.com");
        }
    })
})
async function createTable(email) {
    $("#table-1").DataTable().destroy();
    $("#dataTable").html('');
    const usersRef = collection(db, "passwords");
    const q = query(usersRef, where("created_by","==", email));
    const querySnapshot = await getDocs(q);
    try {
        if (querySnapshot.size > 0) {
            var count = 0;
            querySnapshot.forEach(function (doc) {
                count++;
                var data = doc.data();
                var action = '<a style="color: #fff;cursor:pointer;" onclick="showDeleteModal(\'' + doc.id + '\')" class="btn btn-danger badge-shadow"><i class="fas fa-trash"></i></a>';
                //created at
                var created_at = data.created_at.toDate();
                created_at = $.format.date(created_at, 'd-MMM-yyyy');

                var website_url = data.website_url;
                var username = data.username;
                var password = data.password;

                //Address Node
                var editAction = '<a style="color: #fff;cursor:pointer;margin-right:4px;" onclick="showEditModal(\'' + doc.id + '\')" class="btn btn-primary badge-shadow"><i class="fas fa-edit"></i></a>';
                //values
                var values = '<input type="hidden" id="w-' + doc.id + '" value="' + website_url + '" /><input type="hidden" id="p-' + doc.id + '" value="' + password + '" /><input type="hidden" id="u-' + doc.id + '" value="' + username + '" />';
                var row = '<tr><td>'+count+'</td><td><p class="mb-0 font-13 pdt10 text-center">' + website_url + '</p></td><td>' + username + '</td><td>' + password + '</td><td>' + created_at + '</td><td>' + editAction + action + values + '</td></tr>';
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

function showDeleteModal(doc_id) {
    $('#docId').val(doc_id);
    Swal.fire({
        title: 'Are you sure you want to block?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm!'
    }).then((result) => {
        if (result.isConfirmed) {
            blockEntity();
        }
    })
}
function deleteEntity() {
    var Id = $('#docId').val();
    var usrRef = doc(db, "passwords", Id);
    deleteDoc(usrRef).then(function (ref) {
        createTable($('#email').val());
        TimerSweet("Password Deleted!", 'Password is successfully deleted', "success", 2000);
    })
        .catch(function (error) {
            message("Warning!", error.message, "error", 5000);
            console.log("Error getting documents: ", error);
        });
}

function showAddModal() {
    $('#username').val("");
    $('#password').val("");
    $('#website_url').val("");

    $('#add_btn').show();
    $('#update_btn').hide();
    $('#addModal').modal('show');
}
function AddPassword() {
    var username = $('#username').val();
    var password = $('#password').val();
    var website_url = $('#website_url').val();

    if (!username.replace(/\s/g, '').length) {
        sweetMessage("Warning!", "Please Enter Name", "error", 2000);
        return false;
    }
    else if (!password.replace(/\s/g, '').length) {
        sweetMessage("Warning!", "Please Enter Password", "error", 2000);
        return false;
    }
    else if (!website_url.replace(/\s/g, '').length) {
        sweetMessage("Warning!", "Please Enter Website Url", "error", 2000);
        return false;
    }
    else {
        var timestamp = new Date().getTime().toString();
        $('#add_btn').addClass("btn-progress");
        // Add a new document in collection "cities"
        setDoc(doc(db, "passwords", timestamp), {
            created_at: new Date(),
            key: timestamp,
            created_by:$('#email').val(),
            website_url:website_url,
            username:username,
            password:password,
        })
            .then(function (ref) {
                TimerSweet("Password Added!", 'Password is successfully added', "success", 2000);
                console.log("Document successfully written!");
                $('#add_btn').removeClass("btn-progress");
                $('#addModal').modal("hide");
                createTable($('#email').val());
            })
            .catch(function (error) {
                sweetMessage('Warning!', error.message, 'error');
                console.log(error);
            });
    }
}

function showEditModal(doc_id) {
    $('#form_type').val('2');

    $('#docId').val(doc_id);
    $('#add_btn').hide();
    $('#update_btn').show();

    var password = $('#p-' + doc_id).val();
    var username = $('#u-' + doc_id).val();
    var website_url = $('#w-' + doc_id).val();

    $('#password').val(password);
    $('#username').val(username);
    $('#website_url').val(website_url);
    $('#addModal').modal("show");
}
function UpdatePassword() {
    var doc_id = $('#docId').val();

    var username = $('#username').val();
    var password = $('#password').val();
    var website_url = $('#website_url').val();

    if (!username.replace(/\s/g, '').length) {
        sweetMessage("Warning!", "Please Enter Name", "error", 2000);
        return false;
    }
    else if (!password.replace(/\s/g, '').length) {
        sweetMessage("Warning!", "Please Enter Password", "error", 2000);
        return false;
    }
    else if (!website_url.replace(/\s/g, '').length) {
        sweetMessage("Warning!", "Please Enter Website Url", "error", 2000);
        return false;
    }
    else{
        $('#update_btn').addClass("btn-progress");
        var docRef = doc(db, "passwords", doc_id);
        updateDoc(docRef, {
            website_url:website_url,
            username:username,
            password:password,
            updated_at:new Date(),
        })
            .then(function (ref) {
                TimerSweet("Password Updated!", 'Password is successfully updated', "success", 2000);
                $('#update_btn').removeClass("btn-progress");
                $('#add_btn').show();
                $('#update_btn').hide();
                $('#addModal').modal("hide");
                createTable($('#email').val());
            })
            .catch(function (error) {
                message("Warning!", error.message, "error", 5000);
                console.log("Error getting documents: ", error);
            });
    }
}
