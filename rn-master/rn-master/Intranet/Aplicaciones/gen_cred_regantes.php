<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$id_contribuyente = $_SESSION['id_rel_persona'];

$lista_consorcios = fun_id_lista('CONSORCIOS');
$lista_regiones_consorcio = fun_id_lista('REGIONES POR TIPO DE CONSORCIO');
$lista_areas_consorcio = fun_id_lista('AREAS POR TIPO DE CONSORCIO');
$lista_regantes = fun_id_lista('REGANTES POR CONSORCIO INTRANET');
$lista_partidas = fun_id_lista('LISTADO DE PARTIDAS RIEGO INTRANET');
$lista_tipo_concepto = fun_id_lista('LISTADO DE TIPOS CONCEPTOS INTRANET');
$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('gen_cred_regantes/html/principal.html');
?>

<script type='text/javascript' src='gen_cred_regantes/js/grillas.js'></script>
<script type='text/javascript' src='gen_cred_regantes/js/eventos.js'></script>
<script type='text/javascript' src='gen_cred_regantes/js/funciones.js'></script>

<script>
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_id_contribuyente = '<?=$id_contribuyente?>';
    var v_lista_regantes = '<?=$lista_regantes?>';
    var m_filtros_consorcio = '<?=$filtros_consorcio?>';
    var v_lista_consorcios = '<?=$lista_consorcios?>';
    var v_lista_regiones_consorcio = '<?=$lista_regiones_consorcio?>';
    var v_lista_areas_consorcio = '<?=$lista_areas_consorcio?>';
    var v_lista_partidas = '<?=$lista_partidas?>';
    var v_lista_tipo_concepto = '<?=$lista_tipo_concepto?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var ajax_autocomplete = null;
    var v_d_nomenclatura;
    var v_id_sesion;
    var v_i_credito;
    var v_i_credito_disponible;
	var v_id_nota_cred;

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:v_m_autoquery,
        param:{':id_sesion':null}
    });

    var datos_creditos_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{
			':id_contrib':null,
			':n_partida':null
		}
    });

    $(document).ready(function() {

        inicializarEventos();
        inicializarLupas();
        inicializarGrillas();

    });
</script>

<?php
require_once(INTRANET."footer.php");
?>