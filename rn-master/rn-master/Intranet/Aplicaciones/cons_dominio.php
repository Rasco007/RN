<?php
require_once(INTRANET."header.php");

// PHP para: Alta y Modificación de Dominio, Cambio de Uso o Transformación y Consulta de Dominio

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_modo = $_POST['p_modo'];
$p_objeto = $_POST['p_objeto'];
$p_patente_vieja = $_POST['p_patente_vieja'];

$lista_patentes = fun_id_lista('LISTA PATENTES CONS DOMINIO');
$lista_motivos_alta = fun_id_lista('LISTA MOTIVOS ALTA POR TRIBUTO');
$lista_marcas = fun_id_lista('LISTA MARCAS AUTOMOTOR');
$lista_modelos = fun_id_lista('LISTA MODELOS AUTOMOTOR');
$lista_descripciones = fun_id_lista('LISTADO DESCRIPCIONES AUTOMOTOR');
$lista_grupos = fun_id_lista('LISTA GRUPOS AUTOMOTOR');
$lista_tipos = fun_id_lista('LISTA TIPOS AUTOMOTOR');
$lista_modelos_mtm = fun_id_lista('LISTA MODELOS AUTOMOTOR MTM');
$lista_combustibles = fun_id_lista('LISTA COMBUSTIBLES');
$lista_rnpa = fun_id_lista('LISTA RNPA SIN NO USAR');
$lista_delegaciones = fun_id_lista('LISTA DELEGACIONES CONS DOMINIO');
$lista_contibuyentes = fun_id_lista('LISTA CONTRIBUYENTES ACTIVOS POR DENOM');
$lista_tipos_doc = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_domicilios = fun_id_lista('TIPOS DOMICILIOS Y DOMICILIO X CONTRIB');

$v_anio = date('Y');
$fecha_hoy = date('d/m/Y');

if ($p_modo == 'C' && isset($p_patente_vieja)){
    $query = "SELECT fun_calcula_digito_verificador(:p_patente_vieja) digito_ant from dual";
    $db_query ->setQuery($query);
    $param = array(':p_patente_vieja' => $p_patente_vieja);
    $row_query = $db_query->do_query($param);
    $digito_ant = $row_query[0]['DIGITO_ANT'];
}

#HTML PRINCIPAL
include('cons_dominio/html/principal.html');
include('cons_dominio/html/modals.html');
?>

<style>
    #d_estado {
        color: cyan;
        font-weight: bold;
        letter-spacing: 1px;
        font-style: italic;
    }
    fieldset{
        margin: 5px 15px; border: 1px solid #156690;
    }
    legend{
        font-size: 15px; width: auto; padding-left: 2px; padding-right: 2px; border-bottom: none;
    }
    #div_datos_gh{
        border: 1px solid #156690; margin:  0px;
    }
    #div_datos_gh > legend{
        font-size: 12px; width: auto; padding-left: 2px; padding-right: 2px; border-bottom: none;
        margin-bottom: 0px !important; font-weight: 700;
    }
    .radios{
        margin-left: 25px !important;
    }
    .radiolabel{
        margin-right: 25px !important;
    }
    .btn_modal {
        margin-bottom: 10px !important; margin-left: 5px; margin-right: 5px;
    }
    #f_hasta_gh{
        margin-bottom: 5px; width: 20% !important;
    }
	/* Estilos dropdown */
    .dropdown-menu{
        max-width: 1px;
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
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var p_modo = '<?=$p_modo?>';
    var v_lista_patentes = '<?=$lista_patentes?>';
    var v_lista_motivos_alta = '<?=$lista_motivos_alta?>';
    var v_lista_marcas = '<?=$lista_marcas?>';
    var v_lista_modelos = '<?=$lista_modelos?>';
    var v_lista_descripciones = '<?=$lista_descripciones?>';
    var v_lista_grupos = '<?=$lista_grupos?>';
    var v_lista_nomenclaturas = '<?=$lista_nomenclaturas?>';
    var v_lista_tipos = '<?=$lista_tipos?>';
    var v_lista_modelos_mtm = '<?=$lista_modelos_mtm?>';
    var v_lista_combustibles = '<?=$lista_combustibles?>';
    var v_lista_rnpa = '<?=$lista_rnpa?>';
    var v_lista_delegaciones = '<?=$lista_delegaciones?>';
    var v_lista_contibuyentes = '<?=$lista_contibuyentes?>';
    var v_lista_tipos_doc = '<?=$lista_tipos_doc?>';
    var v_lista_domicilios = '<?=$lista_domicilios?>';

    var v_m_dpa = '<?=$m_dpa?>';
    var auth_hist = '<?=$m_abm_historico?>';
    var v_anio = '<?=$v_anio?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var ajax_autocomplete = null;
    var v_existe;

    var tmp_impuesto_anual_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery: 'S',
        param:{':id_impuesto_anual': null}
    });

    var contribuyentes_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery: 'S',
        param:{':p_d_patente': null,
            ':p_modo': p_modo}
    });

</script>

<script type='text/javascript' src='cons_dominio/js/eventos.js'></script>
<script type='text/javascript' src='cons_dominio/js/funciones.js'></script>
<script type='text/javascript' src='cons_dominio/js/lupas.js'></script>

<?php
require_once(INTRANET."footer.php");
?>