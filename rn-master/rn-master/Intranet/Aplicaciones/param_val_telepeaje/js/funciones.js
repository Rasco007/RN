function inicializar_lupas(formid) {
    $('#d_peaje',formid).lupa_generica({
        titulos:['Código.','Descripción'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:250}],
        caption:'Peajes',
        sortname:'c_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_peaje',
        exactField: 'c_dato',
        campos:{c_dato:'c_peaje',d_dato:'d_peaje'},
        keyNav:true
    });

    $('#d_concepto',formid).lupa_generica({
        titulos:['Código.','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:250}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_codigo1',
        exactField: 'c_concepto',
        campos:{c_concepto:'c_codigo1',d_concepto:'d_concepto'},
        keyNav:true,
        filtroNull:false,
        filtros: [v_c_tributo],
        onClose:function(){
            if ($('#c_codigo1', formid).val() == 310){
                $('#tr_n_cant_ut, #tr_d_unidad').show();
                $('#n_cant_ut, #d_unidad', formid).addClass('validate[required]');
                $('#tr_n_val_fijo').hide();
                $('#n_val_fijo',formid).removeClass('validate[required]').val(null);
            }else {
                $('#tr_n_cant_ut, #tr_d_unidad').hide();
                $('#n_cant_ut, d_unidad', formid).removeClass('validate[required]').val(null);
                $('#tr_n_val_fijo').show();
                $('#n_val_fijo',formid).addClass('validate[required]');
            }
            $("#c_codigo2,#d_tipo_automotor").val('');
        }
    });

    $('#d_tipo_automotor',formid).lupa_generica({
        titulos:['Código.','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Tipos de Automotores',
        sortname:'c_codigo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_codigo2',
        exactField: 'c_codigo',
        campos:{c_codigo:'c_codigo2',d_descrip:'d_tipo_automotor'},
        keyNav:true,
        onClose:function(){

        }
    });

    $('#d_unidad',formid).lupa_generica({
        titulos:['Código.','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Unidades',
        sortname:'c_codigo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_codigo3',
        exactField: 'c_codigo',
        campos:{c_codigo:'c_codigo3',d_descrip:'d_unidad'},
        keyNav:true,
        onClose:function(){

        }
    });
}

function set_fechas_min_max(formid){
    $("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_hasta",formid).datepicker("option", "minDate", selectedDate);
    });

    $("#f_vig_hasta",formid).datepicker("option", "minDate", $("#f_vig_desde",formid).val());

    $("#f_vig_hasta",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_desde",formid).datepicker("option", "maxDate", selectedDate);
    });

    $("#f_vig_desde",formid).datepicker("option", "maxDate", $("#f_vig_hasta",formid).val());
}

function buscar_desc_peaje(c_dato){
    $.ajax({
        type:'POST',
        url: "param_val_telepeaje/ajax_telepeaje.php",  
        data: {c_dato: c_dato},
        dataType: 'json',
        success: function(ret) {
            if(ret.d_dato != ""){
                $("#d_peaje").val(ret.D_DATO);
            }else{
                mostrar_error('Ha ocurrido un error, intente luego.');
            }
        }
    });
}