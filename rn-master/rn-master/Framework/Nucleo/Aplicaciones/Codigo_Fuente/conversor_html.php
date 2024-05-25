<?php
	require_once(INTRANET."header.php");
?>


	<script type="text/javascript" src="<?=JS_FRAMEWORK."funciones_utilidades.js"?>"></script>

	<script type="text/javascript">
		$(document).ready(function($) {
			
		var divSearchBody = creaPanelSearch(); //devuelve el panel-body, no el panel search


		/*
		var formGroups1 = [
		creaFormGroupLupa("cuit", "Cuit"), 
		creaFormGroupLupa("doc", "Documento"), 
		creaFormGroupLupa("trib", "Tributo"), 
		creaFormGroupLupa("subtrib", "Subtributo")
		];

		var formGroups2 = [
		creaFormGroup("nombre", "Titulo"), 
		creaFormGroup("otroNombre", "otroTitulo"),
		creaFechaDesdeHasta("Fecha desde hasta 1", 1),
		creaFechaDesdeHasta("Fecha desde hasta 2", 2)
		
		];
		*/

		var formGroups1 = [creaFormGroup("conversor", "Introduzca un bloque de texto",
		 [creaElemento("TEXTAREA", "conversor", "form-control")])];
		var rows = new Array();

		rows.push(creaRow("fila1", formGroups1));
		//rows.push(creaRow("fila2", formGroups2));


		var form = creaFormBusqueda(rows);
		divSearchBody.appendChild(form);


		$("#conversor").height(200);

		var formGroupUsuarios = [
			creaFormGroupLupa("usuario", "Usuarios")
		];

		var formGroupPerfiles = [
			creaFormGroupLupa("perfil", "Perfiles")
		];

		var formGroupArea = [
			creaFormGroupLupa("area", "Área"),
		];

		var filas = new Array(creaRow("fila1", formGroupUsuarios), creaRow("fila1", formGroupPerfiles), creaRow("fila1", formGroupArea));

		var formulario = creaFormBusqueda(filas);

		//divSearchBody.appendChild(formulario);


		
		$("#btn_buscar").click(function(){
			//parsearTexto($("#conversor").val());
			$("#conversor").val(htmlSinConcatenar($("#conversor").val()));
		});
		
	});
	</script>

<?php
	require_once(INTRANET."footer.php");
?>