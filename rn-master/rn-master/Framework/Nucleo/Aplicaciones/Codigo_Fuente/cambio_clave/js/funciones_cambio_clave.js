function matches_carac_especiales(clave){
	var carac_especiales = new Array();
	var matches = 0;
	carac_especiales = ["!","#","$","%","&","+",",","-",".","/",":","?","@","[","<?=ESC_BAR?><?=ESC_BAR?>","]","^","_","|"];
	for(var i=0;i<clave.length;i++){
		if($.inArray(clave.substr(i,1),carac_especiales)>=0)
			matches++;
	}
	return matches;
}
function busca_secuencia(lado,letra,siguiente,anterior,teclado){
	var fila = null;
	for(var i=0;i<teclado.length;i++){
		fila = teclado[i];
		if(lado == 'I'){
			if(letra == fila['C_TECLA'] && siguiente == fila['C_TECLA_IZQUIERDA']
				&&
				(
					(anterior == fila['C_TECLA_DERECHA'] && anterior != null)
					||
					anterior == null
				)
			){
				return 1;
			}
		}
		if(lado == 'D'){
			if(letra == fila['C_TECLA'] && siguiente == fila['C_TECLA_DERECHA']
				&&
				(
					(anterior == fila['C_TECLA_IZQUIERDA'] && anterior != null)
					||
					anterior == null
				)
			){
				return 1;
			}
		}
	}
	return 0;
}
function secuencia_basica(cadena,teclado){
	var retorno = 'N';
	var letra = null;
	var siguiente = null;
	var anterior = null;
	var basica_izquierda = 'S';
	var basica_derecha = 'S';
	for(var i=0;i<cadena.length-1;i++){
		letra = cadena.substr(i,1);
		siguiente = cadena.substr(i+1,1);
		if(busca_secuencia('I',letra,siguiente,anterior,teclado)==0){
			basica_izquierda = 'N';
			break;
		}
		anterior = letra;
	}
	anterior = null;
	for(var i=0;i<cadena.length-1;i++){
		letra = cadena.substr(i,1);
		siguiente = cadena.substr(i+1,1);
		if(busca_secuencia('D',letra,siguiente,anterior,teclado)==0){
			basica_derecha = 'N';
			break;
		}
		anterior = letra;
	}
	if(basica_izquierda == 'S' || basica_derecha == 'S'){
		retorno = 'S';
	}
	return retorno;
}
function obtener_secuencias_basicas(cadena,longitud_secuencia){
	longitud_secuencia = longitud_secuencia || 3;
	var secuencias = new Array();
	if(cadena.length >= longitud_secuencia){
		iteraciones = cadena.length - longitud_secuencia + 1;
	}
	else if(    cadena.length < longitud_secuencia
		&& cadena.length > 0){
		iteraciones = 1;
	}
	else{
		iteraciones = 0;
	}
	for(var i=0;i<iteraciones;i++){
		secuencias.push(cadena.substr(i,longitud_secuencia));
	}
	return secuencias;
}
function contiene_secuencia_basica(cadena,teclado){
	var secuencias = obtener_secuencias_basicas(cadena);
	var resultado = null;
	for(var i=0;i<secuencias.length;i++){
		resultado = secuencia_basica(secuencias[i],teclado);
		if(resultado == 'S'){
			return true;
		}
	}
	return false;
}
function check_security_level(key,encryption,teclado){ // Retorno L=LOW, M=MEDIUM, H=HIGH
	var longitud = key.length;
	var numeros = new RegExp('[0-9]');
	var minus = new RegExp('[a-z]');
	var mayus = new RegExp('[A-Z]');
	var sec_teclado = longitud >= 3 ? contiene_secuencia_basica(key.toUpperCase(),teclado) : true; //Buscar por ajax
	var ret = 'L';
	var match_minus = key.match(minus) == null ? 0 : key.match(minus).length;
	var match_mayus = key.match(mayus) == null ? 0 : key.match(mayus).length;
	//	var match_carac_especiales = matches_carac_especiales(key);
	var match_numeros = key.match(numeros) == null ? 0 : key.match(numeros).length;
	if(sec_teclado){
		//change_level(ret);
		return ret;
	}
	if(longitud < 8){
		//change_level(ret);
		return ret;
	}
	if(match_numeros > 0 && match_minus == 0 && match_mayus == 0 /*&& match_carac_especiales == 0*/){
		//change_level(ret);
		return ret;
	}
	if(match_minus > 0 && match_numeros == 0 && match_mayus == 0 /*&& match_carac_especiales == 0*/){
		//change_level(ret);
		return ret;
	}
	if(match_mayus > 0 && match_minus == 0 && match_numeros == 0 /*&& match_carac_especiales == 0*/){
		//change_level(ret);
		return ret;
	}
	if(/*match_carac_especiales > 0 &&*/ match_minus == 0 && match_numeros == 0 && match_mayus == 0){
		//change_level(ret);
		return ret;
	}
	if(    longitud >= 8
		|| (match_minus > 0 && match_mayus > 0)
		/*|| match_carac_especiales > 0*/
		|| (match_numeros > 0 && (match_minus > 0 || match_mayus > 0))
	){
		ret = 'M';
		//change_level(ret);
	}
	if(    longitud >= 8
		&& match_minus > 0
		&& match_mayus > 0
		/*&& match_carac_especiales > 0*/
		&& match_numeros > 0
	){
		if(  	longitud > 8
			|| (match_minus > 0 && match_mayus > 0 && match_numeros > 0)
			|| (match_minus > 0 && match_mayus > 0 && match_numeros > 0 /*&& match_carac_especiales > 0*/)
			/*|| match_carac_especiales > 1*/
			|| !sec_teclado)
		{
			ret = 'H';
			//change_level(ret);
		}
	}
	//change_level(ret);
	return ret;
}