function resetearFiltros(){
    $('#frm_consulta :input').val(null);
    $('#frm_consulta :input').prop('readonly', false);
    $('#btn_buscar').prop('disabled', false);
    $('#d_historicos_grid').jqGrid('clearGridData');
    $('#contenedor_grilla').hide();
}