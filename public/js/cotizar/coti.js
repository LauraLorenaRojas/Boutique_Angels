const evento = document.getElementById('evento');
const decoracion = document.getElementById('decoracion');
const personasInput = document.getElementById('personas');
const buffet = document.getElementById('buffet');
const alquiler = document.getElementById('alquiler');
const musica = document.getElementById('musica'); 
const totalElement = document.getElementById('total-amount');
const buffetOptionsDiv = document.getElementById('buffet-options');
const personasError = document.getElementById('personas-error');

//Valores 
var eventoDecoracionSeleccionado;
var eventoAlquilerSeleccionado;
var eventoMusicaSeleccionada;

// Opciones de Buffet
const buffets = [
    { text: "Buffet Completo", value: 50000 },
];

// Opciones de Decoración por Evento
const decoraciones = {
    quinceanos: [
        { text: "Color: Rosado y Blanco - Temática: Princesas", value: 800000 },
        { text: "Color: Colores fuertes - Temática: Neón", value: 900000 },
        { text: "Color: Azul y Blanco - Temática: Oso Polar", value: 750000 },
        { text: "Color: Colores Pasteles - Temática: Mariposas", value: 700000 },
        { text: "Color: Blanco y Negro - Temática: Queen", value: 850000 }
    ],
    boda: [
        { text: "Color: Blanco y Dorado - Temática: Boda soñada", value: 900000 },
        { text: "Color: Blanco y Plateado - Temática: Casual", value: 800000 },
        { text: "Color: Blanco y destellos azules - Temática: Boda Celestial", value: 800000 },
        { text: "Color: Blanco y Rojo - Temática: Romántico", value: 800000 }  
    ],
    comunion: [
        { text: "Color: Dorado y Blanco - Temática: Religiosa ", value: 300000 },
        { text: "Color: Blanco y Azul - Temática: Religiosa ", value: 200000 },
        { text: "Color: Blanco y Dorado - Temática: Religiosa ", value: 350000 }
    ],
    babyShower: [
        { text: "Color: Azul Bebe - Temática: Ositos", value: 300000 },
        { text: "Color: Rosa y Blanco - Temática: Bebes ", value: 400000 }
     ],
    grados: [
        { text: "Color: Negro y Blanco - Temática: Prom ", value: 400000 },
        { text: "Color: Negro y azul - Temática: Prom ", value: 350000 },
        { text: "Color: Negro y Rosado - Temática: Prom ", value: 500000 }
    ]
};

// Opciones de Alquiler por Evento
const alquileres = {
    quinceanos: [
        { text: "Color: Rosado - Vestido Corte en V (Talla: S, M, L)", value: 300000 },
        { text: "Color: Lila - Vestido Princesa (Talla: M)", value: 600000 },
        { text: "Color: Negro - Vestido con destellos (Talla: M, L)", value: 500000 },
        { text: "Color: Fucsia - Vestido Largo (Talla: S, L)", value: 450000 },
        { text: "Color: Azul bebe - Vestido Bombacho (Talla: M)", value: 350000 },
        { text: "Color: Azul - Vestido Escarchado (Talla: S, M, L, XL)", value: 650000 }
    ],
    boda: [
        { text: "Color: Beige - Vestido Largo (Talla: M, L)", value: 500000 },
        { text: "Color: Blanco-Dorado - Vestido Largo (Talla: M, L)", value: 200000 },
        { text: "Color: Blanco con destellos rojos - Vestido pegado (Talla: M)", value: 300000 },
        { text: "Color: Blanco - Vestido Largo (Talla: M, L, XL)", value: 400000 }
    ],
    comunion: [
        { text: "Color: Blanco-Dorado - Vestido Largo (Talla: 10, 12 , 14)", value: 80000 },
        { text: "Color: Blanco-Rosado - Vestido Largo (Talla: 10, 14, 16)", value: 150000 }
    ],
    babyShower: [
        { text: "Vestido Largo Rosa Pastel (Talla: L, XL)", value: 300000 },
        { text: "Vestido Largo Azul Pastel (Talla: L, XL)", value: 400000 }
     ],
    grados: [
        { text: "Color: Negro - Vestido Largo (Talla: S, M)", value: 350000 },
        { text: "Color: Rojo - Vestido Largo (Talla: S, M, L)", value: 200000 },
        { text: "Color: Rosado - Vestido Largo (Talla: S)", value: 40000 },
        { text: "Color: Negro - Vestido corto (Talla: S, M, L)", value: 300000 },
        { text: "Color: Verde Esmeralda - Vestido Corto (Talla: M)", value: 250000 }
    ]
};


const musicas = {
    quinceanos: [
        { text: "Mariachis", value: 500000 },
        { text: "Parranda Vallenata", value: 300000 },
        { text: "DJ", value: 600000 },
        { text: "Grupo Carranguero", value: 400000 }
        
    ],
    boda: [
        { text: "Mariachis", value: 500000 },
        { text: "Grupo Norteño", value: 500000 },
        { text: "Grupo Carranguero", value: 500000 },
        { text: "Parranda Vallenata", value: 500000 }
    ],
    comunion: [
        { text: "Dj", value: 500000 },
        { text: "Sin Música", value: 0 }
    ],

    babyShower: [
        { text: "Show Recreativo", value: 600000 },
        { text: "Sin Música", value: 400000 }
    ],
    grados: [
        { text: "Mariachis", value: 500000 },
        { text: "DJ", value: 600000 },
        { text: "Orquesta Sinfónica", value: 400000 }
    ]
};

// Llenar las opciones de buffet
buffets.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.text;
    buffet.appendChild(opt);
});

