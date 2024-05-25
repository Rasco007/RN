<?php

    require_once(INTRANET."header.php");
    $m_autoquery = $_POST['p_m_autoquery'];
    $p_id_menu = $_POST['p_n_id_menu'];
    include('compensacionesParametros/html/inicial.html');


?>

    <script type='text/javascript' src='compensacionesParametros/js/grillas.js?no_cache=<?=date('dmy')?>'></script>
    <script type='text/javascript' src='compensacionesParametros/js/eventos.js?no_cache=<?=date('dmy')?>'></script>



    <script>
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var moodo = 'CAR';

        var datos_main_grid = new GridParam({
            id_menu:300005,
            n_grid:0,
            m_autoquery:'S',
            param:{'p_tributo':null }
        });

        var datos_detalle_grid = new GridParam({
            id_menu:300005,
            n_grid:1,
            m_autoquery:'S',
            param:{'cod_grupo':null}
        });

    $(document).ready(function() {

        inicializarGrillas();

        $("#lupa_c_tributo1").lupa_generica({
            id_lista:300000,
            titulos:['C&oacute;digo','Descripci&oacute;n'],
            grid:[{index:'c_codigo',width:100}, {index:'d_descrip',width:650}],
            caption:'Tributos Desa 300000',
            sortname:'c_codigo',
            sortorder:'asc',
            filtros:[],
            searchInput: '#ctributo',
            searchCode: true,
            campos:{c_codigo:'ctributo',d_descrip:'dtributo'},
            keyNav:true
        });




    });

</script>
<?php
    require_once(INTRANET."footer.php");
?>