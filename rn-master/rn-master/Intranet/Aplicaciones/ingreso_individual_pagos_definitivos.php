<?php
require_once(INTRANET."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];
$p_tipo_pago = $_POST['p_tipo_pago'];

$lista_trib = fun_id_lista('LISTA TRIBUTOS INGRESO INDIVIDUAL PAGOS DEFINITIVOS');
$lista_nomen = fun_id_lista('LISTA NOMENCLATURA INGRESO INDIVIDUAL PAGOS DEFINITIVOS');
$lista_obj = fun_id_lista('LISTA OBJETOS HECHOS POR TRIBUTO INGRESO INDIVIDUAL PAGOS DEFINITIVOS');
$lista_sucur = fun_id_lista('LISTADO DE SUCURSALES');
$lista_tipo_form = fun_id_lista('TABLAS GENERALES');
$lista_bancos = fun_id_lista('LISTADO DE BANCOS');
$lista_mp = fun_id_lista('LISTA MEDIOS DE PAGO INGRESO INDIVIDUAL PAGOS DEFINITIVOS');

$lista_conceptos = fun_id_lista('LISTA DE CONCEPTOS ING INDIV PAGO DEF');
$lista_conceptos_mov = fun_id_lista('LISTA DE CONCEPTOS MOV ING INDIV PAGO DEF');

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('ingreso_individual_pagos_definitivos/html/principal.html');
include('ingreso_individual_pagos_definitivos/html/modals.html');
?>  <link rel="stylesheet" type="text/css" href="ingreso_individual_pagos_definitivos/css/ingreso_individual_pagos_definitivos.css?no_cache=<?=date('dmyhis')?>">
    <script type='text/javascript' src='ingreso_individual_pagos_definitivos/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='ingreso_individual_pagos_definitivos/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='ingreso_individual_pagos_definitivos/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_id_menu = '<?=$p_n_id_menu?>';
        var v_tipo_pago = '<?=$p_tipo_pago?>';

        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_nomen = '<?=$lista_nomen?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var v_lista_sucur = '<?=$lista_sucur?>';
        var v_lista_tipo_form = '<?=$lista_tipo_form?>';
        var v_lista_bancos = '<?=$lista_bancos?>';
        var v_lista_mp = '<?=$lista_mp?>';

        var v_lista_conceptos = '<?=$lista_conceptos?>';
        var v_lista_conceptos_mov = '<?=$lista_conceptos_mov?>';

        var id_ing_indiv_pagos_def = null;



        var datos_main_grid = new GridParam({
                id_menu:v_id_menu,
                n_grid:0,
                m_autoquery:'S',
                param:{':p_id_ing_pago':null}
            });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>