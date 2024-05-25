<?php
    $p_n_id_menu = $_POST['p_n_id_menu'];
	$m_autoquery = $_POST['p_m_autoquery'];
	require_once(INTRANET."header.php");
	include('consulta_tramites_cuit/html/principal.html');
?>

<link rel="stylesheet" type="text/css" href="consulta_tramites_cuit/css/estilos.css">
<script type="text/javascript" src="consulta_tramites_cuit/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_tramites_cuit/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_tramites_cuit/js/grillas.js?no_cache=<?=date('dmy')?>"></script>


<script type="text/javascript">
    var filtros_no_nativos_ar = [];
    var filtros_arr_main = [];
    var n_id_menu = '<?=$p_n_id_menu?>';
	var n_tab = 0;
	var ajax_autocomplete = null;


    var datos_tramite_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid:3,
        m_autoquery:'N'
    });

    var datos_grid = new GridParam({
        id_menu:n_id_menu,
        n_grid:0,
        n_orden: 0,
        m_autoquery:'N'
    });

    var actividades_grid = new GridParam({
        id_menu:n_id_menu,
        n_grid:1,
        n_orden: 0,
        m_autoquery:'N'
    });

    var jurisdicciones_grid = new GridParam({
        id_menu:n_id_menu,
        n_grid:2,
        n_orden: 0,
        m_autoquery:'N'
    });

    $(document).ready(function(){
        $('.nav-tabs a').click(function(e){
            e.preventDefault();
            $(this).tab('show');
        });

        inicializarGrillas();
    });
</script>


</script>

<?php
    require_once(INTRANET."footer.php");
?>