<?php
    require_once(INTRANET."header.php");

    $p_id_menu = $_POST['p_n_id_menu'];
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_n_instancia = $_POST['p_n_instancia'];
    $p_n_orden = $_POST['p_n_orden'];
    $p_n_expediente = $_POST['p_n_expediente'];
    $p_n_anio_expediente = $_POST['p_n_anio_expediente'];
    $p_id_grupo = $_POST['p_id_grupo'];
    $p_n_seleccion = $_POST['p_n_seleccion'];
    $p_c_tributo = $_POST['p_c_tributo'];
    $p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
    $p_id_obligacion_bd = $_POST['p_id_obligacion_bd'];
    $p_id_obligacion = $_POST['p_id_obligacion'];

    $lista_tipos_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
    $lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS');
    $lista_objetos = fun_id_lista('LISTADO DE OBJETOS CON INSTANCIA');
    $lista_obligaciones = fun_id_lista('LISTADO DE OBLIGACIONES CON INSTANCIA');
    $lista_tipos_instancia = fun_id_lista('LISTADO DE TIPOS DE INSTANCIA');
    
    if (isset($p_id_contribuyente)){
        $db_query = new DB_query(
            "SELECT fun_formato_cuit(n_cuit) as n_cuit, d_denominacion, c.c_tipo_documento,
                (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, fun_formato_numerico(c.n_documento,0) n_documento
            FROM contribuyentes c
            WHERE id_contribuyente = :p_id_contribuyente");
        $par = array(':p_id_contribuyente' => $p_id_contribuyente);
        $row = $db_query->do_query($par);

        $p_n_cuit = $row[0]['N_CUIT'];
        $p_d_denominacion = $row[0]['D_DENOMINACION'];
        $p_c_tipo_documento = $row[0]['C_TIPO_DOCUMENTO'];
        $p_d_tipo_documento = $row[0]['D_TIPO_DOCUMENTO'];
        $p_n_documento = $row[0]['N_DOCUMENTO'];
    }

    include('consulta_instancias/html/principal.html');
    include('consulta_instancias/html/modals.html');
?>

<script type="text/javascript" src="consulta_instancias/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_instancias/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_instancias/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
    var id_menu = '<?=$p_id_menu?>';
    var id_contribuyente = '<?=$p_id_contribuyente?>';
    var p_n_instancia = '<?=$p_n_instancia?>';
    var p_n_orden = '<?=$p_n_orden?>';
    var p_n_expediente = '<?=$p_n_expediente?>';
    var p_n_anio_expediente = '<?=$p_n_anio_expediente?>';
    // var p_id_grupo = '<?=$p_id_grupo?>';
    // var p_n_seleccion = '<?=$p_n_seleccion?>';
    var p_c_tributo = '<?=$p_c_tributo?>';
    var p_d_objeto_hecho = '<?=$p_d_objeto_hecho?>';
    var p_id_obligacion_bd = '<?=$p_id_obligacion_bd?>';
    var p_id_obligacion = '<?=$p_id_obligacion?>';
    var ajax_autocomplete = null;

    var lista_tipos_documentos = '<?=$lista_tipos_documentos?>';
    var lista_tributos = '<?=$lista_tributos?>';
    var lista_objetos = '<?=$lista_objetos?>';
    var lista_obligaciones = '<?=$lista_obligaciones?>';
    var lista_tipos_instancia = '<?=$lista_tipos_instancia?>';

    var consulta_inst_grid = new GridParam({
        id_menu: id_menu,
        n_grid:0,
        m_autoquery: 'S',
        param:{
            ':id_contribuyente': id_contribuyente,
            ':c_tributo': p_c_tributo,
            ':d_objeto_hecho': p_d_objeto_hecho,
            ':n_control': null,
            ':n_anio_expediente': p_n_anio_expediente,
            ':n_expediente': p_n_expediente,
            ':n_instancia': p_n_instancia,
            ':n_orden': p_n_orden,
            ':c_tipo_instancia': null,
            ':id_obligacion_bd': null,
            ':id_obligacion': null
        }
    });

    var instancia_det_grid;

    var instancia_det_sellos_grid;

    $(document).ready(function(){
        init_grillas();
        init_eventos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>