<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$query = "  select c_dato, d_dato 
            from siat.tablas_generales tg
            where tg.n_tabla = 43
         ";

$db_query ->setQuery($query);
$param = array();
$unidades = $db_query->do_query($param);

$fecha_hoy = date('d/m/Y');
#HTML PRINCIPAL
include('cotizaciones_tpeaje/html/principal.html');
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
    </script>

    <script type='text/javascript' src='cotizaciones_tpeaje/js/eventos.js'></script>
    <script type='text/javascript' src='cotizaciones_tpeaje/js/grillas.js'></script>
<?php
require_once(INTRANET."footer.php");
?>