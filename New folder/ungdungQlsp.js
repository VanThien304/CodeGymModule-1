let productList = [""];

function showAllProduct(){
    let content = "";
    for(let i=0;i<productList.length;i++){
        content += `<tr>
                <td>${productList[i]}</td>
                <td><button onclick='editProduct(${i})'>Edit</button></td>
                <td><button onclick='deleteProduct(${i})'>Delete</button></td>
                   </tr>`
        
    }
    document.getElementById("products").innerHTML = `${content}`;
}
showAllProduct();

function createNewproduct(){
    let newP = document.getElementById("newP").value;
    productList.push(newP);
    showAllproduct();
}
deleteProduct();
    function deleteProduct(index){
        productList.splice(index,1);
        showAllproduct();

    }
editProduct();
    function editProduct(index){
        productList[index].newValue;
        showAllproduct(); 
    }