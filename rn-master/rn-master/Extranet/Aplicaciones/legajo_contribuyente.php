<?php
require_once(EXTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_id_contribuyente= $_SESSION['id_rel_persona'];

$query = "SELECT fun_formato_cuit(n_cuit) as n_cuit, d_denominacion, c.c_tipo_documento,
            (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, c.n_documento
    from contribuyentes c
    where id_contribuyente = :id_contribuyente";

$db_query ->setQuery($query);
$param = array(':id_contribuyente' => $p_id_contribuyente);
$row_query = $db_query->do_query($param);
$d_denominacion = $row_query[0]['D_DENOMINACION'];
$n_cuit = $row_query[0]['N_CUIT'];
$c_tipo_documento = $row_query[0]['C_TIPO_DOCUMENTO'];
$d_tipo_documento = $row_query[0]['D_TIPO_DOCUMENTO'];
$n_documento = $row_query[0]['N_DOCUMENTO'];

include('legajo_contribuyente/html/principal.html');

// Modals
include('legajo_contribuyente/html/automotor.html');
include('legajo_contribuyente/html/ddjj_no_pagadas.html');
include('legajo_contribuyente/html/inmuebles_no_pagados.html');
include('legajo_contribuyente/html/ddjj_no_presentadas.html');
include('legajo_contribuyente/html/inmuebles.html');
?>

<link rel="stylesheet" type="text/css" href="legajo_contribuyente/css/estilos.css">
<script type="text/javascript" src="legajo_contribuyente/js/elementos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="legajo_contribuyente/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="legajo_contribuyente/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="legajo_contribuyente/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var id_contribuyente = '<?=$p_id_contribuyente?>';
    var ajax_autocomplete = null;

    var datos_automotor_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{':p_id_contribuyente': id_contribuyente}
    });

    var datos_ddjj_no_pagadas_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        m_autoquery:'N',
        param:{':p_n_lote':null}
    });

    var datos_inmuebles_no_pagados_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:3,
        m_autoquery:'N',
        param:{'p_id_contribuyente': id_contribuyente}
    });
    
    var datos_ddjj_no_presentadas_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        m_autoquery:'N',
        param:{':p_id_contribuyente': id_contribuyente}
    });

    var datos_inmuebles_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:5,
        m_autoquery:'N',
        param:{':p_id_contribuyente': id_contribuyente}
    });

    $(document).ready(function($){
        init_grillas();
        init_eventos();
        init_elementos();
    });

</script>

<?php
require_once(EXTRANET."footer.php");
?>