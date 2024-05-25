
function get_date(date){
	var parts = date.split("/");
	return new Date(parts[2], parts[1] - 1, parts[0]);
}

/*****************************	FIN	 VALIDADO	**********************************/

/*Funcion recibe dos fechas y comparar que la fecha_hasta sea mayor que la fecha_desde.
Devuelve TRUE en caso que cumpla, FALSE caso contrario */
function compara_fechas(fecha_desde,fecha_hasta){	
	if($.datepicker.parseDate('dd/mm/yy',fecha_hasta) >= $.datepicker.parseDate('dd/mm/yy',fecha_desde)){		
		return true;
	}else{
		return false;
	}
}
/**
 * Setea parámetros a la una grilla y la recarga
 */
var form_open =  false;
var postDataInforme;
function setea_parametros(_grid,_parametros,_autoquery) {
	if(typeof(_autoquery) == 'undefined') _autoquery = 'S';

	var postdata = $(_grid).getGridParam('postData');
	var param = eval('(' + postdata.param + ')');
	$.extend(param, _parametros);
	postdata.m_autoquery = _autoquery;
	postdata.param = JSON.stringify(param);
	$(_grid).setGridParam('postdata', postdata);
	
	$(_grid).trigger('reloadGrid');

}

function cambia_condicion_masiva(p_n_id_menu, afecta) {
	$.get(FUNCIONES_FRAMEWORK+'ajax_busqueda.php', {
		tipo : "filtro",
		name : "campo",
		id : "src_condicion_" + afecta,
		cond1 : p_n_id_menu,
		change : "cambia_operador_masiva(\"" + afecta + "\")",
		size : "220"
	}, function(data) {
		$('#src_condicion_div_' + afecta).html(data.replace(/\\/g, ''));
		cambia_operador_masiva(afecta);
	});
}

function cambia_operador_masiva(afecta) {
	var condicion = $('#src_condicion_' + afecta).val();
	$.get(FUNCIONES_FRAMEWORK+'ajax_busqueda.php', {
		tipo : "operador",
		name : "equiv",
		id : "src_operador_" + afecta,
		cond1 : condicion,
		change : "cambia_criterio_masiva(\"" + afecta + "\")",
		size : "110;"
	}, function(data) {
		$('#src_operador_div_' + afecta).html(data.replace(/\\/g, ''));
		cambia_criterio_masiva(afecta);
	});
}

function cambia_criterio_masiva(afecta) {
	if ($('#src_operador_' + afecta).val() == 'NNULL' || $('#src_operador_' + afecta).val() == 'NULL') {
		$('#src_txt_div_' + afecta).html('');
	} else {
		$.get(FUNCIONES_FRAMEWORK+'ajax_busqueda.php', {
			tipo : "input",
			name : "text",
			id : "src_txt_" + afecta + "t",
			cond1 : $('#src_condicion_' + afecta).val(),
			cond2 : $('#src_operador_' + afecta).val(),
			cond3 : "text",
			size : "270"
		}, function(data) {
			$('#src_txt_div_' + afecta).html(data.replace(/\\/g, ''));
			$(".datepicker").datepicker({
				dateFormat : 'dd/mm/yy',
				changeMonth : true,
				changeYear : true,
				dayNamesMin : ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
				monthNamesShort : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
			});
			if ($('.formError ').length) {
				$.validationEngine.closePrompt("#src_txt_" + afecta + "t")
			}
		});
	}
	if ($('.formError ').length) {
		$.validationEngine.closePrompt("#src_txt_" + afecta + "t")
	}
}

/*
 //CUADROS////////////////////////////////////
 */

function mensaje_ajax(id, width, height, par1, par2, par3, par4, par5, fun_acepta, fun_cancela) {
	mensajes_ajax = 'framework/funciones/mensajes_ajax.php';
	var ruta = window.location.pathname.split('/');
	var cantidad = ruta.length;

	for ( i = 0; i < cantidad; i++) {

		if (ruta[i] == 'modulos') {
			mensajes_ajax = '../' + mensajes_ajax;
		}
	};

	$.get(mensajes_ajax, {
		"id" : id,
		"width" : width,
		"height" : height,
		"par1" : par1,
		"par2" : par2,
		"par3" : par3,
		"par4" : par4,
		"par5" : par5,
		"fun_acepta" : fun_acepta,
		"fun_cancela" : fun_cancela
	}, function(data) {
		eval(data);
	});
}

//CUIT///////////////////////////////////////////
function ValidaCuit(cuit) {
	var vec = new Array(10);
	cuit_rearmado = "";

	for (var i = 0; i < cuit.value.length; i++) {
		caracter = cuit.value.charAt(i);
		if (caracter.charCodeAt(0) >= 48 && caracter.charCodeAt(0) <= 57) {
			cuit_rearmado += caracter;
		}
	}
	cuit = cuit_rearmado;
	if (cuit.length != 11 || cuit.charAt(0) < 2) {// si no estan todos los digitos
		return false
	} else {
		x = i = dv = 0;
		// Multiplico los dÃ­gitos.
		vec[0] = cuit.charAt(0) * 5;
		vec[1] = cuit.charAt(1) * 4;
		vec[2] = cuit.charAt(2) * 3;
		vec[3] = cuit.charAt(3) * 2;
		vec[4] = cuit.charAt(4) * 7;
		vec[5] = cuit.charAt(5) * 6;
		vec[6] = cuit.charAt(6) * 5;
		vec[7] = cuit.charAt(7) * 4;
		vec[8] = cuit.charAt(8) * 3;
		vec[9] = cuit.charAt(9) * 2;

		// Suma cada uno de los resultado.
		for ( i = 0; i <= 9; i++) {
			x += vec[i];
		}
		dv = (11 - (x % 11)) % 11;
		if (dv == cuit.charAt(10)) {
			return true;
		}
	}
	return false
}

/*
 //FUNCIONES DE PABLO/////////////////////////////
 */

function evaluaABM(response, postdata) {
	var message = "";
	var json = eval('(' + response.responseText + ')');
	message = json.resultado;
	id = json.id;
	if (message == "" || message == "OK") {
		var success = true;
	} else {
		var success = false;
	}
	return [success, message, ''];
}

// Crea un form "on the fly" con campos hidden, para pasar parámetros que no figuren en la url.
function post_to_url(path, params, target, method) {
	// path es la url. Por ejemplo: web_solicitud_imp.php
	// params es un array asociativo (clave, valor). Por ejemplo: {'parametro1':'val1','parametro2','val2'}
	// method indica si es post o get. Si no se pasa nada, es post.

	method = method || "post";
	// Si no se pasa como parámetro, el método será post.

	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);
	if (target != '') {
		form.setAttribute("target", target);
	}

	for (var key in params) {
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", params[key]);

		form.appendChild(hiddenField);
	}

	document.body.appendChild(form);
	// Ver si es necesario...
	form.submit();
}

function modifica_condicion(id_menu) {

	$.get('../funciones/ajax_autocomplete.php', {
		tipo : "FIL",
		id_menu : id_menu
	}, function(data) {
		$("#src_condicion_div").html(data);
		//        $('#src_condicion').msDropDown();
		$("#src_txt").autocomplete("../funciones/ajax_autocomplete.php?tipo=COMP", {
			extraParams : {
				id_filtro : function() {
					return $("#src_condicion").val();
				}
			},
			delay : 1,
			minChars : 2,
			delimiter : /\n/,
			cacheLength : 0
		});
		modifica_oper();
	});
}

function modifica_oper() {

	$.get("../funciones/ajax_autocomplete.php", {
		tipo : "OPER",
		id_filtro : $("#src_condicion").val()
	}, function(data) {
		$("#src_operador_div").html(data);
		//        $('#src_operador').msDropDown();
	});
}

/**************************************************************
 Valida on line que sea numérico y tenga la cantidad de enteros-decimales
 especificados.
 val->valor
 sep->separador decimal
 entero->cant. de números enteros. -1 significa que no controla.
 decimal->ant de números decimales. -1 significa que no controla.
 ****************************************************************/
