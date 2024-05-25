<?php
require_once(INTRANET . "header.php");
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$p_dominio = $_POST['p_dominio'];
$p_modo = $_POST['p_modo'];

$fecha_hoy = date('d/m/Y');
include('baja_aut/html/principal.html');
include('baja_aut/html/modal.html');
?>
    <link rel="stylesheet" type="text/css" href="baja_aut/css/estilos.css">
    <script type="text/javascript" src="baja_aut/js/elementos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="baja_aut/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="baja_aut/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

    <script type="text/javascript">

		var v_id_menu = '<?=$p_id_menu?>';
		var v_dominio = '<?=$p_dominio?>';
		var v_modo = '<?=$p_modo?>';
		var ajax_autocomplete = null;
        var fecha_hoy = '<?=$fecha_hoy?>';
        var realizado = 'N';

		var datos_responsables_grid = new GridParam({
			id_menu:v_id_menu,
			n_grid:0,
			m_autoquery:'N',
			param:{':d_dominio': null}
		});

        var datos_main_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            m_autoquery:'N',
            param:{':id_contribuyente': null,
                ':d_objeto': null,
                ':p_modo': null}
        });

		$(document).ready(function($){
			init_elementos();
			init_eventos();
			if (v_modo == 'D'){
                $('#btn_aplicar_baja,#modal_baja_title').text('Baja Definitiva');
                $('#f_baja,#c_motivo,#d_motivo,#c_delegacion,#d_delegacion').attr('disabled',true);
                $('#lupa_motivo_baja,#lupa_prov_oficina').hide();
            }else {
                $('#btn_aplicar_baja,#modal_baja_title').text('Baja Provisoria');
                $('#lupa_motivo_baja,#lupa_prov_oficina').show();
            }
		});

    </script>

<?php
require_once(INTRANET."footer.php");
?>