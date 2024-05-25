function init_grillas() {

    $("#datos_mov_banc_grid").jqGrid({
        colNames: datos_mov_banc_grid.colNames(),
        colModel: datos_mov_banc_grid.colModel(),
        pager: $('#datos_mov_banc_grid_pager'),
        postData: datos_mov_banc_grid.postData(),
        caption: "Cabecera de Archivo de Movimientos Bancarios",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:300,
        sortname: 'f_acreditacion',
        sortorder: 'asc',
        rowattr: function(row){
            if (row.f_concil_dgr == null && row.fecha_acre_dgr.value == null){
                if (to_date(fecha_hoy) - to_date(row.f_acreditacion) > 5){
                    return {'class': 'rojo'};
                }
            } 
        },
        ondblClickRow:function(rowid){ 
            llamar_form($("#datos_mov_banc_grid").getCell(rowid,'id_archivo'));
        },
    }).navGrid('#datos_mov_banc_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#datos_mov_banc_grid_pager',
    {
        title:"Editar",
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        cursor:"pointer",
        onClickButton:function() {
            if(!$("#datos_mov_banc_grid").getGridParam('selrow')){
                mostrar_error('Debe seleccionar una fila de la Tabla.');
                return false;
            }else{
                var id = $("#datos_mov_banc_grid").getGridParam('selrow');
                if($("#datos_mov_banc_grid").getCell(id,'f_concil_dgr')){
                    $('#id_archivo').val($("#datos_mov_banc_grid").getCell(id,'id_archivo'));
                    $('#f_acred_modal').val($("#datos_mov_banc_grid").getCell(id,'f_acreditacion'));
                    $('#f_ing_acred_dgr').val("");
                    $('#abm_modal').modal("show");
                }else{
                    mostrar_error('Debe seleccionar una fila con Fecha de Conciliación.');
                    return false;
                }
            }
        }
    });
    
}