function mascara_numero(val, sep, entero, decimal) {
	//val = $(d).val();
	var seprep = ".";
	if (sep == '.') {
		seprep = ",";
	}
	val2 = val.replace(seprep, sep);
	var pat = new Array(entero, decimal);
	//---Verificar que sean números o el caracter de separación----
	var cantsep = 0;
	for ( z = 0; z < val2.length; z++) {
		// ---- Permitiremos el caracter de separacion-----
		if (val2.charAt(z) == sep && cantsep == 0) {
			cantsep = cantsep + 1;
		} else {
			if (val2.charAt(z) == ' ' || isNaN(val2.charAt(z))) {
				letra = val2.charAt(z);
				val2 = val2.replace(letra, "");
			}
		}
	}
	// ----- Recorta la extensión de cada porción del numero. Si es cero el patrón, nada.
	vector = val2.split(sep);
	largo = vector.length;
	for ( s = 0; s < largo; s++) {
		if (pat[s] != -1) {
			vector[s] = vector[s].substring(0, pat[s]);
		}
	}
	// ----- vuelve a armar el número añadiendo los separadores--------
	for ( q = 0; q < largo; q++) {
		if (q == 0) {
			val = vector[q];
		} else {
			val += sep + vector[q];
		}
	}
	//	$(d).val(val);
	return val;
}

/********
 getCursorPos: Me devuelve la posición de inicio y fin de la selección o la posición del |(cursor) en el campo
 ********/
function getCursorPos(campo) {
	/* Obtener la posicion inicial y final del cursor en un text area.*/

	if (document.selection) {// IE Support

		campo.focus();
		// Set focus on the element
		var oSel = document.selection.createRange();
		// To get cursor position, get empty selection range
		oSel.moveStart('character', -campo.value.length);
		// Move selection start to 0 position
		campo.selectionEnd = oSel.text.length;
		// The caret position is selection length
		oSel.setEndPoint('EndToStart', document.selection.createRange());
		campo.selectionStart = oSel.text.length;
	}
	//setCursorPos(campo, campo.selectionEnd);
	return {
		start : campo.selectionStart,
		end : campo.selectionEnd
	};
}

