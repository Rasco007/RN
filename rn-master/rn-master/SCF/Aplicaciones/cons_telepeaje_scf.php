<?php
session_start();

//*****Conexión de Web Service
define("ID_MENU", "10849");
$titulo = "Consulta de Deuda Telepeaje";

$param['id_menu'] = ID_MENU;

$concepto_grilla = 'Concepto';

require_once SCF.'header.php';

include('cons_deuda_scf/html/inicio_formulario.html');
include('cons_telepeaje_scf/html/principal.html');
include('cons_deuda_scf/html/fin_formulario.html');
include('cons_deuda_scf.php');
?>

<script> // Esta sección es para agregar código JavaScript adicional
	var v_tributo = 170;
	
	$(document).on('focusout', '#d_objeto_hecho', function() {
		if (!$('#d_objeto_hecho').val()){
			$('#n_cuit').val('');
		} else {
			if (!$('#n_cuit').val()) {
				$('#main').procOverlay({visible:true});
				$.ajax({
					url: "cons_telepeaje_scf/autocomplete.php",
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
							}
						}else {
							mostrar_cuadro('V','Obteniendo Datos',res.error);
						}
					}
				});
			}
		}
	});

	function mayusculas(e) {
	    e.value = e.value.toUpperCase();
	}
</script>

<?php
require_once SCF."footer.php";
?>