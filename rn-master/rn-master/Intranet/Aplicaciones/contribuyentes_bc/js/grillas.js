function crea_grillas_principales(ccResponse) {

	if (typeof ccResponse.actividades !== 'undefined') {
		var actividades = Object.values(ccResponse.actividades);
	}

	if (typeof ccResponse.impuestos !== 'undefined') {
		var impuestos = Object.values(ccResponse.impuestos);
	}

	if (typeof ccResponse.domicilios !== 'undefined') {
		var domicilios = Object.values(ccResponse.domicilios);
	}

	if (typeof ccResponse.telefonos !== 'undefined') {
		var telefonos = Object.values(ccResponse.telefonos);
	}

	if (typeof ccResponse.emails !== 'undefined') {
		var emails = Object.values(ccResponse.emails);
	}

	if (typeof ccResponse.archivos !== 'undefined') {
		var archivos = Object.values(ccResponse.archivos);
	}

	if (typeof ccResponse.categorias !== 'undefined') {
		var categorias = Object.values(ccResponse.categorias);
	}

	if (typeof ccResponse.contribmunis !== 'undefined') {
		var contribmunis = Object.values(ccResponse.contribmunis);
	}

	if (typeof ccResponse.relaciones !== 'undefined') {
		var relaciones = Object.values(ccResponse.relaciones);
	}

	if (typeof ccResponse.jurisdicciones !== 'undefined') {
		var jurisdicciones = Object.values(ccResponse.jurisdicciones);
	}

	//console.log(actividades);

	if (actividades != undefined) {
		$("#grid_datos_actividades tbody").html("");
		for (let i = 0; i < actividades.length; i++) {
			$("#grid_datos_actividades tbody").append(
				"<tr>" +
				"<td>" + actividades[i].org + "</td>" +
				"<td>" + actividades[i].actividad + "</td>" +
				"<td>" + actividades[i].orden + "</td>" +
				"<td>" + actividades[i].desde + "</td>" +
				"<td>" + actividades[i].ds + "</td>" +
				"</tr>")
		}
	}

	if (impuestos != undefined) {
		$("#grid_datos_impuestos tbody").html("");
		for (let i = 0; i < impuestos.length; i++) {
			$("#grid_datos_impuestos tbody").append(
				"<tr>" +
				"<td>" + impuestos[i].impuesto + "</td>" +
				"<td>" + impuestos[i].estado + "</td>" +
				"<td>" + impuestos[i].periodo + "</td>" +
				"<td>" + impuestos[i].dia + "</td>" +
				"<td>" + impuestos[i].motivo + "</td>" +
				"<td>" + impuestos[i].inscripcion + "</td>" +
				"<td>" + impuestos[i].ds + "</td>" +
				"</tr>")
		}
	}

	$("#grid_datos_domicilios tbody").html("");
	for (let i = 0; i < domicilios.length; i++) {
		$("#grid_datos_domicilios tbody").append(
			"<tr>" +
			"<td>" + domicilios[i].org + "</td>" +
			"<td>" + domicilios[i].tipo + "</td>" +
			"<td>" + domicilios[i].estado + "</td>" +
			"<td>" + domicilios[i].calle + "</td>" +
			"<td>" + (domicilios[i].numero == undefined ? '' : domicilios[i].numero) + "</td>" +
			"<td>" + (domicilios[i].piso == undefined ? '' : domicilios[i].piso) + "</td>" +
			"<td>" + (domicilios[i].sector == undefined ? '' : domicilios[i].sector) + "</td>" +
			"<td>" + (domicilios[i].manzana == undefined ? '' : domicilios[i].manzana) + "</td>" +
			"<td>" + (domicilios[i].torre == undefined ? '' : domicilios[i].torre) + "</td>" +
			"<td>" + (domicilios[i].unidad == undefined ? '' : domicilios[i].unidad) + "</td>" +
			"<td>" + domicilios[i].provincia + "</td>" +
			"<td>" + domicilios[i].localidad + "</td>" +
			"<td>" + domicilios[i].cp + "</td>" +
			"<td>" + domicilios[i].nomenclador + "</td>" +
			"<td>" + (domicilios[i].nombre == undefined ? '' : domicilios[i].nombre) + "</td>" +
			"<td>" + (domicilios[i].adicional == undefined ? '' : domicilios[i].adicional) + "</td>" +
			"<td>" + (domicilios[i].baja == undefined ? '' : domicilios[i].baja) + "</td>" +
			"<td>" + (domicilios[i].partido == undefined ? '' : domicilios[i].partido) + "</td>" +
			"<td>" + (domicilios[i].partida == undefined ? '' : domicilios[i].partida) + "</td>" +
			"<td>" + domicilios[i].ds + "</td>" +
			"</tr>")
	}

	if (telefonos != undefined) {
		$("#grid_datos_telefonos tbody").html("");
		for (let i = 0; i < telefonos.length; i++) {
			$("#grid_datos_telefonos tbody").append(
				"<tr>" +
				"<td>" + telefonos[i].orden + "</td>" +
				"<td>" + telefonos[i].pais + "</td>" +
				"<td>" + telefonos[i].area + "</td>" +
				"<td>" + telefonos[i].numero + "</td>" +
				"<td>" + telefonos[i].tipo + "</td>" +
				"<td>" + telefonos[i].ds + "</td>" +
				"</tr>")
		}
	}

	if (emails != undefined) {
		$("#grid_datos_emails tbody").html("");
		for (let i = 0; i < emails.length; i++) {
			$("#grid_datos_emails tbody").append(
				"<tr>" +
				"<td>" + emails[i].orden + "</td>" +
				"<td>" + emails[i].direccion + "</td>" +
				"<td>" + emails[i].tipo + "</td>" +
				"<td>" + emails[i].estado + "</td>" +
				"<td>" + emails[i].ds + "</td>" +
				"</tr>")
		}
	}

	if (categorias != undefined) {
		$("#grid_datos_categorias tbody").html("");
		for (let i = 0; i < categorias.length; i++) {
			$("#grid_datos_categorias tbody").append(
				"<tr>" +
				"<td>" + categorias[i].impuesto + "</td>" +
				"<td>" + categorias[i].categoria + "</td>" +
				"<td>" + categorias[i].estado + "</td>" +
				"<td>" + categorias[i].periodo + "</td>" +
				"<td>" + (categorias[i].motivo == undefined ? '' : categorias[i].motivo) + "</td>" +
				"<td>" + categorias[i].ds + "</td>" +
				"</tr>")
		}
	}

	if (archivos != undefined){
		$("#grid_datos_archivos tbody").html("");
		for (let i = 0; i < archivos.length; i++) {
			$("#grid_datos_archivos tbody").append(
				"<tr>" +
				"<td>" + archivos[i].orden + "</td>" +
				"<td>" + archivos[i].tipo + "</td>" +
				"<td>" + archivos[i].ds + "</td>" +
				"</tr>")
		}
	}

	if (contribmunis != undefined) {
		$("#grid_datos_contribmunis tbody").html("");
		for (let i = 0; i < contribmunis.length; i++) {
			$("#grid_datos_contribmunis tbody").append(
				"<tr>" +
				"<td>" + contribmunis[i].impuesto + "</td>" +
				"<td>" + contribmunis[i].municipio + "</td>" +
				"<td>" + contribmunis[i].provincia + "</td>" +
				"<td>" + contribmunis[i].desde + "</td>" +
				"<td>" + (contribmunis[i].hasta == undefined ? '' : contribmunis[i].hasta) + "</td>" +
				"<td>" + contribmunis[i].ds + "</td>" +
				"</tr>")
		}
	}

	if (relaciones != undefined) {
		$("#grid_datos_relaciones tbody").html("");
		for (let i = 0; i < relaciones.length; i++) {
			$("#grid_datos_relaciones tbody").append(
				"<tr>" +
				"<td>" + relaciones[i].persona + "</td>" +
				"<td>" + relaciones[i].tipo + "</td>" +
				"<td>" + relaciones[i].subtipo + "</td>" +
				"<td>" + relaciones[i].desde + "</td>" +
				"<td>" + relaciones[i].ds + "</td>" +
				"</tr>")
		}
	}

	if (jurisdicciones != undefined) {
		$("#grid_datos_jurisdicciones tbody").html("");
		for (let i = 0; i < jurisdicciones.length; i++) {
			$("#grid_datos_jurisdicciones tbody").append(
				"<tr>" +
				"<td>" + jurisdicciones[i].provincia + "</td>" +
				"<td>" + jurisdicciones[i].desde + "</td>" +
				"<td>" + jurisdicciones[i].org + "</td>" +
				"<td>" + jurisdicciones[i].ds + "</td>" +
				"</tr>")
		}
	}

	//$(".ui-jqgrid").css("width", '1804px');

}

