<?php
require_once(INTRANET . "header.php");
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$p_modo = $_POST['p_modo'];
$p_c_tributo = $_POST['p_c_tributo'];

$lista_partidas = fun_id_lista('LISTA PARTIDAS TRANSFERENCIAS');
$lista_nomenclaturas = fun_id_lista('LISTA NOMENCLATURAS TRANSFERENCIAS');

include('borra_transf/html/principal.html');
?>
<script type="text/javascript" src="borra_transf/js/lupas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="borra_transf/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="borra_transf/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">

    var v_id_menu = '<?=$p_id_menu?>';

    var p_modo = '<?=$p_modo?>';
    var p_c_tributo = '<?=$p_c_tributo?>';
    
    var v_lista_partidas = '<?=$lista_partidas?>';
    var v_lista_nomenclaturas = '<?=$lista_nomenclaturas?>';

    $(document).ready(function($){
        init_lupas();
        init_eventos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>
