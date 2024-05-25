<?php
require_once(INTRANET . "header.php");

$p_id_menu = $_POST['p_n_id_menu'];

#HTML PRINCIPAL
include('consulta_historica_movimientos/html/main.html');

$lista_dominio = fun_id_lista('LISTA DOMINIOS CONS HIST MOV');
$lista_dominio_viejo = fun_id_lista('LISTA DOMINIOS ANTERIORES CONS HIST MOV');
?>

<script type='text/javascript' src='consulta_historica_movimientos/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_historica_movimientos/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_historica_movimientos/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>

var v_lista_dominio = '<?=$lista_dominio?>';
var v_lista_dominio_viejo = '<?=$lista_dominio_viejo?>';

var p_id_menu = '<?=$p_id_menu?>';
var filtros_no_nativos_ar = [];
var filtros_arr_main = [];

var main_grid = new GridParam({
        id_menu: p_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'S',
        param:{
            ':p_d_patente':null,
            ':p_d_patente_ant':null
        }
    });

$(document).ready(function(){
    init_grillas();
    init_eventos();

});
</script>

<?php
require_once(INTRANET."footer.php");
?>
