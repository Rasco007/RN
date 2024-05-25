function ver_img(id_imagen, modo) {
    $("#main").procOverlay({ visible: true });

    $.post(
        "abm_imagen_em/php/traer_imagen.php",
        { id_imagen: id_imagen, modo: modo },
        function (data) {
            $("#main").procOverlay({ visible: false });
            if (data != null) {
                if (data.resultado == "OK") {
                    $("#contenedor_imagen_ampliada #img_contenedor").remove();
                    var time = new Date().getTime();
                    $("#contenedor_imagen_ampliada").html(
                        '<img id="img_contenedor" ' +
                            'style=" max-width: 500px;' +
                            "max-height: 500px; " +
                            "margin-left:auto;" +
                            "margin-right:auto;" +
                            "display: block;" +
                            '" src="' +
                            BASEPATH_ENTORNO +
                            "archivos_tmp/" +
                            data.nombre_archivo +
                            "?v=" +
                            time +
                            '">'
                    );
                    $("#ver_img").modal("show");
                } else {
                    $("#contenedor_imagen_ampliada #img_contenedor").remove();
                }
            }
        },
        "json"
    );
}

function carga_imagen(id_imagen, modo) {
    $("#cargar_img").data("id_imagen", id_imagen);
    $("#cargar_img").data("modo", modo);
    $("#cargar_img").modal("show");
    $('#upload-file-info').val('');
}

function fun_guarda_archivo(oper, archivo, id_imagen, modo) {
    $("#main").procOverlay({ visible: true });
    $.ajaxFileUpload({
        url:
            "abm_imagen_em/php/blob_abm.php?id_imagen=" + id_imagen + "&modo=" + modo,
        secureuri: false,
        fileElementId: "archivo",
        dataType: "json",
        success: function (data, status) {
            $("#main").procOverlay({ visible: false });
            data = eval("(" + data + ")");
            if (data.resultado != "OK") {
                mostrar_error(data.resultado);
            } else {
                mostrar_cuadro("I", "Información", "Carga de imagen exitosa");
            }

            $("#cargar_img").modal("hide");
            $("#imagenes_grid").jqGrid("clearGridData", true);
            $("#imagenes_grid").trigger("reloadGrid");
        },

        error: function (data, status, e) {
            $("#main").procOverlay({ visible: false });
            mostrar_cuadro(
                "E",
                "Error",
                '<p style="margin:0;" align="left">Error al subir el archivo<br /><b>Status:</b> ' +
                    status +
                    "<br /><b>Error:</b> " +
                    e +
                    "</p>"
            );

            $("#cargar_img").modal("hide");
            $("#imagenes_grid").jqGrid("clearGridData", true);
            $("#imagenes_grid").trigger("reloadGrid");
        },
    });
}

function cambiar_img(id_imagen, modo) {
    $("#cargar_img").data("id_imagen", id_imagen);
    $("#cargar_img").data("modo", modo);
    $("#cargar_img").modal("show");
    $('#upload-file-info').val('');
}

