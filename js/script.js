const show_results = () => {
    let searchText = document.getElementById('search_input').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => veiwResults(data.data));
}
const veiwResults = data => {
    const cardsDiv = document.getElementById('result_cards');
    for (let phones of data) {
        const card = document.createElement('div');
        card.classList = "col";
        card.innerHTML = `
        <div class="card h-100 text-center pt-4">
            <img src="${phones.image}" class="card-img-top w-50 m-auto"  alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phones.phone_name} </h5>
                <p class="card-text">Brand: ${phones.brand} </p>
                <button id="detailsBtn" onclick="show_details('${phones.slug}')" type="button" class="btn btn-primary">Show details</button>
            </div>
        </div>
      `;
        cardsDiv.appendChild(card);  
    }
     
}
const show_details = (slug) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(data => console.log(data.data));
}
const veiwDetails = (data) => 
