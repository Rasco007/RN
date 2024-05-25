
function ver_ctacte(p_id_obligacion){

	post_to_url('detalle_cuenta_corr.php',{'p_n_id_menu':10854,'id_obligacion':p_id_obligacion},'_blank','POST');


}

//var aut_comp_distinto_cuit = '<?=$aut_comp_distinto_cuit?>';
//var aut_comp_igual_objeto  = '<?=$aut_comp_igual_objeto?>';

function comprobar_contribuyentes(){

	$.ajax({
		type: 'POST',
		url: "compensaciones/php/validaciones.php",
		data: {
			p_oper:'comprueba_conts',
			p_n_lote_cred: vg_lote_cred,
			p_n_lote_deb: vg_lote_deb
		},
		dataType: 'json',
		success: function(ret) {
			if (ret['CONT_CRED'] != ret['CONT_DEB']) {

				if (ret['OBJ_CRED'] == ret['OBJ_DEB']   &&   ret['TRIB_CRED'] == ret['TRIB_DEB']    ) {

					if (aut_comp_igual_objeto == 'S' || aut_comp_distinto_cuit == 'S') {

						mostrar_cuadro('I', 'Atención', 'Esta compensando entre distintas CUITs<br>¿Desea Continuar?',
							function () {
								aplicar_compensacion();
							}, function () {
							}, 400, 200);

					} else {

						mostrar_cuadro('I', 'Atención', 'No tiene permiso, para compensar entre distintas CUITs.');
					}

				} else {
					if (aut_comp_distinto_cuit == 'S') {

						mostrar_cuadro('I', 'Atención', 'Esta compensando entre distintas CUITs<br>¿Desea Continuar?',
							function () {
								aplicar_compensacion();
							}, function () {
							}, 400, 200);

					} else {

						mostrar_cuadro('I', 'Atención', 'No tiene permiso para compensar entre distintas CUITs.');
					}
				}

			} else {
				aplicar_compensacion();
			}
		}
	});
}

function aplicar_compensacion() {

	v_proceso = 'S';

	$('#main').procOverlay({visible:true});

	$.ajax({
		type: 'POST',
		url: FUNCIONES_BASEPATH + 'maestro_abm.php',
		data: {
			"p_n_lote_cred": vg_lote_cred,
			"p_n_lote_deb": vg_lote_deb,
			"p_d_observ": $("#d_observacion").val(),
			"id_menu": v_id_menu,
			"n_orden": 2
		},
		dataType: 'json',
		success: function(data) {
			$('#main').procOverlay({visible:false});
			
			if (data.resultado == 'OK') {

				mostrar_confirmacion('La compensación se finalizó con éxito!!.');

				console.log(data.p_accion);

				if (data.p_accion == 'REFRESCAR'){

					console.log('antes buscar');
					console.log('REFRESCAR');

					$('#btn_buscar_deuda').click();
					//$('#deudas_grid').trigger("reloadGrid");

				} else{

					console.log('ELSE');
					console.log(data.p_accion);

					var c_tipo_imponible = $('#c_tipo_imponible').val();
					var d_tipo_imponible = $('#d_tipo_imponible').val();
					var c_tributo = $('#c_tributo').val();
					var d_tributo = $('#d_tributo').val();
					var d_objeto = $('#d_objeto_hecho').val();

					var c_tipo_imponible1 = $('#c_tipo_imponible1').val();
					var d_tipo_imponible1 = $('#d_tipo_imponible1').val();
					var c_tributo1 = $('#c_tributo1').val();
					var d_tributo1 = $('#d_tributo1').val();
					var d_objeto1 = $('#d_objeto_hecho1').val();

					$('#btn_limpiar').click();

					$('#c_tipo_imponible').val(c_tipo_imponible);
					$('#d_tipo_imponible').val(d_tipo_imponible);
					$('#c_tributo').val(c_tributo);
					$('#d_tributo').val(d_tributo);
					$('#d_objeto_hecho').val(d_objeto);

					$('#c_tipo_imponible1').val(c_tipo_imponible1);
					$('#d_tipo_imponible1').val(d_tipo_imponible1);
					$('#c_tributo1').val( c_tributo1);
					$('#d_tributo1').val(d_tributo1);
					$('#d_objeto_hecho1').val(d_objeto1);

				 	$('#btn_buscar').click();
				}
			} else {
				mostrar_error(data.resultado);
			}
		}
	});
}



function editableRow(rowSelected,grid){
	//siempre se elige la seleccionada
	//if(rowSelected !== lastSel && lastSel !== undefined){
	//	let prevRow = lastSel;
	//	let isEditing;
	    console.log('editable');
		$('#'+grid).jqGrid('editRow', rowSelected, {
		keys: true,
		oneditfunc: function(row) {
			lastSel = row;
			_attachEventos(row,grid);
			return;
		},
	});
	//}
}

