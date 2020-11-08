function login(){
    const email=document.getElementById("email_input");
    const password=document.getElementById("password_input");
    sessionStorage.clear();
        fetch('http://localhost:3000/login',
        {
            method:'POST',
            body:`{"email":"${email.value}",
                "password":"${password.value}"}`,
            headers:{"Content-Type":"application/json"}
        }).then(res=>{
            res.json().then(token=>{
                console.log(token);
                sessionStorage.setItem("jwt", token);
            });
        });
}