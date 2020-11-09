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

//FUNCION PARA LLENAR TABLA DE CONTACTOS
window.onload = getContacts();
function getContacts(){
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        console.log("Bearer "+jwt);
        fetch('http://localhost:3000/contacts',
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        }).then(res=>{
            res.json().then(data=>{
                console.log(data);
                return data;
            });
        }).catch(err=>{
            console.error(err);
        });
    }
}
function fillContacts(){
    let data = getContacts();

}
function tableContacts(){
    /* let table_contacts = document.getElementById('table_contacts');
    let row = document.createElement('tr');
    let cell = document.createElement('td');
    let checkbox = document.createElement('input');
    let p = document.createElement('p');
    let b = document.createElement('button'); */
    
    $("#table_contacts")
        .append($('<tr>')
            .append('<td scope="row" class="py-4"><input type="checkbox"></td>')
            .append('<td><p class="m-0">Nombre</p><p class="m-0">Correo</p></td>')
            .append('<td><p class="m-0">País</p><p class="m-0">Region</p></td>')
            .append('<td class="py-4">@mdo</td>')        
            .append('<td class="py-4">@mdo</td>')
            .append('<td class="py-4">@mdo</td>')
            .append($('<td>')
                .append('<button class="btn btn-secondary mr-1" data-toggle="tooltip" data-placement="top" title="Editar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button>')
                .append('<button class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Eliminar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>')
                )
            );

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}

//FUNCION PARA INICIALIZAR LOS TOOLTIPS
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});


