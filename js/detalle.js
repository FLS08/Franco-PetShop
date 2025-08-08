var articulos = [];
var url = window.location.search;
var seleccionado;

async function getData() {
  await fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
    .then((response) => response.json())
    .then((json) =>
      articulos.push(
        ...json.map((item) => ({
          _id: item.id,
          nombre: item.title,
          imagen: 'https://cdn.pixabay.com/photo/2016/02/19/10/00/dog-1208816_1280.jpg',
          descripcion: item.title,
          precio: (item.id % 100) + 20,
          stock: 10,
        }))
      )
    );

  url = url.split("?id=").splice(1);
  seleccionado = articulos.filter((eventos) => eventos._id == url);

  var imprimir = "";
  seleccionado.forEach((sel) => {
    imprimir = `
        <div class="tarjetadetalles">
            <div class="imgyprecio">
                <img class="imgtarjeta" src="${sel.imagen}" alt="${sel.nombre}">
                <h3 class="precio">$${sel.precio}</h3>
            </div>
            <div class="detallesid">
                <h2 class="nameid">${sel.nombre}</h2>
                <p class="descriptionid">${sel.descripcion}</p>
            </div>
        </div>`;
  });

  document.querySelector("#box").innerHTML = imprimir;
}
getData();

function compraDirecta() {
  console.log("funciona");
}
function añadirCarrito() {
  console.log("añadir al carrito");
}
