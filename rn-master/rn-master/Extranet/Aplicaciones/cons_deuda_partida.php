<?php
require_once(EXTRANET . "header.php");

if($_SESSION['entorno'] == 'EXTRANET'){
    $id_transacc = log_transaction(1059);
}


$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];


$db_query = new DB_Query(
    "SELECT count(1) as tiene_consorcio from entes_usuarios
    where c_ente='DPA' and c_usuario = get_info_user('c_usuario')");
$row_query = $db_query->do_query();
$tiene_consorcio = $row_query[0]['TIENE_CONSORCIO'];

if($tiene_consorcio == 0){
    $id_contribuyente = $_SESSION['id_rel_persona'];
    $db_query = new DB_Query(
        "SELECT fun_formato_cuit(n_cuit) as n_cuit, d_denominacion
        from contribuyentes
        where id_contribuyente = :id_contribuyente");
    $param = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($param);
    $n_cuit = $row_query[0]['N_CUIT'];
    $d_denominacion = $row_query[0]['D_DENOMINACION'];
    $filtros_consorcio = false;
    $lista_regantes = fun_id_lista('REGANTES POR CONTRIBUYENTE');
    $lista_partidas = fun_id_lista('LISTADO PARTIDAS RIEGO X CONTRIB');
}else{
    $filtros_consorcio = true;
    $lista_consorcios = fun_id_lista('CONSORCIOS Y DPA EXTRANET');
    $lista_regiones_consorcio = fun_id_lista('CONSORCIOS REGIONES POR USUARIO');
    $lista_areas_consorcio = fun_id_lista('CONSORCIOS AREAS POR USUARIO');
    $lista_regantes = fun_id_lista('REGANTES POR CONSORCIO');
    $lista_partidas = fun_id_lista('LISTADO DE PARTIDAS RIEGO EXTRANET');
}

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('cons_deuda_partida/html/principal.html');
?>
    <style>
        .filtros_consorcio{
            display: none;
        }

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

        var datos_main_grid_2 = new GridParam({
            id_menu: v_id_menu,
            n_grid:2,
            m_autoquery:v_m_autoquery,
            param:{':p_f_actualizacion':null,
                ':id_contribuyente':null,
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

        $(document).ready(function() {

            inicializarEventos();
            inicializarLupas();
            inicializarGrillas();

        });
    </script>

<?php
require_once(EXTRANET."footer.php");
?>