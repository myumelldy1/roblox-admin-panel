const SUPABASE_URL =
"https://ygwkmanjkiuachkmhkbh.supabase.co";


const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnd2ttYW5qa2l1YWNoa21oa2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NjgxNDIsImV4cCI6MjA5OTU0NDE0Mn0.bE15mcFyl6ZDRXc8Xpu_oh5Aetd_CmAdLNm8qUryQhw";



// =====================
// LOGIN
// =====================

async function login(){


let username =
document.getElementById("username").value;


let password =
document.getElementById("password").value;



let response = await fetch(

`${SUPABASE_URL}/rest/v1/admins?username=eq.${username}`,

{

headers:{

"apikey":SUPABASE_KEY,

"Authorization":
`Bearer ${SUPABASE_KEY}`

}

}

);



let data =
await response.json();



if(data.length === 0){

document.getElementById("message")
.innerHTML="Admin tidak ditemukan";

return;

}



if(data[0].password == password){


localStorage.setItem(
"admin",
username
);


window.location.href=
"dashboard.html";


}

else{


document.getElementById("message")
.innerHTML="Password salah";


}



}



// =====================
// CEK LOGIN
// =====================


function checkLogin(){


if(!localStorage.getItem("admin")){


window.location.href="index.html";


}


}



// =====================
// LOGOUT
// =====================


function logout(){


localStorage.removeItem("admin");


window.location.href="index.html";


}




// =====================
// AMBIL LOG ROBLOX
// =====================


async function loadLogs(){


let response =
await fetch(

`${SUPABASE_URL}/rest/v1/player_logs?select=*&order=id.desc`,

{

headers:{

"apikey":SUPABASE_KEY,

"Authorization":
`Bearer ${SUPABASE_KEY}`

}

}

);



let logs =
await response.json();



let table =
document.getElementById("logTable");



if(!table) return;



table.innerHTML="";



logs.forEach(log=>{


table.innerHTML += `

<tr>

<td>${log.id}</td>

<td>${log.username}</td>

<td>${log.userid}</td>

<td>${log.event}</td>

<td>${log.time}</td>

</tr>

`;


});



let counter =
document.getElementById("totalPlayer");


if(counter){

counter.innerHTML =
logs.length;

}



}
