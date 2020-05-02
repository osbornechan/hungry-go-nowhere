let fairprice = document.querySelector('#fairprice');
let coldStorage = document.querySelector('#coldStorage');
let redMart = document.querySelector('#redMart');

let products = document.querySelectorAll('.product-row')

products.forEach(product => {
    console.log(product.classList.value)
    if (product.classList.value.includes('Fairprice')) {
        fairprice.appendChild(product);
    } else if (product.classList.value.includes('Cold Storage')) {
        coldStorage.appendChild(product);
    } else if (product.classList.value.includes('RedMart')) {
        redMart.appendChild(product);
    }
})