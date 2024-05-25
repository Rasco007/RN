<?php
require_once(EXTRANET."header.php");

if($_SESSION['entorno'] == 'EXTRANET'){
    $id_transacc = log_transaction(1058);
}

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$id_contribuyente = $_SESSION['id_rel_persona'];

$lista_regantes = fun_id_lista('REGANTES POR CONSORCIO');
$lista_consorcios = fun_id_lista('CONSORCIOS Y DPA EXTRANET');
$lista_regiones_consorcio = fun_id_lista('CONSORCIOS REGIONES POR USUARIO');
$lista_areas_consorcio = fun_id_lista('CONSORCIOS AREAS POR USUARIO');
$lista_partidas = fun_id_lista('LISTADO DE PARTIDAS RIEGO EXTRANET');
$lista_tipo_concepto = fun_id_lista('LISTADO DE TIPOS CONCEPTOS');

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
			':n_partida':null,
			':tipo_concepto':null
		}
    });

    $(document).ready(function() {

        inicializarEventos();
        inicializarLupas();
        inicializarGrillas();

    });
</script>

<?php
require_once(EXTRANET."footer.php");
?>