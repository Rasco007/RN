<?php
    require_once(INTRANET."header.php");

    $p_id_menu = $_POST['p_n_id_menu'];
    $c_usuario = $_SESSION['usuario'];

    include('abm_plantillas_mail/html/principal.html');
?>

<script type="text/javascript" src="abm_plantillas_mail/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="abm_plantillas_mail/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="abm_plantillas_mail/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var v_id_menu = '<?=$p_id_menu?>';
    var v_id_plantilla;
    var c_usuario = '<?=$c_usuario?>';

    var lista_tributos = '<?=fun_id_lista('LISTADO DE TRIBUTOS')?>';
    var lista_conceptos = '<?=fun_id_lista('LISTADO DE CONCEPTOS POR TRIBUTO')?>';
    var lista_tablas_generales = '<?=fun_id_lista('TABLAS GENERALES')?>';

    

    var plantillas_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery: 'S'
    });

    var secciones_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        n_orden:2,
        m_autoquery: 'N'
    });

    $(document).ready(function(){
        init_grillas();
        init_eventos();
        botones_aut();
        setTimeout(function() {
            $("#secciones_grid").trigger("reloadGrid");
        }, 2500);

    });

</script>

<?php
    require_once(INTRANET."footer.php");
?>