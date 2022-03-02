const spinnerStatus = (status) => {
    document.getElementById('spinner').style.display=status;
}
spinnerStatus('none');
// getting the text from search fiels 
let searchArea = document.getElementById('search_input');
// getting datas from API 
const show_results = () => {
    spinnerStatus('block');
    let searchText = searchArea.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => veiwResults(data.data));
}
// viewing the results 
const veiwResults = data => {
    const cardsDiv = document.getElementById('result_cards');  //result div 
    cardsDiv.textContent = ""; 
    detailsDiv.textContent = '';
    
    if (data.length == 0) {  
        spinnerStatus('block');
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
        <div class="card align-items-center text-white bg-danger mb-3">
        <div class="card-body">
          <h5 class="card-title">No Product found named "${searchArea.value}"</h5>
        </div>
      </div>
      `;
        cardsDiv.appendChild(errorDiv);
        searchArea.value = '';
        spinnerStatus('none');
    } else {
        spinnerStatus('block');
        document.getElementById('loadMoreDiv').textContent = '';
        for (let phones of data.slice(0, 20)) {
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
        searchArea.value = '';
        }
        const LoadMoreDiv = document.getElementById('loadMoreDiv');
        const seeMoreButton = document.createElement('div');
        seeMoreButton.innerHTML = ` <button  class="btn btn-primary text-white my-5" id="SeeMoreBtn">Load More</button>`; 
        LoadMoreDiv.appendChild(seeMoreButton);
        const GetmoreBtn = document.getElementById('SeeMoreBtn');
        GetmoreBtn.addEventListener('click', function () {
            spinnerStatus('block');
            cardsDiv.textContent = '';
            for (let phones of data) {
                spinnerStatus('block');
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
                searchArea.value = '';
                spinnerStatus('none');
            }
            spinnerStatus('none');
        });
    }
    spinnerStatus('none');
    }     

    
const show_details = (slug) => {
    spinnerStatus('block');
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(data => veiwDetails(data.data));
}
const detailsDiv = document.getElementById('details_info');
const veiwDetails = (data) => { 
    detailsDiv.textContent = '';
    const phoneDetails = document.createElement('div');
    phoneDetails.classList ="row g-0";
    phoneDetails.innerHTML = `
  
            <div class="col-md-4 d-flex align-items-center ps-3">
                <img src="${data.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 align-items-center">
                <div class="card-body">
                    <h4 class="text-danger card-title">${data.name?data.name:'Name information is not available'}</h4>
                    <h5 class="card-title text-primary">Main Features :</h5>
                    <p class="card-text">Chipset: ${data.mainFeatures.chipSet?data.mainFeatures.chipSet:'Chipset information not available'}</p>
                    <p class="card-text">display Size: ${data.mainFeatures.displaySize?data.mainFeatures.displaySize:'displaySize information not available'}</p>
                    <p class="card-text">Memory: ${data.mainFeatures.memory?data.mainFeatures.memory:'Memory Information not available'}</p>
                    <p class="card-text">Storage: ${data.mainFeatures.storage?data.mainFeatures.storage:'Storage Information not available'}</p>
                    <h5 class="card-title text-primary">Sensors :</h5>
                    <div id="sensor_div"> 
                             
                    </div>
                    <h5 class="card-title text-primary">Others :</h5>
                    <p class="card-text">Bluetooth: ${data.others?data.others.Bluetooth:'Bluetooth Information not available'}</p>
                    <p class="card-text">GPS: ${data.others?data.others.GPS:'GPS information not available'}</p>
                    <p class="card-text">NFC: ${data.others?data.others.NFC:'NFC information not available'}</p>
                    <p class="card-text">Radio: ${data.others?data.others.Radio:'Radio information not available'}</p>
                    <p class="card-text">USB: ${data.others?data.others.USB:'USB information not available'}</p>
                    <p class="card-text">WLAN: ${data.others?data.others.WLAN:'WALN Information not available'}</p>
                    <p  class=" fw-bold text-success">${data.releaseDate?data.releaseDate:'Release Date Information not available'}</p>        
                </div>
            </div>
    `;
   
    detailsDiv.appendChild(phoneDetails);
    searchArea.value = '';
    const sensors = data.mainFeatures.sensors;
    for (sensorName of sensors) {
        const sensorDiv = document.getElementById('sensor_div');
        console.log(sensorDiv);
        const sensorList = document.createElement('ul');
        sensorList.innerHTML= `<li>${sensorName}</li>`;
        sensorDiv.appendChild(sensorList);
    }
    spinnerStatus('none');
}

 