
const socket = io() 

socket.emit("event", "hola desde el back")
socket.on("evento", (res)=>console.log(res))


socket.on("realTimesProducts", (products) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Limpiar la lista antes de actualizarla
  
    // Recorrer la lista de productos y agregarlos al elemento ul
    products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `Nombre: ${product.title}, Precio: $${product.price}`;
      productList.appendChild(li);
    });
});