function setCursorPos(ctrl, pos) {
	/* Colocar el cursor en una posicion determinada de un text area.*/

	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	} else if (ctrl.createTextRange) {//IE
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

/** FORMATEA LOS NUMEROS COMO 999.999,9999
 parametros: value: valor a formatear
 character: si es '+' -> significa que se va a agregar un caracter al final
 si es '' -> Formatea la cadena como esta.*/
function formatea_number(value, character) {

	var nueva_cadena = '';
	var separar_miles = 0;
	var hay_coma;
	var negativo;
	var parte_entera;

	value = value.replace(/\./g, '');
	//Saco todos los . (seperadores de miles)

	if (value.search('-') != -1) {
		value = value.replace('-', '');
		negativo = 1;
	} else {
		negativo = 0;
	}

	var posicion_coma = value.search(',');
	//Busco la coma

	if (posicion_coma != -1) {//-1 significa que no hay coma
		hay_coma = 1;
	} else {
		hay_coma = 0;
		posicion_coma = value.length + 1;
	}

	if (character == '' || hay_coma) {

		if (hay_coma) {
			parte_entera = value.search(',');
		} else {
			parte_entera = value.length;
		}

		if (parte_entera > 3) {//parte_entera va a tener 1 más que la cadena total en caso de no tener coma, o la parte entera si existe.

			var digitos_adelante = parte_entera % 3;
			//Resto de la division por 3
			for (var i = 0; i < digitos_adelante; i++) {
				nueva_cadena += value.substr(i, 1);
				//value[i]-> para que funcione en IE7
			}
			if (digitos_adelante != 0) {
				nueva_cadena += '.';
			}

			for (var i = digitos_adelante; i < parte_entera; i++) {

				if (separar_miles == 3) {
					nueva_cadena += '.';
					separar_miles = 0;
				}
				nueva_cadena += value.substr(i, 1);
				separar_miles++;
			}

			if (hay_coma) {
				while (posicion_coma < value.length) {
					nueva_cadena += value.substr(posicion_coma, 1);
					posicion_coma++;

				}
			}

			value = nueva_cadena;
		} else if (parte_entera == 0 && hay_coma) {
			value = '0' + value;
		}

	} else if (character == '+' && !hay_coma) {

		parte_entera = value.length + 1;

		if (parte_entera > 3) {//parte_entera va a tener 1 más que la cadena total en caso de no tener coma, o la parte entera si existe.

			var digitos_adelante = parte_entera % 3;
			//Resto de la division por 3
			for (var i = 0; i < digitos_adelante; i++) {
				nueva_cadena += value.substr(i, 1);
			}

			if (digitos_adelante != 0) {
				nueva_cadena += '.';
			}

			for (var i = digitos_adelante + 1; i < parte_entera; i++) {

				if (separar_miles == 3) {
					nueva_cadena += '.';
					separar_miles = 0;
				}
				nueva_cadena += value.substr(i - 1, 1);
				separar_miles++;
			}

			if (hay_coma) {
				while (posicion_coma < value.length) {

					nueva_cadena += value.substr(posicion_coma, 1);
					posicion_coma++;
				}
			}
			value = nueva_cadena;
		}

	}

	if (negativo) {
		value = '-' + value;
	}

	return value;
}

/** FUNCION QUE PERMITE COLOCAR NUMEROS FORMATEDOS Y EVITA QUE COLOQUEN LETRAS O SIMBOLOS...*/
/** SE DEBE LLAMAR EN EL EVENTO onkeydown(), y los parametros son:
 evt -> evento: (event)
 ob -> El objeto que se quiere controlar: (this)
 dec -> La cantidad de decimales aceptables, si se coloca 0 no permitira escribir ',' */
function controla_number(evt, ob, dec) {

	var permitir = 0;
	var hay_punto = 0;
	var dec_completo = 0;
	var nueva_cadena = '';
	var cursor = getCursorPos(ob);
	//Obtengo las posiciones inicial y final del cursor

	if (window.event) {// IE
		keyNum = evt.keyCode;
	} else {
		keyNum = evt.which;
	}

	if (ob.value.search(',') != -1) {
		hay_punto = 1;
		var posicion_coma = ob.value.search(',');
		if (ob.value.length - posicion_coma > dec && cursor.start == cursor.end && cursor.start > posicion_coma) {
			dec_completo = true;
		} else {
			dec_completo = false;
		}

	} else {
		hay_punto = 0;
	}

	if (keyNum == 9 || keyNum == 37 || keyNum == 39 || keyNum == 173) {//Flechas , TAB , Guion Medio (Mod AM)
		return true;
	}

	if (keyNum == 110 || keyNum == 190 || keyNum == 188) {//si quiere poner separador de decimales.

		if (ob.value.length - cursor.start < dec && !hay_punto) {

			for (var i = 0; i < cursor.start; i++) {

				nueva_cadena += ob.value.substr(i, 1);
			}
			if (ob.value.length == 0) {
				nueva_cadena += '0,';
			} else {
				nueva_cadena += ',';
			}

			for (var i = cursor.start; i < ob.value.length; i++) {
				nueva_cadena += ob.value.substr(i, 1);
			}
			ob.value = nueva_cadena;
		}

		ob.value = formatea_number(ob.value, '');

		evt.preventDefault();
		return true;
	}

	if (keyNum == 8 || keyNum == 46 || (((keyNum >= 96 && keyNum <= 105) || (keyNum >= 48 && keyNum <= 57 && !evt.shiftKey && !evt.ctrlKey)) && !dec_completo)) {

		var caracter = '';
		//var cantidad_caracteres_ini = ob.value.length;
		//var cantidad_caracteres_fin = 0;
		var posicion_cursor = cursor.end;

		switch(keyNum) {
			case 48:
			case 96:
				//alert('0');
				caracter = '0';
				break;
			case 49:
			case 97:
				//alert('1');
				caracter = '1';
				break;
			case 50:
			case 98:
				//alert('2');
				caracter = '2';
				break;
			case 51:
			case 99:
				//alert('3');
				caracter = '3';
				break;
			case 52:
			case 100:
				//alert('4');
				caracter = '4';
				break;
			case 53:
			case 101:
				//alert('5');
				caracter = '5';
				break;
			case 54:
			case 102:
				//alert('6');
				caracter = '6';
				break;
			case 55:
			case 103:
				//alert('7');
				caracter = '7';
				break;
			case 56:
			case 104:
				//alert('8');
				caracter = '8';
				break;
			case 57:
			case 105:
				//alert('9');
				caracter = '9';
				break;
			case 8:
				//alert('borrar');
				if (cursor.start == cursor.end) {
					if (ob.value.substr(cursor.end - 1, 1) == '.') {// El punto no se puede borrar. Retrocedo una posición
						posicion_cursor--;
					}
					ob.value = ob.value.replace(ob.value.substring(0, cursor.end), ob.value.substring(0, cursor.end - 1) + caracter);
					posicion_cursor--;
				}
				caracter = '';
				break;
			case 46:
				//alert('suprimir');
				if (cursor.start == cursor.end) {
					ob.value = ob.value.replace(ob.value.substring(0, cursor.end + 1), ob.value.substring(0, cursor.end) + caracter);
				}
				caracter = '';
				break;
			default:
				caracter = '';
		}

		// Seteo el cursor con respecto a la cantidad de caracteres a la derecha.
		var old_length = ob.value.length;

		posicion_derecha = old_length - posicion_cursor;

		ob.value = ob.value.replace(ob.value.substring(0, cursor.end), ob.value.substring(0, cursor.start) + caracter);

		ob.value = formatea_number(ob.value, '');

		setCursorPos(ob, ob.value.length - posicion_derecha);

		evt.preventDefault();
		return true;

	} else if (keyNum == 109) {//SIGNO - !!!
		if (ob.value.length == 0 || cursor.start == 0) {
			return true;
		} else {
			evt.preventDefault();
			return true;
		}
	} else if (keyNum == 13) {//ENTER
		return true;
	} else {
		evt.preventDefault();
		return true;
	}
}

/* 	MJ: Poner al final del documentReady
	Poner la clase auto_height al div del filtro estatico si posee filtro estático para que detecte ese div
	El filtro estatico dinámico será detectado automaticamente, pero se le deberá pasar como parámetro a la
	función el nombre de la grilla a renderizar automaticamente 
*/
function alto_grilla_dinamico(grid_name = null, height_bottom = 70){
	$('.ui-jqgrid-bdiv').height(function(index, height){
		return window.innerHeight - $(this).offset().top - height_bottom;
	});
	
	$('.auto_height').on('shown.bs.collapse', function() {
		$('.ui-jqgrid-bdiv').height(function(index, height){
			return window.innerHeight - $(this).offset().top - height_bottom;
		});
	});
	
	$('.auto_height').on('hidden.bs.collapse', function (e) {
		$('.ui-jqgrid-bdiv').height(function(index, height){
			return window.innerHeight - $(this).offset().top - height_bottom;
		});
	});
	
	if (grid_name != null){
		$("#search_tabs_" + grid_name).bind('tabsactivate', function (e, ui) {
			$('.ui-jqgrid-bdiv').height(function(index, height){
				return window.innerHeight - $(this).offset().top - height_bottom;
			});
		});
	}
}

/*MJ - Esta función aplica sobre un campo de ingreso de texto, y va a restringir
el ingreso de datos a solo números enteros. En el código hay que poner de la
siguiente manera (con el evento "keydown"):
	$("#n_campo_input").keydown(function (event) {
		entero_con_n_digitos(event, this, cant_digitos)
	});
(si el parametro cant_digitos no se ingresa, se permitirá indefinidamente el ingreso de dígitos)*/
function entero_con_n_digitos(evt, ob, n = null){
	// Permite: backspace, delete, tab, escape, enter and .
	if ($.inArray(evt.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
		// Permite: Ctrl+A, Command+A
		(evt.keyCode === 65 && (evt.ctrlKey === true || evt.metaKey === true)) ||
		// Permite: home, end, left, right, down, up
		(evt.keyCode >= 35 && evt.keyCode <= 40)) {
			// Permite que suceda el evento
			return;
	}
	
	// Se asegura que sea un numero y frena el evento de tecleo
	if ((evt.shiftKey || (evt.keyCode < 48 || evt.keyCode > 57)) && (evt.keyCode < 96 || evt.keyCode > 105)) {
		evt.preventDefault();
	}
	
	// Si es del largo n, frena el evento de tecleo (salvo que esté "selected" el texto)
	if(ob.value.length == n){
		var startPos = ob.selectionStart;
		var endPos = ob.selectionEnd;
		var doc = document.selection;
		if(doc && doc.createRange().text.length != 0){
			return;
		}else if (!doc && ob.value.substring(startPos,endPos).length != 0){
			return;
		}
		evt.preventDefault();
	}
}

function redondear(cantidad, decimales) {
	//cantidad -> El numero que se quiere redondear
	//decimales -> la cantidad de decimales a la que va a redondear

	//var cantidad = parse(cantidad);
	var cantidad;
	var decimales = parseFloat(decimales);
	var cadena_mascara;
	decimales = (!decimales ? 2 : decimales);
	num_cadena = (Math.round(cantidad * Math.pow(10, decimales)) / Math.pow(10, decimales)).toString();
	num_cadena = num_cadena.replace('.', ',');
	//Cambio el punto por la coma

	//alert('String: '+num_cadena);
	return formatea_number(num_cadena, '');

}
function parse(val) {

	if (val == '') {
		return 0;
	} else {

		if (!isNaN(val)) {
			val = val.toString();
		}
		val = val.replace(/\./g, '');
		//Saco todos los . (seperadores de miles)
		val = val.replace(',', '.');
		//Cambio la coma por el punto

		return parseFloat(val);
	}
}

/*************************************************** Descripcion **************************************************
 Lautaro López - 26/12/2013

 KeyCode o Which validos para esta funcion {
		Numeros [0-9] : 48, 49, 50, 51, 52, 53, 54, 55, 56, 57 -- Teclado normal
						96, 97, 98, 99, 100, 101, 102, 103, 104, 105 -- Teclado numerico
		Tabulador : 9
		flecha izquierda : 37
		flecha derecha : 39
		backspace : 8
		delet: 46
	}

 Descripcion de la funcion {
		- Siempre va a llegar una cadena de 5 caracteres, la primera vez que entra llega 00:00.
		- En caso de que se envie una cadena corrupta, se agrego un codigo corrector para evitar
		inconcistencias al enviar el valor para grabar en base.
		- Se escribe de IZQUIERDA a DERECHA, ej: 1 -> 10:00 , 2 -> 12:00 , 3 -> 12:30 , 0 -> 12:30.
		- Cuando se llega al final vuelve a la primera posicion de la IZQUIERDA.
		- NO les permito borrar, directamente REEMPLAZAN el numero que quieren colocando el cursor
		en la posicion que desean reemplazar el numero.
		- Si presionan DEL o BACKSPACE se borra la hora permitiendo dejar en blanco el text-box
	}
 ******************************************************** FIN *****************************************************/

function controla_hora(evt, ob) {

	var cant_max_caracteres = 5;

	//alert(ob.value);

	var cursor = getCursorPos(ob);
	var posicion_cursor = cursor.end;

	// Diferencion si el navegador es IE u Otro
	if (window.event) {// IE
		keyNum = evt.keyCode;
	} else {//Otro
		keyNum = evt.which;
	}

	/*
	 Si presionan del o backspace directamente borro la hora par que puedan dejarla vacia.
	 */

	if(keyNum == 8 || keyNum == 46){
		ob.value = '';
		evt.returnValue = false;
		return false;
	}

	/*
	 Si presionan cualquier tecla numerica y la cadena es vacia, coloca la mascara n0:00 donde n
	 es el la tecla numerica presionada por el usuario.
	 */

	if(ob.value == ''){

		if (keyNum == 9 || keyNum == 37 || keyNum == 39) {
			return true;
		}

		if ( (keyNum >= 96 && keyNum <= 105) || (keyNum >= 48 && keyNum <= 57 && !evt.shiftKey && !evt.ctrlKey) ) {

			var caracter = '';

			switch(keyNum) {
				case 48:
				case 96:
					caracter = '0';
					break;
				case 49:
				case 97:
					caracter = '1';
					break;
				case 50:
				case 98:
					caracter = '2';
					break;
				case 51:
				case 99:
					caracter = '3';
					break;
				case 52:
				case 100:
					caracter = '4';
					break;
				case 53:
				case 101:
					caracter = '5';
					break;
				case 54:
				case 102:
					caracter = '6';
					break;
				case 55:
				case 103:
					caracter = '7';
					break;
				case 56:
				case 104:
					caracter = '8';
					break;
				case 57:
				case 105:
					caracter = '9';
					break;
				default:
					caracter = '';
			}

			// Seteo el cursor en la posicion siguiente luego de acomodar la cadena.
			if(caracter != ''){
				ob.value = caracter + '0:00';
				setCursorPos(ob, 1);
			}

			evt.returnValue = false;
			return false;
		}else{
			evt.returnValue = false;
			return false;
		}
	}

	/*
	 Checkeo que no hayan tratado de insertar una cadena mayor a la permitida para
	 la definicion de la hora
	 */

	if(ob.value.length == cant_max_caracteres){

		if (keyNum == 9 || keyNum == 37 || keyNum == 39) {
			return true;
		}

		if ( (keyNum >= 96 && keyNum <= 105) || (keyNum >= 48 && keyNum <= 57 && !evt.shiftKey && !evt.ctrlKey) ) {

			var caracter = '';

			switch(keyNum) {
				case 48:
				case 96:
					caracter = '0';
					break;
				case 49:
				case 97:
					caracter = '1';
					break;
				case 50:
				case 98:
					caracter = '2';
					break;
				case 51:
				case 99:
					caracter = '3';
					break;
				case 52:
				case 100:
					caracter = '4';
					break;
				case 53:
				case 101:
					caracter = '5';
					break;
				case 54:
				case 102:
					caracter = '6';
					break;
				case 55:
				case 103:
					caracter = '7';
					break;
				case 56:
				case 104:
					caracter = '8';
					break;
				case 57:
				case 105:
					caracter = '9';
					break;
				default:
					caracter = '';
			}

			// Seteo el cursor en la posicion siguiente luego de acomodar la cadena.
			if(caracter != ''){
				if(posicion_cursor == 2){
					ob.value = ob.value.substring(0,3)+caracter+ob.value.substring(4);
					setCursorPos(ob, 4);
				}else{
					ob.value = ob.value.substring(0,posicion_cursor)+caracter+ob.value.substring(posicion_cursor+1);
					if((posicion_cursor+1) == cant_max_caracteres){
						setCursorPos(ob, 0);
					}else{
						setCursorPos(ob, posicion_cursor + 1);
					}
				}
			}

			evt.returnValue = false;
			return false;

		} else {
			evt.returnValue = false;
			return false;
		}
	}else{
		/*
		 Tratamos de armar una hora con la cadena corrupta enviada, en caso de no poder enviamos
		 el valor por defecto de la hora (00:00).
		 */

		var string = '';
		var termino = false;

		var i = 0;
		while(!termino){
			if(!isNaN(ob.value[i])){
				string = string + ob.value[i];
			}

			i++;

			if(string.length == 2){
				string = string + ':';
			}

			if(string.length == cant_max_caracteres || ob.value.length == i){
				termino = true;
			}
		}

		if(string.length == cant_max_caracteres){
			ob.value = ob.value.replace(ob.value,string);
		}else{
			ob.value = ob.value.replace(ob.value,'00:00');
		}

		setCursorPos(ob, 0);

		evt.returnValue = false;
		return false;
	}
}

/*************************************************** Descripcion **************************************************
 Lautaro López - 13/02/2014

 Descripcion de la funciones {
		- la funcion nationalDays devuelve true o false dependiendo del dia que se muestra en el datepicker
		- la funcion noWeekendsOrHolidays bloquea en el datepicker los fines de semana y los feriados que
		fueron cargados en la tabla 'Feriados' en la base de datos.
		- la funcion control_escritura_fecha controla la fecha cuando es escrita a mano para evitar que ingresen
		feriados o fines de semana.
	}

 Funcionamiento {
		- para el datepicker que se necesite bloquear los feriados y fines de semana (caso de los vencimientos, etc.)
		lo que se hace es lo siguiente:

			*setear la siguiente opcion en el datepicker pasandole como parametro un array con los dias feriados:

				$("#id_del_datepicker").datepicker("option","beforeShowDay",function(date){
					return noWeekendsOrHolidays(date,disabledDays);
				});

			*Agregar las siguientes lineas en su php de desarrollo:

				var disabledDays = new Array();
				var fecha_actual = new Date();

				$.post(
					"nombre_carpeta/feriados.php",
					{"anio":fecha_actual.getFullYear()},
					function(data){
						var ret = eval('('+data+')');
						//console.log(data);
						if (ret.resultado == 'OK'){
							disabledDays = ret.dias;
							//console.log(disabledDays);
						}else{
							disabledDays = new Array();
						}
					}
				);

		- Probado y en funcionamiento en 'calendario_fical.php' - SIATAV
	}
 ******************************************************** FIN *****************************************************/
function nationalDays(date,disabledDays) {
	var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();

	switch(m){
		case 0: m = '01';
			break;
		case 1: m = '02';
			break;
		case 2: m = '03';
			break;
		case 3: m = '04';
			break;
		case 4: m = '05';
			break;
		case 5: m = '06';
			break;
		case 6: m = '07';
			break;
		case 7: m = '08';
			break;
		case 8: m = '09';
			break;
		case 9: m = '10';
			break;
		case 10: m = '11';
			break;
		case 11: m = '12';
			break;
	}

	switch(d){
		case 1: d = '01';
			break;
		case 2: d = '02';
			break;
		case 3: d = '03';
			break;
		case 4: d = '04';
			break;
		case 5: d = '05';
			break;
		case 6: d = '06';
			break;
		case 7: d = '07';
			break;
		case 8: d = '08';
			break;
		case 9: d = '09';
			break;
	}

	for (i = 0; i < disabledDays.length; i++) {
		if((disabledDays[i] == d + '/'+ m + '/' + y)) {
			return [false];
		}
	}
	return [true];
}

function noWeekendsOrHolidays(date,disabledDays) {
	var noWeekend = jQuery.datepicker.noWeekends(date);
	return noWeekend[0] ? nationalDays(date,disabledDays) : noWeekend;
}

function control_escritura_fecha(fecha){
	var res = fecha.split('/');
	var fecha_escrita=new Date();
	fecha_escrita.setFullYear(res[2],res[1]-1,res[0]);
	var es_feriado = false;

	//console.log(fecha_escrita);

	$.ajaxSetup({async:false});
	$.post(
		FUNCIONES_BASEPATH+"control_feriados.php",
		{"fecha":fecha},
		function(data){
			//console.log(data);
			if (data == 'OK'){
				es_feriado = false;
			}else{
				es_feriado = true;
			}
		}
	);
	$.ajaxSetup({async:true});

	//Controlamos que no sea feriado
	if(es_feriado) {
		return false;
	}

	//Controlamos que no sea fin de semana
	var dia_de_la_semana = fecha_escrita.getDay();
	if((dia_de_la_semana == 0)||(dia_de_la_semana == 6)){
		return false;
	}

	return true;
}
/* ***************************************************  FIN de Feriados ******************************************/



/*************************************************** Descripcion **************************************************
 Lautaro López - 20/03/2015

 Descripcion de la funciones {
		Corrobora que la fecha ingresada por el usuario sea una fecha valida
	}

 Funcionamiento {
		La fecha pasada por parametro debe estar en el formato 'dd/mm/yyyy'
	}
 ******************************************************** FIN *****************************************************/
/*function existeFecha(fecha){
 var minYear=1900;
 var maxYear=3000;

 function isInteger(s){
 var i;
 for (i = 0; i < s.length; i++){
 var c = s.charAt(i);
 if (((c < "0") || (c > "9"))) return false;
 }
 return true;
 }

 function daysInFebruary (year){
 return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
 }

 function DaysArray(n) {
 for (var i = 1; i <= n; i++) {
 this[i] = 31;
 if (i==4 || i==6 || i==9 || i==11) {this[i] = 30;}
 if (i==2) {this[i] = 29;}
 }
 return this;
 }

 function isDate(dtStr){
 var daysInMonth = DaysArray(12);
 var fec = dtStr.split("/");
 var strDay=fec[0];
 var strMonth=fec[1];
 var strYear=fec[2];

 month=parseInt(strMonth);
 day=parseInt(strDay);
 year=parseInt(strYear);

 if (strMonth.length<2 || month<1 || month>12){
 return false;
 }
 if (strDay.length<2 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
 return false;
 }
 if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
 return false;
 }
 return true;
 }

 if(isDate(fecha)){
 return true;
 }else{
 return false;
 }
 }*/

function isDate(caller) {

	var fecha = $.trim($(caller).val());
	$(caller).val(fecha);

	if (fecha == "")
		return true;

	var datePat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
	//var datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;

	//	var matchArray = $(caller).val().match(datePat); // is the format ok?
	var matchArray = fecha.match(datePat);
	// is the format ok?
	if (matchArray == null)
		return false;

	var day = matchArray[1];
	// p@rse date into variables
	var month = matchArray[2];
	var year = matchArray[3];

	if (month < 1 || month > 12)// check month range
		return false;

	if (day < 1 || day > 31)
		return false;

	if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31)
		return false;

	if (month == 2) {// check for february 29th
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day > 29 || (day == 29 && !isleap))
			return false;
	}
	return true;
	// date is valid
}
/* ***************************************************  FIN de Existe Fecha ******************************************/

