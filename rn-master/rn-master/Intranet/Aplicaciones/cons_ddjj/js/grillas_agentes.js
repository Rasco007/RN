
function inicializarGrillasAgentes() {


    // grilla11
    //   SIRCAR_AR
    //   SIAFIP_AR
    //  IB16

    $("#grilla11_grid").jqGrid({
        colNames: datos_grilla11_grid.colNames(),
        colModel: datos_grilla11_grid.colModel(),
        pager: $('#grilla11_grid_pager'),
        caption: " Detalle Retenciones ",
        postData: datos_grilla11_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'n_secuencia_det',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            console.log('grilla11 loadcomplete');

            $('#grilla11_grid').setGridWidth(900);
            $('#grilla11_grid').setGridHeight('170');



            $("#grilla11_grid").jqGrid("footerData", "set", {
                n_cuit:     "<span>Totales</span>",
                i_retenido: "<span >"+sumCol('grilla11_grid','i_retenido')+"</span>",
                i_base_imponible: "<span >"+sumCol('grilla11_grid','i_base_imponible')+"</span>",
            },  false);




        }
    }).navGrid('#grilla11_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#grilla12_grid").jqGrid({
        colNames: datos_grilla12_grid.colNames(),
        colModel: datos_grilla12_grid.colModel(),
        pager: $('#grilla12_grid_pager'),
        caption: " Detalle Retenciones Sellos",
        postData: datos_grilla12_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'n_secuencia_det',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            console.log('grilla12 loadcomplete');

            $('#grilla12_grid').setGridWidth(1200);

            $("#grilla12_grid").jqGrid("footerData", "set", {
                d_denominacion:     "<span>Total</span>",
                i_retencion: "<span >"+sumCol('grilla12_grid','i_retencion')+"</span>",
            },  false);
        }
    }).navGrid('#grilla12_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );


    $("#grilla14_grid").jqGrid({
        colNames: datos_grilla14_grid.colNames(),
        colModel: datos_grilla14_grid.colModel(),
        pager: $('#grilla14_grid_pager'),
        caption: " Dj.Ag.Rec.Sellos Compañias de Seguro",
        postData: datos_grilla14_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'n_linea',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {



            $('#grilla14_grid').setGridWidth(1200);

            $("#grilla14_grid").jqGrid("footerData", "set", {
                d_razon_social:     "<span>Total</span>",
                i_base_imponible: "<span >"+sumCol('grilla14_grid','i_base_imponible')+"</span>",
                i_impuesto: "<span >"+sumCol('grilla14_grid','i_impuesto')+"</span>",
            },  false);
        }
    }).navGrid('#grilla14_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#grilla15_grid").jqGrid({
        colNames: datos_grilla15_grid.colNames(),
        colModel: datos_grilla15_grid.colModel(),
        pager: $('#grilla15_grid_pager'),
        caption: " Dj.Ag.Rec.Sellos Compañias de Seguro",
        postData: datos_grilla15_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'n_linea',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {


            $('#grilla15_grid').setGridWidth(1300);
            $("#grilla15_grid").jqGrid("footerData", "set", {
                d_razon_social        : "<span>Total</span>",
                i_base_imponible      : "<span >"+sumCol('grilla15_grid','i_base_imponible')+"</span>",
                i_impuesto            : "<span >"+sumCol('grilla15_grid','i_impuesto')+"</span>"
            },  false);
        }
    }).navGrid('#grilla15_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#grilla16_grid").jqGrid({
        colNames: datos_grilla16_grid.colNames(),
        colModel: datos_grilla16_grid.colModel(),
        pager: $('#grilla16_grid_pager'),
        caption: " DJ Ag.Rec.Sellos  Escribanos",
        postData: datos_grilla16_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'n_linea',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            $('#grilla16_grid').setGridWidth(1300);
            $("#grilla16_grid").jqGrid("footerData", "set", {
                nombre_r_social_exento:     "<span>Total</span>",
                impuesto              : "<span >"+sumCol('grilla16_grid','impuesto')+"</span>",
                impuesto_total        : "<span >"+sumCol('grilla16_grid','impuesto_total')+"</span>",
                impuesto_a_declarar   : "<span >"+sumCol('grilla16_grid','impuesto_a_declarar')+"</span>"
            },  false);


        }
    }).navGrid('#grilla16_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#grilla17_grid").jqGrid({
        colNames: datos_grilla17_grid.colNames(),
        colModel: datos_grilla17_grid.colModel(),
        pager: $('#grilla17_grid_pager'),
        caption: " AG REC SELLOS RUBRO I ",
        postData: datos_grilla17_grid.postData(),
        autowidth: false,
        //width: 900,
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            $('#grilla17_grid').setGridWidth(850);

            $("#grilla17_grid").jqGrid("footerData", "set", {
                d_concepto:     "<span>Total</span>",
                i_impuesto: "<span >"+sumCol('grilla17_grid','i_impuesto')+"</span>" },  false);
        }
    }).navGrid('#grilla17_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#grilla18_grid").jqGrid({
        colNames: datos_grilla18_grid.colNames(),
        colModel: datos_grilla18_grid.colModel(),
        pager: $('#grilla18_grid_pager'),
        caption: " AG REC SELLOS RUBRO II ",
        postData: datos_grilla18_grid.postData(),
        autowidth: false,
        //width: 900,
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            $('#grilla18_grid').setGridWidth(850);
            $("#grilla18_grid").jqGrid("footerData", "set", {
                d_concepto:     "<span>Total</span>",
                i_impuesto: "<span >"+sumCol('grilla18_grid','i_impuesto')+"</span>" },  false);
        }
    }).navGrid('#grilla18_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#grilla19_grid").jqGrid({
        colNames: datos_grilla19_grid.colNames(),
        colModel: datos_grilla19_grid.colModel(),
        pager: $('#grilla19_grid_pager'),
        caption: " AG REC SELLOS RUBRO III ",
        postData: datos_grilla19_grid.postData(),
        autowidth: false,
        //width: 900,
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            $('#grilla19_grid').setGridWidth(850);

            $("#grilla19_grid").jqGrid("footerData", "set", {
                d_concepto:     "<span>Total</span>",
                i_impuesto_fijo: "<span >"+sumCol('grilla19_grid','i_impuesto_fijo')+"</span>",
                i_impuesto_total: "<span >"+sumCol('grilla19_grid','i_impuesto_total')+"</span>"
            },  false);
        }
    }).navGrid('#grilla19_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );




    $("#grilla20_grid").jqGrid({
        colNames: datos_grilla20_grid.colNames(),
        colModel: datos_grilla20_grid.colModel(),
        pager: $('#grilla20_grid_pager'),
        caption: " DJ Ag.Rec.Sellos  Inmobiliarias",
        postData: datos_grilla20_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'n_linea',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            $('#grilla20_grid').setGridWidth(1300);

            $("#grilla20_grid").jqGrid("footerData", "set", {
                d_razon_social_prop_locador:     "<span>Total</span>",
                i_monto_contrato_total: "<span >"+sumCol('grilla20_grid','i_monto_contrato_total')+"</span>",
                i_monto_garantia_efectivo: "<span >"+sumCol('grilla20_grid','i_monto_garantia_efectivo')+"</span>",
                i_monto_garantia_pagare: "<span >"+sumCol('grilla20_grid','i_monto_garantia_pagare')+"</span>",
                i_impuesto: "<span >"+sumCol('grilla20_grid','i_impuesto')+"</span>"
            },  false);

        }
    }).navGrid('#grilla20_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#grilla21_grid").jqGrid({
        colNames: datos_grilla21_grid.colNames(),
        colModel: datos_grilla21_grid.colModel(),
        pager: $('#grilla21_grid_pager'),
        caption: " DETALLE RETENCIONES SIRTAC",
        postData: datos_grilla21_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'f_retencion',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            $('#grilla21_grid').setGridWidth(1300);
            $("#grilla21_grid").jqGrid("footerData", "set", {
                n_liquidacion:     "<span>Total</span>",
                i_monto_total_retenido: "<span >"+sumCol('grilla21_grid','i_monto_total_retenido')+"</span>" },  false);
        }
    }).navGrid('#grilla21_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#grilla22_grid").jqGrid({
        colNames: datos_grilla22_grid.colNames(),
        colModel: datos_grilla22_grid.colModel(),
        pager: $('#grilla22_grid_pager'),
        caption: " Detalle Percepciones",
        postData: datos_grilla22_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'n_secuencia_det',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            $('#grilla22_grid').setGridWidth(1300);


            $("#grilla22_grid").jqGrid("footerData", "set", {
                d_denominacion:     "<span>Total</span>",
                i_percibido: "<span >"+sumCol('grilla22_grid','i_percibido')+"</span>" },  false);
        }
    }).navGrid('#grilla22_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );



    $("#grilla24_grid").jqGrid({
        colNames: datos_grilla24_grid.colNames(),
        colModel: datos_grilla24_grid.colModel(),
        pager: $('#grilla24_grid_pager'),
        caption: " Detalle DDJJ Anual ",
        postData: datos_grilla24_grid.postData(),
        autowidth: false,
        //width: 900,
        sortname:'n_periodo',
        sortorder:'asc',
        footerrow:true,
        userDataOnFooter : false,
        loadComplete: function()
        {
            $('#grilla24_grid').setGridWidth(900);

            $("#grilla24_grid").jqGrid("footerData", "set", {
                n_periodo:     "<span>Totales</span>",
                i_impuesto: "<span >"+sumCol('grilla24_grid','i_impuesto')+"</span>",
                i_base_imponible: "<span >"+sumCol('grilla24_grid','i_base_imponible')+"</span>",
                i_bonificacion: "<span >"+sumCol('grilla24_grid','i_bonificacion')+"</span>",
                i_retencion: "<span >"+sumCol('grilla24_grid','i_retencion')+"</span>",
                i_percepcion: "<span >"+sumCol('grilla24_grid','i_percepcion')+"</span>"
            },  false);

        }
    }).navGrid('#grilla24_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );







}