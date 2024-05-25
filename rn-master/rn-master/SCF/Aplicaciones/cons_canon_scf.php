<?php
session_start();

//*****Conexión de Web Service
define("ID_MENU", "10788");
$titulo = "Consulta de Deuda Canon de Riego";

$param['id_menu'] = ID_MENU;

$concepto_grilla = 'Concepto';

require_once SCF.'header.php';

include('cons_deuda_scf/html/inicio_formulario.html');
include('cons_canon_scf/html/principal.html');
include('cons_deuda_scf/html/fin_formulario.html');
include('cons_deuda_scf.php');
?>

<script> //Esta sección es para agregar código JavaScript adicional  
	var v_tributo = 160;
	
	$(document).on('focusout', '#d_objeto_hecho', function() {
		if (!$('#d_objeto_hecho').val()){
			$('#n_cuit').val('');
			$('#d_nomenclatura').val('');
			$('.nomen').val('');
			$('.nomen').attr('disabled',false);
		} else {
			if (!$('#d_nomenclatura').val()) {
				$('#main').procOverlay({visible:true});
				$.ajax({
					url: "cons_canon_scf/autocomplete.php",
					type:"POST",
					data:{
						p_oper:'getDatos',
						p_id_menu: v_id_menu,
						p_d_objeto_hecho: $('#d_objeto_hecho').val()
					},
					success: function(response)
					{
						$('#main').procOverlay({visible:false});
						res = JSON.parse(response);
						if (res.resultado == 'OK'){
							if (res.error){
								mostrar_cuadro('E', 'Error', res.error);
							}else{
								$('#n_cuit').val(res.cuit);
								$('#d_nomenclatura').val(res.nomenclatura);
								$('#departamento').val(res.departamento);
								$('#circunscripcion').val(res.circunscripcion);
								$('#seccion').val(res.seccion);
								$('#u_caracteristica').val(res.u_caracteristica);
								$('#parcela').val(res.parcela);
								$('#u_funcional').val(res.u_funcional);
								$('.nomen').attr('disabled',true);
							}
						}else {
							mostrar_cuadro('V','Obteniendo Datos',res.error);
						}
					}
				});
			}
		}
	});
	
	$(document).on('focusout', '.nomen', function() {
		var nomen_usu = $('#departamento').val() + '-' + $('#circunscripcion').val() + '-' + $('#seccion').val()
			+ '-' + $('#u_caracteristica').val() + '-' + $('#parcela').val() + '-' + $('#u_funcional').val();
			
		if (nomen_usu != '-----'){
			$('#d_nomenclatura').val(nomen_usu);
		} else {
			$('#d_nomenclatura').val('');
		}
		
		if (
			$('#departamento').val() && $('#circunscripcion').val() && $('#seccion').val() &&
			$('#u_caracteristica').val() && $('#parcela').val() && $('#u_funcional').val()
		){
			if (!$('#d_objeto_hecho').val()) {
				$('#main').procOverlay({visible:true});
				$.ajax({
					url: "cons_canon_scf/autocomplete.php",
					type:"POST",
					data:{
						p_oper:'getDatos',
						p_id_menu: v_id_menu,
						p_d_nomenclatura: $('#d_nomenclatura').val()
					},
					success: function(response)
					{
						$('#main').procOverlay({visible:false});
						res = JSON.parse(response);
						if (res.resultado == 'OK'){
							if (res.error){
								mostrar_cuadro('E', 'Error', res.error);
							}else{
								$('#n_cuit').val(res.cuit);
								$('#d_objeto_hecho').val(res.objeto);
								$('#d_objeto_hecho').attr('disabled',true);
							}
						}else {
							mostrar_cuadro('V','Obteniendo Datos',res.error);
						}
					}
				});
			}
		} else {
			$('#n_cuit').val('');
			$('#d_objeto_hecho').val('');
			$('#d_objeto_hecho').attr('disabled',false);
		}
	});
</script>

<?php
require_once SCF."footer.php";
?>