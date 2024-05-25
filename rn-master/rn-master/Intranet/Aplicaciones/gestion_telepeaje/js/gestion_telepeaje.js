var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    n_orden:0,
    m_autoquery:v_m_autoquery,
    param:{':d_objeto':null}
});

$(document).ready(function() {

    $("#btn_buscar").click(function(){
        deshabilita_campos(true);
        setea_parametros('#main_grid',{
            ':d_objeto': $("#d_objeto").val()
        });
    });

    $("#btn_limpiar").click(function(){
        setea_parametros('#main_grid',{
            ':d_objeto': null
        });
        $("#frm_consulta").trigger('reset');
        deshabilita_campos(false);
    });

    $("#btn_modificar").click(function(){
        if(valida_seleccion_grilla("#main_grid")){
            $("#frm_modificacion_datos input").val('');
            $("#modificacion_datos").modal('show');
        }
    });

    $("#btn_confirmar_modificacion").click(function(){
        if($("#frm_modificacion_datos").validationEngine('validate')){
            var id_contrib_new = $("#id_contribuyente","#frm_modificacion_datos").val();
            if(id_contrib_new != ''){
                var id_grid = $("#main_grid").getGridParam('selrow');
                var d_objeto = $("#main_grid").getCell(id_grid,'d_objeto_hecho');
                mostrar_cuadro('C', 'Confirmacion', '¿Desea confirmar los datos ingresados?.', function(){prc_modif_id_contrib(d_objeto,id_contrib_new)},function(){});
            }else{
                mostrar_validacion('Debe ingresar un contribuyente que exista en el sistema.');
            }
        }
    });

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Dominio",
        postData: datos_main_grid.postData(),
    	editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    autocompleteDominio("#frm_consulta");
    autocompletecuitdenominacion("#frm_modificacion_datos");
});