function addCssRule(selector, rule) {

	var sheet = document.styleSheets[0];
	if (sheet.insertRule) {// ie
		sheet.insertRule("" + selector + " { " + rule + " }", sheet.cssRules.length);
	} else if (sheet.addRule) {// firefox
		sheet.addRule(selector, rule);
	}

}

function formatearFecha( _this ){
	var formato_fecha = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[/\\/]\d{2}|d{4}$/;
	if(formato_fecha.test(_this.val()) && _this.val() != '' ){
		// Pongo '/' y '-' como posibles separadores
		var opera1 = _this.val().split('/');
		var opera2 = _this.val().split('-');
		lopera1 = opera1.length;
		lopera2 = opera2.length;
		
		// Extraigo en variables el día, mes y año
		if (lopera1 > 1) {
			var pdate = _this.val().split('/');
		} else if (lopera2 > 1) {
			var pdate = _this.val().split('-');
		}
		var dd = parseInt(pdate[0]);
		var mm = parseInt(pdate[1]);
		var yy = parseInt(pdate[2]);
		
		// Creo la lista de días de un mes (asumiendo por defecto que no hay anio bisiesto)
		var listado_dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (mm == 1 || mm > 2) {
			if (dd > listado_dias[mm - 1]) {
				_this.val("")
			}
		}
		if (mm == 2) {
			var anio_bisiesto = false;
			if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
				anio_bisiesto = true;
			}
			if ((anio_bisiesto == false) && (dd >= 29)) {
				_this.val("")
			}
			if ((anio_bisiesto == true) && (dd > 29)) {
				_this.val("")
			}
		}
	} else {
		_this.val("")
	}
}


