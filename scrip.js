

const carrito  = document.getElementById('carrito');
const elemento1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const enviarWhatsappBtn = document.getElementById('enviar-whatsapp');


cargaEventListeners();

function cargaEventListeners(){
    elemento1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    lista.addEventListener('click', cambiarCantidad);
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

    const filas = lista.querySelectorAll('tr');
    let existe = false;

    filas.forEach(row => {
        const id = row.querySelector('a').getAttribute('data-id');

        if(id === elemento.id){
            const cantidadInput = row.querySelector('.cantidad');
            cantidadInput.value = parseInt(cantidadInput.value) + 1;
            existe = true;
        }
    });

    if(!existe){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" width="100">
            </td>
            <td>${elemento.titulo}</td>
            <td>${elemento.precio}</td>
                                        <td>
                        <div class="contador">
                            <button class="restar">-</button>
                            <span class="cantidad">1</span>
                            <button class="sumar">+</button>
                        </div>
                    </td>
            <td>
                <a href="#" class="borrar" data-id="${elemento.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
    }
}


function eliminarElemento(e) {
    e.preventDefault();

    if(e.target.classList.contains('borrar')) {
        const row = e.target.closest('tr');
        row.remove();
    }
}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }

    return false;



}

/*Nueva funcion para los botondes del carrito*/

    function cambiarCantidad(e){

        if(e.target.classList.contains('sumar')){
            const cantidad = e.target.parentElement.querySelector('.cantidad');
            cantidad.textContent = parseInt(cantidad.textContent) + 1;
        }

        if(e.target.classList.contains('restar')){
            const cantidad = e.target.parentElement.querySelector('.cantidad');
            let num = parseInt(cantidad.textContent);

            if(num > 1){
                cantidad.textContent = num - 1;
            }
        }

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




/*Aqui funcionan los botones de la barra arriba*/

const btnInicio = document.getElementById('btn-inicio');
const btnServicios = document.getElementById('btn-servicios');

const seccionInicio = document.getElementById('inicio');
const seccionServicios = document.getElementById('servicios');

btnInicio.addEventListener('click', function(e) {
    e.preventDefault();
    seccionInicio.style.display = 'block';
    seccionServicios.style.display = 'none';
});

btnServicios.addEventListener('click', function(e) {
    e.preventDefault();
    seccionInicio.style.display = 'none';
    seccionServicios.style.display = 'block';
});


/*EXtra para botones*/

carrito.addEventListener('click', function(e){

    if(e.target.classList.contains('sumar')){
        const input = e.target.parentElement.querySelector('.cantidad');
        input.value = parseInt(input.value) + 1;
    }

    if(e.target.classList.contains('restar')){
        const input = e.target.parentElement.querySelector('.cantidad');
        if(parseInt(input.value) > 1){
            input.value = parseInt(input.value) - 1;
        }
    }

});