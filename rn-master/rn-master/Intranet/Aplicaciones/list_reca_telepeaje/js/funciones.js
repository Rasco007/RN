function set_fechas_min_max(){
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $("#f_acred_desde").datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_acred_hasta").datepicker("option", "minDate", selectedDate);
    });    

    $("#f_acred_hasta").datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_acred_desde").datepicker("option", "maxDate", selectedDate);
    });
}

function valida_fechas(){
    var f_desde = $("#f_acred_desde").val();
    var f_hasta = $("#f_acred_hasta").val();

    if(f_desde != "" && f_hasta != ""){
        return f_desde <= f_hasta;
    }else{
        return true;
    }
}

function deshabilita_campos(v_o_f){
    $(".datepicker","#frm_consulta").attr('disabled',v_o_f);
}