/* MPampín */
/* Función que llama al menu indicado por parámetro */

function llamar_menu(item) {
	var url = $(item).attr('data-url');
	$('<form id="menu_post" action="'+url+'" method="post"></form>').appendTo('body');
	var param = eval('('+$(item).attr('data-param')+')');
	$.each(param, function(key, value) {
		$('<input type="hidden" name="'+key+'" />').appendTo('#menu_post').val(value);
	});
	var id_menu = $(item).attr('data-id-menu');
	$('<input type="hidden" name="p_n_id_menu" />').appendTo('#menu_post').val(id_menu);

	$('#menu_post').submit();

}

function newMenu(idMenu){
    var url = $('#id_li_'+idMenu+' a.nav-link').attr("data-url");
    var param = JSON.parse($('#id_li_'+idMenu+' a.nav-link').attr("data-param"));
    param.p_n_id_menu = idMenu;
    post_to_url(url, param, '', 'POST');
}

function volver_menu(id_menu) {
	llamar_menu($(".ruta a.menu-item[data-id-menu='"+id_menu+"']")[0]);
}


function quita_mascara_numerica(numero){
	var aux = numero.split('.');
	var retorno = '';

	for(i=0;i<aux.length;i++){
		retorno = retorno + aux[i];
	}

	retorno = retorno.replace(',','.');

	return retorno;
}

function mostrar_progressbar(_settings){
	/*
	 *   id_div_content = id del tab que contendrá la estructura del dialogo a crear
	 *   p_name_job = nombre del job que se desea seguir
	 *   id_button = id del botón que ejecutara la llamada al dialog (opcional)
	 *   fun_beforeProgress = función que se ejecutara antes de realizar el seguimiento del job (opcional)
	 *   fun_completeProgress = función que se ejecutara al finalizar el seguimiento del job (opcional)
	 *   fun_closeProgess = función que se ejecutara al cerrar el dialogo de el seguimiento del job (opcional)
	 */

	var settings = $.extend({
		id_div_content:'',
		p_name_job:'',
		id_button:null,
		fun_beforeProgress:null,
		fun_completeProgress:null,
		fun_closeProgess:null
	},_settings);

	var id_div_content = settings.id_div_content;
	var p_name_job = settings.p_name_job;
	var _id_button = settings.id_button;
	var _fun_acepta = settings.fun_beforeProgress;
	var _fun_complete = settings.fun_completeProgress;
	var _fun_close = settings.fun_closeProgess;

	var fun_acepta;
	if(_fun_acepta != null){
		switch (typeof(_fun_acepta)) {
			case 'string':
				fun_acepta = function() {eval(_fun_acepta);};
				break;
			case 'undefined':
				fun_acepta = function() {null;};
				break;
			default:
				fun_acepta = _fun_acepta;
		}
	}else{
		fun_acepta = function(){null;};
	}

	var fun_complete;
	if(_fun_complete != null){
		switch (typeof(_fun_complete)) {
			case 'string':
				fun_complete = function(){eval(_fun_complete);};
				break;
			case 'undefined':
				fun_complete = function(){null;};
				break;
			default:
				fun_complete = _fun_complete;
		}
	}else{
		fun_complete = function(){null;};
	}

	var fun_close;
	if(_fun_close != null){
		switch (typeof(_fun_close)) {
			case 'string':
				fun_close = function() {eval(_fun_close);};
				break;
			case 'undefined':
				fun_close = function() {null;};
				break;
			default:
				fun_close = _fun_close;
		}
	}else{
		fun_close = function(){null;};
	}

	var prog_html = '<div id="dialog_progressbar'+id_div_content+'" title="Estado de proceso">'+
		'<div class="progress-label'+id_div_content+'">Iniciando proceso...</div>'+
		'<div id="progressbar'+id_div_content+'"></div>'+
		'</div>';
	//'<button id="progressButton">Simulación</button>';

	$('#'+id_div_content).html(prog_html);

	var flag = false;
	var progressTimer;
	var progressbar = $("#progressbar"+id_div_content);
	var progressLabel = $(".progress-label"+id_div_content);
	var dialogButtons = [{text: "Cancelar",click: closeProgress}];
	var dialog = $("#dialog_progressbar"+id_div_content).dialog({
		autoOpen: false,
		closeOnEscape: false,
		resizable: false,
		modal: true,
		open: function(){
			$.ajaxSetup({async:false});
			progressTimer = setTimeout(progress, 1000);
		},
		close: function(){
			closeProgress();
		},
		beforeClose: function(){
			if(_id_button != null){
				progressButton.button("option", {disabled: false});
			}
			$.ajaxSetup({async:true});
		}
	});
	var progressButton;
	if(_id_button != null){
		progressButton = progressButton = $("#"+_id_button).button().on("click", function() {
			$(this).button("option", {disabled: true});
			fun_acepta();
			dialog.dialog( "open" );
		});
	}else{
		fun_acepta();
		dialog.dialog("open");
	}

	progressbar.progressbar({
		value: false,change: function() {
			progressLabel.text("Estado del proceso: " + progressbar.progressbar( "value" ) + "%");
		},
		complete: function() {
			progressLabel.text( "Proceso finalizado!" );
			dialog.dialog( "option", "buttons", [{
				text: "Cerrar",
				click: closeProgress
			}]);
			if(flag == false){
				flag = true;
				fun_complete();
			}
		}
	});

	function progress() {
		var val = progressbar.progressbar( "value" ) || 0;

		if(val <= 99){
			var value = parseFloat(callProgressbar());
			if(isNaN(value)){
				mostrar_error('Se generó un error al visualizar estado del procedimiento, el proceso de seguimiento se finalizara a continuación.');
				closeProgress();
			}else{
				progressbar.progressbar("value",value);
				if (value <= 99) {
					progressTimer = setTimeout(progress, 2000);
				}

			}
		}
	}

	function closeProgress() {
		clearTimeout( progressTimer );
		dialog.dialog("option", "buttons",dialogButtons).dialog("close");
		progressbar.progressbar( "value", false );
		progressLabel.text( "Iniciando proceso..." );
		fun_close();
	}

	function callProgressbar(){
		$.ajaxSetup({async:false});
		var n_progress = null;
		$.post(FUNCIONES_FRAMEWORK+'devuelve_progressbar.php',{"p_name_job":p_name_job
		}, function(data){
			n_progress = data.n_progress;
		},"json");
		$.ajaxSetup({async:true});
		setTimeout(null, 500);
		return n_progress;
	}
}


