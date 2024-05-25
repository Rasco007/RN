<?php
require_once(EXTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

if (isset($_POST['p_modo'])){
    //MODO CONSULTA 'C'
    $modo = $_POST['p_modo'];
    if (isset($_POST['p_id_contrib'])) {
        $query = "SELECT fun_formato_cuit (c.n_cuit) as cuit, 
            c.d_denominacion as denominacion,
            c.c_tipo_documento,
            (SELECT 
                d_dato 
            from 
                tablas_generales tg
            where 
                tg.n_tabla = c.n_tabla_tipo_doc
                AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            c.n_documento
            from contribuyentes c where c.id_contribuyente = :p_id_contribuyente";
        $db_query ->setQuery($query);
        $param = array(':p_id_contribuyente'=>$_POST['p_id_contrib']);
        $row_query = $db_query->do_query($param);
        $c_cuit = $row_query[0]['CUIT'];
        $c_deno = $row_query[0]['DENOMINACION'];
        $c_tdocu = $row_query[0]['C_TIPO_DOCUMENTO'];
        $c_ddocu = $row_query[0]['D_TIPO_DOCUMENTO'];
        $c_ndocu = $row_query[0]['N_DOCUMENTO'];
    }
}else{
    //MODO CARGA 'X'
    $modo = 'X';
}

$role_total = 'N';

$query = "SELECT distinct DD.P_VALOR_INFO
from nomenclador_act_detalle dd
where dd.id_nomenclador='IIBB'  and dd.f_vig_hasta = to_date('31/12/2017','dd/mm/yyyy')
and dd.c_tipo_info like 'ALIC%'
order by DD.P_VALOR_INFO";

$db_query ->setQuery($query);
$param = array();
$alicuotas = $db_query->do_query($param);


$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');
$lista_timp = fun_id_lista('BONIF_EXEN TIPOS IMP X CONT');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS POR TIPO IMP');
$lista_obj = fun_id_lista('LISTA DE OBJETOS X CONT SIN F_CESE/F_HASTA');
$lista_tipos_exen = fun_id_lista('LISTA TIPOS DE EXENCIONES');
$lista_sit_esp = fun_id_lista('LISTA MOTIVOS DE SIT ESP POR FECHA');
$lista_exenciones = fun_id_lista('LISTA MOTIVOS DE EXENCION POR FECHA');
$lista_actividades10 = fun_id_lista('LISTA EXCEPCIONES ACTIVIDADES10');
$lista_actividades20 = fun_id_lista('LISTA EXCEPCIONES ACTIVIDADES20');

#HTML PRINCIPAL
include('abm_excepciones/html/principal.html');
include('abm_excepciones/html/modals.html');
?>

<style>
    .formError {
        z-index: 15000;
    }
</style>
<script type='text/javascript' src='abm_excepciones/js/grillas.js'></script>
<script type='text/javascript' src='abm_excepciones/js/eventos.js'></script>
<script type='text/javascript' src='abm_excepciones/js/funciones.js'></script>

<script>
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var modo = '<?=$modo?>';
    var role_total = '<?=$role_total?>';
    var v_lista_tdoc = '<?=$lista_tdoc?>';
    var v_lista_timp = '<?=$lista_timp?>';
    var v_lista_trib = '<?=$lista_trib?>';
    var v_lista_obj = '<?=$lista_obj?>';
    var v_lista_tipos_exen = '<?=$lista_tipos_exen?>';
    var v_lista_sit_esp = '<?=$lista_sit_esp?>';
    var v_lista_exenciones = '<?=$lista_exenciones?>';
    var v_lista_actividades10 = '<?=$lista_actividades10?>';
    var v_lista_actividades20 = '<?=$lista_actividades20?>';
    var ajax_autocomplete; 


    var id_contrib;
    var objeto_hecho;
    var c_tipo_imponible;
    var c_tributo;
    var f_vig_desde_obj;

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{'p_id_contrib':'<?=$_POST['p_id_contrib']?>',
            'p_c_timp':null,
            'p_c_trib':null,
            'p_objeto':null}
    });

    var datos_actividades_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{'p_id_contrib':'<?=$_POST['p_id_contrib']?>',
            'p_c_timp':null,
            'p_c_trib':null,
            'p_objeto':null}
    });

    var datos_regimenes_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:2,
        m_autoquery:'N',
        param:{'p_id_contrib':'<?=$_POST['p_id_contrib']?>',
            'p_c_timp':null,
            'p_objeto':null}
    });

    var datos_excepciones_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:3,
        m_autoquery:'N',
        param:{'p_id_contrib':'<?=$_POST['p_id_contrib']?>',
            'p_c_timp':null,
            'p_c_trib':null,
            'p_objeto':null}
    });

    var datos_excep_act_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:4,
        m_autoquery:'N',
        param:{'p_id_excepcion':null}
    });

    $(document).ready(function() {
        inicializarGrillas();
        inicializarEventos();
         /*MODO CONSULTA AUTOMATICO*/
         if (modo == 'C') {
            if ($('#id_contribuyente').val()) {
                $('#c_tipo_imponible,#c_tributo').blur();
                $('#btn_buscar').click();
            }
        }
    });
</script>

<?php
    require_once(EXTRANET."footer.php");
?>