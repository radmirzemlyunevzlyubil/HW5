const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');
const productList = document.getElementById('productList');
const genderSortSelect = document.getElementById('genderSortSelect'); 

let productsData = [];

fetch('http://localhost:3000/categories')
    .then(res => res.json())
    .then(categories => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    });

const fetchProducts = (gender = null) => {
    let url = 'http://localhost:3000/products';
    
    if (gender) {
        url += `?gender=${gender}`;
    }
    
    fetch(url)
        .then(res => res.json())
        .then(products => {
            productsData = products;
            displayProducts(products);
        });
};

const displayProducts = (product) => {
    productList.innerHTML = '';
    product.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="product">
            <div class="product-image">
            <img src="${product.image}"/>
            </div>
            <div class="product-details">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="product-price">${product.price.toFixed(2)}</span>
            </div>
            </div>
            `;
        productList.appendChild(li);
    });
};

fetchProducts();

genderSortSelect.addEventListener('change', () => {
    const genderSortingOption = genderSortSelect.value;
    fetchProducts(genderSortingOption);
});

sortSelect.addEventListener('change', () => {
    const sortingOption = sortSelect.value;
    let sortedProducts = [...productsData];

    if (sortingOption === 'lowToHigh') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortingOption === 'highToLow') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    displayProducts(sortedProducts);
});

categorySelect.addEventListener('change', () => {
    const categoryId = categorySelect.value;
    const url = categoryId ? `http://localhost:3000/products?category_id=${categoryId}` : 'http://localhost:3000/products';

    fetch(url)
        .then(res => res.json())
        .then(products => {
            productsData = products;
            displayProducts(products);
        });
});