function openDialogInformes( postData, pager_id ){
	postDataInforme = postData;
	$('#dialog_tipo_informe_'+pager_id).modal('show');
	$('#dialog_tipo_informe_'+pager_id+' .bt_excel').hide();
	$('#dialog_tipo_informe_'+pager_id+' .bt_pdf').show();
	$('#dialog_tipo_informe_'+pager_id+' .genera_pdf').hide();
	$('#dialog_tipo_informe_'+pager_id+' .content_list_pdf').hide();
	$('#dialog_tipo_informe_'+pager_id+' .cancelar_pdf').hide();
	$('#dialog_tipo_informe_'+pager_id+' .add_comentario').hide();
	$('#dialog_tipo_informe_'+pager_id+' .orientacion').hide();
	$('#dialog_tipo_informe_'+pager_id+' .enlaces').hide();
	$('#dialog_tipo_informe_'+pager_id+' .lbl_orientacion').hide();
	$('#dialog_tipo_informe_'+pager_id+' .txt_comentario_informe').hide().val(null);
	$('#dialog_tipo_informe_'+pager_id+' .list_pdf').html('');
}

function genera_excel(tmp_pager_id, title, $url = FUNCIONES_BASEPATH+'export_excel.php'){
	postDataInforme.title = title;
	var col_select = new Array();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .col_imprimir:checked').each(function(){
		col_select.push($(this).attr('columna'));
	});
	if(col_select.length<=0){
		mostrar_cuadro('E','Error','Debe seleccionar al menos una columna para la generaci&oacute;n del archivo Excel.');
	}else{
		postDataInforme.columnas = JSON.stringify(col_select);
		post_to_url(
			$url,
			postDataInforme,
			'_export_excel',
			'post'
		);
	
	}
}

function config_pdf(tmp_pager_id, grid_id){
	$('#dialog_tipo_informe_'+tmp_pager_id+' .bt_excel').show();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .bt_pdf').hide();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .orientacion').show();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .enlaces').show();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .lbl_orientacion').show();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .genera_pdf').show();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .content_list_pdf').show();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .cancelar_pdf').show();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .add_comentario').show();

	var id_ar = new Array();

	var a = $("#"+grid_id).jqGrid("getGridParam", "colModel");
	
	var i = 0;
	var tipos_a_no_exportar = ['HTML'];
	$('#gview_'+grid_id+' [role=columnheader]').each(function(){

		if( $(this).is(':visible') && (!$(this).parents('.ui-search-toolbar').length)){
			if (!tipos_a_no_exportar.includes(a[i].frmwktype)){
				var v_id = $(this).attr('id').replace(grid_id+'_','');
				v_id = v_id.replace('jqgh_', ''); //nuevo de jqgrid
				if(a[i].formoptions != undefined){
					var v_label = a[i].formoptions.label.replace('(*)','').replace(/<br>/g,' ').replace(/<br\/>/g,' ');
					id_ar.push({id:v_id, label:v_label });
				}
			}
		}
		i++;
	});
	//console.log(id_ar);
	var mitad_lista = parseInt(id_ar.length/2);
	var html_list = '<div class="col-md-6"><ul class="list_pdf list-group">';
	for(i=0; i<id_ar.length; i++){
		//alert(id_ar[i]['id']);
		html_list += '<li class="list-group-item"><span class="badge">'+(i+1)+'</span><input id="chk_'+grid_id+'_'+id_ar[i]['id']+'" class="col_imprimir" columna="'+id_ar[i]['id']+'" type="checkbox" checked="checked" /><label for="chk_'+grid_id+'_'+id_ar[i]['id']+'">'+id_ar[i]['label']+'</label></li>';
		if((i+1) == mitad_lista){
			html_list += '</ul></div><div class="col-md-6"><ul class="list_pdf list-group">';
		}
	}
	html_list += '</ul></div>';
	$('#dialog_tipo_informe_'+tmp_pager_id+' .content_list_pdf').html(html_list);
}

function genera_pdf(tmp_pager_id, title, $url = FUNCIONES_BASEPATH+'export_pdf.php'){
	postDataInforme.orientacion = $('#dialog_tipo_informe_'+tmp_pager_id+' .orientacion').val();
	postDataInforme.title = title;
	var col_select = new Array();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .col_imprimir:checked').each(function(){
		col_select.push($(this).attr('columna'));
	});
	if(col_select.length<=0){
		mostrar_cuadro('E','Error','Debe seleccionar al menos una columna para la impresi&oacute;n del archivo PDF.');
	}else{
		postDataInforme.columnas = JSON.stringify(col_select);

		/*
		 *****REFERENIAS*****
		 #A_B# Abre <b>
		 #C_B# Cierra </b>
		 #A_LI# Abre <li>
		 #C_LI# Cierra </li>
		 */

		 if($('#dialog_tipo_informe_'+tmp_pager_id+' .txt_comentario_informe').val().length > 1400){
			mostrar_cuadro('E','Error','El comentario no puede tener mas de 1400 caracteres');
			return;
		 }

		var html_filtros = '';
		postDataInforme.html_filtros = '';
		
		if(postDataInforme.adv == 'S'){
			html_filtros = generarHTMLFiltrosDinamicosExportar(postDataInforme);
			postDataInforme.html_filtros = html_filtros;
		}
		
		/*** 					AGREGADO filterToolbar									***/
		if (postDataInforme.filters){
			html_filtros = generarHTMLFiltrosBarraExportar(postDataInforme);
			postDataInforme.html_filtros += html_filtros;
		}
		
		/*********************************************************************************/
		
		postDataInforme.txt_comentario_informe = $('#dialog_tipo_informe_'+tmp_pager_id+' .txt_comentario_informe').val();

		if( typeof filtros_no_nativos_ar !== "undefined" ){
			for(i=0; i< (filtros_no_nativos_ar[postDataInforme.id_grid]).length; i++){
				postDataInforme.html_filtros += '#A_LI# #FLECHA# '+filtros_no_nativos_ar[postDataInforme.id_grid][i]+'#C_LI#';
			}
		}

		post_to_url(
			$url,
			postDataInforme,
			'_blank',
			'post'
		);
		
	}
}

function generarHTMLFiltrosDinamicosExportar(postDataInforme){
    var html_filtros = "";
    var i = 0;
    var and_or = '';
    var cod_desc_op_map = {'IGU':'Igual a'};
    var form = '#frm_search_'+postDataInforme.id_grid;
    var nombre_grilla = $(form+' #'+postDataInforme.id_grid+'_nombre_grilla_filtros').val();
    var num_filtros = $(form+' #'+nombre_grilla+'_num_filtros').val();
    var filtros_sin_valor = ['NULL', 'NNULL', 'nu'];

    for (i = 0; i < num_filtros; i++) {
        var operador = $(form+" #"+nombre_grilla+"_operador_"+i).val();

        if ((jQuery.inArray( operador, filtros_sin_valor ) == -1) && filtroVacio(form, i, nombre_grilla))continue;

        html_filtros += '#A_LI# #FLECHA# '+and_or+' #A_B#'+$(form+" #"+nombre_grilla+"_d_campo_"+i).text()+'#C_B#';

        if ($(form+" #"+nombre_grilla+"_operador_"+i+" option:selected").length > 0)
            html_filtros += ' '+$(form+" #"+nombre_grilla+"_operador_"+i+" option:selected").text();
        /*else
         html_filtros += ' '+cod_desc_op_map[operador];*/

        var valores = '';
        if(operador == 'BETWEEN'){// si es entre busca los dos valores
            var val1 = $(form+' #'+nombre_grilla+'_valor_campo_desde_'+i).val();
            var val2 = $(form+' #'+nombre_grilla+'_valor_campo_hasta_'+i).val();
            valores = ' #A_B#'+val1+'#C_B# y #A_B#'+val2+'#C_B#';
        }else if(operador == 'RANGO'){// si es rango busca los dos valores
            var val1 = $(form+' #'+nombre_grilla+'_valor_campo_desde_'+i).val();
            var val2 = $(form+' #'+nombre_grilla+'_valor_campo_hasta_'+i).val();
            valores = ' entre#A_B# '+val1+'#C_B# y #A_B#'+val2+'#C_B#';
        }else{
            var es_lupa = ($(form+' #'+nombre_grilla+'_valor_campo_d_lupa_'+i).length > 0);
            if(es_lupa){
                valores = ' #A_B#'+$(form+' #'+nombre_grilla+'_valor_campo_d_lupa_'+i).val()+'#C_B#';
            }else{
                valores = ' #A_B#'+$(form+' #'+nombre_grilla+'_valor_campo_'+i).val()+'#C_B#';
            }
        }
        html_filtros += ''+valores+'#C_LI#';
    }

    return html_filtros;
}

