<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
#HTML PRINCIPAL
include('incorporacion_masiva_de_pagos_ddjj/HTML/main.html');

$fecha_hoy = date('d/m/Y');

?>
<script type='text/javascript' src='incorporacion_masiva_de_pagos_ddjj/JS/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='incorporacion_masiva_de_pagos_ddjj/JS/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script>
    var fecha_hoy = '<?=$fecha_hoy?>';
    var proceso;

    $(document).ready(function(){
        init_eventos();
    });

</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>