// Mostrar las opciones del buffet al seleccionar
buffet.addEventListener('change', function () {
    const selectedBuffet = this.value;
    buffetOptionsDiv.style.display = selectedBuffet ? 'block' : 'none'; // Mostrar u ocultar buffet options
    calcularTotal(); // Calcular total al seleccionar buffet
});

// Actualiza las opciones de decoración y alquiler según el evento seleccionado
evento.addEventListener('change', function () {
    eventoDecoracionSeleccionado = this.value;
    eventoAlquilerSeleccionado = this.value;
    eventoMusicaSeleccionada = this.value;

    // Limpiar las opciones previas
    decoracion.innerHTML = '<option value="" disabled selected hidden>Seleccionar Decoración</option>';
    alquiler.innerHTML = '<option value="" disabled selected hidden>Seleccionar Alquiler</option>';
    musica.innerHTML = '<option value="" disabled selected hidden>Seleccionar </option>';

    // Llenar las opciones correspondientes para decoración
    if (decoraciones[eventoDecoracionSeleccionado]) {
        decoraciones[eventoDecoracionSeleccionado].forEach(option => {
            const opt = document.createElement ('option');
            opt.value = option.text;
            opt.textContent = option.text;
            decoracion.appendChild(opt);
        });
    }

    // Llenar las opciones correspondientes para alquiler
    if (alquileres[eventoAlquilerSeleccionado]) {
        alquileres[eventoAlquilerSeleccionado].forEach(option => {
            const opt = document.createElement ('option');
            opt.value = option.text;
            opt.textContent = option.text;
            alquiler.appendChild(opt);
        });
    }
 // Llenar las opciones correspondientes para musica
    if (musicas[eventoMusicaSeleccionada]) {
        musicas[eventoMusicaSeleccionada].forEach(option => {
            const opt = document.createElement ('option');
            opt.value = option.text;
            opt.textContent = option.text;
            musica.appendChild(opt);
        });
    }
});


// Calcular el total
function calcularTotal() {
    const buffetValue = parseInt(buffet.value) || 0;
    const decoracionValue = decoraciones[eventoDecoracionSeleccionado].filter(x => x.text == decoracion.value);
    const alquilerValue = alquileres[eventoAlquilerSeleccionado].filter(x => x.text == alquiler.value);
    const musicaValue = musicas[eventoMusicaSeleccionada].filter(x => x.text == musica.value);
    const personasValue = parseInt(personasInput.value) || 0;

    // Validar el número de personas
    if (personasValue > 300) {
        personasError.style.display = 'block';  // Mostrar el mensaje de error
        return;
    } else {
        personasError.style.display = 'none';   // Ocultar el mensaje de error si es válido
    }

    // Calcular total
    const buffetTotal = buffetValue * personasValue; // Buffet es por persona
    const total = buffetTotal + decoracionValue[0].value + alquilerValue[0].value + musicaValue[0].value; 

    // Mostrar total en el elemento visual
    totalElement.textContent = `Total: $${total.toLocaleString()} COP`;

    // **Guardar el total en el input oculto**
    document.getElementById('total').value = total;

    // Enviar el total al servidor para guardarlo en la base de datos (si es necesario)
    fetch('/guardar-total', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            total: total,
            clienteId: localStorage.getItem('clienteId'),  // Puedes usar el clienteId almacenado
            evento: eventoDecoracionSeleccionado,
            personas: personasValue
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Total guardado exitosamente:', data);
    })
    .catch(error => console.error('Error al guardar el total:', error));
}

// Añadir eventos para calcular el total al cambiar cualquier opción
decoracion.addEventListener('change', calcularTotal);
alquiler.addEventListener('change', calcularTotal);
musica.addEventListener('change', calcularTotal); 
personasInput.addEventListener('input', calcularTotal);

// Cancelar formulario
function cancelarFormulario() {
    document.getElementById('cotizador-form').reset();
    totalElement.textContent = "Total: $0 COP"; // Reiniciar el texto del total
    personasError.style.display = 'none'; // Ocultar el mensaje de error
}

//Hora
function changeDateStyle() {
    const dateInput = document.getElementById('fecha');
    dateInput.classList.add('dorado');
}

function changeTimeStyle() {
    const timeInput = document.getElementById('hora');
    timeInput.classList.add('dorado');
}

function validateTime() {
    const timeInput = document.getElementById('hora');
    const timeError = document.getElementById('timeError');
    const validTimes = ['18:00', '19:00', '20:00']; // 6 PM, 7 PM, 8 PM

    if (!validTimes.includes(timeInput.value)) {
        timeError.style.display = 'block';
        timeInput.value = ''; // Limpiar el campo si la hora no es válida
        timeInput.classList.remove('dorado'); // Remover el estilo dorado si la hora no es válida
    } else {
        timeError.style.display = 'none';
    }
}

 // Obtener el input de cantidad de personas
 const inputPersonas = document.getElementById('personas');
  
 // Validar cuando el usuario cambie el valor
 inputPersonas.addEventListener('input', function() {
   const value = parseInt(inputPersonas.value);
   
   // Si el valor es menor que 1, lo ajustamos a 1
   if (value < 1 || isNaN(value)) {
     inputPersonas.value = 1;
   } else if (value > 300) {
     inputPersonas.value = 300; 
   }
 });

 // Prevenir valores negativos con las teclas (cuando intenten usar - en el teclado)
 inputPersonas.addEventListener('keydown', function(event) {
   // Si el usuario presiona la tecla "-", prevenimos que lo haga
   if (event.key === '-' || event.key === 'e') {
     event.preventDefault();
   }
 });