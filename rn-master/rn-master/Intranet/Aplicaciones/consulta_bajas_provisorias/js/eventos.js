function init_eventos(){
    $("#btn_buscar").click(function(){
        if($("#p_d_objeto_hecho").val()=='' &&  $("#p_f_cese_prov").val()=='' &&  $("#p_c_cese_motivo_prov").val()==''){
            mostrar_cuadro('I','Atención','Debe ingresar algún filtro para realizar la busqueda');
        }
        else{
            setea_parametros($("#main_grid"),{
                ':p_dominio':$("#p_d_objeto_hecho").val(),
                ':p_f_movimiento':$("#p_f_cese_prov").val(),
                ':p_c_motivo':$("#p_c_cese_motivo_prov").val()
            })
        }
        
    })

    $(".datepicker")
        .datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul","Ago","Sep","Oct","Nov","Dic",],
            monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",],
        }).mask("99/99/9999");

    $("#btn_limpiar").click(function(){
        $("#p_d_objeto_hecho").val('');
        $("#p_f_cese_prov").val('');
        $("#p_c_cese_motivo_prov").val('');
        $('#main_grid').clearGridData();
    });

    v_c_cese=$("#p_c_cese_motivo_prov").val();
    v_p_f_cese=$("#p_f_cese_prov").val();
    v_d_objeto=$("#p_d_objeto_hecho").val();


    

    
}