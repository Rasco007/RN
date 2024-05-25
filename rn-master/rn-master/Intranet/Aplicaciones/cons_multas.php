<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_id_contribuyente = $_POST['p_id_contribuyente'];

if(isset($p_id_contribuyente)){
    $db_query = new DB_Query(
        "SELECT fun_formato_cuit(n_cuit) as n_cuit, d_denominacion
        from contribuyentes
        where id_contribuyente = :id_contribuyente");
    $param = array(':id_contribuyente' => $p_id_contribuyente);
    $row_query = $db_query->do_query($param);
    $p_n_cuit = $row_query[0]['N_CUIT'];
    $p_d_denominacion = $row_query[0]['D_DENOMINACION'];
}

$query = "    
            select id_inspeccion, n_expediente ||'/'||n_anio_expediente d_expediente, n_cuit, d_denominacion
            from inspecciones inner join contribuyentes using(id_contribuyente)
            where c_estado != '5'
         ";

$db_query ->setQuery($query);
$param = array();
$inspecciones = $db_query->do_query($param);

$query = "  select id_infraccion, d_infraccion, d_articulo 
            from PARAM_INFRACCIONES 
            --where c_ente in (select c_ente from entes_usuarios where c_usuario = get_user)
            ";

$db_query ->setQuery($query);
$param = array();
$infracciones = $db_query->do_query($param);

$param = null;

$sql = "select siguiente_dia_habil(trunc(sysdate)) fecha from dual";

$db_query = new DB_Query($sql);
$results = $db_query->do_query($param);
$fecha_hoy = $results[0]['FECHA'];

#HTML PRINCIPAL
include('cons_multas/html/principal.html');
include('cons_multas/html/modal_detalles.html');
include('cons_multas/html/modal_instancias.html');

#El siguiente php, setea la variable $fecha_hoy con la fecha del dia si es habil, caso contrario siguiente dia habil.
#Este PHP, tambien obtiene los feriados y los guardas en la variable global disabledDays
include('modal_emitir_boleta.php');
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
    <script type='text/javascript' src='cons_multas/js/grillas.js'></script>
    <script type='text/javascript' src='cons_multas/js/eventos.js'></script>
    <script type='text/javascript' src='cons_multas/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var ajax_autocomplete = null;
        var fecha_hoy = '<?=$fecha_hoy?>';
        var id_contribuyente = '<?=$p_id_contribuyente?>';

        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{':p_f_actualizacion':null,
                ':p_deuda':null,
                ':p_id_contribuyente':id_contribuyente,
                ':p_f_notificacion':null,
                ':p_f_origen':null,
                ':p_id_infraccion':null,
                ':p_estado':null,
                ':p_pfp':null,
                ':p_juicio':null,
                ':p_id_inspeccion':null}
        });

        /*var datos_detalles_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:v_m_autoquery,
            param:{':p_n_instancia':null}
        });*/

        var datos_instancias_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:2,
            m_autoquery:v_m_autoquery,
            param:{':p_n_instancia':null}
        });

        $(document).ready(function() {

            inicializarGrillas();
            inicializarEventos();

        });
    </script>

<?php
require_once(INTRANET."footer.php");
?>