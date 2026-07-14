const SUPABASE_URL =
"https://ygwkmanjkiuachkmhkbh.supabase.co";


const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnd2ttYW5qa2l1YWNoa21oa2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NjgxNDIsImV4cCI6MjA5OTU0NDE0Mn0.bE15mcFyl6ZDRXc8Xpu_oh5Aetd_CmAdLNm8qUryQhw";



async function login(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



let response =
await fetch(

SUPABASE_URL+
"/auth/v1/token?grant_type=password",

{

method:"POST",

headers:{

"apikey":SUPABASE_KEY,

"Content-Type":
"application/json"

},

body:JSON.stringify({

email:email,

password:password

})

}

);



let data =
await response.json();



if(data.access_token){


localStorage.setItem(
"token",
data.access_token
);


location.href="dashboard.html";


}

else{


alert("Login gagal");


}


}


async function loadDashboard(){


let token =
localStorage.getItem("token");


if(!token){

location.href="login.html";

}



let res =
await fetch(

SUPABASE_URL+
"/rest/v1/player_logs?select=*",

{

headers:{

apikey:SUPABASE_KEY,

Authorization:
"Bearer "+token

}

}

);



let data =
await res.json();



document.getElementById(
"total"
).innerHTML=data.length;



let html="";


data.forEach(p=>{


html+=`

<tr>

<td>${p.username}</td>

<td>${p.userid}</td>

<td>${p.join_time}</td>

<td>${p.leave_time ?? "Online"}</td>

</tr>

`;

});


document.getElementById(
"table"
).innerHTML=html;


}



function logout(){

localStorage.removeItem("token");

location.href="login.html";

}



if(
location.pathname.includes(
"dashboard"
)
){

loadDashboard();

}
