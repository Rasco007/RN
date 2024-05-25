<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');
$lista_timp = fun_id_lista('TIPOS IMPONIBLES X CONTRIBUYENTE');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS POR TIPO IMP');
$lista_obj = fun_id_lista('LISTA OBJETOS HECHOS CON CONTRIB CON F_CESE_PROV');
$lista_nacionalidad = fun_id_lista('LISTADO DE NACIONALIDADES');
$lista_estado_civil = fun_id_lista('LISTADO DE ESTADOS CIVILES');
$lista_empresa = fun_id_lista('LISTADO DE TIPOS DE EMPRESA');
$lista_forma_jurica = fun_id_lista('LISTADO DE FORMAS JURIDICAS');
#HTML PRINCIPAL
include('modif_tipo_persona/html/principal.html');
?>
    <style>
        .dropdown-menu{
            max-width: 1px;
        }

        .cDropdown {
            padding: 5px 12px;
            color: #555;
            text-transform: none;
            font-weight: unset;
            font-size: 11px;
            border: 1px solid #c2cad8 !important;
            background-color: white !important;
        }

        .cDropdown :hover{
            background-color: white !important;
            color: #555;
        }

        .formError {
            z-index: 15000;
        }
    </style>
    <script type='text/javascript' src='modif_tipo_persona/js/grillas.js'></script>
    <script type='text/javascript' src='modif_tipo_persona/js/eventos.js'></script>
    <script type='text/javascript' src='modif_tipo_persona/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var ajax_autocomplete;
        var v_lista_tdoc = '<?=$lista_tdoc?>';
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var v_lista_empresa = '<?=$lista_empresa?>';
        var v_lista_forma_jurica = '<?=$lista_forma_jurica?>';
        var v_lista_nacionalidad = '<?=$lista_nacionalidad?>';
        var v_lista_estado_civil = '<?=$lista_estado_civil?>';

        var id_contrib;
        var tipo_persona;

        var datos_integrantes_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            m_autoquery: v_m_autoquery,
            param: {':id_contribuyente': null}
        });

        var datos_integrantestmp_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 1,
            m_autoquery: v_m_autoquery,
            param: {':id_contribuyente': null}
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();

        });
    </script>

<?php
require_once(INTRANET."footer.php");
?>