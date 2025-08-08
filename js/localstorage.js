/**
 * Gestiona el carrito de compras utilizando localStorage.
 */

const items = [];
let idsGuardados = [];
let carritoParaMostrar = [];
const badgeCarrito = document.querySelector('#elh1');

async function obtenerItems() {
  try {
    const respuesta = await fetch(
      'https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available'
    );
    const datos = await respuesta.json();
    items.push(
      ...datos.map((item) => ({
        _id: item.id,
        nombre: item.name,
        imagen: item.photoUrls?.[0] || 'https://placekitten.com/200/200',
        descripcion: item.status || item.category?.name || '',
        precio: 0,
        stock: 0,
        cantidad: 1,
      }))
    );
    init();
  } catch (error) {
    console.error('Error al obtener artículos', error);
  }
}

function cargarIdsGuardados() {
  return (JSON.parse(localStorage.getItem('carrito')) || []).map(Number);
}

function actualizarBadge() {
  const cantidad = idsGuardados.length;
  badgeCarrito.style.visibility = cantidad ? 'visible' : 'hidden';
  badgeCarrito.textContent = cantidad ? cantidad : '';
}

function construirCarrito() {
  carritoParaMostrar = idsGuardados
    .map((id) => items.find((item) => item._id === id))
    .filter(Boolean);
}

function renderizarCarrito() {
  construirCarrito();
  let total = 0;

  const filas = carritoParaMostrar
    .map((item) => {
      const subtotal = item.cantidad * item.precio;
      total += subtotal;
      return `
        <tr>
          <td><img class="imagentabla" src="${item.imagen}" alt="Imagen tabla"></td>
          <td class="textomover">${item.nombre}</td>
          <td class="textomover">${item.cantidad}</td>
          <td>
            <button class="mover botonmas" onClick="sumarArticulo(${item._id})">+</button>
            <button class="mover botonborrar" onClick="eliminarArticulo(${item._id})">Borrar articulo</button>
            <button class="mover botonmenos" onClick="restarArticulo(${item._id})">-</button>
          </td>
          <td class="textomover">$${subtotal}</td>
        </tr>
      `;
    })
    .join('');

  document.querySelector('#bodytable').innerHTML = filas;
  document.querySelector('#totalcarrito').textContent = `$${total}`;
}

function init() {
  idsGuardados = cargarIdsGuardados();
  actualizarBadge();
  renderizarCarrito();
}

function eliminarArticulo(id) {
  idsGuardados = idsGuardados.filter((itemId) => itemId !== id);
  localStorage.setItem('carrito', JSON.stringify(idsGuardados));
  init();
}

function sumarArticulo(id) {
  const articulo = items.find((i) => i._id === id);
  if (articulo) {
    articulo.cantidad++;
    init();
  }
}

function restarArticulo(id) {
  const articulo = items.find((i) => i._id === id);
  if (articulo) {
    articulo.cantidad--;
    if (articulo.cantidad <= 0) {
      eliminarArticulo(id);
    } else {
      init();
    }
  }
}

function borrarTodo() {
  idsGuardados = [];
  localStorage.setItem('carrito', JSON.stringify(idsGuardados));
  init();
}

function back() {
  history.back();
}

obtenerItems();
