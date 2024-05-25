<?php
require_once(INTRANET . "header.php");
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$lista_patentes = fun_id_lista('LISTADO PATENTES PAGOS EFECTUADOS');

include('borra_dominio/html/principal.html');
?>
<script type="text/javascript" src="borra_dominio/js/lupas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="borra_dominio/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="borra_dominio/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">

    var v_id_menu = '<?=$p_id_menu?>';

    var v_lista_patentes = '<?=$lista_patentes?>';

    $(document).ready(function($){
        init_lupas();
        init_eventos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>
