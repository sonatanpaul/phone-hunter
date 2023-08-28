const loadPhone = async (searchText = "phone") => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json()
    const phones = data.data;
    displayPhones(phones)
}


const displayPhones = phones => {
    const phoneContainer = document.getElementById("phone-container")
    phoneContainer.textContent = "";

    const showAllButton = document.getElementById("show-all-button")
    if(phones.length > 10){
        showAllButton.classList.remove("hidden")
    } else{
        showAllButton.classList.add("hidden")
    }

    phones = phones.slice(0, 12);



    phones.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = `card w-96 bg-gray-100 shadow-2xl `
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
            </div>
        `;

        phoneContainer.appendChild(phoneCard);
    });

    toggleloading(false);
}


const handleShowDetail = async (id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);

const phoneName = document.getElementById("show-datail-phone-name");
phoneName.innerText = phone.name;

const showDetailContainer = document.getElementById ("show-detail-container");
showDetailContainer.innerHTML = `
    <p class="mt-10"> <span class="font-bold">Storage: </span> ${phone.mainFeatures.storage}</p>
    <p class="mt-4"> <span class="font-bold"> GPS: </span> 
    ${phone.others?.GPS || "No GPS"} </p>
    <p class="mt-4"> <span class="font-bold">releaseDate: </span> 
    ${phone.releaseDate || "No Data"} </p>


`



 show_details_modal.showModal();

}


const handleSearch = () => {
    toggleloading(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText);
    searchField.value = "";
}


const toggleloading = (isLoading) =>{
    const loadingsipnner = document.getElementById("loading-spinner");
   if(isLoading){
    loadingsipnner.classList.remove("hidden");
   }else(
    loadingsipnner.classList.add("hidden")
   )
}






loadPhone();