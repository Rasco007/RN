<?php
session_start();

//*****Conexión de Web Service
define("ID_MENU", "10737");
$titulo = "Consulta de Deuda Multas";

$param['id_menu'] = ID_MENU;


$concepto_grilla = 'Tipo Multa';

require_once SCF.'header.php';
include('cons_deuda_scf/html/inicio_formulario.html');
include('cons_multas_scf/html/principal.html');
include('cons_deuda_scf/html/fin_formulario.html');
include('cons_deuda_scf.php');
?>

<script> // Esta sección es para agregar código JavaScript adicional
	var v_tributo = 100;

	$(document).on('focusout', '#n_cuit', function() {
		if (!$('#n_cuit').val()){
			$('#d_objeto_hecho').val('');
		} else {
			$('#d_objeto_hecho').val($('#n_cuit').val().replace(/-/gi,''));
		}
	});

	
</script>

<?php
require_once SCF."footer.php";
?>