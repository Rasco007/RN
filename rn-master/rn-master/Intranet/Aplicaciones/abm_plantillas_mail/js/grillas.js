function init_grillas() {
    $("#plantillas_grid")
        .jqGrid({
            colNames: plantillas_grid.colNames(),
            colModel: plantillas_grid.colModel(),
            postData: plantillas_grid.postData(),
            caption: "Plantillas de Mail",
            pager: $("#plantillas_grid_pager"),
            editurl: FUNCIONES_BASEPATH + "maestro_abm.php",
            height: 300,
            autowidth: false,
            sortname: "",
            loadComplete: function () {
                $("#plantillas_grid").setSelection(1);
            },
            onSelectRow: function (id) {
                v_id_plantilla = $("#plantillas_grid").getCell(
                    id,
                    "id_plantilla_mail"
                );
                setea_parametros("#secciones_grid", {
                    ":p_id_plantilla_mail": v_id_plantilla,
                });
            },
        })
        .navGrid(
            "#plantillas_grid_pager",
            {
                add: true,
                edit: true,
                del: true,
            },
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    $("#tr_id_plantilla_mail").hide();
                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {}),
                closeAfterEdit: true,
            }, //edit
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    $("#tr_id_plantilla_mail").hide();
                    $("#f_creacion").datepicker("setDate", new Date());
                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {}),
                closeAfterAdd: true,
            }, //add
            {} //del
        )
        .navButtonAdd("#plantillas_grid_pager", {
            caption: "Enviar Mail de Prueba",
            buttonicon: "ui-icon-mail-closed",
            onClickButton: function () {
                $('#mail_prueba_modal').modal('show');
                $('#d_plantilla_prueba').val(
                    $("#plantillas_grid").getCell(
                        $("#plantillas_grid").getGridParam('selrow'),
                        "d_plantilla"
                    )
                );
                $('#d_destinatarios').val('');
            },
            position: "right",
            title: "Enviar Mail de Prueba",
            cursor: "pointer",
            id: "btn_enviar_mail_prueba",
        })
        .navButtonAdd("#plantillas_grid_pager", {
            caption: "Aprobar",
            onClickButton: function () {
                if(v_id_plantilla == null){
                    mostrar_cuadro('E', 'Error', 'Debe seleccionar una plantilla para aprobarla');
                    return;
                }
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_id_plantilla_mail":v_id_plantilla,
                     "p_m_aprueba":'S',
                     "id_menu":v_id_menu,
                     "n_orden":1
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $("#plantillas_grid").trigger("reloadGrid");
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
            },
            position: "right",
            title: "Aprobar",
            cursor: "pointer",
            id: "btn_aprobar_plantilla",
        })
        .navButtonAdd("#plantillas_grid_pager", {
            caption: "Desaprobar",
            onClickButton: function () {
                if(v_id_plantilla == null){
                    mostrar_cuadro('E', 'Error', 'Debe seleccionar una plantilla para aprobarla');
                    return;
                }
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_id_plantilla_mail":v_id_plantilla,
                     "p_m_aprueba":'N',
                     "id_menu":v_id_menu,
                     "n_orden":1
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $("#plantillas_grid").trigger("reloadGrid");
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            },
            position: "right",
            title: "Desaprobar",
            cursor: "pointer",
            id: "btn_desaprobar_plantilla",
        });

    $("#secciones_grid")
        .jqGrid({
            colNames: secciones_grid.colNames(),
            colModel: secciones_grid.colModel(),
            postData: secciones_grid.postData(),
            caption: "Secciones del Mail",
            pager: $("#secciones_grid_pager"),
            editurl: FUNCIONES_BASEPATH + "maestro_abm.php",
            height: 300,
            autowidth: false,
            sortname: "",
            loadComplete: function () {
                desactivarDragDropColumnas('secciones_grid');
            },
            onSelectRow: function (id) {},
        })
        .navGrid(
            "#secciones_grid_pager",
            {
                add: true,
                edit: true,
                del: true,
            },
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    $("#tr_id_plantilla_mail").hide();
                    $("#tr_n_orden_det").hide();
                    $("#d_tipo_seccion_lupa").lupa_generica({
                        id_lista: lista_tablas_generales,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Tipos Secciones",
                        sortname: "d_descrip",
                        sortorder: "asc",
                        searchInput: '#c_tipo_seccion',
                        searchCode: true,
                        limpiarCod: true,
                        exactField: 'c_codigo',
                        filtros: ["135"],
                        campos: { c_codigo: "c_tipo_seccion", d_descrip: "d_tipo_seccion" },
                        keyNav: true,
                    });
                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {}),
                closeAfterEdit: true,
            }, //edit
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    $("#tr_id_plantilla_mail").hide();
                    $("#id_plantilla_mail").val(v_id_plantilla);
                    $("#tr_n_orden_det").hide();
                    $("#d_tipo_seccion_lupa").lupa_generica({
                        id_lista: lista_tablas_generales,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Tipos Secciones",
                        sortname: "d_descrip",
                        sortorder: "asc",
                        searchInput: '#c_tipo_seccion',
                        searchCode: true,
                        limpiarCod: true,
                        exactField: 'c_codigo',
                        filtros: ["135"],
                        campos: { c_codigo: "c_tipo_seccion", d_descrip: "d_tipo_seccion" },
                        keyNav: true,
                    });
                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {}),
                closeAfterAdd: true,
            }, //add
            {} //del
        ).navButtonAdd('#secciones_grid_pager',{caption:"Activar Orden&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-arrow-2-n-s",
            onClickButton:function() {

                activarDragDropColumnas('secciones_grid');

            },position:"right", title:"Activar Orden Draggable", cursor:"pointer", id:'bt_activar_orden_secciones_grid'}
        ).navButtonAdd('#secciones_grid_pager',{caption:"Aplicar/Corregir&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-disk",
            onClickButton:function() {
                guardarOrdenCampos('secciones_grid');
            },position:"right", title:"Aplicar cambios y/o corregir orden.", cursor:"pointer", id:'bt_aplicar_cambios_orden_secciones_grid'}
        );

        $('#bt_aplicar_cambios_orden_secciones_grid').hide();
}
