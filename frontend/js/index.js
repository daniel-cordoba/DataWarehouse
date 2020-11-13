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

//FUNCIONES PARA LLENAR TABLA DE CONTACTOS
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
        //Funcion para Iniciar Libreria DataTables
        let table = $('#table_contacts').DataTable( {
            language: {
                info: "_START_ - _END_ de _TOTAL_ contactos",
                infoFiltered: "",
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
        //Estilo en barra de búsqueda
        $('#table_contacts_filter').find("label").addClass("input-group").html(`<div class="input-group-prepend">
            <span class="input-group-text bg-info" id="basic-addon1">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="var(--white)" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"></path>
                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"></path>
                </svg>
            </span>
        </div>
        <input type="search" id="input_bar" class="form-control search_bar d-inline-block ml-0" placeholder="Buscar contactos" aria-controls="table_contacts">`);
        //Setting datatable para la barra de busqueda
        $('#input_bar').on( 'keyup', function () {
            table.search( this.value ).draw();
        } ); 
        //Agregar botón para crear contactos
        const div_parent = $('#table_contacts_wrapper').find('.row')[0];
        $(div_parent).children().removeClass('col-md-6').addClass('col-md-4');
        $(div_parent).append(`<div class="col-sm-12 col-md-4">
                                <button type="button" class="btn btn-info float-right mr-5" data-toggle="modal" data-target="#add_contact">Agregar Contacto
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </button>
                            </div>`);
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
                .append('<button class="btn btn-info mr-1" data-toggle="modal" data-target="#edit_contact" title="Editar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button>')
                .append('<button class="btn btn-info" data-toggle="modal" data-target="#modal_contact_remove_one" onclick="set_eliminate_byIcon(this)" title="Eliminar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>')
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

//FUNCIONES PARA CREAR CONTACTOS
//ENDPOINT GET Companies
async function getCompanies() {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/companies',
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let companies = await response.json();
        return companies;
    }
}
//ENDPOINT GET Regions
async function getRegions() {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/regions',
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let regions = await response.json();
        return regions;
    }
}
//ENDPOINT GET Countries
async function getCountries() {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/countries',
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let countries = await response.json();
        return countries;
    }
}
//ENDPOINT GET Cities
async function getCities() {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/cities',
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let cities = await response.json();
        return cities;
    }
}
//ENDPOINT POST Data to add contact con validaciones
async function postContact() {
    $('.alert').alert();
    //Getting data
    const name = document.getElementById('contact_name').value;
    const last_name = document.getElementById('contact_lastName').value;
    const charge = document.getElementById('contact_charge').value;
    const email = document.getElementById('contact_email').value;
    const interest = document.getElementById('select_interest').value;
    const adress = document.getElementById('contact_adress').value;
    let company = document.getElementById('select_company');
    company = company.options[company.selectedIndex].text;
    let region = document.getElementById('select_region');
    region = region.options[region.selectedIndex].text;
    let country = document.getElementById('select_country');
    country = country.options[country.selectedIndex].text;
    let city = document.getElementById('select_city');
    city = city.options[city.selectedIndex].text;
    //Validating data
    if (!name) {
    }else{
        console.log('nolas');
    }

    




    /* const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/contact',
        {
            method:'POST',
            body:`{"email":"${email.value}",
                "password":"${password.value}"}`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let cities = await response.json();
        return cities;
    } */
}

//Opciones en select de compañias
$('#add_contact').on('show.bs.modal', async() => {
        let companies = await getCompanies();
        companies.forEach(company => {
            const name = company.name;
            $('#select_company').append(`<option>${name}</option>`)
        });
})
//Opciones en select de region
$('#add_contact').on('show.bs.modal', async() => {
    let regions = await getRegions();
    regions.forEach(region => {
        const name = region.name;
        const ID = region.ID;
        $('#select_region').append(`<option value="${ID}">${name}</option>`)
    });
});
//Desabilitar-Habilitar Select Country
document.getElementById("select_region").onchange = async function () {
    let select_country = document.getElementById("select_country");
    let select_city = document.getElementById("select_city");
    document.getElementById("contact_adress").value="";
    document.getElementById("contact_adress").setAttribute("disabled", "disable");
    select_country.removeAttribute("disabled");
    while (select_country.hasChildNodes()) {
        select_country.removeChild(select_country.firstChild);
    }
    while (select_city.hasChildNodes()) {
        select_city.removeChild(select_city.firstChild);
    }
    $(select_country).append(`<option value="0" selected>Seleccionar País</option>`);
    $(select_city).append(`<option value="0" selected>Seleccionar Ciudad</option>`);
    const region = document.getElementById('select_region').value;
    const countries = await getCountries();
    countries.forEach(country => {
        if (country.region_id == region) {
            const name = country.name;
            const ID = country.ID;
            $('#select_country').append(`<option value="${ID}">${name}</option>`) 
        }
    });
};
//Desabilitar-Habilitar Select City
document.getElementById("select_country").onchange = async function () {
    let select_city = document.getElementById("select_city");
    select_city.removeAttribute("disabled");
    document.getElementById("contact_adress").value="";
    document.getElementById("contact_adress").setAttribute("disabled", "disable");
    while (select_city.hasChildNodes()) {
        select_city.removeChild(select_city.firstChild);
    }
    $(select_city).append(`<option value="0" selected>Seleccionar Ciudad</option>`);
    const country = document.getElementById('select_country').value;
    const cities = await getCities();
    cities.forEach(city => {
        if (city.country_id == country) {
            const name = city.name;
            const ID = city.ID;
            $('#select_city').append(`<option value="${ID}">${name}</option>`) 
        }
    });
};
//Desabilitar-Habilitar Select Adress
document.getElementById("select_city").onchange = function () {
    let contact_adress = document.getElementById("contact_adress");
    contact_adress.removeAttribute("disabled");
    if (document.getElementById("select_city").value == 0) {
        document.getElementById("contact_adress").value="";
        document.getElementById("contact_adress").setAttribute("disabled", "disable");
    } 
}
//Desabilitar-Habilitar WhatsApp/Facebook/Twitter Select Preferences
function disable(channel) {
    document.getElementById("channel_user_"+channel).onchange = function () {
        let channel_preference = document.getElementById("channel_preference_"+channel);
        if (document.getElementById("channel_user_"+channel).value) {        
            channel_preference.removeAttribute("disabled");  
        }else{
            channel_preference.setAttribute("disabled", "disabled");       
        }
    }
}
disable("w");
disable("f");
disable("t");