function _attachEventos(rowSelected,grid){


    console.log('INGRESO _attachEventos');
	console.log(grid);

	if (grid == 'creditos_grid') {
		let imputs = Array.from($(`#creditos_grid tr#${rowSelected}`).find(':input'));

		imputs.forEach((input, idx, arr) => {
			if (!$(input).hasClass("ya_tiene_mascara_enter")) {
				$(input).addClass("ya_tiene_mascara_enter");

				$(input).keydown(function (e) {
					console.log(e.which);
					if ( e.which === 13  ||  e.which === 9 ) {
						console.log('antes guardar');
						guardarImporte(rowSelected,grid   )
							.then((res) => {
								console.log('reloadGrid');
								$('#creditos_grid').trigger("reloadGrid");
							})
							.catch((err) => {
								console.log('catch guardar importe');
								$('#creditos_grid').trigger("reloadGrid");
								mostrar_cuadro('E', 'Error', err);
							//	$('#creditos_grid').jqGrid("restoreRow", rowSelected);
						});
						console.log('despues guardar');
					}
				});
			}
		});
	} else if (grid == 'deudas_grid'){

		let imputs = Array.from($(`#deudas_grid tr#${rowSelected}`).find(':input'));

		imputs.forEach((input, idx, arr) => {
			if (!$(input).hasClass("ya_tiene_mascara_enter")) {
				$(input).addClass("ya_tiene_mascara_enter");

				$(input).keydown(function (e) {
					if (e.which === 13 || e.which === 9   ) {
						console.log('antes guardar deuda');
						guardarImporte(rowSelected,grid)
							.then((res) => {
								console.log('reloadGrid');
								$('#deudas_grid').trigger("reloadGrid");
							})
							.catch((err) => {
								console.log('error deuda x');
								$('#deudas_grid').trigger("reloadGrid");
								//$('#deudas_grid').jqGrid("restoreRow", rowSelected);
								mostrar_cuadro('E', 'Error', err);
							});
					}
				});
			}
		});



	}

}



function guardarImporte(rowSelected,grid){

	return new Promise(function(resolve, reject){
		var params = {
			id_menu: v_id_menu,
			n_orden: 3,
			p_grid: grid
		};
		var saldo = 0;

		console.log('Guardar importe');
		console.log(v_id_menu);

		console.log('TOMAS');


		if (grid == 'creditos_grid'){
			//
		
			params.p_n_importe          =     formatear_numero(parse($('#creditos_grid tr').find('input#'+rowSelected+'_n_importe').val()),2);
			params.p_n_lote			    =  	  $('#creditos_grid').getCell(rowSelected,'n_lote');
			params.p_n_secuencia		=     $('#creditos_grid').getCell(rowSelected,'n_secuencia');
			params.p_id_obligacion	    =     $('#creditos_grid').getCell(rowSelected,'id_obligacion');
			saldo         				=     formatear_numero(parse($('#creditos_grid').getCell(rowSelected,'saldo')),2);

			importeNumero = parse($('#creditos_grid tr').find('input#'+rowSelected+'_n_importe').val());
			saldoImporte =  parse($('#creditos_grid').getCell(rowSelected,'saldo'));



			if (saldoImporte < importeNumero) {
				reject( 'El importe ingresado,  no puede ser superior al saldo existente, valor ingresado : ' +  importeNumero   + ' Actual  :  '  +  saldoImporte );
				return false;
			}

			if (importeNumero  < 0 ){
				reject( 'El importe ingresado no puede ser negativo : ' +  importeNumero);
				return false;
			}
		} else{
			params.p_n_importe          =     formatear_numero(parse($('#deudas_grid tr').find('input#'+rowSelected+'_n_importe').val()),2);
			params.p_n_lote			    =  	  $('#deudas_grid').getCell(rowSelected,'n_lote');
			params.p_n_secuencia		=     $('#deudas_grid').getCell(rowSelected,'n_secuencia');
			params.p_id_obligacion	    =     $('#deudas_grid').getCell(rowSelected,'id_obligacion');
			saldo         				=     formatear_numero(parse($('#deudas_grid').getCell(rowSelected,'cred_actu')),2);
			if (saldo < params.p_n_importe ){
				reject( 'El importe ingresado, no puede ser superior al credito existente : ' + params.p_n_importe );
			}

			

			importeNumeroDeuda = parse($('#deudas_grid tr').find('input#'+rowSelected+'_n_importe').val());
			saldoImporte = 		parse($('#deudas_grid').getCell(rowSelected,'cred_actu'));

			

			if (saldoImporte < importeNumeroDeuda ){
				reject( 'El importe ingresado no puede ser superior al credito existente, valor ingresado:' + importeNumeroDeuda + ' Actual : ' + saldoImporte );
				return false;
			}

			if (importeNumeroDeuda < 0 ){
				reject( 'El importe ingresado no puede ser negativo' );
				return false;
			}
		}





		$('#main').procOverlay({ visible:true});

		console.log('antes de ajax');

		$.ajax({
			url: FUNCIONES_BASEPATH + "maestro_abm.php",
			type:"POST",
			data: params,
			dataType: 'json',
			success: function(response)
			{
				$('#main').procOverlay({ visible:false});
				console.log('antes response.resultado');
				if( response.resultado == "OK"){
					resolve(response);
					if (grid == 'creditos_grid'){
						$('#btn_buscar_deuda').click();
					}
				}else{
					reject(response.resultado);
				}
			}
		});
	});

}
