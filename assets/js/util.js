$(document).ready(function() {
    logout();
    stati();
});

var api_url = sessionStorage.getItem("apiURL");
var authorization = sessionStorage.getItem("Authorization");

function logout() {
    $("#signout-btn").click(function() {
        sessionStorage.removeItem("Authorization");
        window.location.href = '../views/login.html';
    });
}

function stati() {
    const statiData = new Array(4);
    var ctx = document.getElementById('myChart')
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Users',
                'Providers',
                'Patients',
                'Health Records'
            ],
            datasets: [{
                label: 'stati',
                data: [],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#81ADB2',
                borderWidth: 4,
                pointBackgroundColor: '#81ADB2'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
                display: true
            }
        }
    });


    var ctx1 = document.getElementById('myChart1')
    var myChart1 = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: [
                'Users',
                'Providers',
                'Patients',
                'Health Records'
            ],
            datasets: [{
                label: 'stati',
                data: [],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            legend: {
                display: true
            }
        }
    });
    $.ajax({
        url: api_url + "/api/v1/statistics",
        type: "GET",
        dataType: "JSON",
        headers: { "Authorization": "Bearer " + authorization + "" },
        cache: false,
        success: function(res) {
            $("#patients").text(res.patients);
            $("#vital_signs").text(res.vital_signs);
            $("#providers").text(res.users);
            let allUsers = res.users + res.patients;
            let providers = res.users;
            let patients = res.patients;
            let vitals = res.vital_signs;

            myChart.data.datasets[0].data.shift();
            myChart.data.datasets[0].data.push(allUsers);
            myChart.data.datasets[0].data.push(providers);
            myChart.data.datasets[0].data.push(patients);
            myChart.data.datasets[0].data.push(vitals);
            myChart.update();

            myChart1.data.datasets[0].data.shift();
            myChart1.data.datasets[0].data.push(allUsers);
            myChart1.data.datasets[0].data.push(providers);
            myChart1.data.datasets[0].data.push(patients);
            myChart1.data.datasets[0].data.push(vitals);
            myChart1.update();

        },
        error: function(jqXHR) {
            if (jqXHR.status == 404) {
                swal("Error", "The requested URL was not found", "error").then(function() {
                    window.location.href = '../views/login.html';
                });
            }
            if (jqXHR.status == 503) {
                swal("Error", "Service Unavailable", "error");
            }
        }
    });
}