/////////////////////////////////////FUNCIONES PARA EL LOGIN/////////////////////////////////////
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
/////////////////////////////////////FUNCIONES SECCIÓN DE CONTACTOS/////////////////////////////////////
/////////////////////////////////////FUNCIONES PARA LLENAR TABLA DE CONTACTOS/////////////////////////////////////
//ENDPOINT GET Contacts
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
//Fill Table of Contacts
async function fillContacts(){
    try {
        let contacts = await getContacts();        
        //sessionStorage.setItem("contacts", JSON.stringify(contacts));        
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
        //Select All Function
        $("#select_all").on( "click", function(e) {
            if ($(this).is( ":checked" )) {
                table.rows().select();        
            } else {
                table.rows().deselect(); 
            }
        });
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
                                <button type="button" class="btn btn-info float-right mr-5" data-toggle="modal" data-target="#add_contact" onclick="switchBtnAdd()">Agregar Contacto
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </button>
                            </div>`);
    } catch (error) {
        console.error(error);
    }
}
//Creating DOM BodyTable
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
                .append('<button class="btn btn-info mr-1" data-toggle="modal" data-target="#add_contact" title="Editar" onclick="switchBtnEdit(this)"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button>')
                .append('<button class="btn btn-info" data-toggle="modal" data-target="#modal_contact_remove_one" onclick="set_eliminate_byIcon(this)" title="Eliminar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>')
        )
    );
}
/////////////////////////////////////FUNCIONES PARA ELIMINAR CONTACTOS/////////////////////////////////////
//ENDPOINT eliminate contacts
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
    for (let i = 0; i < selected.length; i++) {
        const contact = selected[i];
        const ID = contact.getAttribute("data-id");
        await eliminate_contact(ID);
        const checkbox = $(contact).children()[0];
        $(checkbox).trigger("click");
        $(contact).remove();
    }    
}
/////////////////////////////////////FUNCIONES PARA CREAR CONTACTOS/////////////////////////////////////
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
//ENDPOINT POST contact channels
async function postChannels(channel, user, preference) {   
    const jwt = sessionStorage.getItem("jwt"); 
    const contact_id = await lastID();
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/channel',
        {
            method:'POST',
            body:`{
                "contact_id":${contact_id},
                "channel":"${channel}",
                "user":"${user}",
                "preference":"${preference}"                        
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let channels = await response.json();
        console.log(channels);
    }
}
//ENDPOINT GET Last ID from Contacts
async function lastID() {   
    const jwt = sessionStorage.getItem("jwt"); 
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/contactID',
        {
            method:'GET',            
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let lastID = await response.json();
        lastID = lastID[0].LastID;
        return lastID;
    }
}
//ENDPOINT POST Data to add contact con validaciones
async function postContact() { 
    try {
        //Getting data for contact POST
        const name = document.getElementById('contact_name').value;
        const last_name = document.getElementById('contact_lastName').value;
        const charge = document.getElementById('contact_charge').value;
        const email = document.getElementById('contact_email').value;
        const interest = document.getElementById('select_interest').value;
        const adress = document.getElementById('contact_adress').value;
        let company = document.getElementById('select_company');
        const company_id = company.value;
        company = company.options[company.selectedIndex].text;
        let region = document.getElementById('select_region');
        region = region.options[region.selectedIndex].text;
        let country = document.getElementById('select_country');
        country = country.options[country.selectedIndex].text;
        let city = document.getElementById('select_city');
        const city_id = city.value;
        city = city.options[city.selectedIndex].text;
        //Validating data
        if (!name || !last_name || !charge || !email || company === "Seleccione una compañía") {
            alert('Recuerde llenar la información de todos los campos marcados con * (asterisco).')
            throw Error ('Los campos marcados con * son obligatorios');
        }
        if (!/..@../.test(email)) {
            alert('El email ingresado es inválido');
            throw Error ('El email ingresado es inválido');
        }
        //ENDPOINT POST Contact
        let city_id_body;
        if (city_id === "0") {city_id_body = ``;}
        else{city_id_body = `"city_id":"${city_id}",`;}
        const jwt = sessionStorage.getItem("jwt");
        if(jwt!=null){
            //POST to contacts
            let response = await fetch('http://localhost:3000/contact',
            {
                method:'POST',
                body:`{
                    "name":"${name}",
                    "last_name":"${last_name}",
                    "charge":"${charge}",
                    "email":"${email}",
                    "company":"${company}",
                    "company_id":"${company_id}",
                    "region":"${region}",
                    "country":"${country}",
                    "city":"${city}",
                    ${city_id_body}
                    "interest":"${interest}",
                    "adress":"${adress}"
                }`,
                headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
            });
            let contacts = await response.json();
            if (contacts == "Este email ya está en uso") {
                throw Error ('Este email ya está en uso');
            }
            //Getting data for channel POST
            const channel_user_w = document.getElementById('channel_user_w').value;
            const channel_user_f = document.getElementById('channel_user_f').value;
            const channel_user_t = document.getElementById('channel_user_t').value;
            let channel_preference_w = document.getElementById('channel_preference_w');
            channel_preference_w = channel_preference_w.options[channel_preference_w.selectedIndex].text;
            let channel_preference_f = document.getElementById('channel_preference_f');
            channel_preference_f = channel_preference_f.options[channel_preference_f.selectedIndex].text;
            let channel_preference_t = document.getElementById('channel_preference_t');
            channel_preference_t = channel_preference_t.options[channel_preference_t.selectedIndex].text;

            //POSTs TO CHANNELS
            await postChannels("Whatsapp", channel_user_w, channel_preference_w);
            await postChannels("Facebook", channel_user_f, channel_preference_f);
            await postChannels("Twitter", channel_user_t, channel_preference_t);
            console.log(contacts);
            alert(contacts);
            $('#add_contact').modal('hide');
        }
    } catch (error) {console.error(error)}
}
//Opciones en select de compañias
$('#add_contact').on('show.bs.modal', async() => {
        let companies = await getCompanies();
        $('#select_company').html('');
        $('#select_company').append(`<option value="0">Seleccione una compañía</option>`);
        companies.forEach(company => {
            const name = company.name;
            const ID = company.ID;
            $('#select_company').append(`<option value="${ID}">${name}</option>`)
        });
})
//Opciones en select de region
$('#add_contact').on('show.bs.modal', async() => {
    let regions = await getRegions();
    $('#select_region').html('');
    $('#select_region').append(`<option value="0">Seleccioner Región</option>`);
    regions.forEach(region => {
        const name = region.name;
        const ID = region.ID;
        $('#select_region').append(`<option value="${ID}">${name}</option>`)
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
});
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
/////////////////////////////////////FUNCIONES PARA EDITAR CONTACTOS/////////////////////////////////////
//Changes in DOM to switch between add/edit a contact
async function switchBtnEdit(btn) {
    $('#add_contact_btn').html("Guardar Cambios");
    $('#add_contact_btn').removeAttr("onclick").attr("onclick", "data_putContact()");
    $('#add_contact_Label').text('Editar Contacto');
    console.log(btn.parentElement.parentElement.getAttribute("data-id"));
    let ID = btn.parentElement.parentElement.getAttribute("data-id");    
    sessionStorage.setItem("edit_contact", ID); 
    let contact_data = await getOneContact(ID);
    console.log(contact_data);
    const name = contact_data[0].name;
    const last_name = contact_data[0].last_name;
    const email = contact_data[0].email;
    const charge = contact_data[0].charge;
    const company = contact_data[0].company;
    const company_id = contact_data[0].company_id;
    const region = contact_data[0].region;
    const country = contact_data[0].country;
    const city = contact_data[0].city;
    const city_id = contact_data[0].city_id;
    const adress = contact_data[0].adress;
    const interest = contact_data[0].interest;
    await autoCompleteContact(name, last_name, email, charge, company, company_id, region, country, city, city_id, adress, interest);
}
function switchBtnAdd() {
    $('#add_contact_btn').html("Agregar");
    $('#add_contact_btn').removeAttr("onclick").attr("onclick", "postContact()");
    $('#add_contact_Label').text('Agregar Contacto');
}
//ENDPOINT GET One Contact by ID
async function getOneContact(ID){
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        //const ID = sessionStorage.getItem("edit_contact");
        let response = await fetch('http://localhost:3000/contact/'+ID,
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let contact = await response.json();
        return contact;
    }
}
//ENDPOINT GET Channels
async function getChannels(){
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        //const ID = sessionStorage.getItem("edit_contact");
        let response = await fetch('http://localhost:3000/channels',
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let channels = await response.json();
        return channels;
    }
}
//AutoComplete Inputs for Edit-Modal
async function autoCompleteContact(name, last_name, email, charge, company, company_id, region, country, city, city_id, adress, interest) {
    $('#contact_name').val(name);
    $('#contact_lastName').val(last_name);
    $('#contact_email').val(email);
    $('#contact_charge').val(charge);
    $('#select_interest').val(interest);
    let select_company = document.getElementById("select_company");
    $('#select_company > option').removeAttr("selected");
    setTimeout(() => {select_company.querySelector(`[value="${company_id}"]`).setAttribute("selected", true);}, 100);
    if (region) {
        let select_region = document.getElementById("select_region");
        $('#select_region > option').removeAttr("selected");
        setTimeout(() => {
            let options = select_region.getElementsByTagName('option');
            console.log(options);
            for (const option of options) {
                if (option.textContent === region) {
                    option.setAttribute("selected", true);
                }
                console.log(option.textContent);
            }
        }, 50);
        if (country) {
            let select_country = document.getElementById('select_country');
            select_country.innerHTML = `<option>${country}</option>`;
            if (city) {
                let select_city = document.getElementById('select_city');
                select_city.innerHTML = `<option value="${city_id}">${city}</option>`;
                $('#contact_adress').removeAttr("disabled").val(adress);
                
            }
        }
    }
    const channels = await getChannels();
    const ID = sessionStorage.getItem("edit_contact");
    channels.forEach(channel => {
        if (channel.contact_id == ID) {
            if (channel.channel == "Whatsapp") {
                if (channel.user) {
                    $('#channel_user_w').val(channel.user);
                    $('#channel_preference_w').removeAttr("disabled");
                    $('#channel_preference_w > option').removeAttr("selected");
                    $('#channel_preference_w option').filter(`:contains('${channel.preference}')`).attr("selected", true);
                }
            }
            if (channel.channel == "Facebook") {
                if (channel.user) {
                    $('#channel_user_f').val(channel.user);
                    $('#channel_preference_f').removeAttr("disabled");
                    $('#channel_preference_f > option').removeAttr("selected");
                    $('#channel_preference_f option').filter(`:contains('${channel.preference}')`).attr("selected", true);
                }
            }
            if (channel.channel == "Twitter") {
                if (channel.user) {
                    $('#channel_user_t').val(channel.user);
                    $('#channel_preference_t').removeAttr("disabled");
                    $('#channel_preference_t > option').removeAttr("selected");
                    $('#channel_preference_t option').filter(`:contains('${channel.preference}')`).attr("selected", true);
                }
            }
        }
    });
}
//ENDPOINT PUT Contact
async function putContact(name, last_name, charge, email, company, company_id, region, country, city, city_id, interest, adress) {
    const jwt = sessionStorage.getItem("jwt");
    const ID = sessionStorage.getItem("edit_contact");
    let city_id_body;
        if (city_id === "0") {city_id_body = ``;}
        else{city_id_body = `"city_id":"${city_id}",`;}

    if(jwt!=null){
        let response = await fetch('http://localhost:3000/contact',
        {
            method:'PUT',
            body:`{
                "ID":${ID},
                "name":"${name}",
                "last_name":"${last_name}",
                "charge":"${charge}",
                "email":"${email}",
                "company":"${company}",
                "company_id":"${company_id}",
                "region":"${region}",
                "country":"${country}",
                "city":"${city}",
                ${city_id_body}
                "interest":"${interest}",
                "adress":"${adress}"
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let edit = await response.json();
        return edit;
    }
}
//ENDPOINT PUT Channel
async function putChannel(channel, user, preference) {
    const jwt = sessionStorage.getItem("jwt"); 
    const contact_id = sessionStorage.getItem("edit_contact");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/channel',
        {
            method:'PUT',
            body:`{
                "contact_id":${contact_id},
                "channel":"${channel}",
                "user":"${user}",
                "preference":"${preference}"                        
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let edit = await response.json();
        console.log(edit);
    }
}
//Getting data to PUT Contacts
async function data_putContact() {
    try {
        //Getting data to putContact()
        const name = document.getElementById('contact_name').value;
        const last_name = document.getElementById('contact_lastName').value;
        const charge = document.getElementById('contact_charge').value;
        const email = document.getElementById('contact_email').value;
        const interest = document.getElementById('select_interest').value;
        const adress = document.getElementById('contact_adress').value;
        let company = document.getElementById('select_company');
        const company_id = company.value;
        company = company.options[company.selectedIndex].text;
        let region = document.getElementById('select_region');
        region = region.options[region.selectedIndex].text;
        let country = document.getElementById('select_country');
        country = country.options[country.selectedIndex].text;
        let city = document.getElementById('select_city');
        const city_id = city.value;
        city = city.options[city.selectedIndex].text;
        //Validating data
        if (!name || !last_name || !charge || !email || company === "Seleccione una compañía") {
            alert('Recuerde llenar la información de todos los campos marcados con * (asterisco).')
            throw Error ('Los campos marcados con * son obligatorios');
        }
        if (!/..@../.test(email)) {
            alert('El email ingresado es inválido');
            throw Error ('El email ingresado es inválido');
        }
        const response = await putContact(name, last_name, charge, email, company, company_id, region, country, city, city_id, interest, adress);
        
        //Getting data to putChannel()
        const channel_user_w = document.getElementById('channel_user_w').value;
        const channel_user_f = document.getElementById('channel_user_f').value;
        const channel_user_t = document.getElementById('channel_user_t').value;
        let channel_preference_w = document.getElementById('channel_preference_w');
        channel_preference_w = channel_preference_w.options[channel_preference_w.selectedIndex].text;
        let channel_preference_f = document.getElementById('channel_preference_f');
        channel_preference_f = channel_preference_f.options[channel_preference_f.selectedIndex].text;
        let channel_preference_t = document.getElementById('channel_preference_t');
        channel_preference_t = channel_preference_t.options[channel_preference_t.selectedIndex].text;
        
        //POSTs TO CHANNELS
        await putChannel("Whatsapp", channel_user_w, channel_preference_w);
        await putChannel("Facebook", channel_user_f, channel_preference_f);
        await putChannel("Twitter", channel_user_t, channel_preference_t);
        console.log(response);
        alert(response);
            
        $('#add_contact').modal('hide');
    } catch (error) {
        console.error(error);
    }
}
//Reset on Add/Edit modal contact to set default values
$('#add_contact').on('hidden.bs.modal', () => {
    $('#body_modal').html('');
    $('#body_modal').append(`<div class="row">
                                <div class="col-3">
                                    <label for="contact_name" class="text-muted font-weight-bold">Nombre<span class="text-danger"> *</span></label>
                                    <input type="text" class="form-control" id="contact_name">
                                </div>
                                <div class="col-3">
                                    <label for="contact_lastName" class="text-muted font-weight-bold">Apellido<span class="text-danger"> *</span></label>
                                    <input type="text" class="form-control" id="contact_lastName">
                                </div>
                                
                                <div class="col-4">
                                    <label for="contact_email" class="text-muted font-weight-bold">Email<span class="text-danger"> *</span></label>
                                    <input type="text" class="form-control" id="contact_email" placeholder="email@ejemplo.com">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-3">
                                    <label for="contact_charge" class="text-muted font-weight-bold">Cargo<span class="text-danger"> *</span></label>
                                    <input type="text" class="form-control" id="contact_charge">
                                </div>
                                <div class="col-3">
                                    <label for="select_company" class="text-muted font-weight-bold">Compañía<span class="text-danger"> *</span></label>
                                    <select class="custom-select" id="select_company">
                                        <option value="0" selected>Seleccione una compañía</option>
                                    </select>
                                </div>
                            </div>
                            <hr class="my-4">
                            <div class="row">
                                <div class="col-3">
                                    <label for="select_region" class="text-muted font-weight-bold">Región</label>
                                    <select class="custom-select" id="select_region">
                                        <option value="0" selected>Seleccionar Región</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <label for="select_country" class="text-muted font-weight-bold">País</label>
                                    <select class="custom-select" id="select_country" disabled>
                                        <option value="0" selected>Seleccionar País</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <label for="select_city" class="text-muted font-weight-bold">Ciudad</label>
                                    <select class="custom-select" id="select_city" disabled>
                                        <option value="0" selected>Seleccionar Ciudad</option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <label for="contact_adress" class="text-muted font-weight-bold">Dirección</label>
                                    <input type="text" class="form-control" id="contact_adress" disabled>
                                </div>
                                <div class="col-3">
                                    <label for="select_interest" class="text-muted font-weight-bold mt-3">Interés</label>
                                    <select class="custom-select" id="select_interest">
                                        <option selected>0%</option>
                                        <option>25%</option>
                                        <option>50%</option>
                                        <option>75%</option>
                                        <option>100%</option>
                                    </select>
                                </div>
                            </div>
                            <hr class="my-4">
                            <div class="row">
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <h5 id="channel_w" class="text-muted">Whatsapp</h5>
                                </div>
                                <div class="col-3">
                                    <label for="channel_user_w" class="text-muted font-weight-bold">Número celular</label>
                                    <input type="number" class="form-control" id="channel_user_w" placeholder="3214865795">
                                </div>
                                <div class="col-3">
                                    <label for="channel_preference_w" class="text-muted font-weight-bold">Preferencias</label>
                                    <select class="custom-select" id="channel_preference_w" disabled>
                                        <option selected>Sin preferencia</option>
                                        <option>Canal favorito</option>
                                        <option>No molestar</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <h5 id="channel_f" class="text-muted">Facebook</h5>
                                </div>
                                <div class="col-3">
                                    <label for="channel_user_f" class="text-muted font-weight-bold">Cuenta de usuario</label>
                                    <input type="url" class="form-control" id="channel_user_f" placeholder="@ejemplo">
                                </div>
                                <div class="col-3">
                                    <label for="channel_preference_f" class="text-muted font-weight-bold">Preferencias</label>
                                    <select class="custom-select" id="channel_preference_f" disabled>
                                        <option selected>Sin preferencia</option>
                                        <option>Canal favorito</option>
                                        <option>No molestar</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <h5 id="channel_t" class="text-muted">Twitter</h5>
                                </div>
                                <div class="col-3">
                                    <label for="channel_user_t" class="text-muted font-weight-bold">Cuenta de usuario</label>
                                    <input type="url" class="form-control" id="channel_user_t" placeholder="@ejemplo">
                                </div>
                                <div class="col-3">
                                    <label for="channel_preference_t" class="text-muted font-weight-bold">Preferencias</label>
                                    <select class="custom-select" id="channel_preference_t" disabled>
                                        <option selected>Sin preferencia</option>
                                        <option>Canal favorito</option>
                                        <option>No molestar</option>
                                    </select>
                                </div>
                            </div>`)});
  
/////////////////////////////////////FUNCIONES DE LA SECCIÓN COMPAÑÍAS/////////////////////////////////////
/////////////////////////////////////FUNCIONES PARA LLENAR TABLA EN COMPAÑIAS/////////////////////////////////////
window.onload = fillCompanies();
//Fill Company Table
async function fillCompanies() {
    const companies = await getCompanies();
    companies.forEach(company =>{
        const ID = company.ID;
        const name = company.name;
        const city = company.city;
        const adress = company.adress;
        tableCompanies(ID, name, city, adress);
    })
}
function tableCompanies(ID, name, city, adress) {
    $("#table_companies")
        .append($(`<tr data-id="${ID}">`)
            .append(`<td scope="row" class="pl-5"><p class="m-0">${name}</p></td>`)
            .append(`<td><p class="m-0">${city}</p></td>`)
            .append(`<td class="align-middle">${adress}</td>`)
            .append($('<td class="align-middle text-center">')
                .append('<button class="btn btn-info mr-1" data-toggle="modal" data-target="#modal_add_company" title="Editar" onclick="edit_company_btn(this)"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button>')
                .append('<button class="btn btn-info" data-toggle="modal" data-target="#modal_company_remove" onclick="eliminate_company_icon(this)" title="Eliminar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>')
        )
    );
}
//Load base modal inputs of company table
$('#modal_add_company').on('shown.bs.modal', async () => {
    $("#company_select_city").children().remove();
    $("#company_select_city").append(`<option value="0" selected>Seleccionar Ciudad</option>`);
    //const country = document.getElementById('select_country').value;
    const cities = await getCities();
    cities.forEach(city => {
            const name = city.name;            
            const ID = city.ID;
            $('#company_select_city').append(`<option value="${ID}">${name}</option>`) 
    });
})
/////////////////////////////////////FUNCIONES PARA AGREGAR COMPAÑIAS/////////////////////////////////////
//ENDPOINT POST Company
async function postCompany(name, city, city_id, adress, email, phone) {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/company',
        {
            method:'POST',
            body:`{
                "name":"${name}",
                "city":"${city}",
                "city_id":"${city_id}",
                "adress":"${adress}",
                "email":"${email}",
                "phone":"${phone}"
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let company = await response.json();
        return company;
    }
}
//Setting default modal title and buttons
function modal_company_def() {
    $('#add_company_btn').html("Agregar");
    $('#add_company_btn').removeAttr("onclick").attr("onclick", "postCompanyData()");
    $('#add_company_Label').text('Agregar Companía');
}
//Sending Data to POST Company
async function postCompanyData() {
    try {
        const name = document.getElementById('company_name').value;
        let city = document.getElementById('company_select_city');
        const city_id = city.value;
        city = city.options[city.selectedIndex].text;
        const adress = document.getElementById('company_adress').value;
        const email = document.getElementById('company_email').value;
        const phone = document.getElementById('company_phone').value;
        //Validations
        if (name == "" || city_id == 0 || adress == "" || email == "" || phone == "") {
            alert('Los campos marcados con *(Asterisco) son obligatorios');
            throw Error ('Los campos marcados con *(Asterisco) son obligatorios');
        }
        if (!/..@../.test(email)) {
            alert('El email ingresado es inválido');
            throw Error ('El email ingresado es inválido');
        }
        let response = await postCompany(name, city, city_id, adress, email, phone);
        console.log(response);
        alert(response);
        $('#modal_add_company').modal('hide');
        $("#table_companies tbody").html("");
        fillCompanies();
    } catch (error) {console.error(error);}
}
/////////////////////////////////////FUNCIONES PARA EDITAR COMPAÑÍAS/////////////////////////////////////
//ENDPOINT PUT Company
async function putCompany(name, adress, email, phone, city, city_id){
    const jwt = sessionStorage.getItem("jwt"); 
    const ID = sessionStorage.getItem("edit_company");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/company',
        {
            method:'PUT',
            body:`{
                "ID":${ID},
                "name":"${name}",
                "adress":"${adress}",
                "email":"${email}",
                "phone":"${phone}",
                "city":"${city}",
                "city_id":"${city_id}"                   
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let edit = await response.json();
        return edit;
    }
}
//SET MODAL to edit company mode
async function edit_company_btn(btn) {
    $('#add_company_btn').html("Guardar Cambios");
    $('#add_company_btn').removeAttr("onclick").attr("onclick", "data_putCompany()");
    $('#add_company_Label').text('Editar Compañía');
    console.log(btn.parentElement.parentElement.getAttribute("data-id"));
    let ID = btn.parentElement.parentElement.getAttribute("data-id");    
    sessionStorage.setItem("edit_company", ID);
    let companies = await getCompanies();
    console.log(companies);
    //AUTOCOMPLETE for company
    companies.forEach(company=>{
        if (company.ID == ID) {
            $("#company_name").val(company.name);
            $("#company_email").val(company.email);
            $("#company_phone").val(company.phone);
            $("#company_adress").val(company.adress);
            let company_select_city = document.getElementById("company_select_city");
            console.log(company_select_city);
            console.log(company.city_id);
            setTimeout(() => {company_select_city.querySelector(`[value="${company.city_id}"]`).setAttribute("selected", true);}, 500);
        }
    })
}
//CLEAN MODAL COMPANY after autofill
$('#modal_add_company').on('hidden.bs.modal', function (e) {
    $("#company_name").val("");
    $("#company_email").val("");
    $("#company_phone").val("");
    $("#company_adress").val("");
    $("#company_select_city").html("");
  })

//PUT data to companies
async function data_putCompany(){
    try {
        const name = document.getElementById('company_name').value;
        const email = document.getElementById('company_email').value;
        const phone = document.getElementById('company_phone').value;
        const adress = document.getElementById('company_adress').value;
        let city = document.getElementById('company_select_city');
        const city_id = city.value;
        city = city.options[city.selectedIndex].text;
        console.log(name +"\n"+ email +"\n"+ phone +"\n"+ adress +"\n"+ city +"\n"+ city_id);
        //Validations
        if (name == "" || city_id == 0 || adress == "" || email == "" || phone == "") {
            alert('Los campos marcados con *(Asterisco) son obligatorios');
            throw Error ('Los campos marcados con *(Asterisco) son obligatorios');
        }
        if (!/..@../.test(email)) {
            alert('El email ingresado es inválido');
            throw Error ('El email ingresado es inválido');
        }
        let edit = await putCompany(name, adress, email, phone, city, city_id);
        console.log(edit);
        alert(edit);
        $('#modal_add_company').modal('hide');
        $("#table_companies tbody").html("");
        fillCompanies();
    } catch (error) {console.error(error);}
}
/////////////////////////////////////FUNCIONES PARA ELIMINAR COMPAÑÍAS/////////////////////////////////////
//ENDPOINT Eliminate Company
async function eliminate_company(){
    const jwt = sessionStorage.getItem("jwt");
    const ID = sessionStorage.getItem("eliminate_company");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/company/'+ID,
        {
            method:'DELETE',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let eliminado = await response.json();
        console.log(eliminado);
        $('#table_companies').find(`[data-id='${ID}']`)[0].remove();
    }
}
//Setting ID to eliminate a company
function eliminate_company_icon(btn) {
    console.log(btn.parentElement.parentElement.getAttribute("data-id"));
    let ID = btn.parentElement.parentElement.getAttribute("data-id");    
    sessionStorage.setItem("eliminate_company", ID); 
}
/////////////////////////////////////FUNCIONES DE LA SECCIÓN REGION-CIUDAD/////////////////////////////////////
/////////////////////////////////////JSTREE FUNCTIONS/////////////////////////////////////
window.onload = call_tree();
async function call_tree() {
    const data = await treeNodes();
    $('#location_tree')
    .on('changed.jstree', function (e, data) {
        const node_selected = data.instance.get_node(data.selected[0]).text;
        const node_dataID = $(data.instance.get_node(data.selected[0]).li_attr).attr("data-id");
        const node_dataFk = $(data.instance.get_node(data.selected[0]).li_attr).attr("data-fk");
        const node_dataLocation = $(data.instance.get_node(data.selected[0]).li_attr).attr("data-location");
        sessionStorage.setItem("node_selected", node_selected);
        sessionStorage.setItem("data-id", node_dataID);
        sessionStorage.setItem("data-fk", node_dataFk);
        sessionStorage.setItem("data-location", node_dataLocation);
        $('#event_result').html('Seleccionado: ' + node_selected);
      })
    .jstree({ 'core' : {
        'data' : data,
        'themes': {
            "dots": false,
            "icons": false
        }
    }, "plugins":["wholerow","state"] });
}
//Fill JSTree Nodes
async function treeNodes() {
    const regions = await getRegions();
    const countries = await getCountries();
    const cities = await getCities();
    let data = [];
    regions.forEach(region => {
        const name_region = region.name;
        const region_ID = region.ID;
        data.push({ "id" : name_region, "parent" : "#", "text" : name_region, "li_attr":{"data-id": region_ID, "data-location":"region", "class":"list-group-item list-group-item-action bg-light"}});
        countries.forEach(country=>{
            if (region_ID == country.region_id) {
                const name_country = country.name;
                const country_ID = country.ID;
                data.push({ "id" : name_country, "parent" : name_region, "text" : name_country, "li_attr":{"data-id": country_ID, "data-location":"country", "data-fk": region_ID,"class":"list-group-item list-group-item-action bg-white"}});
                cities.forEach(city => {
                    if (country_ID == city.country_id) {
                        const name_city = city.name;
                        const city_ID = city.ID;
                        data.push({ "id" : name_city, "parent" : name_country, "text" : name_city, "li_attr":{"data-id": city_ID, "data-location":"city", "data-fk": country_ID}});     
                    }
                });
            }
        })
    });
    return data;
}
/////////////////////////////////////FUNCIONES PARA EDITAR REGION/CIUDAD/////////////////////////////////////
//AUTOCOMPLETE MODAL location edit
function auto_location_edit() {
    $("#location_name").val(sessionStorage.getItem("node_selected"));
}
//ENDPOINT PUT Location
async function put_location(){
    try {
        const jwt = sessionStorage.getItem("jwt");
        const ID = sessionStorage.getItem('data-id');
        const name = document.getElementById('location_name').value;
        if (name == "") {
            throw Error ('El campo nombre* está vacio, la solicitud no se puede procesar');
        }
        if(jwt!=null){
            let response = await fetch('http://localhost:3000/'+sessionStorage.getItem("data-location"),
                {
                method:'PUT',
                body:`{
                    "ID":${ID},
                    "name":"${name}"
                }`, 
                headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
            });
            let edit = await response.json();
            console.log(edit);
            alert(edit);
            $('#modal_location_edit').modal('hide');
            const new_data = await treeNodes();
            $('#location_tree').jstree(true).settings.core.data = new_data;
            $('#location_tree').jstree(true).refresh();
        }
    } catch (error) {
        console.error(error);
        alert(error);
    }
    
}
/////////////////////////////////////FUNCIONES PARA ELIMINAR REGION/CIUDAD/////////////////////////////////////
//ENDPOINT DELETE location
async function del_location() {
    const jwt = sessionStorage.getItem("jwt");
    const ID = sessionStorage.getItem("data-id");
    const location = sessionStorage.getItem("data-location");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/'+location+'/'+ID,
        {
            method:'DELETE',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let eliminado = await response.json();
        console.log(eliminado);
        alert(eliminado);
        $('#modal_location_delete').modal('hide');
        const new_data = await treeNodes();
        $('#location_tree').jstree(true).settings.core.data = new_data;
        $('#location_tree').jstree(true).refresh();
    }
}

//BTN Dropdown for Region - MODAL Set
function dropdown_region() {
    document.getElementById('container_region').classList.add("d-none");
    document.getElementById('container_country').classList.add("d-none");
    document.getElementById('location_label').innerHTML = 'Región<span class="text-danger"> *</span>';
    $('#post_location').attr("onclick", "btn_post_region()");
}
//BTN Dropdown for País - MODAL Set
async function dropdown_country() {
    document.getElementById('container_region').classList.remove("d-none");
    document.getElementById('container_country').classList.add("d-none");
    document.getElementById('location_label').innerHTML = 'País<span class="text-danger"> *</span>';
    const regions = await getRegions();
    $('#location_select_region').html("");
    $('#location_select_region').append(`<option value="0">Seleccione una región</option>`);
    regions.forEach(region => {
        const name = region.name;
        const ID = region.ID;
        $('#location_select_region').append(`<option value="${ID}">${name}</option>`);
    });
    $('#post_location').attr("onclick", "btn_post_country()");

}
//BTN Dropdown for Ciudad - MODAL Set
async function dropdown_city() {
    document.getElementById('container_region').classList.remove("d-none");
    document.getElementById('container_country').classList.remove("d-none");
    document.getElementById('location_label').innerHTML = 'Ciudad<span class="text-danger"> *</span>';
    $('#post_location').attr("onclick", "btn_post_city()");
    const regions = await getRegions();
    $('#location_select_region').html("");
    $('#location_select_region').append(`<option value="0">Seleccione una región</option>`);
    regions.forEach(region => {
        const name = region.name;
        const ID = region.ID;
        $('#location_select_region').append(`<option value="${ID}">${name}</option>`);
    });
    document.getElementById("location_select_region").onchange = async function () {
        const region = document.getElementById('location_select_region').value;
        $('#location_select_country').html('');
        $('#location_select_country').append(`<option value="0">Seleccione un país</option>`);
        const countries = await getCountries();
        countries.forEach(country => {
            if (country.region_id == region) {
                const name = country.name;
                const ID = country.ID;
                $('#location_select_country').append(`<option value="${ID}">${name}</option>`) 
            }
        });
    }
}
/////////////////////////////////////FUNCIONES PARA AGREGAR REGION/CIUDAD/////////////////////////////////////
//ENDPOINT POST Region
async function post_region(name) {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/region',
        {
            method:'POST',
            body:`{
                "name":"${name}"
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let region = await response.json();
        return region;
    }
}
//Getting data to POST Region
async function btn_post_region() {
    try {
        const name = document.getElementById('location_input').value;
        if (!name) {
            throw Error ('El campo Región es obligatorio');
        }
        const response = await post_region(name);
        console.log(response);
        alert(response);
        $('#modal_location_add').modal('hide');
        const new_data = await treeNodes();
        $('#location_tree').jstree(true).settings.core.data = new_data;
        $('#location_tree').jstree(true).refresh();
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
//ENDPOINT POST Country
async function post_country(name, region_id) {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/country',
        {
            method:'POST',
            body:`{
                "region_id":"${region_id}",
                "name":"${name}"
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let country = await response.json();
        return country;
    }
}
//Getting data to POST Country
async function btn_post_country() {
    try {
        const name = document.getElementById('location_input').value;
        const region_id = document.getElementById('location_select_region').value;
        if (region_id == 0) {
            throw Error ('Debe seleccionar una región');
        }
        if (!name) {
            throw Error ('El campo País es obligatorio');
        }
        const response = await post_country(name, region_id);
        console.log(response);
        alert(response);
        $('#modal_location_add').modal('hide');
        const new_data = await treeNodes();
        $('#location_tree').jstree(true).settings.core.data = new_data;
        $('#location_tree').jstree(true).refresh();
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
//ENDPOINT POST City
async function post_city(name, country_id) {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/city',
        {
            method:'POST',
            body:`{
                "country_id":"${country_id}",
                "name":"${name}"
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let city = await response.json();
        return city;
    }
}
//Getting data to POST City
async function btn_post_city() {
    try {
        const name = document.getElementById('location_input').value;
        const region_id = document.getElementById('location_select_region').value;
        const country_id = document.getElementById('location_select_country').value;
        if (region_id == 0) {
            throw Error ('Debe seleccionar una región');
        }
        if (country_id == 0) {
            throw Error ('Debe seleccionar un país');
        }
        if (!name) {
            throw Error ('El campo Ciudad es obligatorio');
        }
        const response = await post_city(name, country_id);
        console.log(response);
        alert(response);
        $('#modal_location_add').modal('hide');
        const new_data = await treeNodes();
        $('#location_tree').jstree(true).settings.core.data = new_data;
        $('#location_tree').jstree(true).refresh();
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
/////////////////////////////////////FUNCIONES DE LA SECCION USUARIOS/////////////////////////////////////
/////////////////////////////////////FUNTIONS TO FILL TABLE DATA/////////////////////////////////////
window.onload = fillUsers();
//Fill Company Table
async function fillUsers() {
    const users = await getUsers();
    users.forEach(user =>{
        const ID = user.ID;
        const name = user.name;
        const last_name = user.last_name;
        const email = user.email;
        const profile = user.profile;
        tableUsers(ID, name, last_name, email, profile);
    })
}
function tableUsers(ID, name, last_name, email, profile) {
    $("#table_users")
        .append($(`<tr data-id="${ID}">`)
            .append(`<td scope="row" class="pl-5"><p class="m-0">${name}</p></td>`)
            .append(`<td><p class="m-0">${last_name}</p></td>`)
            .append(`<td><p class="m-0">${email}</p></td>`)
            .append(`<td><p class="m-0">${profile}</p></td>`)
            .append($('<td class="align-middle text-center">')
                .append('<button class="btn btn-info mr-1" data-toggle="modal" data-target="#modal_user_add" title="Editar" onclick="btn_edit_user(this)"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button>')
                .append('<button class="btn btn-info" data-toggle="modal" data-target="#modal_user_delete" onclick="btn_delete_user(this)" title="Eliminar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>')
        )
    );
}
//ENDPOINT GET Users
async function getUsers() {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/users',
        {
            method:'GET',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let users = await response.json();
        return users;
    }
}
/////////////////////////////////////FUNTIONS TO POST/CREATE A NEW USER/////////////////////////////////////
//SET MODAL to POST
function btn_post_user() {
    $('#post_user').html("Crear Usuario");
    $('#post_user').removeAttr("onclick").attr("onclick", "data_post_user()");
    $('#modal_user_add_Title').text('Crear Usuario');
    document.getElementById('user_name').value = '';
    document.getElementById('user_lastName').value = '';
    document.getElementById('user_email').value = '';
    document.getElementById('user_profile').value = '0';
    document.getElementById('user_password').value = '';
    document.getElementById('user_password_match').value = '';
}
//ENDPOINT POST User
async function post_user(name, last_name, email, profile, password) {
    const jwt = sessionStorage.getItem("jwt");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/signIn',
        {
            method:'POST',
            body:`{
                "name":"${name}",
                "last_name":"${last_name}",
                "email":"${email}",
                "profile":"${profile}",
                "password":"${password}"
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let new_user = await response.json();
        return new_user;
    }
}
//Getting data to do a POST on user
async function data_post_user() {
    try {
        const name = document.getElementById('user_name').value;
        const last_name = document.getElementById('user_lastName').value;
        const email = document.getElementById('user_email').value;
        const profile = document.getElementById('user_profile').value;
        const password = document.getElementById('user_password').value;
        const password_match = document.getElementById('user_password_match').value;
        //Validating data
        if (!name || !last_name || !email || !profile || !password) {
            throw Error ('Los campos marcados con *(Asterisco) son obligatorios');
        }
        if (!(password == password_match)) {
            throw Error ('Las contraseñas no coinciden');
        }
        const new_user = await post_user(name, last_name, email, profile, password);
        console.log(new_user);
        alert(new_user);
        $('#modal_user_add').modal('hide');
        $("#table_users tbody").html("");
        fillUsers();
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
/////////////////////////////////////FUNTIONS TO EDIT A USER/////////////////////////////////////
//SET MODAL to PUT and AUTOCOMPLETE
async function btn_edit_user(btn) {
    $('#post_user').html("Guardar Cambios");
    $('#post_user').removeAttr("onclick").attr("onclick", "data_put_user()");
    $('#modal_user_add_Title').text('Editar Usuario');
    console.log(btn.parentElement.parentElement.getAttribute("data-id"));
    let ID = btn.parentElement.parentElement.getAttribute("data-id");    
    sessionStorage.setItem("edit_user", ID); 
    const users = await getUsers();
    users.forEach(user =>{
        if (user.ID == ID) {
            document.getElementById('user_name').value = user.name;
            document.getElementById('user_lastName').value = user.last_name;
            document.getElementById('user_email').value = user.email;
            document.getElementById('user_profile').value = user.profile;
            document.getElementById('user_password').value = user.password;
            document.getElementById('user_password_match').value = user.password;
        }
    });
}
//ENDPOINT PUT User
async function put_user(name, last_name, email, profile, password){
    const jwt = sessionStorage.getItem("jwt"); 
    const ID = sessionStorage.getItem("edit_user");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/user',
        {
            method:'PUT',
            body:`{
                "ID":${ID},
                "name":"${name}",
                "last_name":"${last_name}",
                "email":"${email}",
                "profile":"${profile}",
                "password":"${password}"               
            }`,
            headers:{"Authorization":"Bearer "+jwt, "Content-Type":"application/json"}
        });
        let edit = await response.json();
        return edit;
    }
}
//Getting data to PUT User
async function data_put_user() {
    try {
        const name = document.getElementById('user_name').value;
        const last_name = document.getElementById('user_lastName').value;
        const email = document.getElementById('user_email').value;
        const profile = document.getElementById('user_profile').value;
        const password = document.getElementById('user_password').value;
        const password_match = document.getElementById('user_password_match').value;
        //Validation
        if (!name || !last_name || !email || !profile || !password) {
            throw Error ('Los campos marcados con *(Asterisco) son obligatorios');
        }
        if (!(password == password_match)) {
            throw Error ('Las contraseñas no coinciden');
        }
        const user_edit = await put_user(name, last_name, email, profile, password);
        console.log(user_edit);
        alert(user_edit);
        $('#modal_user_add').modal('hide');
        $("#table_users tbody").html("");
        fillUsers();
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
/////////////////////////////////////FUNTIONS TO DELETE A USER/////////////////////////////////////
//ENDPOINT DELETE User
async function delete_user() {
    const jwt = sessionStorage.getItem("jwt");
    const ID = sessionStorage.getItem("eliminate_user");
    if(jwt!=null){
        let response = await fetch('http://localhost:3000/user/'+ID,
        {
            method:'DELETE',
            headers:{"Authorization":"Bearer "+jwt}
        });
        let eliminado = await response.json();
        console.log(eliminado);
        $('#table_users').find(`[data-id='${ID}']`)[0].remove();
        $('#modal_user_add').modal('hide');
    }
}
//Getting ID to DELETE
function btn_delete_user(btn) {
    console.log(btn.parentElement.parentElement.getAttribute("data-id"));
    let ID = btn.parentElement.parentElement.getAttribute("data-id");    
    sessionStorage.setItem("eliminate_user", ID);
}



function pruebas() {
    treeNodes();
}
