<?php
require_once(INTRANET."header.php");

include('cambio_dominio/html/principal.html');

$p_id_menu = $_POST['p_n_id_menu'];
$usuario = $_SESSION['usuario'];

$lista_patente = fun_id_lista('LISTADO PATENTES DE AUTOMOTOR');
$lista_patente_vieja = fun_id_lista('LISTADO PATENTES POR PATENTE VIEJA');
?>
<link rel="stylesheet" type="text/css" href="cambio_dominio/css/estilos.css">

<script type='text/javascript' src='cambio_dominio/js/funciones.js'></script>
<script type='text/javascript' src='cambio_dominio/js/eventos.js'></script>
<script type='text/javascript' src='cambio_dominio/js/elementos.js'></script>

<script type="text/javascript">

    var v_id_menu = '<?=$p_id_menu?>';
    var v_usuario = '<?=$usuario?>';
    var v_lista_patente = '<?=$lista_patente?>';
    var v_lista_patente_vieja = '<?=$lista_patente_vieja?>';

    $(document).ready(function($){
        init_eventos();
        init_elementos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>
