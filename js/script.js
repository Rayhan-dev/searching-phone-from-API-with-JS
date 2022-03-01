const show_results = () => {
    let searchText = document.getElementById('search_input').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => veiwResults(data.data));
}
const veiwResults = data => {
    const cardsDiv = document.getElementById('result_cards');
    cardsDiv.textContent = "";
    for (let phones of data) {
        const card = document.createElement('div');
        card.classList = "col";
        card.innerHTML = `
        <div class="card h-100 text-center pt-4">
            <img src="${phones.image}" class="card-img-top w-50 m-auto"  alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phones.phone_name} </h5>
                <p class="card-text">Brand: ${phones.brand} </p>
                <a href="#details_info" id="detailsBtn"  onclick="show_details('${phones.slug}')" type="button" class="btn btn-primary">Show details</a>
            </div>
        </div>
      `;
        cardsDiv.appendChild(card);  
    }
     
}
const show_details = (slug) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(data => veiwDetails(data.data));
}
const veiwDetails = (data) => { 
    const detailsDiv = document.getElementById('details_info');
    detailsDiv.textContent = '';
    const phoneDetails = document.createElement('div');
    phoneDetails.classList ="row g-0";
    phoneDetails.innerHTML = `
  
            <div class="col-md-4 d-flex align-items-center ps-3">
                <img src="${data.image} " class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 align-items-center">
                <div class="card-body">
                    <h4 class="card-title">${data.name}</h4>
                    <h5 class="card-title">Main Features :</h5>
                    <p class="card-text">Chipset: ${data.mainFeatures.chipSet}</p>
                    <p class="card-text">display Size: ${data.mainFeatures.displaySize}</p>
                    <p class="card-text">Chipset: ${data.mainFeatures.chipSet}</p>
                    <p class="card-text">Memory: ${data.mainFeatures.memory}</p>
                    <p class="card-text">Storage: ${data.mainFeatures.storage}</p>
                    <h5 class="card-title">Sensors :</h5>
                    <div id="sensor_div"> 
                             
                    </div>
                    <h5 class="card-title">Others :</h5>
                    <p class="card-text">Bluetooth: ${data.others.Bluetooth}</p>
                    <p class="card-text">GPS: ${data.others.GPS}</p>
                    <p class="card-text">NFC: ${data.others.NFC}</p>
                    <p class="card-text">Radio: ${data.others.Radio}</p>
                    <p class="card-text">USB: ${data.others.USB}</p>
                    <p class="card-text">WLAN: ${data.others.WLAN}</p>
                    <p class="card-text"><small class="text-muted">${data.releaseDate}</small></p>        
                </div>
            </div>
    `;
   
    detailsDiv.appendChild(phoneDetails);
    const sensors = data.mainFeatures.sensors;
    for (sensorName of sensors) {
        const sensorDiv = document.getElementById('sensor_div');
        console.log(sensorDiv);
        const sensorList = document.createElement('ul');
        sensorList.innerHTML= `<li>${sensorName}</li>`;
        sensorDiv.appendChild(sensorList);
    }
}
 