function generarHTMLFiltrosBarraExportar(postDataInforme){
	var grid = $('#'+postDataInforme.id_grid);
	var html_filtros = "";
	
	var eng_spa_map = {'AND':'Y', 'OR':'O'};
	var filter_toolbar = JSON.parse(postDataInforme.filters);
	var filter_toolbar_op = filter_toolbar.groupOp;
	var filter_toolbar_rules = filter_toolbar.rules;
	var grid_col_model = $('#'+postDataInforme.id_grid).getGridParam('colModel');
	var grid_col_names = $('#'+postDataInforme.id_grid).getGridParam('colNames');
	var grid_ops = $.jgrid.regional['es'].search.odata;
	
	var col_name_title_map = {};
	var grid_ops_map = {};
	
	$( grid_ops ).each(function( index ) {
		grid_ops_map[$(this)[0].oper] = $(this)[0].text;
	});
	
	$( grid_col_model ).each(function( index ) {
		col_name_title_map[$(this)[0].name] = grid_col_names[index];
	});
	
	if (col_name_title_map){
		var filter_toolbar_html_filtros = '';
		var op = (postDataInforme.html_filtros)?eng_spa_map[filter_toolbar_op]:'';
		$( filter_toolbar_rules ).each(function( index ) {
			filter_toolbar_html_filtros += ' #A_LI#	#FLECHA# '+op+ ' #A_B#'+col_name_title_map[$(this)[0].field]+'#C_B# '+grid_ops_map[$(this)[0].op]+' #A_B#'+$(this)[0].data+'#C_B# #C_LI#';
			op = eng_spa_map[filter_toolbar_op];
		});
		
		html_filtros += filter_toolbar_html_filtros;
	}
	
	return html_filtros;
}

function filtroVacio(form, elem_orden, nombre_grilla){
	var nombre_grilla = $(form+' #'+nombre_grilla+'_nombre_grilla_filtros').val();
	campos = ['#'+nombre_grilla+'_valor_campo_'+elem_orden,
			'#'+nombre_grilla+'_valor_campo_desde_'+elem_orden,
			'#'+nombre_grilla+'_valor_campo_hasta_'+elem_orden,
			'#'+nombre_grilla+'_valor_campo_d_lupa_'+elem_orden];
	
	var retorno = true;
	$.each(campos, function( index, campo ) {
		var v = $(form+' '+campo).val();
		
		if ((v != "") && (v != undefined)){
			retorno = false;
			return false;
		}
	});
	
	return retorno;
}

/****************FUNCIONES PARA VENTANA DEL REPORTE PDF********************/
function cancelar_pdf(tmp_pager_id){
    $('#dialog_tipo_informe_'+tmp_pager_id).modal('hide');
}

function select_pdf( tmp_pager_id, si_no ){
	$('#dialog_tipo_informe_'+tmp_pager_id+' .col_imprimir').prop('checked', si_no);
}

function add_comentario(tmp_pager_id){
	$('#dialog_tipo_informe_'+tmp_pager_id+' .txt_comentario_informe').animate({
		height: "toggle",
	}, 250, function() {//complete animation
		$(this).focus();
		$('#dialog_tipo_informe_'+tmp_pager_id+' .txt_comentario_informe').val('');
		$(this).attr("placeholder", "Inserte un comentario...");
	});
}
/************FIN FUNCIONES PARA VENTANA DEL REPORTE PDF********************/

function llamar_report(c_tipo_reporte, param, c_impresion, filtros = null, p_nombre_export = null){
	if(c_impresion == null || c_impresion == 'undefined' || c_impresion == ''){
		c_impresion = 'PDF';
	}
	
	if(param == null || param == 'undefined'){
		param = '';
	}
	
	$.post(
		FUNCIONES_BASEPATH+"llamar_report.php",
		{
			"c_tipo_report":c_tipo_reporte,
			"parametros":param,
			"server_name": window.location.hostname,
			'c_impresion':c_impresion,
            'filtros': filtros
		},
		function(data_rep){
			var ret = eval('('+data_rep+')');
			var d_name_export = 'document';
			if(p_nombre_export != null){
				d_name_export = p_nombre_export;
			}
			else{
				if (ret.d_nombre_export != null){
					d_name_export = ret.d_nombre_export;
				}
			}
			
			if (ret.formats.length <= 1 ) {
				window.open(
					FUNCIONES_BASEPATH+'reporte.php?id_sesion='+ret.id_session+'&c_impresion='+c_impresion+'&format='+ret.formats[0]+'&name='
					+d_name_export+'.'+ret.formats[0].toLowerCase(),
					"",
					"scrollbars=yes, menubar=no,resizable=no,directories=no,location=no"
				);
			} else {
				var html = "<div>";
				for(i=0;i<ret.formats.length;i++){
					html = html +
						"<div style='padding:2px;float:left;'>"+
							"<form method=\"post\">"+
								"<a href=\"#\" onClick=\"imprimir_jasper('"+ret.id_session+"','"+c_impresion+"','"+ret.formats[i]+"','"+d_name_export+"');\">"+
									"<img src=\""+IMAGENES_FRAMEWORK+ret.formats[i].toLowerCase()+".png\" border=\"0\" width=\"64\" height=\"64\">"+
								"</a>"+
							"</form>"+
						"</div>";
				}
				html = html+ "<div style='clear:both;'></div>" + "</div>";
				try{
					$('#popup_jasper').dialog( "destroy" );
					document.getElementById("popup_jasper").innerHTML = html;
				} catch(err) {
					document.getElementById("popup_jasper").innerHTML = html;
				}
				
				$("#popup_jasper").dialog({
					autoOpen: false,
					modal:false, 
					width: 'auto',
					height:'auto',
					title: 'Elija el formato del reporte: ',
					buttons: {}
				});
				
				$("#popup_jasper").dialog('open');
			}
		}
	);
}

function imprimir_jasper(sesion,c_impresion,format,nombre_export){
	window.open(
		FUNCIONES_BASEPATH+'reporte.php?id_sesion='+sesion+
		'&c_impresion='+c_impresion+'&format='+format+'&name='+nombre_export+'.'+format.toLowerCase(),
		"",
		"scrollbars=yes, menubar=no,resizable=no,directories=no,location=no"
	);
	$("#popup_jasper").dialog( "close" );
}

/*AGREGA EVENTO CERRAR CON ESCAPE Y GUARDAR CON ENTER A TODAS LAS GRILLAS
 para quitar/modificar evento se debe sobreescribir en cada grilla*/
$.extend($.jgrid.edit, {
	savekey: [true, 13],
	closeOnEscape: true
});

function saveStateGrid(storageId,storageOptions){

	var storageOptions = storageOptions || {
                  useStorage : false,
                  //storageType : "localStorage",
                  beforeSetItem : null,
                  compression: true,
                  compressionModule :  'LZString',
                  compressionMethod : 'compressToUTF16',
                  debug : false,
                  saveData : false
                };

    var ret = $.jgrid.saveState(storageId,storageOptions);

    $("#"+storageId).setGridParam({state:ret});
	
    var ret = $.jgrid.saveState(storageId,storageOptions);	

    $("#"+storageId).setGridParam({state:ret});

}

function loadStateGrid(storageId,storageOptions){
    var storageOptions = {
                      useStorage : false,
                      //storageType : "localStorage",
                      clearAfterLoad: false,  
                      beforeSetGrid : null,
                      afterSetGrid : null,
                      decompression: true,
                      decompressionModule :  'LZString',
                      decompressionMethod : 'decompressFromUTF16',
                      restoreData : true
                    }

    var storageString = $("#"+storageId).getGridParam('state');
	//console.log(storageString);

    $.jgrid.loadState(storageId, storageString, storageOptions);
	//console.log('terminp');
}

