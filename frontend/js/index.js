//FUNCION PARA LOGIN
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
window.onload = fillContacts();
async function getContacts(){
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        //console.log("Bearer "+jwt);
        let response = await fetch('http://localhost:3000/contacts',
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let dataTable = await response.json();
        return dataTable;
    }
}
async function fillContacts(){
    try {
        let contacts = await getContacts();        
        sessionStorage.setItem("contacts", JSON.stringify(contacts));        
        //console.log(JSON.parse(sessionStorage.getItem("contacts")));
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            const ID = contact.ID;
            const name = contact.name;
            const last_name = contact.last_name;
            const country = contact.country;
            const region = contact.region;
            const email = contact.email;
            const company = contact.company;
            const charge = contact.charge;
            const interest = contact.interest;
            tableContacts(ID, name, last_name, country, region, email, company, charge, interest);        
        }   

        //Funcion para Iniciar ToolTips
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

        //Funcion para Iniciar Libreria DataTables
        let table = $('#table_contacts').DataTable( {
            language: {
                info: "_START_ - _END_ de _TOTAL_ contactos",
                infoFiltered: "(filtrados de _MAX_ contactos)",
                infoEmpty: "No se encontraron resultados",
                lengthMenu: "Contactos por página _MENU_",
                select: {
                    rows: "<p class='bg-info p-1 text-white rounded d-inline'> %d contactos seleccionados </p>"
                }
              },
            columnDefs: [ {
                orderable: false,
                targets:   6
            }, {
                orderable: false,
                targets:   0,
                className: 'select-checkbox'
            } ],
            select: {
                style:    'multi+shift',
                selector: 'td:first-child'
            },        
            pageLength: 9,
            lengthMenu: [[ 9, 18, 27, 36, -1],[ 9, 18, 27, 36, "Todos"]],
            order: [[ 1, 'asc' ]]
        } );

        $('.form-control.form-control-sm').addClass("search_bar");

        $('#table_contacts_filter').find("label").addClass("input-group").html(`<div class="input-group-prepend">
            <span class="input-group-text bg-info" id="basic-addon1">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="var(--white)" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"></path>
                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"></path>
                </svg>
            </span>
        </div>
        <input type="search" id="input_bar" class="form-control search_bar d-inline-block ml-0" placeholder="Buscar contactos" aria-controls="table_contacts">`);

        $('#input_bar').on( 'keyup', function () {
            table.search( this.value ).draw();
        } ); 
    } catch (error) {
        console.error(error);
    }
}

function tableContacts(ID, name, last_name, country, region, email, company, charge, interest){    
    $("#table_contacts")
        .append($(`<tr data-id="${ID}">`)
            .append(`<td scope="row"></td>`)
            .append(`<td><p class="m-0">${name} ${last_name}</p><p class="m-0 font-italic font-weight-light">${email}</p></td>`)
            .append(`<td><p class="m-0">${country}</p><p class="m-0 font-italic font-weight-light">${region}</p></td>`)
            .append(`<td class="align-middle">${company}</td>`)        
            .append(`<td class="align-middle">${charge}</td>`)
            .append(`<td class="align-middle"><div class="d-flex align-items-center">
                        <p class="mb-0 mr-1" style="width: 3vw;">${interest}</p> 
                        <div class="progress" style="height: 10px; width: 80%;">
                            <div class="progress-bar bg-info font-weight-bold" role="progressbar" style="width: ${interest};" aria-valuenow="${interest}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        </div>
                     </td>`)
            .append($('<td class="align-middle text-center">')
                .append('<button class="btn btn-info mr-1" data-toggle="tooltip" data-placement="top" title="Editar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button>')
                .append('<button class="btn btn-info" data-toggle="modal" data-target="#modal_contact_remove_one" data-toggle="tooltip" data-placement="top" title="Eliminar" onclick="set_eliminate_byIcon(this)"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>')
        )
    );
}

//FUNCIONES PARA ELIMINAR CONTACTOS
async function eliminate_contact(ID){
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/contact/'+ID,
        {
            method:'DELETE',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let eliminado = await response.json();
        console.log(eliminado);
    }
}

function set_eliminate_byIcon(btn) {
    console.log(btn.parentElement.parentElement.getAttribute("data-id"));
    let ID = btn.parentElement.parentElement.getAttribute("data-id");    
    sessionStorage.setItem("eliminate_contact", ID); 
}

async function do_eliminate_byIcon() {
    const ID = sessionStorage.getItem("eliminate_contact");
    await eliminate_contact(ID);
    $('#table_contacts').find(`[data-id='${ID}']`)[0].remove();
    
}

async function eliminate_selected() {
    let selected = $('#table_contacts').find('.selected');
    console.log(selected.length);
    console.log(selected[0]);
    for (let i = 0; i < selected.length; i++) {
        const contact = selected[i];
        const ID = contact.getAttribute("data-id");
        await eliminate_contact(ID);
        const checkbox = $(contact).children()[0];
        $( checkbox ).trigger( "click" );
        $(contact).remove();
    }    
}





/* function select_to_eliminate(btn) {
    console.log(btn.parentElement.parentElement);
    const contact = btn.parentElement.parentElement;
    const checkbox = $(contact).children()[0];
    $(checkbox).trigger("click");
}

function unselect() {
    alert('Holi');
    let selected = $('#table_contacts').find('.selected');
    console.log(selected);
    $(selected).trigger("click");
    //selected.removeClass('selected');
} */





