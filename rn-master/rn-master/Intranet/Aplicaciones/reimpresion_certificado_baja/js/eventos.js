function init_eventos(){

    $("#btn_imprimir").click(function(){

        $('#main').procOverlay({visible:true});
        if (!$('#dominio').val()){
            mostrar_cuadro('E', 'Error', 'El campo Dominio no puede quedar vacío.',null,null,400);
            $('#main').procOverlay({visible:false});
            return;
        }
        if (!$('#fecha').val()){
            mostrar_cuadro('E', 'Error', 'El campo F. Baja no puede quedar vacío.',null,null,400);
            $('#main').procOverlay({visible:false});
            return;
        }
        if (!$('#n_cert_baja').val()){
            mostrar_cuadro('E', 'Error', 'El campo Nro. Certificado de baja no puede quedar vacío.',null,null,400);
            $('#main').procOverlay({visible:false});
        }else{
            p_dominio=$("#dominio").val();
            p_f_baja=$("#fecha").val();
            p_n_cert_baja=$("#n_cert_baja").val();
            validar_Datos_print(p_dominio, p_f_baja, p_n_cert_baja);
            validar_datos(p_dominio,p_f_baja,p_n_cert_baja);
        }
        
    });

    $("#btn_limpiar").click(function(){
        $("#dominio").val('');

        $("#fecha").val('');

        $("#n_cert_baja").val('');

        $("#dominio_viejo").val('');
    })


    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");


}