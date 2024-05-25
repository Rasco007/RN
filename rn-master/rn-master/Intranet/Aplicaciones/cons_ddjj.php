<?php

    require_once(INTRANET."header.php");
    $reset = opcache_reset();
    $p_n_id_menu = $_POST['p_n_id_menu'];

    // 14122022 pase a preprod



if (isset($_POST['pid_contribuyente'])) {
        $p_modo = 'ORIGENCTACTE';
        $pid_contribuyente  =  $_POST['pid_contribuyente'];
        $pcuit              =  $_POST['pcuit'];
        $pdenominacion      =  $_POST['pdenominacion'];
        $pc_tributo         =  $_POST['pc_tributo'];
        $pc_tipo_imponible  =  $_POST['pc_tipo_imponible'];
        $pd_objeto_hecho    =  $_POST['pd_objeto_hecho'];
        $pn_posicion_fiscal = substr($_POST['n_pos_fiscal'],0,4).substr($_POST['n_pos_fiscal'],5,2);
        $pn_cuota           =  $_POST['n_cuota'];
    }else{
        $p_modo = 'XX';
    }

    $lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS');

    include('cons_ddjj/html/principal.html');
    include('cons_ddjj/html/div_ddjj_agentes.html');



$lista_tributos = fun_id_lista('LISTA DE TRIBUTOS COMPENSACIONES');

?>

<script type="text/javascript" src="cons_ddjj/js/focus.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="cons_ddjj/js/lupas.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="cons_ddjj/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="cons_ddjj/js/grillas_agentes.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="cons_ddjj/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
<script type="text/javascript" src="cons_ddjj/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

<script>


        var id_menu = '<?=$p_n_id_menu?>';
        var vg_lista_tributos = '<?=$lista_tributos?>';
        var p_modo = '<?=$p_modo?>';
        var pid_contribuyente  = '<?=$pid_contribuyente?>';
        var pdenominacion      = '<?=$pdenominacion?>';
        var pcuit              = '<?=$pcuit?>';
        var pc_tributo         = '<?=$pc_tributo?>';
        var pc_tipo_imponible  = '<?=$pc_tipo_imponible?>';
        var pd_objeto_hecho    = '<?=$pd_objeto_hecho?>';
        var pn_posicion_fiscal    = '<?=$pn_posicion_fiscal?>';
        var pn_cuota              = '<?=$pn_cuota?>';


        $('#n_cuit').val(pcuit );
        $('#d_denominacion').val(pdenominacion);
        $('#c_tributo').val(pc_tributo);
        $('#d_objeto_hecho').val(pd_objeto_hecho);
        $('#id_contribuyente').val(pid_contribuyente);
        $("#c_tipo_imponible").val(pc_tipo_imponible);
        $("#n_pos_fiscal_desde").val(pn_posicion_fiscal );
        $("#cuota_desde").val(pn_cuota );
        $("#n_pos_fiscal_hasta").val(pn_posicion_fiscal );
        $("#cuota_hasta").val(pn_cuota);



        var datos_informes_grid = new GridParam({
        id_menu:10893,
        n_grid:4,
        m_autoquery:'S',
        param:{':pid_contribuyente': pid_contribuyente,  ':pc_tributo1':pc_tributo, ':pc_tipo_imponible':pc_tipo_imponible, ':pc_concepto':null, ':pd_objeto_hecho1':pd_objeto_hecho   , ':p_d':pn_posicion_fiscal,  ':c_d':pn_cuota, ':p_h':pn_posicion_fiscal, ':c_h':pn_cuota, ':filtro_todas_ddjj':'N'}
        });

        var datos_ingresosBrutos_grid = new GridParam({
        id_menu:10893,
        n_grid:2,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null,  ':pc_formulario':null}
        });

        var datos_3142_grid = new GridParam({
        id_menu:10893,
        n_grid:3,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });



        var datos_retenciones_grid = new GridParam({
        id_menu:10893,
        n_grid:5,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });

        var datos_retenciones20_grid = new GridParam({
        id_menu:10893,
        n_grid:6,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });


        var datos_percepciones_grid = new GridParam({
        id_menu:10893,
        n_grid:7,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });

        var datos_percepciones_grid = new GridParam({
        id_menu:10893,
        n_grid:7,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });


        var datos_retbco_grid = new GridParam({
        id_menu:10893,
        n_grid:8,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });

        var datos_aduana_grid = new GridParam({
        id_menu:10893,
        n_grid:9,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });

        var datos_djc_grid = new GridParam({
        id_menu:10893,
        n_grid:10,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });


        var datos_grilla11_grid = new GridParam({
        id_menu:10893,
        n_grid:11,
        n_orden:0,
        m_autoquery:'N',
        param:{':pid_ddjj': null}
        });

        var datos_grilla12_grid = new GridParam({
            id_menu:10893,
            n_grid:12,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });

        var datos_grilla14_grid = new GridParam({
            id_menu:10893,
            n_grid:14,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });

        var datos_grilla15_grid = new GridParam({
            id_menu:10893,
            n_grid:15,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });

        var datos_grilla16_grid = new GridParam({
            id_menu:10893,
            n_grid:16,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });

        var datos_grilla17_grid = new GridParam({
            id_menu:10893,
            n_grid:17,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });

        var datos_grilla18_grid = new GridParam({
            id_menu:10893,
            n_grid:18,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });

        var datos_grilla19_grid = new GridParam({
            id_menu:10893,
            n_grid:19,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });




        var datos_grilla20_grid = new GridParam({
            id_menu:10893,
            n_grid:20,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });

        var datos_grilla21_grid = new GridParam({
            id_menu:10893,
            n_grid:21,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });

        var datos_grilla22_grid = new GridParam({
            id_menu:10893,
            n_grid:22,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });


        var datos_grilla24_grid = new GridParam({
            id_menu:10893,
            n_grid:24,
            n_orden:0,
            m_autoquery:'N',
            param:{':pid_ddjj': null}
        });








        $(document).ready(function () {
        inicializarLupas();
        inicializarGrillas();
        inicializarGrillasAgentes();
    });

    $("#div_ddjj").show();
    $('#solo_deuda').prop('checked',false);







</script>

<?php
require_once(INTRANET."footer.php");
?>
