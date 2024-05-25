<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
#HTML PRINCIPAL
include('revalidar_ddjj/html/main.html');

$fecha_hoy = date('d/m/Y');
$lista_tributos = fun_id_lista('LISTA TRIBUTOS REVALIDAR DDJJ');
$lista_contribuyentes = fun_id_lista('LISTA NOMBRES REVALIDAR DDJJ');
$lista_tbl_gen = fun_id_lista('LISTA TABLAS GENERALES PARAMETROS');


?>
<script type='text/javascript' src='revalidar_ddjj/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='revalidar_ddjj/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script>

    var v_id_menu = '<?=$p_id_menu?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_lista_tributos = '<?=$lista_tributos?>';
    var v_lista_contribuyentes = '<?=$lista_contribuyentes?>';
    var v_lista_tbl_gen = '<?=$lista_tbl_gen?>';

    $(document).ready(function(){
        init_eventos();
    });

    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>