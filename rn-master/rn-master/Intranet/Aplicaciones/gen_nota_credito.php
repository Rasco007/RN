<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$usuario = $_SESSION['usuario'];

$lista_tributos = fun_id_lista('TRIBUTOS NOTA DE CREDITO');
$lista_tributos_destino = fun_id_lista('TRIBUTOS APLICACION NOTA DE CREDITO');
$lista_objetos_destino = fun_id_lista('OBJETOS NOTA DE CREDITO');

#HTML PRINCIPAL
include('gen_nota_credito/html/principal.html');
?>

<script type='text/javascript' src='gen_nota_credito/js/grillas.js'></script>
<script type='text/javascript' src='gen_nota_credito/js/eventos.js'></script>
<script type='text/javascript' src='gen_nota_credito/js/funciones.js'></script>

<script>
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_usuario = '<?=$usuario?>';
    var v_lista_tributos = '<?=$lista_tributos?>';
    var v_lista_tributos_destino = '<?=$lista_tributos_destino?>';
    var v_lista_objetos_destino = '<?=$lista_objetos_destino?>';
    var ajax_autocomplete = null;
    var v_id_sesion;

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery
    });

    $(document).ready(function() {

        inicializarEventos();
        inicializarLupas();
        inicializarGrillas();

    });
</script>

<?php
require_once(INTRANET."footer.php");
?>