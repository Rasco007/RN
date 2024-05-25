<?php
require_once(INTRANET."header.php");

$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];
$m_solo_honorarios = $_POST['m_solo_honorarios'];

$lista_tipos_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_tipos_imponibles = fun_id_lista('TIPOS IMPONIBLES AJUSTES ADM');
$lista_objetos = fun_id_lista('OBJETOS NOTA DE CREDITO');
$lista_tributos = fun_id_lista('TRIBUTOS AJUSTES ADM');
$lista_conceptos = fun_id_lista('CONCEPTOS AJUSTES ADM');
$lista_tipos_mov_cc = fun_id_lista('TIPOS MOV CC AJUSTES ADM');
$lista_motivos_ajuste = fun_id_lista('MOTIVOS AJUSTES ADM');
$lista_conceptos_ajuste = fun_id_lista('CONCEPTOS DE MOV DE AJUSTE ADM');
$lista_monedas = fun_id_lista('LISTADO TIPOS MONEDA');

$fecha_hoy = date('d/m/Y');
include('ajustes_admin/html/principal.html');
include('ajustes_admin/html/modal.html');
?>
<style>
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
<script type='text/javascript' src='ajustes_admin/js/grillas.js'></script>
<script type='text/javascript' src='ajustes_admin/js/eventos.js'></script>
<script type='text/javascript' src='ajustes_admin/js/funciones.js'></script>

<script>
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_m_solo_honorarios = '<?=$m_solo_honorarios?>';
    var v_lista_tipos_documentos = '<?=$lista_tipos_documentos?>';
    var v_lista_tipos_imponibles = '<?=$lista_tipos_imponibles?>';
    var v_lista_objetos = '<?=$lista_objetos?>';
    var v_lista_tributos = '<?=$lista_tributos?>';
    var v_lista_conceptos = '<?=$lista_conceptos?>';
    var v_lista_tipos_mov_cc = '<?=$lista_tipos_mov_cc?>';
    var v_lista_motivos_ajuste = '<?=$lista_motivos_ajuste?>';
    var v_lista_conceptos_ajuste = '<?=$lista_conceptos_ajuste?>';
    var v_lista_monedas = '<?=$lista_monedas?>';
    var ajax_autocomplete = null;
    var v_tipo_ajuste;
    var fecha_hoy = '<?=$fecha_hoy?>';
    // var v_id_sesion;

    var datos_main_grid = new GridParam({
        id_menu: 10860,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{':id_contribuyente':null,
            ':c_tipo_imponible':null,
            ':c_tributo':null,
            ':c_concepto':null,
            ':d_objeto_hecho':null,
            ':n_pos_fiscal':null,
            ':n_cuota':null
        }
    });

    var datos_cta_cte_grid = new GridParam({
        id_menu: 10860,
        n_grid:1,
        m_autoquery:v_m_autoquery,
        param:{':c_tributo':null,
            ':id_obligacion':null
        }
    });

    $(document).ready(function() {

        inicializarEventos();
        inicializarLupas();
        inicializarGrillas();

    });
</script>

<?php
require_once(INTRANET."footer.php");
?>