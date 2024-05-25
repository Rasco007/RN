<?php

require_once(INTRANET."header.php");
require_once("migrador/ajax_migrador.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

//aca voy a hacer una prueba de merge

?>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;

</script>

    <script type="text/javascript" src="migrador/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="migrador/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
    <link rel="stylesheet" type="text/css" href="migrador/css/estilos.css">


<?php

include('migrador/html/principal.html');

require_once(INTRANET."footer.php");

?>