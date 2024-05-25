<?php

require_once(INTRANET."header.php");
require_once 'fisca/fisca_dao.php';

$p_id_menu = $_POST['p_n_id_menu'];

if (isset($_POST['p_modo'])){
    $modo = $_POST['p_modo'];
}else{
    $modo = 'CAR';
}

//SI ES CONSULTA PASO EL ID_LIQUIDACION
if ($modo == 'CON'){
    $n_instancia = $_POST['p_n_instancia'];
    $n_orden = $_POST['p_n_orden'];
} else{


    $data_liquidacion = cargar_liquidacion($_POST['p_id_inspeccion']);

    if(! empty($data_liquidacion['error'])){
        $error = $data_liquidacion['error'];
        //die($error);
    }else{
        //$n_id_liquidacion = $data_liquidacion['id_liquidacion'];
        $n_instancia = $data_liquidacion['n_instancia'];
        $n_orden = $data_liquidacion['n_orden'];
    }
}

if(!$error){
    $db_query = new DB_Query("select count(n_instancia) version from instancias 
                where n_instancia = :p_n_instancia and n_orden <= :p_n_orden and c_instancia = '066'");

    $par = array(':p_n_instancia' => $n_instancia,':p_n_orden' => $n_orden);
    $row_query = $db_query->do_query($par);
    $version = $row_query[0]['VERSION'];

    //Buscamos los datos para la pantalla
    $datos_liquidacion = get_datos_liquidacion($n_instancia, $n_orden);
    $n_cuit = $datos_liquidacion['n_cuit'];
    $d_denominacion = $datos_liquidacion['d_denominacion'];
    $d_expediente = $datos_liquidacion['d_expediente'];
    $f_actualizacion = $datos_liquidacion['f_actualizac'];

//die(print_r($datos_liquidacion));
require_once 'carga_inspec_iibb/html/carga_inspecc_iibb_view.php';

}
?>
<style>
    .dropdown-menu{
        font-size: 11px !important;
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
    var error = '<?=$error?>';
    var v_n_instancia = '<?=$n_instancia?>';
    var v_n_orden ='<?=$n_orden?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var modo = '<?=$modo?>';
    var v_id_inspeccion = '<?=$_POST['p_id_inspeccion']?>'
    
    var isIE = (navigator.appName == "Microsoft Internet Explorer");
    var hasFocus = true;
    var active_element;


</script>

<script type="text/javascript" src="carga_inspec_iibb/js/funciones.js"></script>
<script type="text/javascript" src="carga_inspec_iibb/js/carga_inspec_iibb.js?no_cache=<?=date('dmy')?>"></script>

<?require_once INTRANET."footer.php"?>

