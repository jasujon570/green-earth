const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

const loadAllTree = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => displayTree(json.plants));
};

const loadPlants = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickCat = document.getElementById(`cat-${id}`);
      clickCat.classList.add("active");
      displayTree(data.plants);
    });
};

const loadCardDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayCardDetails(details.plants);
};



const displayCardDetails = (card) =>{
    const displayPlantDetails = document.getElementById('plant-card-details');
    displayPlantDetails.innerHTML = `
        <div>
            <img class="w-full h-[200px] rounded-lg mb-3" src="${card.image}" alt="${card.name}">
        </div>
        <div class="flex flex-col flex-grow my-3">
            <h3 onclick="loadCardDetails(${card.id})" class="font-semibold text-xl cursor-pointer mb-3">${card.name}</h3>
            <p class="text-[#1F2937]">${card.description}</p>
            <div class="flex justify-between my-3">
                <button class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-[400px]">${card.category}</button>
                <p><span>৳</span>${card.price}</p>
            </div>
        </div>     
        <div>
            <button class="w-full bg-[#15803D] text-white font-medium py-3 rounded-[999px] mt-2">Add to Cart</button>
        </div>  
    `
    ;



    document.getElementById('plant_card_modal').showModal();
}

const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".cat-btn");
  categoryButtons.forEach((btn) => btn.classList.remove("active"));
};

const displayTree = (plants) => {
  const treeContainer = document.getElementById("tree-container");
  treeContainer.innerHTML = "";

  plants.forEach((plant) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "bg-white",
      "w-[343px]",
      "p-4",
      "rounded-lg",
      "flex",
      "flex-col"
    );

    cardDiv.innerHTML = `
        <img class="w-full h-[200px] rounded-lg mb-3" src="${plant.image}" alt="${plant.name}">
        <div class="flex flex-col flex-grow">
            <h3 onclick="loadCardDetails(${plant.id})" class="font-semibold text-xl cursor-pointer">${plant.name}</h3>
            <p class="text-[#1F2937] py-5">${plant.description}</p>
            <div class="mt-auto">
                <div class="flex justify-between mb-3">
                    <button class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-[400px]">${plant.category}</button>
                    <p><span>৳</span>${plant.price}</p>
                </div>
                <button class="w-full bg-[#15803D] text-white font-medium py-3 rounded-[999px] mt-2">Add to Cart</button>
            </div>
        </div>
            
        `;

    treeContainer.append(cardDiv);
  });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  for (const category of categories) {
    const categoryList = document.createElement("div");
    categoryList.innerHTML = `
            <button id="cat-${category.id}" onclick="loadPlants(${category.id})" class="category-btn w-full text-left p-2 rounded cat-btn"
            >
                ${category.category_name}
            </button>
        `;

    categoriesContainer.append(categoryList);
  }
};



loadCategories();
loadAllTree();