function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Detalle Operativo" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        loadComplete: function (data) {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);

            filtros_no_nativos_ar['main_grid'] = [];
            filtros_no_nativos_ar['main_grid'].push('Nro. Operativo: ' + p_id_operativo);

            if(data.records > 0){
                $('#btn_eliminar_masivo').attr('hidden', false);
            } else {
                $('#btn_eliminar_masivo').attr('hidden', true);
            }
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_eliminar_detalle',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-trash",
        title: "Eliminar Detalle Operativo",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla');
            }else {
                mostrar_cuadro('C',
                    'Eliminar Operativo',
                    'No sera posible revertir esta acción.',
                    function () {
                        eliminarDetalle(p_id_operativo, $("#main_grid").getCell(rowid,'n_orden'));
                    });
            }
        }}
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_agregar_detalle',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-plus",
        title: "Incorporar Detalle Operativo",
        cursor: "pointer",
        onClickButton: function () {
            if(p_id_plantilla == 3){
                mostrar_cuadro('E', 'Error', 'La plantilla de Diferencia de Bases Imponibles requiere la información discriminada por posición fiscal.\n' +
                    'Por favor importe el archivo con el formato correspondiente.');
            } else {
                $('#modal_add_detalle').modal('show');
            }
        }}
    ).navButtonAdd("#main_grid_pager", {
        caption: "Eliminar Masivo",
        id: 'btn_eliminar_masivo',
        buttonicon: "glyphicon",
        title: "Eliminar Masivo",
        cursor: "pointer",
        onClickButton: function () {
            mostrar_cuadro('C',
                'Eliminar Detalle Masivo',
                'No sera posible revertir esta acción.',
                function () {
                eliminarMasivo(p_id_operativo);
            });
        },
    });
}