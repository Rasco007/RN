<?php
session_start();

//*****Conexión de Web Service
define("ID_MENU", "10796");
$titulo = "Comprar Pase Mensual - Telepeaje Ruta Provincial N° 2 - Tramo RN N° 250 – RN N° 251 -";

$param['id_menu'] = ID_MENU;

require_once SCF.'header.php';

include('pase_mensual_scf/html/principal.html');
?>
    <script type='text/javascript' src='pase_mensual_scf/js/eventos.js'></script>
    <script type='text/javascript' src='pase_mensual_scf/js/funciones.js'></script>
    <script>
        var v_id_menu = '<?=$param["id_menu"]?>';

        $(document).ready(function () {
            inicializarEventos();
        });

        $(document).on('change', '.form-check-input', function() {
            $('#c_clase_aut').val($(this).val());
            $('#campo_importe').val($(this).attr('imp'));
            $('#campo_importe').text('Importe: $'+$(this).attr('impform'));
            $('#btn_continuar').hide();
            $('#campo_importe, #btn_comprar').show();
        });
    </script>

<?php
require_once SCF."footer.php";
?>