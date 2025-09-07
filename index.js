const loadCategories=()=> {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then(json => displayCategories(json.categories))
}
const loadPlants = (id)=> {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then((res) => res.json())
    .then(data => displayTree(data.plants))
}

const displayTree = (plants) => {
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = '';

    plants.forEach((plant) => {
        console.log(plant);
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("bg-white", "w-[343px]", "p-4", "rounded-lg");

        cardDiv.innerHTML = `
            <img class="w-full h-[187px] rounded-lg" src="${plant.image}" alt="${plant.name}">
            <div>
                <h3 class="font-semibold text-xl">${plant.name}</h3>
                <p class="text-[#1F2937]">${plant.description}</p>
                <div class="flex justify-between">
                    <button class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-[400px]">${plant.category}</button>
                    <p><span>৳</span>${plant.price}</p>
                </div>
                <button class="w-full bg-[#15803D] text-white font-medium py-3 rounded-[999px]">Add to Cart</button>
            </div>
            
        `;

        treeContainer.append(cardDiv);

    })
}


const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container')
    categoriesContainer.innerHTML = '';

    for (const category of categories) {
        console.log(category);
        const categoryList = document.createElement("div");
        categoryList.innerHTML = `
            <button onclick="loadPlants(${category.id})" class="category-btn w-full text-left p-2 rounded hover:bg-green-100 focus:bg-green-600 focus:text-white"
            >
                ${category.category_name}
            </button>
        `;


        categoriesContainer.append(categoryList);
    }
}











loadCategories();