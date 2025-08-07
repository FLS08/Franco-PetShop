let items = []
var guardado = []
var array = []
var toDisplayCarrito = []
var totalprecio = 0
var contador = 0
var h1s = document.querySelector("#elh1")
async function data(){
    await fetch("https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available")
    .then(response => response.json())
    .then(json => items.push(...json.map(item => ({
        _id: item.id,
        nombre: item.name,
        imagen: item.photoUrls?.[0] || "",
        descripcion: item.status || item.category?.name || "",
        precio: 0,
        stock: 0,
        cantidad: 1
    }))))


 init()
}
data()
function init(){

    var dataLocal = JSON.parse(localStorage.getItem('carrito'))
        if(dataLocal !=null ){
            guardado = dataLocal
        }else{guardado=[]}

        var badge = ""  
        if(guardado.length >= 1){
            
            badge = `
            <h1 id="elh1" class="elh1s" style="visibility: visible;">${guardado.length}</h1>
            `
            document.querySelector("#elh1").innerHTML = badge
            
    
        }
        else if(guardado.length == 0){
                h1s.style.visibility = "hidden";
                badge = `
                <h1 id="elh1" class="elh1s" style="visibility: hidden;">${guardado.length}</h1>
                `
                document.querySelector("#elh1").innerHTML = badge
    
            }
    toDisplayCarrito = []
         
    // console.log(items)
    guardado.map(idguardado =>{

    

    toDisplayCarrito.push(...items.filter(objetos => objetos._id == idguardado))
    
    })
    var templateHTMLcarrito = "" 
    
    contador = 0
    toDisplayCarrito.map(item => { 
    totalprecio = item.cantidad * item.precio;
    contador += totalprecio
        templateHTMLcarrito += `    
        <tr>
        <td> <img class="imagentabla" src="${item.imagen}" alt="Imagen tabla"></td>
        <td class="textomover" >${item.nombre}</td>
        <td class="textomover" >${item.cantidad}</td>
        <td ><button class="mover botonmas" onClick="sumaritem('${item._id}')">+</button>
        <button class="mover botonborrar" onClick="borrarallitems('${item._id}')">Borrar articulo</button>
        <button class="mover botonmenos" onClick="restaitem('${item._id}')">-</button>
        </td>
        <td class="textomover">$${totalprecio}</td>
      </tr>
        `
        
    })
    document.querySelector('#bodytable').innerHTML = templateHTMLcarrito
    document.querySelector("#totalcarrito").innerHTML = "$" + contador 
    
}

    init()
    var counter = []
    function borrarallitems(event){

        guardado = guardado.filter(idguardado => idguardado != event)
        localStorage.setItem('carrito', JSON.stringify(guardado))
        console.log(h1s.style.visibility)
   
        init()
    }    
    function sumaritem(event){
        cantidad = []
        var itempuntual = items.filter(items=>items._id == event)
        cantidad.push(...toDisplayCarrito.filter(items =>items._id == event))
        itempuntual.map(items => items.cantidad++)
  
        
            init()    
    }
    function restaitem(event){
        cantidad = []
        var itempuntual = items.filter(items=>items._id == event)
        cantidad.push(...toDisplayCarrito.filter(items =>items._id == event))
        itempuntual.map(items => items.cantidad--)
            itempuntual.forEach(item => {
                if(item.cantidad == 0){
                    borrarallitems(item._id)
                }
            })
        init()    
}
function borrartodo(){
        var borrado =[]
        guardado=borrado
        localStorage.setItem('carrito', JSON.stringify(guardado))
        h1s.style.visibility = "hidden";
init()
}
function back(){
    history.back();
}
