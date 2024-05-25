$('#btn_buscar').click(function () {
    setea_parametros('#main_grid',{'p_tributo':$('#ctributo').val() });


});

$("#btn_limpiar").click(function(){
    $("#main_grid").jqGrid("clearGridData", true);
    $("#detalle_grid").jqGrid("clearGridData", true);
    $("#frm_consulta").trigger('reset');
});