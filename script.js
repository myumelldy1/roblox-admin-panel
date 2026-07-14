let playersData = [];

let currentPage = 1;

let perPage = 50;

// ===============================
// SUPABASE CONFIG
// ===============================

const SUPABASE_URL = "https://ygwkmanjkiuachkmhkbh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnd2ttYW5qa2l1YWNoa21oa2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NjgxNDIsImV4cCI6MjA5OTU0NDE0Mn0.bE15mcFyl6ZDRXc8Xpu_oh5Aetd_CmAdLNm8qUryQhw";


// ===============================
// LOAD PLAYER LOG
// ===============================

async function loadLogs() {

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/player_logs?select=*&order=id.desc`,
            {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`
                }
            }
        );


        const logs = await response.json();


        console.log(logs);


        const table = document.getElementById("logTable");


        table.innerHTML = "";


        logs.forEach(log => {

            const row = `
                <tr>
                    <td>${log.id}</td>
                    <td>${log.username}</td>
                    <td>${log.userid}</td>
                    <td>${log.event}</td>
                    <td>${log.time}</td>
                </tr>
            `;


            table.innerHTML += row;

        });


    } catch(error) {

        console.error(
            "Gagal mengambil data:",
            error
        );

    }

}


async function login(){

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;


    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/admins?username=eq.${username}`,
        {
            headers:{
                "apikey": SUPABASE_KEY,
                "Authorization":
                `Bearer ${SUPABASE_KEY}`
            }
        }
    );


    const data = await response.json();


    if(data.length === 0){
        alert("Admin tidak ditemukan");
        return;
    }


    if(data[0].password === password){

        localStorage.setItem(
            "admin",
            username
        );

        window.location.href="dashboard.html";

    }else{

        alert("Password salah");

    }

}


// ===============================
// DASHBOARD COUNTER
// ===============================

async function loadDashboard(){

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/player_logs?select=*`,
        {
            headers:{
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        }
    );


    const data = await response.json();


    document.getElementById("totalPlayer").innerHTML =
        data.length;


}


// ===============================
// AUTO RUN
// ===============================

loadLogs();
loadDashboard();


// refresh setiap 5 detik

setInterval(() => {

    loadLogs();
    loadDashboard();

},5000);

}
