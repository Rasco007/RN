<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$p_tributo = $_POST['p_tributo'];

$lista_contribuyentes = fun_id_lista('LISTADO DATOS CONTRIBUYENTE SEGUN DENOMINACION');
$lista_documento = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_dominio = fun_id_lista('LISTA PATENTES REINCOROPORACION');
$lista_dominio_anterior = fun_id_lista('LISTA PETENTES VIEJAS REINCORPORACION');
$lista_motivos_alta = fun_id_lista('LISTA MOTIVOS ALTA REINCORPORACION');
$lista_delegaciones = fun_id_lista('LISTADO DELEGACIONES REINCORPORACION');
$lista_otros_contribuyentes = fun_id_lista('LISTADO OTROS CONTRIBUYENTES REINCORPORACION');
$lista_marcas_automotor = fun_id_lista('LISTADO MARCAS AUTOMOTOR');
$lista_modelos_automotor = fun_id_lista('LISTADO MODELOS AUTOMOTOR');
$lista_domicilios = fun_id_lista('LISTA DOMICILIOS REINCORPORACION');

$c_tributo_automotor = 90;
$c_tributo_inmobiliario = 60;

include('recupero_reincorporacion/html/principal.html');
include('recupero_reincorporacion/html/modals.html');

?>
    <link rel="stylesheet" type="text/css" href="recupero_reincorporacion/css/estilos.css">
    <script type="text/javascript" src="recupero_reincorporacion/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="recupero_reincorporacion/js/elementos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="recupero_reincorporacion/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="recupero_reincorporacion/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

    <script type="text/javascript">

        var p_tributo = '<?=$p_tributo?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var c_tributo_automotor = '<?=$c_tributo_automotor?>';
        var c_tributo_inmobiliario = '<?=$c_tributo_inmobiliario?>';
        var id_lista_contribuyentes = '<?=$lista_contribuyentes?>';
        var id_lista_documento = '<?=$lista_documento?>';
        var id_lista_dominio = '<?=$lista_dominio?>';
        var id_lista_dominio_anterior = '<?=$lista_dominio_anterior?>';
        var id_lista_motivos_alta = '<?=$lista_motivos_alta?>';
        var id_lista_delegaciones = '<?=$lista_delegaciones?>';
        var id_lista_otros_contrib = '<?=$lista_otros_contribuyentes?>';
        var id_lista_marcas_automotor = '<?=$lista_marcas_automotor?>';
        var id_lista_modelos_automotor = '<?=$lista_modelos_automotor?>';
        var id_lista_domicilios = '<?=$lista_domicilios?>';
        var guardar_mtm;
        var ajax_autocomplete;

        var datos_tributos_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param: {':p_c_tributo': p_tributo, ':p_d_patente': null,
                    ':id_contribuyente': null, ':c_tipo_imponible': null,
                    ':d_objeto_hecho': null}
        });

        var datos_conceptos_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            m_autoquery:'N',
            param: {':p_c_tributo': p_tributo, ':p_id_contribuyente': null,
                    ':p_c_tipo_imponible': null, ':p_d_objeto_hecho': null}

        });

        $(document).ready(function($){
            init_grillas();
            init_eventos();
            init_elementos();
        });

    </script>



<?php
require_once(INTRANET."footer.php");
?>