function formulario_abm(){
    $("#d_tributo_lupa").lupa_generica({
        id_lista: lista_tributos,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_codigo", width: 100 },
            { index: "d_descrip", width: 350 },
        ],
        caption: "Tributos",
        sortname: "c_codigo",
        sortorder: "asc",
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_codigo',
        campos: { c_codigo: "c_tributo", d_descrip: "d_tributo" },
        keyNav: true,
        onClose: function () {
            $('#c_concepto').val('');
            $('#d_concepto').val('');
        }
    });

    $("#d_concepto_lupa").lupa_generica({
        id_lista: lista_conceptos,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_concepto", width: 100 },
            { index: "d_concepto", width: 350 },
        ],
        caption: "Conceptos",
        sortname: "c_concepto",
        sortorder: "asc",
        searchInput: '#c_concepto',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_concepto',
        filtros: ["#c_tributo"],
        filtrosNulos: [false],
        mensajeRelacionado: ['Debe ingresar el tributo primero'],
        campos: { c_concepto: "c_concepto", d_concepto: "d_concepto" },
        keyNav: true,
    });

    $("#d_distribucion_lupa").lupa_generica({
        id_lista: lista_tablas_generales,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_codigo", width: 100 },
            { index: "d_descrip", width: 350 },
        ],
        caption: "Distribuciones",
        sortname: "d_descrip",
        sortorder: "asc",
        searchInput: '#c_distribucion',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_codigo',
        filtros: ["225"],
        campos: { c_codigo: "c_distribucion", d_descrip: "d_distribucion" },
        keyNav: true,
    });

    $("#d_criterio_lupa").lupa_generica({
        id_lista: lista_tablas_generales,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_codigo", width: 100 },
            { index: "d_descrip", width: 350 },
        ],
        caption: "Criterios",
        sortname: "d_descrip",
        sortorder: "asc",
        searchInput: '#c_criterio',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_codigo',
        filtros: ["136"],
        campos: { c_codigo: "c_criterio", d_descrip: "d_criterio" },
        keyNav: true,
    });

    $("#d_provincia_lupa").lupa_generica({
        id_lista: lista_provincias,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_codigo", width: 100 },
            { index: "d_descrip", width: 350 },
        ],
        caption: "Provincias",
        sortname: "d_descrip",
        sortorder: "asc",
        searchInput: '#c_provincia',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_codigo',
        campos: { c_codigo: "c_provincia", d_descrip: "d_provincia" },
        keyNav: true,
    });

    $("#d_departamento_lupa").lupa_generica({
        id_lista: lista_departamentos,
        titulos: ["", "Código", "Descripción"],
        grid: [
            { index: "c_provincia", hidden: true },
            { index: "c_departamento", width: 100 },
            { index: "d_descrip", width: 350 },
        ],
        caption: "Departamentos",
        sortname: "d_descrip",
        sortorder: "asc",
        searchInput: '#c_departamento',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_departamento',
        filtros: ["#c_provincia"],
        filtrosNulos: [false],
        mensajeRelacionado: ['Debe ingresar la provincia primero'],
        campos: { c_departamento: "c_departamento", d_descrip: "d_departamento" },
        keyNav: true,
    });
    
    $("#d_localidad_lupa").lupa_generica({
        id_lista: lista_localidades,
        titulos: ["", "", "Código", "Descripción", ""],
        grid: [
            { index: 'c_provincia', hidden: true },
            { index: 'c_departamento', hidden: true },
            { index: 'c_localidad', width: 100 },
            { index: 'd_descrip', width: 350 },
            { index: 'c_postal', hidden: true },
        ],
        caption: "Localidades",
        sortname: "d_descrip",
        sortorder: "asc",
        searchInput: '#c_localidad',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_localidad',
        filtros: ["#c_provincia", "#c_departamento"],
        filtrosNulos: [false, false],
        mensajeRelacionado: ['Debe ingresar la provincia primero', 'Debe ingresar el departamento primero'],
        campos: { c_localidad: "c_localidad", d_descrip: "d_localidad" },
        keyNav: true,
    });

    $("#d_consorcio_lupa").lupa_generica({
        id_lista: lista_consorcios,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: 'c_organismo', width: 100 },
            { index: 'd_dato', width: 350 },
        ],
        caption: "Consorcios",
        sortname: "d_dato",
        sortorder: "asc",
        searchInput: '#c_consorcio',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_organismo',
        filtros: [""],
        filtrosNulos: [true],
        campos: { c_organismo: "c_consorcio", d_dato: "d_consorcio" },
        keyNav: true,
    });
    
    $("#d_region_lupa").lupa_generica({
        id_lista: lista_regiones,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: 'c_region', width: 100 },
            { index: 'd_dato', width: 350 },
        ],
        caption: "Regiones",
        sortname: "d_dato",
        sortorder: "asc",
        searchInput: '#c_region',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_region',
        filtros: ["#c_consorcio"],
        filtrosNulos: [false],
        mensajeRelacionado: ['Debe ingresar el consorcio primero'],
        campos: { c_region: "c_region", d_dato: "d_region" },
        keyNav: true,
    });
    
    $("#d_area_lupa").lupa_generica({
        id_lista: lista_areas,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: 'c_area', width: 100 },
            { index: 'd_dato', width: 350 },
        ],
        caption: "Areas",
        sortname: "d_dato",
        sortorder: "asc",
        searchInput: '#c_area',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_area',
        filtros: ["#c_consorcio", "#c_region"],
        filtrosNulos: [false, false],
        mensajeRelacionado: ['Debe ingresar el consorcio primero', 'Debe ingresar la región primero'],
        campos: { c_area: "c_area", d_dato: "d_area" },
        keyNav: true,
    });

    $('#c_distribucion').val('1');
    $('#c_distribucion').blur();
    $('#c_provincia').val('R');
    $('#c_provincia').blur();
    $('#c_departamento').val('999');
    $('#c_departamento').blur();
    $('#c_localidad').val('999');
    $('#c_localidad').blur();

    $("#d_posfis_desde").change(function () {
        $("#n_posfis_desde").val($("#d_posfis_desde").val().replace(/\//g, ''));
    });
    $("#d_posfis_hasta").change(function () {
        $("#n_posfis_hasta").val($("#d_posfis_hasta").val().replace(/\//g, ''));
    });
}