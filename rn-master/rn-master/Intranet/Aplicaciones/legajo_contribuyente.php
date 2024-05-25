<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_id_contribuyente=$_POST['p_id_contribuyente'];
$p_n_cuit=$_POST['p_n_cuit'];
$p_volver=$_POST['p_volver'];
// $tipo_documento = $_POST['tipo_documento'];
// $d_tipo_documento = $_POST['d_tipo_documento'];
// $documento = $_POST['documento'];
$cuit = $_POST['cuit'];

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
    var p_n_cuit = '<?=$p_n_cuit?>';
    var p_cuit = '<?=$cuit?>';
    var p_volver = '<?=$p_volver?>';
    var ajax_autocomplete = null;

    var datos_automotor_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{':p_id_contribuyente': null}
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
        param:{'p_id_contribuyente':null}
    });
    
    var datos_ddjj_no_presentadas_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        m_autoquery:'N',
        param:{':p_id_contribuyente':null}
    });

    var datos_inmuebles_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:5,
        m_autoquery:'N',
        param:{':p_id_contribuyente': null}
    });

    if(p_n_cuit){
        $("#n_cuit").val(p_n_cuit);
        $("#n_cuit").trigger('focusout');
        id_contribuyente = $("#id_contribuyente").val();
        // $('#frm_busqueda').validationEngine('hideAll');
        $('#bloque_consultas').show();
        $('#btn_continuar').prop('disabled', true);
        $("#frm_busqueda input").attr('disabled', true);
        $('#frm_busqueda .btn_lupa').hide();
        $('#btn_volver').show();

        $('#btn_volver').click(function () {
        console.log('entro');
        if(p_volver){
            // post_to_url('consulta_ddjj_afip.php', {
            // 'p_n_id_menu': 100161,
            // 'p_n_cuit': $('#n_cuit').val(),
            // 'p_deno': $('#d_denominacion').val(),
            // 'p_volver':'legajo_contribuyente'
            // },'');
            window.close();
        }
        else{
            post_to_url('consulta_padron_AFIP.php', {
            'p_n_id_menu': 100162,
            'p_n_cuit': $('#n_cuit').val(),
            },'');
        }
    });
    }

    $(document).ready(function($){
        init_grillas();
        init_eventos();
        init_elementos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>