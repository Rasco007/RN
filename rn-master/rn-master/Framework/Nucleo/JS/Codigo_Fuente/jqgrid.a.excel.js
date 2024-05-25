/*-------------------------------------------------------------------- 
 Script para generar un xls en base a una grilla jqgrid
 Es necesaria la versión jqgrid 3.6 o superior
 Llama a la pagina php xls.php
 Creado por Pablo Sparta
 Copyright (c) 2009 TDI
 Modificado 20091215 : grilla como parámetro
 títulos, campos, alineación automática.
 Modificado 20110209 : Si el campo 0 es color, no lo muestra en el excel que se genera.
 --------------------------------------------------------------------*/

function generaexcel(vgrid) {
	
	// Titulos de los campos a incluir
	var vtitulos = jQuery(vgrid).getGridParam("colNames");

	// Datos de campos a incluir
	var vcampo = jQuery(vgrid).getGridParam("colModel");

	if(vtitulos[0]=='color') {var j = 1;} else {var j = 0;}; //AALLO Modificado, si el primer campo es color, no lo muestra en el excel

	var p_titulos = '';
	for (; j < vtitulos.length; j = j + 1) {
		if(!vcampo[j].hidden && vtitulos[j].indexOf('<') < 0 ) {
			p_titulos = p_titulos + vtitulos[j]+"||";
		}
	}

	// Datos
	var data = jQuery(vgrid).getRowData();
	var q = data.length; // cantidad de registros a devolver

	if(vtitulos[0]=='color') {j = 1;} else {j = 0;}; //Si el primer campo es color, no lo muestra en el excel

	var p_datos = '';

	for (i = 0; i < q; i = i + 1) {

		for (; j < vcampo.length; j = j + 1) {
			if (!vcampo[j].hidden  && vtitulos[j].indexOf('<') < 0  ) {
				p_datos = p_datos + eval("data[i]." + vcampo[j].name) + "||";
			}
		}
		if(vtitulos[0]=='color') {j = 1;} else {j = 0;};
		p_datos = p_datos + "#";
	}

	var p_nombre = jQuery(vgrid).getGridParam("caption");
	p_nombre = p_nombre.replace(/[:.]/gi,'');
	p_nombre = p_nombre.replace(/ /gi,'_');

	$("#nombre").val(p_nombre);
	$("#datos_a_enviar").val(p_datos);
	$("#datos_titulo_excel").val(p_titulos);
	$("#campos_no_hidden").val('');
	$("#FormularioExportacion").submit();

};