<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];
$p_tributo = $_POST['p_tributo'];
$p_modo = $_POST['p_modo'];
$p_objeto = $_POST['p_objeto'];
$p_digito_verif = $_POST['p_digito_verif'];

$db_query = new DB_query("SELECT N_SESION_COPROP.NEXTVAL N_SESION FROM DUAL");
$row = $db_query->do_query();
$n_sesion = $row[0]['N_SESION'];

$c_inmobiliario = $resultado_tributos[0]['C_INMOBILIARIO'];

$lista_inmuebles = fun_id_lista('LISTADO INMUEBLES INGRESO CO PROPIETARIOS');
$lista_automotor = fun_id_lista('LISTADO AUTOMOTOR INGRESO CO PROPIETARIOS');
$lista_nomenclatura = fun_id_lista('LISTADO NOMENCLATURA INGRESO CO PROPIETARIOS');
$lista_dom_anterior = fun_id_lista('LISTADO DOM ANTERIOR INGRESO CO PROPIETARIOS');

$lista_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_contribuyente_cuit = fun_id_lista('LISTADO DATOS CONTRIB SEGÚN CUIT INGRESO CO PROPIETARIOS');
$lista_contribuyente = fun_id_lista('LISTADO DATOS CONTRIB SEGÚN DENOM. INGRESO CO PROPIETARIOS');
$lista_tipo_respon = fun_id_lista('LISTADO RESPON. INGRESO CO PROPIETARIOS');

$query = "SELECT OBTENER_CONSTANTE('TRINMOBILIARIO') c_inmobiliario, OBTENER_CONSTANTE('TRAUTOMOTOR') c_automotor FROM DUAL";
$db_query ->setQuery($query);
$param = array();
$resultado_tributos = $db_query->do_query($param);

$c_inmobiliario = $resultado_tributos[0]['C_INMOBILIARIO'];
$c_automotor = $resultado_tributos[0]['C_AUTOMOTOR'];

include('ingreso_copropietarios/html/principal.html');
include('ingreso_copropietarios/html/modals.html');
?>
    <link rel="stylesheet" type="text/css" href="ingreso_copropietarios/css/estilos.css">
    <script type="text/javascript" src="ingreso_copropietarios/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_copropietarios/js/elementos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_copropietarios/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_copropietarios/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var p_modo = '<?=$p_modo?>';
        var p_objeto = '<?=$p_objeto?>';
        var p_digito_verif = '<?=$p_digito_verif?>';
        var p_tributo = '<?=$p_tributo?>';
        var p_n_sesion = '<?=$n_sesion?>';
        var v_c_inmobiliario = '<?=$c_inmobiliario?>';
        var v_c_automotor = '<?=$c_automotor?>';

        var v_lista_inmuebles = '<?=$lista_inmuebles?>';
        var v_lista_automotor = '<?=$lista_automotor?>';
        var v_lista_nomenclaturas = '<?=$lista_nomenclatura?>';
        var v_lista_dominio_anterior = '<?=$lista_dom_anterior?>';

        var v_lista_contribuyente_cuit = '<?=$lista_contribuyente_cuit?>';
        var v_lista_contribuyente = '<?=$lista_contribuyente?>';
        var v_lista_documentos = '<?=$lista_documentos?>';
        var v_lista_tipo_respon = '<?=$lista_tipo_respon?>';

        var datos_ingreso_coprop_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'<?=$m_autoquery?>',
            param: {':p_modo':p_modo,
                ':p_tributo':p_tributo,
                ':p_objeto':p_objeto}
        });

        var datos_tmp_coprop_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            m_autoquery:'N',
            param: {':p_n_sesion':p_n_sesion}
        });

        var v_cod = 6;
        var v_pro = 4;

        $(document).ready(function($){
            $('#c_tributo').val(p_tributo);
            $('#d_objeto_hecho').val(p_objeto);
            $('#d_verif_dom').val(p_digito_verif);
            init_grillas();
            init_eventos();
            init_elementos();
        });

    </script>


<?php
require_once(INTRANET."footer.php");
?>