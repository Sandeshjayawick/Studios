//adding a event listener  so it can show up when needed
document.getElementById('adress-form').addEventListener('submit', function(event) {
    event.preventDefault(); // this prevents the form from submmiting 

   

    // Show  the contact details box 
    document.querySelector('.contactinfo').style.display = 'block';
});

// adding a another event listen for the contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); //this will prevent the form from submmitng 

    // helps to retive the contact details
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var email = document.getElementById('email').value;

    // vallidation is getting set here 
    if (firstName === "" || lastName === "" || phoneNumber === "" || email === "") {
        alert("Please fill in all contact details.");// shows up if any labels are left blanked 
        return false;
    }

    // created so it can make a random number for the order
    var orderNumber = generateOrderNumber();

    // making the order summery 
    // total price to calcultate the product price
var totalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

//this contrust the order summary when user is done filling all the necessery information
var orderSummaryHTML = `
    <h2>Order Summary</h2>
    <p>Thank you for your purchase! Your order has been successfully placed.</p>
    <p> Track your oder with the link sent to your email </p>
    <p>Order Code: ${orderNumber}</p>
    <p>Order Details:</p>
    <p>Delivery cost: 100</p>
    <ul>
        
        ${cart.map(item => `<li>${item.quantity} x ${productNameFromId(item.id)} (${item.options}) - $${(item.quantity * item.price).toFixed(2)}</li>`).join('')}
    </ul>                                             
    <p>Total: $${totalPrice.toFixed(2)}</p>
`; //items are all added here with the quantity and option and the total of all the products

// Function made  to get  the product names based on its ID
function productNameFromId(productId) {
    switch(productId) {
        case 'product1':
            return 'White Athal T';
        case 'product2':
            return 'Athal 8 Ball T';
        case 'product3':
            return 'Athal Tour T';
        case 'product4':
            return 'AURA NOIR I';
        case 'product5':
            return 'AURA LUMINA I';
        case 'product6':
            return 'Stainless steal bottle WHITE ';
        case 'product7':
            return 'Stainless steel Water bottle BLACK';
        case 'product8':
            return 'ATHAL X THE NORTH FACE';
        default:
            return 'Unknown Product';
    }
}


    
    var customerInfoForm = document.getElementById('contact-form');
    customerInfoForm.insertAdjacentHTML('afterend', orderSummaryHTML);

    

    return false; // Prevent form submission
});

// Function to clear the cart when the clear cart button is pressed 
function clearBasket() {
    // when the clear cart button is clicked a conformation pops up to confirm 
    const confirmation = confirm("Are you sure you want to clear your cart?");

    // if the user press clear cart button and confirms it will clear the cart array and updat the cart summary
    if (confirmation) {
        cart = []; 
        updateCart();
    }
}
 // this check out button works when there are items in the cart. and if there is 0 items it alerts the user
function checkout() {
    if (cart.length === 0) {
        alert('Please add items to your cart before checking out.');
    } else {
        document.querySelector('.paymentbox').style.display = 'block';
    } //when checkout the payment box shows up 
}

// adding functions to valiidate
function validateForm() {
    // Get input values
    var cardNumber = document.getElementById('card-number').value;
    var cardHolder = document.getElementById('card-holder').value;
    var expiry = document.getElementById('expiry').value;
    var ccv = document.getElementById('ccv').value;

    
    var cardNumberPattern = /^[0-9]{16}$/; //this only uses 16 numbers
    var expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; //date
    var ccvPattern = /^[0-9]{3}$/;// 3 numbeers max

    // where validation checks happened 
    if (cardNumber === "" || cardHolder === "" || expiry === "" || ccv === "") {
        alert("Please fill in all required fields.");
        return false; // Prevent form submission
    }

    // checks if card number only has numbers and 16 
    if (!cardNumber.match(cardNumberPattern)) {
        alert("Please enter a valid card number.");
        return false; // Prevent form submission
    }

    // Check if the ex date contains only numbers and has valid format
    if (!expiry.match(expiryPattern)) {
        alert("Please enter a valid expiry date in MM/YY format.");
        return false; // Prevent form submission
    }

    // Check if the C V V contains only numbers
    if (!ccv.match(ccvPattern)) {
        alert("Please enter a valid CVV.");
        return false; // doesnt let submit unless all details are entered correctly 
    }

    // If all validation passes, display under address box 
    document.querySelector('.adressbox').style.display = 'block';

    return false; // Prevent form submission
}

