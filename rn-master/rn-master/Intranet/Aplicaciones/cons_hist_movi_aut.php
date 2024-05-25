<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];
$p_modo = $_POST['p_modo'];
$p_patente = $_POST['p_patente'];

$lista_patentes = fun_id_lista('LISTA DE PATENTES');

$db_query = new db_query("SELECT d_patente_vieja FROM automotores where d_patente = :d_patente");
$param = array(':d_patente' => $p_patente);
$restultado = $db_query->do_query($param);

$p_patente_vieja = $restultado[0]['D_PATENTE_VIEJA'];

include('cons_hist_movi_aut/html/principal.html');
?>

<script type="text/javascript" src="cons_hist_movi_aut/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_hist_movi_aut/js/elementos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_hist_movi_aut/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var v_id_menu = '<?=$p_id_menu?>';
    var p_modo = '<?=$p_modo?>';
    var p_patente = '<?=$p_patente?>';
    var v_lista_patentes = '<?=$lista_patentes?>';

    var datos_movimientos_auto_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'<?=$m_autoquery?>',
        param: {':d_patente':p_patente}
    });

    $(document).ready(function($){
        init_grillas();
        init_eventos();
        init_elementos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>