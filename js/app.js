

//Constructores

function Seguro(marca,year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){
    /**
     AMERICANO 1.15
     ASIATICO 1.05
     EUROPEO 1.35
     */
    let cantidad;
    const base = 1000;

     console.log(this.marca);
     switch(this.marca){
         case '1':
            cantidad = base * 1.15;
            break;
         case '2':
            cantidad = base * 1.05;
            break;
         case '3':
            cantidad = base * 1.35;
            break;
         default:
             break;
     }
     // Leer el año 
     const diferencia = new Date().getFullYear() - this.year;
     //cada año al diferencia es mayor, el costo se va a reducir un 3%
     cantidad -= ((diferencia * 3) * cantidad) / 100;

     /**
      Si el seguro es basico se multiplica por un 30%
      Si el seguro es completo se multiplicara por 50%
      */
      if(this.tipo === 'basico'){
          cantidad *= 1.30;
      }else {
          cantidad *= 1.50;
      }
      return cantidad;

    }


function UI(){

}

//llena las opciones de los años

UI.prototype.llamarOpciones = () => {
    const max = new Date().getFullYear(),
    min = max -20;

    const selecYear = document.querySelector('#year')
    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selecYear.appendChild(option);
    }

}

//Muestra alertas

UI.prototype.mostrarMensaje = function(mensaje, tipo){

     const div = document.createElement('div');
     if(tipo === 'error'){
         div.classList.add('mensaje','error');
     }else {
        div.classList.add('mensaje','correcto');
     }
     div.classList.add('mensaje', 'mt-10');
     div.textContent = mensaje;
     

     const formulario = document.querySelector('#cotizar-seguro')
     formulario.insertBefore(div, document.querySelector('#resultado'));

     setTimeout(() =>{
            div.remove();
     },3000)
}

    UI.prototype.mostrarResultado = (seguro, total) => {

        const {marca, year, tipo } = seguro;

        let textoMarca;
        switch (marca) {
            case '1':
                textoMarca = 'Americado';
                break;
                case '2':
                textoMarca = 'Asiatico';
                break;
                case '3':
                textoMarca = 'Europeo';
                break;
                default:
                    break;
        }

        //crear resulya¡tado div
        const div = document.createElement('div');
        div.classList.add('mt-10')
        div.innerHTML =`
         <p class="header">Tu Resumen</p>
         <p class="font-bold">Marca:<span class="font-normal"> ${textoMarca}</span></p>
         <p class="font-bold">Year:<span class="font-normal"> ${year}</span></p>
         <p class="font-bold">Tipo:<span class="font-normal capitalize"> ${tipo}</span></p>
         <p class="font-bold">Total:<span class="font-normal"> € ${total}</span></p>
        `;
        const resultadoDiv = document.querySelector('#resultado')
        
        //Mostar ek spinner

        const spinner = document.querySelector('#cargando')
        spinner.style.display = 'block'

        setTimeout(() =>{
                spinner.style.display = 'none';
                resultadoDiv.appendChild(div);// se borra el spinner y aparce la cotizccion
        }, 3000)
    }
// Instanciar
const ui = new UI();


document.addEventListener("DOMContentLoaded",()=>{
    ui.llamarOpciones();// Lena el select de los años...
})

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    // leer la marca de seguro
    const marca = document.querySelector('#marca').value;
    
    // leer el año de seguro 
    const year = document.querySelector('#year').value;
    // leer el tipo de seguro
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando...', 'exito');

    //Ocultar las cotizaciones 
    const resultados = document.querySelector('#resultado div');

    if(resultados != null){
        resultados.remove();
    }

    // Instanciar el seguro
    const seguro = new Seguro (marca, year, tipo);

    const total = seguro.cotizarSeguro();
    // Utilizar prototype para cotizar

    ui.mostrarResultado(seguro, total);


}