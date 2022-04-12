function Product(id,productName,photo,price,quantity){
    this.productName = productName;
    this.photo = photo;
    this.price = price;
    this.quantity = quantity;
}
function Cart(id,productName,photo,price,count){
    this.id = id;
    this.productName = productName;
    this.photo = photo;
    this.price = price;
    this.count = count;
    this.amount = this.price * this.count;
}
let products = [
    new Product(1, "iPhone 13", "https://i.pravatar.cc/150?img=1", 2000000, 200),
    new Product(2, "Nokia", "https://i.pravatar.cc/150?img=2", 2100000, 210),
    new Product(3, "Oppo", "https://i.pravatar.cc/150?img=3", 3000000, 220),
    new Product(4, "Samsung", "https://i.pravatar.cc/150?img=4", 2500000, 210),
    new Product(5, "iPhone 6s", "https://i.pravatar.cc/150?img=5", 5000000, 120),
    new Product(6, "iPhone 6s", "https://i.pravatar.cc/150?img=6", 5000000, 120)
]
let cart = [];
function renderProduct(){
    let htmls = products.map(function(product){
        return ` <div class="product">
                <h3 class="heading">${product.productName}</h3>
                <img src="${product.photo}" alt="">
                <p>${formatCurrenty(product.price)}</p>
                <p>${product.quantily}</p>
                <button onclick="addTocart(${product.id})">Add to cart</button>
        </div>`
    })
    document.querySelector("#show-product").innerHTML = htmls.join("")
}
function addTocart(productId){
    let cartInfo = document.querySelector("#cart-area>a");
    let product = products.find(function(pdt){
        return pdt.id == productId;
    })
    if(foundProduct === undefined){
        let cartItem = new Cart(product.id,product.productName,product.photo,product.price,1)
        cart.push(cartItem);
    }
    else{
        foundProduct.count++;
        foundProduct.amount = foundProduct.count * foundProduct.price;

    }
    cartInfo.innerHTML = `Cart(${cart.length})`;
}
function showCartDetail(){
    let htmls = cart.map(function(item,index){
        return `  <tr>
        <td>${item.productName}</td>
        <td>
            <img src="photo" alt="${item.photo}">
        </td>
        <td>
            ${formatCurrency(item.price)}
        </td>
        <td>${item.count}</td>
        <td>${formatCurrency(item.amount)}</td>
        <td>
            <button onclick="removeCartItem($index)">Remote</button>
        </td>
    </tr>`
    })
    document.querySelector("#cart-detail>tbody").innerHTML = html.join("");
}
