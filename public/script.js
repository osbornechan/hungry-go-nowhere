const coldStorage = document.getElementById('Cold Storage');
const redMart = document.querySelector('#RedMart');
const fairprice = document.querySelector('#Fairprice');

const supermarketProducts = document.querySelectorAll('.supermarket-product')

supermarketProducts.forEach(product => {
    if (product.classList.value.includes('Fairprice')) {
        fairprice.appendChild(product);
    } else if (product.classList.value.includes('Cold Storage')) {
        coldStorage.appendChild(product);
    } else if (product.classList.value.includes('RedMart')) {
        redMart.appendChild(product);
    }
})