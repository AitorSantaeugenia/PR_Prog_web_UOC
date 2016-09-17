/* Set i Mitg */		
/* Jugador*/
/* Funció per treure una carta aleatoria entre 0 i 39 */
function treureCarta(){ 
	var cartaAleatoria = Math.floor((Math.random() * 39) + 1);
	return cartaAleatoria;
}
		
/* funcio per mostrar una carta/ eliminem la carta del reves i mostrem la carta */
function mostrarCarta(){ 									
	document.getElementById("cartaJ").src = "";
	var img = document.createElement('IMG');
	img.src = "imagenes/e" + cartesJugador[j] + ".png\n";
	document.getElementById("jugador").appendChild(img);
}

/* funcio per afegir una carta a la ma del jugador*/
function afegirCarta(){
	var altraCarta = treureCarta();
	cartesJugador.push(altraCarta);
	for(j=0; j < cartesJugador.length; j++) {
		mostrarCarta(cartesJugador[j]);													
		var valorCartaJugador = valorCarta(cartesJugador[j]);		
	}
	valorCartesJugador.push(valorCartaJugador);
	mostrarResultatsJugador();		
}
				
/* li assignem el valor a la carta */				
function valorCarta(carta){				
	var valorCarta = carta %10 + 1;
	if (valorCarta > 7) {
		valorCarta = 0.5;
		} else {
		valorCarta = valorCarta;
		}		
	return valorCarta;
}
				
/* Obtenim la puntuació de totes les cartes del jugador */
function valorMa (){ 
	var valorMaJugador = 0;
	for(i=0; i < valorCartesJugador.length; i++) {
		valorMaJugador += valorCartesJugador[i];
	}
	return valorMaJugador;
}


function mostrarResultatsJugador(){
	var pJ1 = document.createElement("P");
	var nJ1 = document.createTextNode("Has jugat " + cartesJugador.length + " carta.");
	var nJ2 = document.createTextNode("Has jugat " + cartesJugador.length + " cartes.");
	/* Mostrem el numero de cartes del jugador */
	if (cartesJugador.length == 1){
		pJ1.appendChild(nJ1);
		document.getElementById("jugador").appendChild(pJ1);
		} else {
			pJ1.appendChild(nJ2);
			document.getElementById("jugador").appendChild(pJ1);
		}
	/* Mostrem el valor de les cartes del jugador */
	var valorJJ = valorMa();
	var pJ2 = document.createElement("P");
	var vJ1 = document.createTextNode("Puntuaci\u00F3 total: " + valorJJ + " punts.");
	var vJ2 = document.createTextNode("Puntuaci\u00F3 total: " + valorJJ + " punts. Has perdut. Si vols, pots tornar a jugar.");
	
	if (valorJJ <= 7.5) {
		pJ2.appendChild(vJ1);
		document.getElementById("jugador").appendChild(pJ2);
		} else {
			pJ2.appendChild(vJ2);
			document.getElementById("jugador").appendChild(pJ2);
			document.getElementById('demanarCarta').style.display = 'none'; 
			document.getElementById('mePlanto').style.display = 'none';
			document.getElementById('reset').style.display = 'block';
		}
}
	
/* Banca*/
//var cartesBanca = document.getElementById("banca");						
function treureCartaBanca(){
	var cartaAleatoriaB = Math.floor((Math.random() * 39) + 1);
	return cartaAleatoriaB;
}			

function jugaLaBanca(){
	altraCartaBanca = treureCartaBanca();
	cartesBanca.push(altraCartaBanca);
	for(j=0; j < cartesBanca.length; j++) {
		mostrarCartaBanca(cartesBanca[j]);													
		var valorCartaBanca = valorCarta(cartesBanca[j]);		
	}
	valorCartesBanca.push(valorCartaBanca);
}

/* funcio per mostrar una carta de la banca*/
function mostrarCartaBanca(){
//	var cartaBanca = jugaLaBanca();
//	document.getElementById("cartaB").src = "imagenes/e" + cartesBanca[j] + ".png\n";
	document.getElementById("cartaB").src = "";
	var imgB = document.createElement('IMG');
	imgB.src = "imagenes/e" + cartesBanca[j] + ".png\n";
	document.getElementById("banca").appendChild(imgB);
}
				
/* Obtenim la puntuació de totes les cartes de la banca */
function valorMaB(){
	var valorMaBanca = 0;
	for(i=0; i < valorCartesBanca.length; i++) {
		valorMaBanca += valorCartesBanca[i];
	}	
	return valorMaBanca;
}


function maBanca(){
	var valorMaBanca = valorMaB();
	while(valorMaBanca <= 1){
		setTimeout("jugaLaBanca()", 500);
		
		valorMaBanca ++;
	}
	setTimeout("mostrarResultatsBanca()", 550);
}

/* Mostrem el numero de cartes de la banca */
function mostrarResultatsBanca(){
	var valorBB = valorMaB();
	var pB1 = document.createElement("P");
	var nB1 = document.createTextNode("La banca ha jugat " + cartesBanca.length + " carta amb una puntuaci\u00F3 de " + valorBB + " punts.");
	var nB2 = document.createTextNode("La banca ha jugat " + cartesBanca.length + " cartes amb una puntuaci\u00F3 de " + valorBB + " punts."); 
	if (cartesBanca.length == 1){
		pB1.appendChild(nB1);
		document.getElementById("banca").appendChild(pB1);
		} else {
			pB1.appendChild(nB2);
			document.getElementById("banca").appendChild(pB1);
		}	
	/* Mostrem el valor de les cartes de la banca */
		
	var pB2 = document.createElement("P");
	var t1 = document.createTextNode("La Banca guanya.");
	var t2 = document.createTextNode("Enhorabona!! Has guanyat.");
	if ((valorBB > valorJJ) && (valorBB <= 7.5)) {
		pB2.appendChild(t1);
		document.getElementById("banca").appendChild(pB2);
		document.getElementById('demanarCarta').style.display = 'none'; 
		document.getElementById('mePlanto').style.display = 'none';
		document.getElementById('reset').style.display = 'block';
		} else {
			pB2.appendChild(t2);
			document.getElementById("banca").appendChild(pB2);
			document.getElementById('demanarCarta').style.display = 'none'; 
			document.getElementById('mePlanto').style.display = 'none';
			document.getElementById('reset').style.display = 'block';
		}
}
	
/* funcio per tornar a cargar la pàgina*/			
function refrescarPagina(){
	location.reload(true);
}
