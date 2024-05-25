<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$query = "    
            select id_inspeccion, n_expediente ||'/'||n_anio_expediente d_expediente, n_cuit, d_denominacion
            from inspecciones inner join contribuyentes using(id_contribuyente)
            where c_estado != '5'
         ";

$db_query ->setQuery($query);
$param = array();
$inspecciones = $db_query->do_query($param);

$query = "  select id_infraccion, d_infraccion, d_articulo 
            from PARAM_INFRACCIONES pv
            where c_ente in (select c_ente from entes_usuarios where c_usuario = get_info_user('c_usuario') and f_vig_hasta is null)
         ";

$db_query ->setQuery($query);
$param = array();
$infracciones = $db_query->do_query($param);

$fecha_hoy = date('d/m/Y');
#HTML PRINCIPAL
include('gestion_multas_fisca/html/principal.html');
include('gestion_multas_fisca/html/modals.html');
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
    <script>

        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var c_ente = '<?=$_POST['c_ente']?>';
    </script>

    <script type='text/javascript' src='gestion_multas_fisca/js/eventos.js'></script>
    <script type='text/javascript' src='gestion_multas_fisca/js/grillas.js'></script>
    <script type='text/javascript' src='gestion_multas_fisca/js/funciones.js'></script>
<?php
require_once(INTRANET."footer.php");
?>