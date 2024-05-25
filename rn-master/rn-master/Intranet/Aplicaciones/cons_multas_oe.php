<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$query = "  select id_infraccion, d_infraccion, d_articulo 
            from PARAM_INFRACCIONES where c_ente in (select c_ente from entes_usuarios where c_usuario = get_user)";

$db_query ->setQuery($query);
$param = array();
$infracciones = $db_query->do_query($param);

$fecha_hoy = date('d/m/Y');

$param_prc = array(
    ':p_fecha_act' => $fecha_hoy
);

$sql = "declare v_resultado varchar2(20);
begin v_resultado := siat.pkg_terminales.corregir_fecha_act(:p_fecha_act); end;";

$db_procedure = new DB_Procedure($sql);
$db_procedure->setQuery($sql);
$results = $db_procedure->execute_query($param_prc);

if ($results->resultado == 'OK'){
    $fecha_hoy = $param_prc[':p_fecha_act'];
}

#HTML PRINCIPAL
include('cons_multas_oe/html/principal.html');
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
    <script type='text/javascript' src='cons_multas_oe/js/grillas.js'></script>
    <script type='text/javascript' src='cons_multas_oe/js/eventos.js'></script>
    <script type='text/javascript' src='cons_multas_oe/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var ajax_autocomplete = null;
        var fecha_hoy = '<?=$fecha_hoy?>';        

        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{':p_f_actualizacion':null,
            ':p_deuda':null,
            ':p_id_contribuyente':null,
            ':p_f_notificacion':null,
            ':p_f_origen':null,
            ':p_id_infraccion':null,
            ':p_estado':null,
            ':p_pfp':null,
            ':p_juicio':null}
        });
       
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