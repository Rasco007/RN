<?php
require_once(INTRANET."header.php");

$p_id_menu = $_POST['p_n_id_menu'];

$p_id_contribuyente = $_POST['p_id_contribuyente'];
$p_n_cuit = $_POST['p_n_cuit'];
$p_denominacion = $_POST['p_denominacion'];
$p_c_tipo_documento = $_POST['p_c_tipo_documento'];
$p_d_tipo_documento = $_POST['p_d_tipo_documento'];
$p_n_documento = $_POST['p_n_documento'];
$p_d_partida = $_POST['p_d_partida'];
$p_d_nomenclatura = $_POST['p_d_nomenclatura'];

?>

<?php
include('cons_inmuebles/html/principal.html');
include('cons_inmuebles/html/movimientos.html');
//include('cons_inmuebles/html/datos_irc.html');
include('cons_inmuebles/html/partidas_madre.html');
?>

<link rel="stylesheet" type="text/css" href="cons_inmuebles/css/estilos.css">
<script type="text/javascript" src="cons_inmuebles/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_inmuebles/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_inmuebles/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var v_id_menu = '<?=$p_id_menu?>';
    var v_id_contribuyente = '<?=$p_id_contribuyente?>';
    var ajax_autocomplete = null;

    var datos_generales_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'N',
        param:{':p_id_contribuyente': null,
                ':p_d_partida': null,
                ':p_d_nomenclatura':null}
    });

    var valuaciones_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{':p_id_inmueble': null}
    });

    var impuesto_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        m_autoquery:'N',
        param:{':p_id_inmueble': null}
    });

    var propietarios_1_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:3,
        m_autoquery:'N',
        param:{':p_d_nomenclatura': null}
    });

    var propietarios_2_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        m_autoquery:'N',
        param:{':p_id_contribuyente': null,
                ':p_d_nomenclatura': null}
    });

    var responsables_1_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:5,
        m_autoquery:'N',
        param:{':p_d_nomenclatura': null}
    });

    var responsables_2_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:6,
        m_autoquery:'N',
        param:{':p_id_contribuyente': null,
                ':p_d_nomenclatura': null}
    });

/*    var datos_irc_1_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:8,
        m_autoquery:'N',
        param:{':p_d_nomenclatura': null}
    });

    var datos_irc_2_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:9,
        m_autoquery:'N',
        param:{':p_d_nomenclatura': null}
    });*/

    var movimientos_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:7,
        m_autoquery:'N',
        param:{':p_d_nomenclatura': null}
    });

    var partidas_madre_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:10,
        m_autoquery:'N',
        param:{':p_id_inmueble': null}
    });

    $(document).ready(function () {
        $('#main').procOverlay({visible:true});
        init_eventos();
        init_grillas();
    });
</script>
<?php
require_once(INTRANET."footer.php");
?>
