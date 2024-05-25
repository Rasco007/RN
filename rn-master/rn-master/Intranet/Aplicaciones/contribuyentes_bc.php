<?php

require_once(INTRANET."header.php");
require_once("contribuyentes_bc/php/ClienteBCAfip.php");

?>

<script type="text/javascript" src="contribuyentes_bc/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="contribuyentes_bc/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<link rel="stylesheet" type="text/css" href="contribuyentes_bc/css/estilos.css">


<?php

include('contribuyentes_bc/html/principal.html');

require_once(INTRANET."footer.php");

?>