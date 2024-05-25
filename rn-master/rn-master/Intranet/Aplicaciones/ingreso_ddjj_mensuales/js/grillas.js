function inicializarGrillas() {

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "DDJJ DETALLE:",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm.php",
        sortname: 'n_orden',
        shrinkToFit: true,
        autowidth: false,
        height: 180,
        onSelectRow: function (id) {
            id_ddjj = $('#main_grid').getCell(id, 'id_ddjj');
        },
        loadComplete: function () {

            var grid = $("#main_grid");
            var rows = grid.getRowData();
            var prefixes = {}; // Objeto para almacenar los prefijos encontrados

            // Recopila todos los prefijos únicos presentes en 'd_descrip'
            rows.forEach(function (row) {
                var prefix = row.d_descrip.split('-')[0]; // Asumiendo que el prefijo es antes del '-'
                if (!prefixes[prefix]) {
                    prefixes[prefix] = true; // Marca el prefijo como encontrado
                }
            });

            // Ahora, para cada prefijo, verifica si todos los datos que comienzan con ese prefijo tienen un valor en 'd_detalle'
            Object.keys(prefixes).forEach(function (prefix) {
                var haveDetails = true;

                rows.forEach(function (row) {
                    if (row.d_descrip.startsWith(prefix) && !row.d_detalle) {
                        haveDetails = false;
                        return false; // Termina la iteración interna
                    }
                });

                if (haveDetails && !isNaN(prefix)) {
                    prefixes_complete.push(prefix);
                } else if (!isNaN(prefix)) {
                }
            });

        }
    }).navGrid('#main_grid_pager',
        { add: false, edit: true, del: false }, //options
        {
            beforeSubmit: function (postData, formid) {
                var valido;
                if (postData.d_detalle) {
                    if (postData.d_descrip.includes('ARTICULO')) {
                        valido = /^-?\d+$/.test(postData.d_detalle);
                    }
                    else if (postData.d_descrip.includes('FECHA')) {
                        valido = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(postData.d_detalle);
                    }
                    else if (postData.d_descrip.includes('ALICUOTA')) {
                        valido = /^-?\d+$/.test(postData.d_detalle);
                    }
                    else {
                        valido = /^-?\d+$/.test(postData.d_detalle);
                    }
                } else {
                    valido = true;
                }

                return [valido, 'El valor ' + postData.d_detalle + ' ingresado en el renglón ' + postData.c_renglon + ' no es válido.'];
            }
        },//edit,
        {},//alta
        {},//del
        {}//search
    )


}