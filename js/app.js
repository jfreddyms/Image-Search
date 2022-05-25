//variables
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

//haciendo un paginador
const registroPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1; 

window.onload = () => {
    formulario.addEventListener('submit', validarformulario);

};

function validarformulario(e) {
    e.preventDefault();
    
    const termino = document.querySelector("#termino").value;

    if (termino === '') {
        impirmirMensaje('Please Write a Search Term...')
        return
    };

    buscarImagenes();
};

function impirmirMensaje(mensaje) {

    const existeAlerta = document.querySelector('.bg-red-100');

    if (!existeAlerta) {

        const mensajeDiv = document.createElement('p');
        mensajeDiv.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-lg','mx-auto','mt-6',
        'text-center');
        mensajeDiv.innerHTML =`
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
        
        formulario.appendChild(mensajeDiv);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 3000);  
    };

    
};

function buscarImagenes() {
    
    const termino = document.querySelector("#termino").value;

    const key = '23342244-13423c6c46da567bd4e77181e';
    const url =`https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;
    console.log(url)

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            // console.log(resultado)

            totalPaginas = calcularPaginas(resultado.totalHits);
            // console.log(totalPaginas)//numero de paginas que se van a imprimir

            imprimirImagenes(resultado.hits)
            // console.log(resultado.hits);
        });
};

function calcularPaginas(totalHits) {
    return parseInt(Math.ceil(totalHits / registroPorPagina));
    
}

function imprimirImagenes(imagenes) {

    //limpiamos el HTML previo con este while
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    };

    imagenes.forEach(img => {
        // console.log(img)
        const {previewURL, likes, views, largeImageURL, imageHeight, imageWidth} = img;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white p-5 rounded bder-image">
                    <img class="w-full rounded" src="${previewURL}">

                    <div class="py-4">
                        <div class="bder-text p-2 rounded">
                            <p class="font-light pb-1 ml-2"><span class="font-light pr-5">Likes</span>${likes}</p>
                            <p class="font-light ml-2 pb-1"><span class="font-light pr-5">Views</span>${views}</p>
                            <p class="font-light ml-2 pb-1 pr-3"><span class="font-light pr-5">Resolution</span>${imageWidth} x ${imageHeight}</p>
                            
                        </div>
                        
                        
                        <a class="bder-view block w-full bg-blue-800 hover:bg-gray-800  text-white transition-colors uppercase font-bold text-center 
                        rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                       
                        View Image
                        
                        </a>

                    </div>
                </div>
            </div>
        `;
    });

    //limpiar el paginador previo
    while (document.querySelector('#paginacion').firstChild) {
        document.querySelector('#paginacion').removeChild(document.querySelector('#paginacion').firstChild);
    };

    imprimirPaginador();
    
};

function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);
    console.log(iterador.next())
    
    while (true) {
        const {value, done} = iterador.next();

        if (done) { 
                   
            return;
        };
        
        
        const botton = document.createElement('a');
        botton.href ='#';
        botton.dataset.pagina = value;
        botton.textContent = value;
        botton.classList.add('siguiente','bg-yellow-600','hover:text-blue-100', 'hover:bg-yellow-700', 'bder-image', 'px-4','py-1','mr-2','font-bold','mb-4','rounded');

        botton.onclick = () => {

            paginaActual = value;
            // console.log(paginaActual)

            buscarImagenes(paginaActual);
        };

        document.querySelector('#paginacion').appendChild(botton);
    };
};

//generador que va a regigastrar las cantidad de elementos de acuerdo a las paginas
function *crearPaginador(total) {
    
    for (let i = 1; i <= total; i++) {
      yield i;
    };
};

