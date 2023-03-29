const palabras = [
	'abajo',
	'acabar',
	'aceite',
	'acto',
	'agua',
	'aire',
	'alguien',
	'alma',
	'alto',
	'amigo',
	'amor',
	'animal',
	'anoche',
	'ante',
	'apenas',
	'aprender',
	'apoyo',
	'aqui',
	'asi',
	'aun',
	'aunque',
	'ayer',
	'bajar',
	'bello',
	'bien',
	'blanco',
	'boca',
	'buscar',
	'cada',
	'cambio',
	'caminar',
	'campo',
	'canto',
	'carne',
	'caso',
	'causa',
	'cerca',
	'cielo',
	'cima',
	'circulo',
	'ciudad',
	'claro',
	'clase',
	'coche',
	'coger',
	'color',
	'comer',
	'comun',
	'conocer',
	'conseguir',
	'contar',
	'corazon',
	'crear',
	'creer',
	'cruzar',
	'cuanto',
	'cuerpo',
	'cuidar',
	'dar',
	'dejar',
	'demas',
	'derecha',
	'dia',
	'diferente',
	'dificil',
	'dinero',
	'dormir',
	'dos',
	'duro',
	'echar',
	'edad',
	'empezar',
	'encontrar',
	'energia',
	'enorme',
	'entrada',
	'equivocado',
	'estar',
	'este',
	'extrano',
	'facil',
	'familia',
	'famoso',
	'fantasma',
	'favor',
	'felicidad',
	'feo',
	'fiesta',
	'final',
	'flor',
	'forma',
	'fortuna',
	'frio',
	'fuego',
	'fuerte',
	'fumar',
	'ganar',
	'gente',
	'gracia',
	'grande',
	'gritar',
	'guerra',
	'hablar',
	'hacer',
	'hambre',
	'hermoso',
	'historia',
	'hombre',
	'hora',
	'hoy',
	'igual',
	'imagen',
	'iniciar',
	'interesante',
	'ir',
	'joven',
	'juego',
	'jugador',
	'juntos',
	'lado',
	'largo',
	'lavar',
	'leer',
	'levantar',
	'libro',
	'lindo',
	'llamar',
	'llevar',
	'llorar',
	'luchar',
	'lugar',
	'madre',
	'maestro',
	'mal',
	'mano',
	'mar',
	'mas',
	'mayor',
	'mejor',
	'memoria',
	'menos',
	'mente',
	'mensaje',
	'meter',
	'mil',
	'mirar',
	'mismo',
	'momento',
	'mover',
	'mucho',
	'mundo',
	'musica',
	'nacer',
	'nada',
	'natural',
	'necesitar',
	'nino',
	'noche',
	'nuevo',
	'nunca',
	'oir',
	'ojo',
	'oler',
	'opcion',
	'oro',
	'pagina',
	'pais',
	'papel',
	'parecer',
	'parte',
	'pasar',
	'paz',
	'pelear',
	'pensar',
	'pequeno',
	'perder',
	'persona',
	'poder',
	'poner',
	'pobre',
	'poco',
	'poderoso',
	'polvo',
	'porque',
	'preocupar',
];

// variables
const empezar = document.querySelector('#empezar');
const divLetras = document.querySelector('#letras');
const btnEnviar = document.querySelector('#enviar');
const win = new Audio('./audio/win.wav');
const lose = new Audio('./audio/lose.wav');

let random;
let palabraRandom;

let palabra = [];
let palabraCompleta;

let inputs;

empezar.addEventListener('click', () => {
	palabra = [];
	divLetras.innerHTML = '';
	random = Math.floor(Math.random() * 100);
	palabraRandom = palabras[random];

	agregarHTML();
	nextInput();
});

function agregarHTML() {
	for (let i = 0; i < palabraRandom.length; i++) {
		divLetras.insertAdjacentHTML(
			'afterbegin',
			`
                <input type="text" autocomplete="off" spellcheck="false" class="letras" maxlength="1" />
            `
		);
	}
	document.querySelector('#letras').style.padding = '15px';
}

btnEnviar.addEventListener('click', () => {
	comprobarPalabra();
});

function nextInput() {
	inputs = document.querySelectorAll('.letras');
	inputs.forEach(function (input, index) {
		input.addEventListener('keyup', function (event) {
			let value = input.value;
			// Usar un switch para evaluar el código de la tecla presionada
			switch (event.keyCode) {
				case 8:
					if (value === '') {
						// Si hay un input anterior, cambiar el foco al input anterior
						if (index > 0) {
							inputs[index - 1].focus();
						}
					}
					break;
				case 13:
					comprobarPalabra();
				// Si se presionó cualquier otra tecla y el input tiene un carácter
				default:
					if (value.length === 1) {
						// Si hay un input siguiente, cambiar el foco al input siguiente
						if (index < inputs.length - 1) {
							inputs[index + 1].focus();
						}
					}
					break;
			}
		});
	});
}

function comprobarPalabra() {
	palabraCompleta = palabra.join('');
	if (palabraCompleta != palabraRandom) {
		win.pause();
		lose.play();
	}
	const letras = document.querySelectorAll('.letras');
	letras.forEach((letra, index) => {
		if (letra.value === palabraRandom[index]) {
			palabra[index] = palabraRandom[index];
			if (letra.disabled == false) {
				lose.pause();
				win.play();
			}
			letra.disabled = true;
		} else {
			letra.value = '';
		}
	});
}