function arma_context_menu(objeto, items){ 
// Debe recibir el id de la grilla. Ejemplo: "#main_grid". 
// El parametro items (array) se usa para definir botones extra en el context menu. 
// Ejemplo: var items = { "Incrementar": {id:'incrementar', funcion: function (t) { incrementar(t);}, icono:"glyphicon-arrow-up"}};	

	var grid_id = $(objeto).getGridParam('id');
	
	var binded_fun = {
							'edit': function (t) {
									$('#edit_'+grid_id).click();
							},
							'add': function (t) {
									$('#add_'+grid_id).click();
							},
							'del': function (t) {
									$('#del_'+grid_id).click();
							}
						};
							
	if($("#add_"+grid_id).is(":visible"))
	{
		v_add = '<li id="add">'+
					'<span class="glyphicon glyphicon-plus" style="float:left"></span>'+
					'<span style="font-size:100%; font-family:Verdana;margin-left:10px;">Agregar</span>'+
				'</li>';
	}else{
		v_add = '';
	}
	
	if($("#edit_"+grid_id).is(":visible"))
	{
		v_edit = '<li id="edit">'+
					'<span class="glyphicon glyphicon-pencil" style="float:left"></span>'+
					'<span style="font-size:100%; font-family:Verdana;margin-left:10px;">Modificar</span>'+
				'</li>';
	}else{
		v_edit = '';
	}
	
	if($("#del_"+grid_id).is(":visible"))
	{
		v_del = '<li id="del">'+
					'<span class="glyphicon glyphicon-trash" style="float:left"></span>'+
					'<span style="font-size:100%; font-family:Verdana;margin-left:10px;">Eliminar</span>'+
				'</li>';
	}else{
		v_del = '';
	}
	
	var items_str = '';
	
	if (Object.keys(items).length > 0){
		for (var item_label in items) {
			var id_item = items[item_label].id;
			if (id_item){
				items_str += '<li id="'+id_item+'" >'+
								'<span class="glyphicon '+items[item_label].icono+'" style="float:left"></span>'+
								'<span style="font-size:100%; font-family:Verdana;margin-left:10px;">'+item_label+'</span>'+
							'</li>';
				
				if (items[item_label].funcion) binded_fun[id_item] =  items[item_label].funcion;
			}	
		}
	}
	
	$('#contextMenu'+grid_id).html('<div class="contextMenu row" id="contextMenu'+grid_id+'" style="display:none;">'+
										'<ul>'+
											v_add+
											v_edit+    
											v_del+  
											items_str+
										'</ul>'+
									'</div>');
		
	$('#'+grid_id).contextMenu('contextMenu'+grid_id, {
			menuStyle :{
				width : "150px"
			},
			bindings: binded_fun,
			onContextMenu: function (event, menu) {
				var rowId = $(event.target).parent("tr").attr("id")
				var grid = $("#"+grid_id);
				grid.setSelection(rowId);
				return true;
			}
		});
}

function genera_excel_xlsx_grid(grid_id, tmp_pager_id, title, $url = FUNCIONES_BASEPATH+'export_excel_xlsx.php'){
	postDataInforme.src_type = 'grid';
	postDataInforme.title = title;
	var col_select = new Array();
	$('#dialog_tipo_informe_'+tmp_pager_id+' .col_imprimir:checked').each(function(){
		col_select.push($(this).attr('columna'));
	});
	
	if(col_select.length<=0){
		mostrar_cuadro('E','Error','Debe seleccionar al menos una columna para la generaci&oacute;n del archivo Excel.');
	}else{
		
		/*
		 *****REFERENIAS*****
		 #A_B# Abre <b>
		 #C_B# Cierra </b>
		 #A_LI# Abre <li>
		 #C_LI# Cierra </li>
		 */

		 if($('#dialog_tipo_informe_'+tmp_pager_id+' .txt_comentario_informe').val().length > 1400){
			mostrar_cuadro('E','Error','El comentario no puede tener mas de 1400 caracteres');
			return;
		 }
		 
		var html_filtros = '';
		postDataInforme.html_filtros = '';
		if(postDataInforme.adv == 'S'){//crea html busqueda simple para la cabecera del pdf
			html_filtros = generarHTMLFiltrosDinamicosExportar(postDataInforme);
			postDataInforme.html_filtros = html_filtros.replace(/#FLECHA#/g , "");
		}
		
		/*** 					AGREGADO filterToolbar									***/
		if (postDataInforme.filters){
			html_filtros = generarHTMLFiltrosBarraExportar(postDataInforme);
			postDataInforme.html_filtros += html_filtros.replace(/#FLECHA#/g , "");
		}
		
		/*********************************************************************************/
		postDataInforme.txt_comentario_informe = $('#dialog_tipo_informe_'+tmp_pager_id+' .txt_comentario_informe').val();

		if( typeof filtros_no_nativos_ar !== "undefined" ){
			for(i=0; i< (filtros_no_nativos_ar[postDataInforme.id_grid]).length; i++){
				postDataInforme.html_filtros += '#A_LI# '+filtros_no_nativos_ar[postDataInforme.id_grid][i]+'#A_LI#';
			}
		}
		
		postDataInforme.columnas = JSON.stringify(col_select);
		post_to_url(
						$url,
						postDataInforme,
						'_export_excel',
						'post'
					);
	}
	
}

/*redefinicion de funciones de mensajes / cuadros / opcioens para que llamen a la nueva funcion con modal */
function mostrar_error(desc, w, h){  
    mostrar_mensaje_modal('E','Error',desc,null,null,null,null,w);
}

function mostrar_validacion(desc, w, h){
    mostrar_mensaje_modal('V','Validación',desc,null,null,null,null,w);
    
}

function mostrar_confirmacion(desc,w,h){
    mostrar_mensaje_modal('S','Confirmación',desc,null,null,null,null,w);
}

function mostrar_opciones(titulo, mensaje, nombre_boton_opcion, fun_acepta, fun_cancela, fun_opcion, w, h) {
    mostrar_mensaje_modal('Q','Información',mensaje,fun_acepta,fun_cancela,nombre_boton_opcion,fun_opcion,w);
}

function mostrar_mensaje(titulo, mensaje, fun_acepta, w, h) {
    mostrar_mensaje_modal('I','Información',mensaje,fun_acepta,null,null,null,w);
}

function mostrar_cuadro(tipo, titulo, mensaje, _fun_acepta, _fun_cancela, w, h) {
	if (tipo == 'C'){
		_fun_cancela = function(){};
	}
    mostrar_mensaje_modal(tipo,titulo,mensaje,_fun_acepta,_fun_cancela,null,null,w);
}
//fin de redefinicion de funciones de nucleo

/*Nueva funcion de mensajes
    tipo : (I -> Información
            V -> Validacion
            C o Q -> Pregunta
            E -> Error
            S -> Success
            Default -> nada)
    titutlo : titulo del modal
    descripcion: mensaje
    fun_acepta: funcion a ejecutar al tocar el boton "OK". Debe escribir function(){ aca codigo a ejecutar }
    fun_cancela: funcion a ejecutar al tocar el boton "CANCELAR". Debe escribir function(){ aca codigo a ejecutar }
    tituloOtroBoton: descripcion del otro boton
    fun_otro_boton: funcion a ejecutar al tocar el boton "OTROBOTON". Debe escribir function(){ aca codigo a ejecutar }
    w: ancho definido en PX del dialogo 
*/
function mostrar_mensaje_modal(tipo,titulo,descripcion,fun_acepta,fun_cancela,tituloOtroBoton,fun_otro_boton,w){
    var icon;
    var type;
    var columnClass;

    switch (tipo) {
        case 'I': //información
            icon= 'glyphicon glyphicon-info-sign';
            type='blue';
            break;
        case 'V': //validación
            icon= 'glyphicon glyphicon-exclamation-sign';
            type='orange';
            break;
        case 'C': //Pregunta
        case 'Q': //Question
            icon='glyphicon glyphicon-question-sign';
            type='blue';
            break;       
        case 'E': //Error
            icon= 'glyphicon glyphicon-ban-circle';
            type='red';
            break;
        case 'S': // confirmación (Success)
            icon= 'glyphicon glyphicon-ok-circle';
            type='green';
            break;
        default:
            icon='';
            type='';
            break;
    }
    
    switch (true){
        case (w > 600) :
            columnClass= 'xlarge';
            break;
        case (w < 600 && w > 300):
            columnClass= 'medium';
            break;
        default:
            columnClass= 'small';
            break;
    }

    var botones = {
        ACEPTAR: function(){
        }
    }

    if (fun_acepta != null && fun_acepta != ''){
        //agrego botones
        $.extend(
			botones, 
			{ 
				ACEPTAR: function(){
					if (typeof(fun_acepta) === "function"){
						fun_acepta();
					}
				}
			}
		);
    }

    if(fun_cancela != null && fun_cancela != ''){
        $.extend(
			botones, 
			{ 
				CANCELAR: function(){
					if (typeof(fun_cancela) === "function"){
						fun_cancela();
					}
				}
			}
		);
    }

    if(fun_otro_boton != null && fun_otro_boton != ''){
        $.extend(botones, { OtroBoton: {
                                text:tituloOtroBoton,
                                action: fun_otro_boton
        }});
    }

    var JQalert = $.confirm({
        title: titulo,
        icon: icon,
        content: descripcion,
        type: type,
        columnClass:columnClass,
        theme:'modern',
        typeAnimated: true,
        backgroundDismiss: true,
        backgroundDismissAnimation: 'shake',
        escapeKey:true,
        useBootstrap:true,
        buttons: botones        
    });

}
