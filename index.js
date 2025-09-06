// load categories

const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
   
};

// Display Categories

const displayCategories = (categories) => {
  const categoryList = document.getElementById("categories");
  categoryList.innerHTML = "";

  categories.forEach((cat) => {
    const categoryLi = document.createElement('li');
    categoryLi.innerHTML = `
        <button 
                onclick="loadPlantsByCategory('${cat.category_id}')" 
                class="category-btn w-full text-left p-2 rounded hover:bg-green-100 focus:bg-green-600 focus:text-white"
            >
                ${cat.category_name}
            </button>
    `;
    
    categoryList.appendChild(categoryLi);

  });
};

loadCategories();