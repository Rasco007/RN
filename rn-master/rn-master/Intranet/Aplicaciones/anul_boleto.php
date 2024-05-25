<?php
require_once(INTRANET."header.php");

$p_id_menu = $_POST['p_n_id_menu'];

$p_tributo = $_POST['p_tributo'];
$fecha_hoy = date('d/m/Y');

include('anul_boleto/html/principal.html');
/*include('anul_boleto/html/principal_auto.html');*/
?>

<link rel="stylesheet" type="text/css" href="anul_boleto/css/estilos.css">
<script type="text/javascript" src="anul_boleto/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="anul_boleto/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var v_id_menu = '<?=$p_id_menu?>';
    var v_tributo = '<?=$p_tributo?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    //var v_id_contribuyente = 0;

    $(document).ready(function () {
        if(v_tributo == 60){
            init_eventos_inmo();
        }
        if (v_tributo == 90){
            init_eventos_auto();
        }
        init_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
