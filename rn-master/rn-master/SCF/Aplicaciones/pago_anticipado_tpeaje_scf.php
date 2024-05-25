<?php
session_start();

//*****Conexión de Web Service
define("ID_MENU", "10840");
$titulo = "Pago Anticipado Telepeaje";

$param['id_menu'] = ID_MENU;

require_once SCF.'header.php';

include('pago_anticipado_tpeaje/html/principal.html');
?>
    <script type='text/javascript' src='pago_anticipado_tpeaje/js/eventos.js'></script>
    <script type='text/javascript' src='pago_anticipado_tpeaje/js/funciones.js'></script>

    <script>
        var v_id_menu = '<?=$param["id_menu"]?>';

        $(document).ready(function () {
            inicializarEventos();
        });
    </script>

<?php
require_once SCF."footer.php";
?>