// all common DOM selector collections
const gadgetsCardContainer = document.getElementById("gadgetsCardContainer");
const searchField = document.getElementById("searchField");
const foundItems = document.getElementById("foundItems");
const loadingIcon = document.getElementById("loadingIcon");

// fetch and load data from API
const loadData = async (search) => {
    loadingMoment(true)
    const load = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await load.json()

    // clear the found items initially
    foundItems.innerText = ``
    if (data.data.length) {
        const itemsFound = document.createElement("h2")
        itemsFound.classList.add("text-xl", "text-green-600")
        itemsFound.innerText = `${data.data.length} items found`
        foundItems.appendChild(itemsFound)
        createGadgetCard(data.data);
    }
    else {
        const notFound = document.createElement("h2")
        notFound.classList.add("text-xl", "text-red-600")
        notFound.innerText = "No items found. Please search again"
        foundItems.appendChild(notFound)
        loadingMoment(false)
    }
}


// create display card for every gadget
const createGadgetCard = (data) => {
    data.forEach(gadget => {
        const gadgetsCard = document.createElement("div");
        gadgetsCard.classList.add("px-6", "py-4", "bg-red-100", "rounded-xl")
        gadgetsCard.innerHTML = `
        <img src=${gadget.image} alt="" class="max-w-2/3 mx-auto rounded-2xl">
        <h2 class="my-4 text-4xl font-bold text-amber-800">${gadget.brand}</h2>
        <h3 class="text-2xl font-semibold text-red-800">${gadget.phone_name}</h3>
        <div class="mt-7 mx-auto text-center">
        <button class="btn btn-active btn-accent w-full text-white font-bold text-xl">Details</button>
        </div>
        `
        gadgetsCardContainer.appendChild(gadgetsCard);
        loadingMoment(false)
    });
}

// handle search button
const searchButton = () => {
    if (searchField.value) {
        gadgetsCardContainer.innerHTML = ''
        loadData(searchField.value);
    }
    else {
        alert("search field is empty")
    }
}


const loadingMoment = (loadingState) => {
    if (loadingState) {
        loadingIcon.classList.remove("hidden")
    }
    else {
        loadingIcon.classList.add("hidden")
    }
}

// load and display initial gadgets for home page
loadData("iphone")