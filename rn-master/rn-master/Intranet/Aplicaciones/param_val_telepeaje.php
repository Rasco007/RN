<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$query = "  select c_concepto, d_concepto 
            from tributos_conceptos
            where c_tributo = :p_c_tributo
            and c_concepto < 900
         ";

$db_query ->setQuery($query);
$param = array(':p_c_tributo'=>$_POST['p_c_tributo']);
$conceptos = $db_query->do_query($param);

$fecha_hoy = date('d/m/Y');
#HTML PRINCIPAL
include('param_val_telepeaje/html/principal.html');
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
        var v_c_tipo_imp = '<?=$_POST['p_c_tipo_imp']?>';
        var v_c_tributo = '<?=$_POST['p_c_tributo']?>';
    </script>

    <script type='text/javascript' src='param_val_telepeaje/js/eventos.js'></script>
    <script type='text/javascript' src='param_val_telepeaje/js/grillas.js'></script>
    <script type='text/javascript' src='param_val_telepeaje/js/funciones.js'></script>
<?php
require_once(INTRANET."footer.php");
?>