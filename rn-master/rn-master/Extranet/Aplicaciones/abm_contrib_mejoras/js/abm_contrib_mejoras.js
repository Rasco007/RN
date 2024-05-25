var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    n_orden:0,
    m_autoquery:v_m_autoquery,
    param:{':c_organismo':null,
        ':c_concepto':null,
        ':c_region':null,
        ':c_area':null,
        ':n_cuota':null,
        ':n_partida':null}
});

$(document).ready(function() {

    $("#n_cuota").mask("9999/99");

    $("#btn_buscar").click(function(){
        var valida_posiciones = fun_valida_posicion();
        if (valida_posiciones) {
            deshabilita_campos(true);
            setea_parametros('#main_grid',{
                ':c_organismo': $("#c_organismo").val(),
                ':c_concepto': $("#c_concepto").val(),
                ':c_region': $("#c_region").val(),
                ':c_area': $("#c_area").val(),
                ':n_cuota': $("#n_cuota").val(),
                ':n_partida': $("#n_partida").val()
            });
        }
    });

    $("#btn_limpiar").click(function(){
        setea_parametros('#main_grid',{
            ':c_organismo':null,
            ':c_concepto':null,
            ':c_region':null,
            ':c_area':null,
            ':n_cuota':null,
            ':n_partida':null
        });
        $("#frm_consulta").trigger('reset');
        $(".limpiar","#frm_consulta").val('');
        deshabilita_campos(false);
    });

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Mejoras",
        postData: datos_main_grid.postData(),
    	editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        n_orden:0,
        sortname:'n_cuota_desde desc, n_cuota_hasta',
        sortorder:'desc'
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
            top:500,
            left: 0,
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#tr_d_organismo, #tr_d_concepto, #tr_d_region, #tr_d_area",formid).hide();
                $("#d_organismo, #d_concepto, #d_region, #d_area",formid).attr('disabled',true)

                $("#n_cuota_desde, #n_cuota_hasta").addClass("text-right");
                $("#n_cuota_desde, #n_cuota_hasta").mask("9999/99");
                $("#n_cuota_desde, #n_cuota_hasta").attr('placeholder','AAAA/MM');

                $("#tr_n_partida",formid).hide();
                $("#n_partida",formid).removeClass('validate[required,custom[onlyIntNumber],maxSize[22]]');
                $("#n_partida",formid).addClass('validate[custom[onlyIntNumber],maxSize[22]]');
            }),
            beforeSubmit: function(postdata, formid) {
                var msj = '';
                var valido1 = $(formid).validationEngine('validate');

                var valido2 = fun_valida_posiciones();

                var v_n_importe = parse($("#n_importe",formid).val());
                var valido3 = true;
                if(v_n_importe!=''){
                    valido3 = /^[0-9]{1,13}(\.[0-9]{1,5})?$/.test(v_n_importe);
                    if(!valido3){
                        msj = 'El campo importe debe tener como máximo 18 dígitos.';
                    }
                }
                if(v_n_importe <= 0){
                    msj = 'El campo importe debe ser mayor a cero.';
                }
                return [valido1 && valido2 && valido3, msj];
            },
            closeAfterEdit:true
        }, //edit
        {
            top:500,
            left: 0,
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#tr_d_organismo, #tr_d_concepto, #tr_d_region, #tr_d_area",formid).show();
                $("#d_organismo, #d_concepto, #d_region, #d_area",formid).attr('disabled',false)

                $("#n_cuota_desde, #n_cuota_hasta").addClass("text-right");
                $("#n_cuota_desde, #n_cuota_hasta").mask("9999/99");
                $("#n_cuota_desde, #n_cuota_hasta").attr('placeholder','AAAA/MM');

                if(m_mejora_masiva =='S'){
                    $("#n_partida",formid).removeClass('validate[required,custom[onlyIntNumber],maxSize[22]]');
                    $("#n_partida",formid).addClass('validate[custom[onlyIntNumber],maxSize[22]]');
                    $("#tr_n_partida label",formid).html("Partida");
                }

                inicializa_lupas_main_grid(formid);
            }),
            beforeSubmit: function(postdata, formid) {
                var msj = '';
                var valido1 = $(formid).validationEngine('validate');

                var valido2 = fun_valida_posiciones();

                var v_n_importe = parse($("#n_importe",formid).val());
                var valido3 = true;
                if(v_n_importe!=''){
                    valido3 = /^[0-9]{1,13}(\.[0-9]{1,5})?$/.test(v_n_importe);
                    if(!valido3){
                        msj = 'El campo importe debe tener como máximo 18 dígitos.';
                    }
                }
                if(v_n_importe <= 0){
                    msj = 'El campo importe debe ser mayor a cero.';
                }
                return [valido1 && valido2 && valido3, msj];
            },
            closeAfterAdd:true
        }, //add
        {} //del
    );
    
    inicializa_lupas();

});