// makes random number for order
function generateOrderNumber() {
    return  + Math.floor(Math.random() * 1000000);
}

// this is the cart array
let cart = [];

// Function to update the cart
function updateCart() {
    let cartItems = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');
    let cartHTML = '';
    let deliveryCost = 100; // the Delivery cost
    let subtotal = 0; // Variable to hold the subtotal without delivery cost
    let total = 0;
    
    cart.forEach(item => {
        let thumbnailSrc = ''; //image for the product
        let productName = ''; //for the name of the product
        
        
        switch(item.id) { //images for the thumbnails 
            case 'product1':
                thumbnailSrc = 'images/logowhitet.png';
                productName = 'White Athal T';
                break;
            case 'product2':
                thumbnailSrc = 'images/Athal 8 Ball.png';
                productName = 'Athal 8 Ball T';
                break;
            case 'product3':
                thumbnailSrc = 'images/Athal tour tshirt.png';
                productName = 'Athal TOUR T';
                break;
            case 'product4':
                thumbnailSrc = 'images/perfume11.png';
                productName = 'AURA NIOR I';
                break;
            case 'product5':
                thumbnailSrc = 'images/perfumef.png';
                productName = 'AURA LIMINA I';
                break;
            case 'product6':
                thumbnailSrc = 'images/stainlesss.png';
                productName = 'WHITE STAINLESS STEEL WATER BOTTLE';
                break;
            case 'product7':
                thumbnailSrc = 'images/stainblack.png';
                productName = 'BLACK STAINLESS STEEL WATER BOTTLE';
                break;
            case 'product8':
                thumbnailSrc = 'images/bag.png';
                productName = 'ATHAL X THE NORTH FACE';
                break;
            default:
               
        }
        
        //helps calculate the quantiy and price
        subtotal += item.quantity * item.price;
        
        // shows whats available in the cart
        cartHTML += `
            <div class="cart-item">
                <img src="${thumbnailSrc}" alt="Product Thumbnail" style="width: 100px; height: auto; border-radius: 10px;">
                <div>
                    <p>${productName} - ${item.options}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: $${(item.quantity * item.price).toFixed(2)}</p>
                </div>
            </div>`;
    });
    
    total = subtotal + deliveryCost; // Calculate total by adding subtotal and delivery cost
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = total.toFixed(2);
}
    

// Add event listener for the filter
document.getElementById('category-filter').addEventListener('change', function() {
    // Get the selected category value
    let selectedCategory = this.value;
    
    // Get all product elements
    let products = document.querySelectorAll('.product');
    
    // Iterate over each product element
    products.forEach(function(product) {
        // Get the category of the current product
        let category = product.getAttribute('data-category');
        
        // If the selected category is 'all' or the product belongs to the selected category, show the product, otherwise hide it
        if (selectedCategory === 'all' || category === selectedCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// this function helps  to add items to the cart
function addToCart(productId) {
    let productOptions = document.getElementById(`${productId}-options`).value;
    let existingItem = cart.find(item => item.id === productId && item.options === productOptions);

    if (existingItem) {
        existingItem.quantity++; // if the  item already exists in cart it adds 1 
    } else {
        let price;
        switch(productId) {
            case 'product1':
                price = 50;
                break;
            case 'product2':
                price = 120;
                break;
            case 'product3':
                price = 70;
                break;
            case 'product4':
                price = 95;
                break;
            case 'product5':
                price = 97;
                break;
            case 'product6':
                price = 40;
            case 'product7':
                price = 40;
                break;
            case 'product8':
                price = 60; 
                break;
            default:
               
        }
        
        cart.push({ id: productId, options: productOptions, quantity: 1, price: price }); // Add new item to cart with price
    }
    
    updateCart();
}


