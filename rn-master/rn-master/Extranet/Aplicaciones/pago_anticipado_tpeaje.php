<?php
require_once(EXTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$query = "select fun_formato_cuit(n_cuit) n_cuit, d_denominacion 
            from contribuyentes where id_contribuyente = :id_contribuyente";

$db_query ->setQuery($query);
$param = array(':id_contribuyente' => $_SESSION['id_rel_persona']);
$row_query = $db_query->do_query($param);
$d_denominacion = $row_query[0]['D_DENOMINACION'];
$n_cuit = $row_query[0]['N_CUIT'];

$lista_dominios = fun_id_lista('LISTADO DE DOMINIOS X CTE TRIBUTO90');

include('pago_anticipado_tpeaje/html/principal.html');
include('pago_anticipado_tpeaje/html/modal_comprar.html');
?>
<script>
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_lista_dominios = '<?=$lista_dominios?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        m_autoquery: v_m_autoquery,
        param:{':p_d_dominio':null,
            ':p_id_contribuyente':'<?=$_SESSION['id_rel_persona']?>'}
    });


    $(document).ready(function() {
        inicializarGrillas();
        inicializarEventos();
    });


</script>
<script type='text/javascript' src='pago_anticipado_tpeaje/js/grillas.js'></script>
<script type='text/javascript' src='pago_anticipado_tpeaje/js/eventos.js'></script>

<?php
require_once(EXTRANET."footer.php");
?>
