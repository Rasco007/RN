<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$p_tributo = $_POST['p_tributo'];

include('reimpresion_certificado_baja/html/main.html');


?>
    
    <script type="text/javascript" src="reimpresion_certificado_baja/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="reimpresion_certificado_baja/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">

        var p_dominio;
        var p_f_baja;
        var p_n_cert_baja;
        var p_n_id_menu='<?=$p_id_menu?>'


        $(document).ready(function($){
            
            init_eventos();
            
        });

    

    </script>



<?php
require_once(INTRANET."footer.php");
?>

