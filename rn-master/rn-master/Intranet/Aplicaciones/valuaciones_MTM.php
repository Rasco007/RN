<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];

$p_modo = $_POST['p_modo'];
#HTML PRINCIPAL
include('valuaciones_MTM/html/main.html');
$lista_cod_rnpa = fun_id_lista('CODIGOS RNPA');


?>
<script type='text/javascript' src='valuaciones_MTM/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='valuaciones_MTM/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='valuaciones_MTM/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script>
var v_id_menu='<?=$p_id_menu?>';
var v_modo ='<?=$p_modo?>';
var p_c_fmcamod='';
var p_c_origen='';
var p_n_valuacion='';
var p_d_descripcion='';
var v_lista_cod_rnpa = '<?=$lista_cod_rnpa?>';
var filtros_no_nativos_ar = new Array();
var filtros_arr_main = [];

filtros_no_nativos_ar['main_grid'] = new Array();

var main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'S',
            n_orden:0,
            param:{
                'p_c_fmcamod':null,
                'p_c_origen':null,
                'p_n_valuacion':null,
                 'p_d_descripcion':null
            }
        });

$(document).ready(function(){
    init_grillas();
    init_eventos();

})
    

    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>