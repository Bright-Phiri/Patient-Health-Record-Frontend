$(document).ready(function() {
    logout();
    stati();
});

var api_url = sessionStorage.getItem("apiURL");
var api_port = sessionStorage.getItem("apiPort");
var authorization = sessionStorage.getItem("Authorization");

function logout() {
    $("#logout-btn").click(function() {
        sessionStorage.removeItem("Authorization");
        window.location.href = '../views/login.html';
    });
}

function stati() {
    $.ajax({
        url: api_url + api_port + "/api/v1/statistics",
        type: "GET",
        dataType: "JSON",
        headers: { "Authorization": "Bearer " + authorization + "" },
        success: function(res) {
            $("#patients").text(res.patients);
            $("#vital_signs").text(res.vital_signs);
            $("#providers").text(res.users);
        },
        error: function(jqXHR) {
            if (jqXHR.status == 404) {
                swal("Error", "API is offline", "error").then(function() {
                    window.location.href = '../views/login.html';
                });
            }
        }
    });
}