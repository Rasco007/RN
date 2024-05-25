var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    n_orden:0,
    m_autoquery:v_m_autoquery,
    param:{':c_organismo':null,
        ':c_concepto':null,
        ':c_region':null,
        ':c_area':null,
        ':f_vig':null}
});

$(document).ready(function() {

    $("#btn_buscar").click(function(){
        deshabilita_campos(true);
        setea_parametros('#main_grid',{
            ':c_organismo': $("#c_organismo_1").val(),
            ':c_concepto': $("#c_concepto_1").val(),
            ':c_region': $("#c_region_1").val(),
            ':c_area': $("#c_area_1").val(),
            ':f_vig': $("#f_vig").val()
        });
    });

    $("#btn_limpiar").click(function(){
        setea_parametros('#main_grid',{
            ':c_organismo':null,
            ':c_concepto':null,
            ':c_region':null,
            ':c_area':null,
            ':f_vig':null
        });
        $("#frm_consulta").trigger('reset');
        $(".limpiar, .datepicker, #c_organismo, #d_organismo","#frm_consulta").val('');
        deshabilita_campos(false);
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Alícuotas",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'d_region asc, d_area asc, d_concepto asc, f_vig_desde',
        sortorder:'desc',
        n_orden:0,
        height:300,
        onSelectRow:function(rowid){
            var v_f_desde = $("#main_grid").getCell(rowid,'f_vig_desde');
            if(v_aut_modif_fecha < 1){
                if(v_f_desde < fecha_hoy){
                    $("#btn_edit_grid").hide();
                }else{
                    $("#btn_edit_grid").show();
                }
            }else{
                $("#btn_edit_grid").show();
            }
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:true}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd("#main_grid_pager",{
        id:'btn_edit_grid',
        buttonicon:"glyphicon-edit",
        caption:" ",
        title:"Modificar la fila seleccionada",
        position: "first",
        onClickButton:function() {
            $("#abm_liqLabel").html('Editar Registro');
            v_operacion = 'edit';
            $("#frm_abm_liq input").val('');
            $("#f_vig_hasta, #f_vig_desde","#frm_abm_liq").datepicker("option", "minDate", null);
            var rowid = valida_seleccion_grilla("#main_grid");
            if(rowid){
                $("#id_liq_riego",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'id_liq_riego'));
                $("#c_organismo",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'c_organismo'));
                $("#d_organismo",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'d_organismo'));
                $("#c_ente",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'c_ente'));
                $("#c_concepto",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'c_concepto'));
                $("#d_concepto",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'d_concepto'));
                $("#c_region",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'c_region'));
                $("#d_region",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'d_region'));
                $("#c_area",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'c_area'));
                $("#d_area",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'d_area'));
                $("#f_vig_desde",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'f_vig_desde'));
                $("#f_vig_hasta",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'f_vig_hasta'));
                $("#n_hectarea_dsd",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'n_hectarea_dsd'));
                $("#n_hectarea_hst",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'n_hectarea_hst'));
                $("#n_alicuota",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'n_alicuota'));
                $("#n_val_fijo",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'n_val_fijo'));
                $("#c_actividad",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'c_actividad'));
                $("#d_actividad",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'d_actividad'));
                $("#p_bonificacion",'#frm_abm_liq').val($("#main_grid").getCell(rowid,'p_bonificacion'));

                $("#row_organismo, #row_concepto, #row_region, #row_area, #row_f_vig_desde",'#frm_abm_liq').hide();
                $("#d_organismo, #d_concepto, #d_region, #d_area, #f_vig_desde",'#frm_abm_liq').attr('disabled',true);

                if($("#c_organismo",'#frm_abm_liq').val()=='DPA' && $("#c_concepto",'#frm_abm_liq').val()==370){
                    $("#d_actividad",'#frm_abm_liq').addClass('validate[required]');
                    $("#row_actividad label",'#frm_abm_liq').html("Actividad (*)");
                    $("#row_actividad",'#frm_abm_liq').show();
                }else{
                    $("#d_actividad",'#frm_abm_liq').removeClass('validate[required]');
                    $("#row_actividad label",'#frm_abm_liq').html("Actividad");
                    $("#row_actividad",'#frm_abm_liq').hide();
                }

                if($("#c_concepto",'#frm_abm_liq').val() == 350 || $("#c_concepto",'#frm_abm_liq').val() == 360){
                    $("#row_val_fijo",'#frm_abm_liq').hide();
                    $("#n_val_fijo",'#frm_abm_liq').val('');
                }else{
                    $("#row_val_fijo",'#frm_abm_liq').show();
                    $("#n_val_fijo",'#frm_abm_liq').val('');
                }
                
                set_fechas_min_max('#frm_abm_liq');

                inicializa_lupas_main_grid('#frm_abm_liq');
                $("#modal_abm_liq").modal('show');
            }
        }
    }).navButtonAdd("#main_grid_pager",{
        id:'btn_add_grid',
        buttonicon:"glyphicon-plus",
        caption:" ",
        title:"Agregar nueva fila",
        position: "first",
        onClickButton:function() {
            $("#abm_liqLabel").html('Agregar Registro');
            v_operacion = 'add';
            $("#frm_abm_liq input").val('');
            $("#p_bonificacion",'#frm_abm_liq').val(0);

            $("#row_organismo, #row_concepto, #row_region, #row_area, #row_f_vig_desde",'#frm_abm_liq').show();
            $("#d_organismo, #d_concepto, #d_region, #d_area, #f_vig_desde",'#frm_abm_liq').attr('disabled',false);
            $("#c_ente",'#frm_abm_liq').val('DPA');

            if($("#c_organismo",'#frm_abm_liq').val()=='DPA' && $("#c_concepto",'#frm_abm_liq').val()==370){
                $("#d_actividad",'#frm_abm_liq').addClass('validate[required]');
                $("#row_actividad label",'#frm_abm_liq').html("Actividad (*)");
                $("#row_actividad",'#frm_abm_liq').show();
            }else{
                $("#d_actividad",'#frm_abm_liq').removeClass('validate[required]');
                $("#row_actividad label",'#frm_abm_liq').html("Actividad");
                $("#row_actividad",'#frm_abm_liq').hide();
            }

            if($("#c_concepto",'#frm_abm_liq').val() == 350 || $("#c_concepto",'#frm_abm_liq').val() == 360){
                $("#row_val_fijo",'#frm_abm_liq').hide();
                $("#n_val_fijo",'#frm_abm_liq').val('');
            }else{
                $("#row_val_fijo",'#frm_abm_liq').show();
                $("#n_val_fijo",'#frm_abm_liq').val('');
            }

            /*$('#f_vig_desde','#frm_abm_liq').datepicker("option",'minDate',fecha_hoy).change(function () {
                if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
                    mostrar_validacion("La Fecha ingresada no puede ser Menor a la fecha actual.");
                    $(this).val(fecha_hoy);
                }
            });*/

            set_fechas_min_max('#frm_abm_liq');

            inicializa_lupas_main_grid('#frm_abm_liq');

            $("#modal_abm_liq").modal('show');
        }
    });
    
    $("#btn_aceptar_operacion").click(function(){
        $('#main').procOverlay({visible:true});
        fun_boton_operacion(v_operacion,'#frm_abm_liq');
    });
    
    inicializa_lupas();

});