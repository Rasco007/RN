<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$filtros_consorcio = true;
$lista_consorcios = fun_id_lista('CONSORCIOS');
$lista_regiones_consorcio = fun_id_lista('REGIONES POR TIPO DE CONSORCIO');
$lista_areas_consorcio = fun_id_lista('AREAS POR TIPO DE CONSORCIO');
$lista_regantes = fun_id_lista('REGANTES POR CONSORCIO INTRANET');
$lista_partidas = fun_id_lista('LISTADO DE PARTIDAS RIEGO INTRANET');

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('cons_deuda_partida/html/principal.html');
include('cons_deuda_partida/html/modal_compensaciones.html');
include('cons_deuda_partida/html/modal_ajustes.html');
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
    </style>
    <script type='text/javascript' src='cons_deuda_partida/js/grillas.js'></script>
    <script type='text/javascript' src='cons_deuda_partida/js/eventos.js'></script>
    <script type='text/javascript' src='cons_deuda_partida/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_id_contribuyente = '<?=$id_contribuyente?>';
        var v_lista_regantes = '<?=$lista_regantes?>';
        var m_filtros_consorcio = '<?=$filtros_consorcio?>';
        var v_datos_grilla;
        var v_filtros_lista_regantes;
        var v_filtros_titulos_lista_regantes;
        var v_filtros_null_lista_regantes;
        var v_lista_consorcios = '<?=$lista_consorcios?>';
        var v_lista_regiones_consorcio = '<?=$lista_regiones_consorcio?>';
        var v_lista_areas_consorcio = '<?=$lista_areas_consorcio?>';
        var v_lista_partidas = '<?=$lista_partidas?>';
        var v_grid;
        var v_sort_partidas;
        var v_campos;
        var v_filtros_lista_partidas;
        var v_filtros_titulos_lista_partidas;
        var v_filtros_null_lista_partidas;
        var ajax_autocomplete = null;
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_d_nomenclatura;

        var datos_main_grid_0 = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{':p_f_actualizacion':null,
                ':id_contribuyente':null,
                ':c_organismo':null,
                ':c_region':null,
                ':c_area':null,
                ':n_partida':null,
                ':d_nomenclatura':null,
                ':c_deuda':null}
        });

        var datos_detalle_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:v_m_autoquery,
            param:{':p_f_actualizacion':null,
                ':id_obligacion':null}
        });
        
        var datos_ajustes_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:2,
            m_autoquery:'<?=$m_autoquery?>',
            param:{':id_obligacion':null,
                ':n_ajuste':null
            }
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