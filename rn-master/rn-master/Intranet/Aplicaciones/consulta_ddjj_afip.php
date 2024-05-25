<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$p_cuit = $_POST['p_n_cuit'];
$p_volver = $_POST['p_volver'];
$p_deno = $_POST['p_deno'];
$p_nro_envio = $_POST['p_nro_envio'];


include('consulta_ddjj_afip/html/principal.html');

?>
<script type='text/javascript' src='consulta_ddjj_afip/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_ddjj_afip/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_ddjj_afip/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_id_menu?>';
    var f_hoy = '<?=$fecha_hoy?>';
    var p_cuit = '<?=$p_cuit?>';
    var p_deno = '<?=$p_deno?>';
    var p_volver = '<?=$p_volver?>';
    var ajax_autocomplete = null;

    var v_no_carga_inicial_iva = false;
    var v_no_carga_inicial_emp = false;
    var v_no_carga_inicial_gan_pf = false;
    var v_no_carga_inicial_gan_soc = false;
    var v_no_carga_inicial_web = false;
    var v_no_carga_inicial_web_ii = false;
    var v_no_carga_inicial_iva_simp = false;
    var v_no_carga_inicial_libro_iva = false;
    var filtros_no_nativos_ar = [];

    var filtros_no_nativos_ar = new Array();
    var filtros_arr_main = [];

    filtros_no_nativos_ar['iva_grid'] = new Array();
    filtros_no_nativos_ar['empleadores_grid'] = new Array();
    filtros_no_nativos_ar['ganancias_pf_grid'] = new Array();
    filtros_no_nativos_ar['ganancias_soc_grid'] = new Array();
    filtros_no_nativos_ar['iva_web_grid'] = new Array();
    filtros_no_nativos_ar['iva_web_ii_grid'] = new Array();
    filtros_no_nativos_ar['iva_simp_grid'] = new Array();
    filtros_no_nativos_ar['libro_iva_grid'] = new Array();

    var v_solapa_actual;
    
    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES DDJJ AFIP')?>';

    function limpia_cuit(texto){
        result=texto.replace(/-/gi,'');
        return result;
    }

    if(p_cuit){
        $('#n_cuit').val(limpia_cuit(p_cuit));
        $('#btn_buscar').click();
        
        var iva_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden:0,
            m_autoquery:'S',
            param:{':p_n_cuit':limpia_cuit(p_cuit)}
        });
    }
    else{
        var iva_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden:0,
            m_autoquery:'S',
            param:{':p_n_cuit':''}
        });
    }


    

    var empleadores_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var ganancias_pf_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var ganancias_soc_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:3,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var iva_web_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var iva_web_ii_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:5,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var iva_simp_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:6,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var libro_iva_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:7,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    $(document).ready(function() { 
        inicializarLupas();
        inicializarEventos();
        inicializarGrillas();
        $('#btn_iva').procOverlay({visible:true});
        $('#bloque_iva').prop('hidden', false);
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>