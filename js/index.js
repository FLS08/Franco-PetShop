/* var eventos = []
var imagenes = []
const modal = document.querySelector("#modal")

async function getData(){
    await fetch("https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available")
        .then(response => response.json())
        .then(json => eventos.push(...json.map(item => ({
            _id: item.id,
            nombre: item.name,
            imagen: 'https://cdn.pixabay.com/photo/2016/02/19/10/00/dog-1208816_1280.jpg',
            descripcion: item.status || item.category?.name || "",
            precio: 0,
            stock: 0
        }))))
        console.log(eventos)
}
getData()


function submit(){
    let toDisplay = `
    <div class="container">
        <div class="cookiesContent" id="cookiesPopup">
          <button class="close">✖</button>
          <img src="../assets/feliz.png" alt="happy-cat" />
          <p>Gracias por contactarte con Franco! Responderemos tu consulta a la brevedad <br><br> Cuidamos a tu Mascota</p>
          <button class="accept" onClick="cerrarModal()">Ok!</button>
        </div>
      </div>
    `
    modal.innerHTML = toDisplay
    
} */