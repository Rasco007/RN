<?php
require_once(INTRANET."header.php");

$p_id_menu = $_POST['p_n_id_menu'];

$p_d_nomenclatura = $_POST['p_d_nomenclatura'];

include('cons_prop_cat_rpi/html/principal.html');
?>

<link rel="stylesheet" type="text/css" href="cons_prop_cat_rpi/css/estilos.css">
<script type="text/javascript" src="cons_prop_cat_rpi/js/funciones.js?no_cache=<?/*=date('dmy')*/?>"></script>
<script type="text/javascript" src="cons_prop_cat_rpi/js/grillas.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var v_id_menu = '<?=$p_id_menu?>';
    var v_d_nomenclatura = '<?=$p_d_nomenclatura?>';

    var catastro_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'S',
        param:{':p_d_nomenclatura': v_d_nomenclatura}
    });

    var rpi_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        m_autoquery:'S',
        param:{':p_d_nomenclatura': v_d_nomenclatura}
    });

    var siat_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        m_autoquery:'S',
        param:{':p_d_nomenclatura': v_d_nomenclatura}
    });

    $(document).ready(function () {
        get_partida(v_d_nomenclatura);
        init_grillas();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>