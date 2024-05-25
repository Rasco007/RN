<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$lista_consorcios = fun_id_lista('CONSORCIOS');
$lista_tipos_consorcios = fun_id_lista('TIPOS DE CONSORCIO');
$lista_regiones_consorcio = fun_id_lista('REGIONES POR TIPO DE CONSORCIO');
$lista_areas_consorcio = fun_id_lista('AREAS POR TIPO DE CONSORCIO');
$lista_regiones = fun_id_lista('CONSORCIOS REGIONES');
$lista_areas = fun_id_lista('CONSORCIOS AREAS');

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('param_consorcios/html/param_consorcios.html');
?>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_lista_consorcios = '<?=$lista_consorcios?>';
    var v_lista_tipos_consorcios = '<?=$lista_tipos_consorcios?>';
    var v_lista_regiones_consorcio = '<?=$lista_regiones_consorcio?>';
    var v_lista_areas_consorcio = '<?=$lista_areas_consorcio?>';
    var v_lista_regiones = '<?=$lista_regiones?>';
    var v_lista_areas = '<?=$lista_areas?>';
    var fecha_hoy = '<?=$fecha_hoy?>';

</script>

<script type='text/javascript' src='param_consorcios/js/funciones.js'></script>
<script type='text/javascript' src='param_consorcios/js/param_consorcios.js'></script>

<?php
require_once(INTRANET."footer.php");
?>