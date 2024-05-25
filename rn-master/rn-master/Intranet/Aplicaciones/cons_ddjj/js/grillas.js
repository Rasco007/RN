
function inicializarGrillas(){




    $("#informes_grid").jqGrid({
        colNames: datos_informes_grid.colNames(),
        colModel: datos_informes_grid.colModel(),
        pager: $('#informes_grid_pager'),
        caption: "Declaración Jurada",
        postData: datos_informes_grid.postData(),
        autowidth: false,
        width: 900,
        multiSort:true,
        sortname:'n_posicion_fiscal',
        sortorder:'desc, n_cuota_anticipo desc',
        onSelectRow: function(rowid) {
            // ondblClickRow:function(rowid){

            var pid_ddjj = $('#informes_grid').getCell(rowid, 'id_ddjj');
            var pc_formulario = $('#informes_grid').getCell(rowid, 'c_tipo_form');
            var pid_obligacion = $('#informes_grid').getCell(rowid, 'id_obligacion');

            apagar_grillas();


            if (parseInt($('#c_tributo').val()) <= 20) {
                console.log(pc_formulario);

                if (pc_formulario == 'IBS007') {
                    apagar_grillas();
                    setea_parametros('#grilla24_grid', {':pid_ddjj': pid_ddjj});
                    $("#div_grilla24").show();
                }else {
                    $.ajax({
                        type: 'POST',
                        url: 'cons_ddjj/php/validaciones.php',
                        data: {
                            p_oper: 'FORMULARIO',
                            c_tipo_form: pc_formulario
                        },
                        dataType: 'JSON',
                        success: function (ret) {
                            $('#main').procOverlay({visible: false});
                            if (ret) {

                                if (parse(ret.TOTAL) == 0) {
                                    mostrar_validacion('El formulario seleccionado esta en desarrollo!! ');
                                } else {
                                    $("#div_3142").hide();
                                    $("#div_det").show();
                                    setea_parametros('#ingresosBrutos_grid', {
                                        ':pid_ddjj': pid_ddjj,
                                        ':pc_formulario': pc_formulario
                                    });
                                }
                            }
                        }
                    });
                }
            } else if (parseInt($('#c_tributo').val()) == 31 || parseInt($('#c_tributo').val()) == 42) {

                $("#div_3142").show();
                $("#div_det").hide();
                setea_parametros('#3142_grid', {':pid_ddjj': pid_ddjj});
            } else if (pc_formulario == 'SIRCAR_AR' || pc_formulario == 'SIAFIP_AR' || pc_formulario == 'IB16') {
                apagar_grillas();
                setea_parametros('#grilla11_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla11").show();

            } else if (pc_formulario == 'AR07') {
                apagar_grillas();
                setea_parametros('#grilla12_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla12").show();
            } else if (pc_formulario == 'AGS026') {
                apagar_grillas();
                setea_parametros('#grilla14_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla14").show();
            } else if (pc_formulario == 'AGS027') {
                apagar_grillas();
                setea_parametros('#grilla15_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla15").show();
            } else if (pc_formulario == 'AGS029') {
                apagar_grillas();
                setea_parametros('#grilla16_grid', {':pid_ddjj': pid_ddjj});
                console.log('grilla16');
                $("#div_grilla16").show();
            } else if (pc_formulario == 'AGS025') {
                apagar_grillas();

                setea_parametros('#grilla17_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla17").show();

                setea_parametros('#grilla18_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla18").show();

                setea_parametros('#grilla19_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla19").show();

            }else if (pc_formulario == 'AGS028') {
                apagar_grillas();
                setea_parametros('#grilla20_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla20").show();
            }
            else if (pc_formulario == 'SIRTAC_AR') {
                apagar_grillas();
                setea_parametros('#grilla21_grid', {':pid_ddjj': pid_ddjj});
                $("#div_grilla21").show();
            }else if (pc_formulario == 'SIRCAR_AP'    ||
                      pc_formulario == 'SIAFIP_AP'    ||
                      pc_formulario == 'AP02'         ||
                      pc_formulario == 'SIRPEI' ) {
                        apagar_grillas();
                        setea_parametros('#grilla22_grid', {':pid_ddjj': pid_ddjj});
                        $("#div_grilla22").show();
            }
            else{
                mostrar_validacion('El formulario seleccionado esta en desarrollo ');
            }
        }
}).navGrid('#informes_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#informes_grid_pager',{
        id:'btn_ret',
        buttonicon: "",
        caption:"Ret",
        title:"Ret",
        cursor:"pointer",
        onClickButton: function () {

            let id = $('#informes_grid').getGridParam('selrow');

            var pid_ddjj        = $('#informes_grid').getCell(id,'id_ddjj');

            if ($('#c_tributo').val() == 10) {

                apagar_grillas();
                $("#div_ret").show();


                setea_parametros('#retenciones_grid', {':pid_ddjj': pid_ddjj});
            } else{
                apagar_grillas();
                $("#div_ret20").show();

                setea_parametros('#retenciones20_grid', {':pid_ddjj': pid_ddjj});
            }

        }
    }).navButtonAdd('#informes_grid_pager',{
        id:'btn_per',
        buttonicon: "",
        caption:"Per.",
        title:"Per.",
        cursor:"pointer",
        onClickButton: function () {

            let id       = $('#informes_grid').getGridParam('selrow');
            var pid_ddjj = $('#informes_grid').getCell(id,'id_ddjj');

            apagar_grillas();
            $("#div_percepciones").show();

            setea_parametros('#percepciones_grid', {':pid_ddjj': pid_ddjj});

        }
    }).navButtonAdd('#informes_grid_pager',{
        id:'btn_ret_bco',
        buttonicon: "",
        caption:"Ret Bco",
        title:"Ret Bco",
        cursor:"pointer",
        onClickButton: function () {

            let id       = $('#informes_grid').getGridParam('selrow');
            var pid_ddjj = $('#informes_grid').getCell(id,'id_ddjj');

            apagar_grillas();

            setea_parametros('#retbco_grid', {':pid_ddjj': pid_ddjj});

        }
    }).navButtonAdd('#informes_grid_pager',{
        id:'btn_per_aduanera',
        buttonicon: "",
        caption:"Per Aduanera",
        title:"Per Aduanera",
        cursor:"pointer",
        onClickButton: function () {

            let id       = $('#informes_grid').getGridParam('selrow');
            var pid_ddjj = $('#informes_grid').getCell(id,'id_ddjj');

           apagar_grillas();

           $("#div_aduana").show();

            setea_parametros('#aduana_grid', {':pid_ddjj': pid_ddjj});

        }
    }).navButtonAdd('#informes_grid_pager',{
        id:'btn_consistencia',
        buttonicon: "",
        caption:"Consistencia",
        title:"Consistencia",
        cursor:"pointer",
        onClickButton: function () {

            let id       = $('#informes_grid').getGridParam('selrow');
            var pid_ddjj = $('#informes_grid').getCell(id,'id_ddjj');


            apagar_grillas();

            $("#div_djc").show();

            setea_parametros('#djc_grid', {':pid_ddjj': pid_ddjj});

        }
    }).navButtonAdd('#informes_grid_pager',{
        id:'btn_imprimir',
        buttonicon: "",
        caption:"Imprimir",
        title:"Imprimir",
        cursor:"pointer",
        onClickButton: function () {
            mostrar_validacion('Opción en desarrollo');

        }
    });


    $("#ingresosBrutos_grid").jqGrid({
        colNames: datos_ingresosBrutos_grid.colNames(),
        colModel: datos_ingresosBrutos_grid.colModel(),
        pager: $('#ingresosBrutos_grid_pager'),
        caption: " Detalle Declaración Jurada",
        postData: datos_ingresosBrutos_grid.postData(),
        autowidth: false,
        sortname:'n_orden',
        sortorder:'asc',
        width: 940
    }).navGrid('#ingresosBrutos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );



    $("#retenciones_grid").jqGrid({
        colNames: datos_retenciones_grid.colNames(),
        colModel: datos_retenciones_grid.colModel(),
        pager: $('#retenciones_grid_pager'),
        caption: " Retenciones ",
        postData: datos_retenciones_grid.postData(),
        autowidth: false,
        sortname:'CUIT_AGENTE, FECHA_RETENCION',
        sortorder:'asc',
        width: 940
    }).navGrid('#retenciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );


    $("#retenciones20_grid").jqGrid({
        colNames: datos_retenciones20_grid.colNames(),
        colModel: datos_retenciones20_grid.colModel(),
        pager: $('#retenciones20_grid_pager'),
        caption: " Retenciones ",
        postData: datos_retenciones20_grid.postData(),
        autowidth: false,
        sortname:'tipo_retencion',
        sortorder:'asc',
        width:1400
    }).navGrid('#retenciones20_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );


    $("#percepciones_grid").jqGrid({
        colNames: datos_percepciones_grid.colNames(),
        colModel: datos_percepciones_grid.colModel(),
        pager: $('#percepciones_grid_pager'),
        caption: " Percepciones ",
        postData: datos_percepciones_grid.postData(),
        autowidth: false,
        sortname:'fecha_percepcion',
        sortorder:'asc',
        width:1400
    }).navGrid('#percepciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#retbco_grid").jqGrid({
        colNames: datos_retbco_grid.colNames(),
        colModel: datos_retbco_grid.colModel(),
        pager: $('#retbco_grid_pager'),
        caption: " Retenciones Bancarias ",
        postData: datos_retbco_grid.postData(),
        autowidth: false,
        sortname:'n_linea',
        sortorder:'asc',
        width:940
    }).navGrid('#retbco_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#aduana_grid").jqGrid({
        colNames: datos_aduana_grid.colNames(),
        colModel: datos_aduana_grid.colModel(),
        pager: $('#aduana_grid_pager'),
        caption: " Percepción Aduanera ",
        postData: datos_aduana_grid.postData(),
        autowidth: false,
        sortname:'n_linea',
        sortorder:'asc',
        width:940
    }).navGrid('#aduana_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#djc_grid").jqGrid({
        colNames: datos_djc_grid.colNames(),
        colModel: datos_djc_grid.colModel(),
        pager: $('#djc_grid_pager'),
        caption: " Consistencia ",
        postData: datos_djc_grid.postData(),
        autowidth: false,
        sortname:'n_orden',
        sortorder:'asc',
        width:940
    }).navGrid('#djc_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );



    $("#3142_grid").jqGrid({
        colNames: datos_3142_grid.colNames(),
        colModel: datos_3142_grid.colModel(),
        pager: $('#3142_grid_pager'),
        caption: " Detalle Declaración Jurada Agente",
        postData: datos_3142_grid.postData(),
        autowidth: false,
        width: 940,
        sortname:' n_secuencia_Det',
        sortorder:'asc',
    }).navGrid('#3142_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );





    apagar_grillas();






}