<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
#HTML PRINCIPAL
include('generacion_puntual_bonif/html/main.html');

$fecha_hoy = date('d/m/Y');
$lista_tributos = fun_id_lista('LISTA TRIBUTOS GENERACION PUNTUAL BONIF');
$lista_contribuyentes = fun_id_lista('LISTA NOMBRES REVALIDAR DDJJ');
$lista_tbl_gen = fun_id_lista('LISTA TABLAS GENERALES PARAMETROS');
$lista_timp = fun_id_lista('TABLAS GENERALES');


?>
<script type='text/javascript' src='generacion_puntual_bonif/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='generacion_puntual_bonif/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script>

    var v_id_menu = '<?=$p_id_menu?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_lista_tributos = '<?=$lista_tributos?>';
    var v_lista_contribuyentes = '<?=$lista_contribuyentes?>';
    var v_lista_tbl_gen = '<?=$lista_tbl_gen?>';
    var v_lista_timp = '<?=$lista_timp?>';

    $(document).ready(function(){
        init_eventos();
    });

    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>