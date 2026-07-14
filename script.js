const SUPABASE_URL =
"https://PROJECTID.supabase.co";


const SUPABASE_KEY =
"ANON_PUBLIC_KEY";



// =====================
// LOGIN SUPABASE AUTH
// =====================


async function login(){


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



const response =
await fetch(

`${SUPABASE_URL}/auth/v1/token?grant_type=password`,

{

method:"POST",

headers:{

"apikey":SUPABASE_KEY,

"Content-Type":"application/json"

},


body:JSON.stringify({

email:email,

password:password

})


}

);



const data =
await response.json();



if(data.access_token){


localStorage.setItem(
"token",
data.access_token
);



window.location.href=
"dashboard.html";


}

else{


document.getElementById("message")
.innerHTML =
"Login gagal";


console.log(data);


}



}




// =====================
// CEK LOGIN
// =====================

function checkLogin(){


if(!localStorage.getItem("token")){


window.location.href="index.html";


}


}




// =====================
// LOGOUT
// =====================


function logout(){


localStorage.removeItem("token");


window.location.href="index.html";


}




// =====================
// LOAD ROBLOX LOG
// =====================


async function loadLogs(){


const token =
localStorage.getItem("token");



const response =
await fetch(

`${SUPABASE_URL}/rest/v1/player_logs?select=*&order=id.desc`,

{

headers:{

"apikey":SUPABASE_KEY,

"Authorization":
`Bearer ${token}`

}

}

);



const logs =
await response.json();



const table =
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


}
