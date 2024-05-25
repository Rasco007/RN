<?php
    require_once(INTRANET."header.php");

    $p_id_menu = $_POST['p_n_id_menu'];
    $c_usuario = $_SESSION['usuario'];

    include('calendario_fiscal/html/principal.html');
?>

<script type="text/javascript" src="calendario_fiscal/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="calendario_fiscal/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="calendario_fiscal/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var v_id_menu = '<?=$p_id_menu?>';
    var c_usuario = '<?=$c_usuario?>';

    var lista_tributos = '<?=fun_id_lista('LISTADO DE TRIBUTOS')?>';
    var lista_conceptos = '<?=fun_id_lista('LISTADO DE CONCEPTOS POR TRIBUTO')?>';
    var lista_tablas_generales = '<?=fun_id_lista('TABLAS GENERALES')?>';
    var lista_plantillas_mail = '<?=fun_id_lista('PLANTILLAS DE MAILS')?>';

    

    var calendarios_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        n_orden: 0,
        m_autoquery: 'N'
    });

    var plantillas_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        n_orden: 1,
        m_autoquery: 'N'
    });

    $(document).ready(function(){
        init_grillas();
        init_eventos();
    });

</script>

<?php
    require_once(INTRANET."footer.php");
?>