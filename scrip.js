const carrito  = document.getElementById('carrito');
const elemento1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const enviarWhatsappBtn = document.getElementById('enviar-whatsapp');


cargaEventListeners();

function cargaEventListeners(){
    elemento1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    enviarWhatsappBtn.addEventListener('click', enviarWhatsapp);


}

function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')

    }

    insertarCarrito(infoElemento);

}

function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100">
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
}


function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        ElementoId;
    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        ElementoId = elemento.querySelector('a').getAttribute('data-id');
    }

}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }

    return false;








}


    /*
    Whattsapp
    */

    function enviarWhatsapp(e){
    e.preventDefault();

    if(lista.children.length === 0){
        alert('El carrito está vacío');
        return;
    }

    let mensaje = '# Pedido:\n\n';

    Array.from(lista.children).forEach(row => {
        const nombre = row.children[1].textContent;
        const precio = row.children[2].textContent;

        mensaje += `Hola! Te escribo por el articulo ${nombre} cuyo precio esta en: ${precio} para saber si esta disponible.\n`;
    });

    const telefono = '18092722162'; // CAMBIA por tu número
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
}


/*

funciones del alquiler
*/

const botonesStreaming = document.querySelectorAll('.btn-streaming');

botonesStreaming.forEach(boton => {
    boton.addEventListener('click', function(e){
        e.preventDefault();
        const plataforma = this.getAttribute('data-plataforma');
        const mensaje = ` Hola! Me gustaría contratar ${plataforma} Premium. Por favor, envíenme información sobre el alquiler y como seria la contratacion.`;
        const telefono = '18092722162'; // tu número
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    });
});
