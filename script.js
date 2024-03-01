// all common DOM selector collections
const gadgetsCardContainer = document.getElementById("gadgetsCardContainer");
const searchField = document.getElementById("searchField");
const foundItems = document.getElementById("foundItems");
const loadingIcon = document.getElementById("loadingIcon");
const seeAllField = document.getElementById("seeAllField");
const seeAllButton = document.getElementById("seeAllButton");
const modalContainer = document.getElementById('modalContainer')


// fetch and load data from API
const loadData = async (search) => {
    loadingMoment(true)
    const load = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await load.json()

    // clear before displayed gadgets when load new Data
    foundItems.innerText = ``
    if (data.data.length) {
        const itemsFound = document.createElement("h2")
        itemsFound.classList.add("text-xl", "text-green-600")
        itemsFound.innerText = `${data.data.length} items found`
        foundItems.appendChild(itemsFound)

        // if gadgets found more than 10. Display 10 item and See all button will visible
        if (data.data.length >= 10) {
            createGadgetCard(data.data.slice(0, 10))
            seeAllField.classList.remove("hidden")
        }
        else {
            createGadgetCard(data.data)
            seeAllField.classList.add("hidden")
        }
    }
    else {
        const notFound = document.createElement("h2")
        notFound.classList.add("text-xl", "text-red-600")
        notFound.innerText = "No items found. Please search again"
        foundItems.appendChild(notFound)
        loadingMoment(false)
    }

    // show all gadgets when see all button clicked
    seeAllButton.addEventListener("click", function () {
        gadgetsCardContainer.innerHTML = ``
        createGadgetCard(data.data)
        seeAllField.classList.add("hidden")
    })
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
        <button class="btn btn-active btn-accent w-full text-white font-bold text-xl" onclick="loadDetails('${gadget.slug}')">Details</button>
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

// show or hide the loading icon
const loadingMoment = (loadingState) => {
    if (loadingState) {
        loadingIcon.classList.remove("hidden")
    }
    else {
        loadingIcon.classList.add("hidden")
    }
}


// Display details of the clicked gadgets for view Details
const loadDetails = async (id) => {
    const API = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const Details = await API.json()
    const { data } = Details
    console.log(data)

    modalContainer.innerHTML = ``
    const div = document.createElement('div')
    div.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h2 class="font-bold text-3xl mb-6">${data.name}</h2>
            <div>
                <ul>
                    <span class="font-bold text-lg text-green-600">Mainfeatures:</span>
                    <li class=" text-black text-normal mt-3">
                        <span class="text-yellow-800 font-bold mt-8">Chipset: </span>${data.mainFeatures.chipSet}
                    </li>
                    <li class=" text-black text-normal mt-3">
                        <span class="text-yellow-800 font-bold mt-8">Display Size: </span>${data.mainFeatures.displaySize}
                    </li>
                    <li class=" text-black text-normal mt-3">
                        <span class="text-yellow-800 font-bold mt-8">Memory: </span>${data.mainFeatures.memory}
                    </li>
                    <li class=" text-black text-normal mt-3">
                        <span class="text-yellow-800 font-bold mt-8">Storage: </span>${data.mainFeatures.storage}
                    </li>
                </ul>
            </div>
            <p class="text-blue-500 font-medium mt-7">${data.releaseDate}</p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
    `
    modalContainer.appendChild(div)
    my_modal_5.showModal()
}

// display the details of clicked gadget


// load and display initial gadgets for home page
loadData("iphone")