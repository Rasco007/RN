<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

if (isset($_POST['p_id_contrib'])) {
    $query = "SELECT fun_formato_cuit (c.n_cuit) as cuit, 
            c.d_denominacion as denominacion,
            c.c_tipo_documento,
            (SELECT 
                d_dato 
            from 
                tablas_generales tg
            where 
                tg.n_tabla = c.n_tabla_tipo_doc
                AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            c.n_documento
            from contribuyentes c where c.id_contribuyente = :p_id_contribuyente";
    $db_query ->setQuery($query);
    $param = array(':p_id_contribuyente'=>$_POST['p_id_contrib']);
    $row_query = $db_query->do_query($param);
    $c_cuit = $row_query[0]['CUIT'];
    $c_deno = $row_query[0]['DENOMINACION'];
    $c_tdocu = $row_query[0]['C_TIPO_DOCUMENTO'];
    $c_ddocu = $row_query[0]['D_TIPO_DOCUMENTO'];
    $c_ndocu = $row_query[0]['N_DOCUMENTO'];
}

$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');

include('cons_inm_resp/html/principal.html');
?>
<script type="text/javascript" src="cons_inm_resp/js/grillas.js"></script>
<script type="text/javascript" src="cons_inm_resp/js/eventos.js"></script>
<script type="text/javascript" src="cons_inm_resp/js/funciones.js"></script>

<script type="text/javascript">

    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var id_titular = null;

    var v_lista_tdoc = '<?=$lista_tdoc?>';

    var datos_main_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{':p_id_contrib':'<?=$_POST['p_id_contrib']?>'}
    });

    $(document).ready(function() {
        inicializarGrillas();
        inicializarEventos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>
