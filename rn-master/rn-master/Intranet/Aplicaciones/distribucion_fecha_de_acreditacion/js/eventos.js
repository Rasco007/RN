$('#chk_ingresado').change(function(){
    if($('#chk_ingresado').is(':checked')){
        p_filtro=evaluaFiltro(p_filtro,'3-');
    }

    if(!($('#chk_ingresado').is(':checked'))){
        
        p_filtro=p_filtro.replace('3-','');
        
    };
    
});

$('#chk_controlado').change(function(){
    if($('#chk_controlado').is(':checked')){
        p_filtro=evaluaFiltro(p_filtro,'4-');
    }

    if(!($('#chk_controlado').is(':checked'))){
        p_filtro=p_filtro.replace('4-','');
    }

});

$("#btn_limpiar").click(function(){
    $("#f_desde").val("");
    $("#f_hasta").val("");
    $("#f_acreditacion").val("");
    
    $("#banelco").attr('disabled',false);
    $("#interbanking").attr('disabled',false);
    $("#e-pagos").attr('disabled',false);false 

    $("#chk_ingresado").attr('disabled',false);

    $("#chk_controlado").attr('disabled',false);

    $("#chk_acreditado").attr('disabled',false);

    $("#chk_erroneo").attr('disabled',false);


    $("#f_desde").attr('disabled',false);

    $("#f_hasta").attr('disabled',false);

    deseleccionar_todo(p_archivo);

    $('#main_grid_ban').jqGrid('clearGridData');

    $('#main_grid_intbk').jqGrid('clearGridData');

    $('#main_grid_epago').jqGrid('clearGridData');

    $('#detalle_grid').jqGrid('clearGridData');

    $('#suma_grid').jqGrid('clearGridData');

    $("#btn_buscar").attr('disabled', false);

    $("#sel_todo").prop('disabled',true);

            $("#modificar_f_acreditacion").prop('disabled',true);

            $("#desel_todo").prop('disabled',true);

            $("#sel_todo").prop('disabled',true);

            $("#btn_generar_planilla").prop('disabled',true);

            $("#f_acreditacion").prop('disabled',true);
    p_sel='-';

    p_suma_percibido=0;
    p_sum_t_total_importe_pesos=0;
    p_sum_t_importe_contracargo=0;
    p_sum_t_importe_devolucion=0;
    p_sum_t_importe_neto=0;
    p_sum_t_importe_comision=0;
    p_sum_t_importe_impuesto=0;

})

$('#chk_acreditado').change(function(){
    if($('#chk_acreditado').is(':checked')){
        p_filtro=evaluaFiltro(p_filtro,'1-');
    }

    if(!($('#chk_acreditado').is(':checked'))){
        
        p_filtro=p_filtro.replace('1-','');
        
    }
    
})



$('#chk_erroneo').change(function(){
    if($('#chk_erroneo').is(':checked')){
        p_filtro=evaluaFiltro(p_filtro,'2-');
    }

    if(!($('#chk_erroneo').is(':checked'))){
        
        p_filtro=p_filtro.replace('2-','');
        
    }

});

$('#btn_generar_planilla').click(function(){
    var p_c_estado_sel='-';
    var i;
    var p_sel_todos;
    lengthDeEstado=estadosSeleccionado.length;

    

    p_sel_todos=$("#p_sel").val();
    

    p_sel=$("#p_sel").val();
    
    for(i=0;i<lengthDeEstado;i++){
        if(!p_c_estado_sel.includes(estadosSeleccionado[i])){

            p_c_estado_sel=p_c_estado_sel+estadosSeleccionado[i]+'-';
            

        };

    };
    
    if((p_sel_todos=="-" || p_sel_todos===null) && (p_sel=='-' || p_sel===null)){
        mostrar_cuadro("I","Atención","Debe seleccionar un archivo");
    }
    if(p_c_estado_sel.includes("4")){
        mostrar_cuadro("E","Error","Se ha seleccionado archivo que ya fue controlado");
        
    }
    if(p_sel!='-' && p_sel!=null && p_sel_todos!=null &&p_sel_todos!='-' && (!p_c_estado_sel.includes("4"))){
        
        verificar_estado(p_c_estado_sel,p_sel);
    };
    
});



$('#sel_todo').click(async function(){
    
    
    selec_todo(p_archivo);

    $("#main_grid_ban").trigger('reloadGrid');

    $("#main_grid_intbk").trigger('reloadGrid');

    $("#main_grid_epago").trigger('reloadGrid');
    
    
});

$("#desel_todo").click(function(){
    
    deseleccionar_todo(p_archivo);
    $("#main_grid_ban").trigger('reloadGrid');

    $("#main_grid_intbk").trigger('reloadGrid');

    $("#main_grid_epago").trigger('reloadGrid');

    $("#suma_grid").jqGrid('clearGridData');
});

$(".a_marcar").prop("checked", false);
$(":checkbox").attr("checked", false);


$('#modificar_f_acreditacion').click(function(){
    p_h_fecha_acreditacion=$('#f_acreditacion').val();

    /* SE DEBE MODIFICAR POR UN PRC QUE HAGA LA MODIFICACION*/
    if(p_h_fecha_acreditacion!="" ){
        verificar_estados_seleccionado(p_archivo);
    }
    else{mostrar_cuadro('I', 'Atención', 'Se debe ingresar fecha y/o seleccionar archivos.');}
    
});



function init_eventos(){
    

    window.addEventListener("beforeunload", function(e){
        deseleccionar_todo('BAN');
        deseleccionar_todo('INTBK');
        deseleccionar_todo('EPAGO');
     });
    
    $("#grid_ban").show();

    $('#banelco').css("background-color","#3d0066");

    $('#banelco').css('color', 'white');
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
    });
    
    $('#f_acreditacion').datepicker(
        {   dateFormat:'dd/mm/yy',
            changeMonth:true,
            changeYear:true,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        })
        .blur(function(){
            formatearFecha($(this));
        }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}}
    );

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#f_hasta').change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_hasta').val()) ==null){
           p_f_hasta=fecha_hoy;
        }
        else{
            
            p_f_hasta=$('#f_hasta').val();
            
        }

        if($.datepicker.parseDate('dd/mm/yy', $('#f_desde').val())>$.datepicker.parseDate('dd/mm/yy', $('#f_hasta').val())){
            mostrar_cuadro('E', 'Error', 'Fecha desdes no puede ser mayor a fecha hasta');
        }
    });

        $('#f_desde').change(function () {
            if($.datepicker.parseDate('dd/mm/yy', $('#f_desde').val()) != null){
                p_f_desde=$('#f_desde').val();
            }
            else{
                p_f_desde='01/01/2010';
            }
            
            
        });

    $('#banelco').click(function(){
        $('.custom-button').css("background-color","#e9e9ed");
        $('.custom-button').css("color","black");
        $("#titulo_main_grid").text("Archivos incorporados: BANELCO");

        $('#banelco').css("background-color","#3d0066");
        $('#banelco').css('color', 'white');
        textoGrilla="DETALLE DE ARCHIVO: BANELCO";
        
        
        p_archivo='BAN';
        p_id_archivo='';
                        
    });
    
    
    $('#interbanking').click(function(){
        $('.custom-button').css("background-color","#e9e9ed");
        $('.custom-button').css("color","black");
        $('#interbanking').css("background-color","#3d0066");
        $('#interbanking').css('color', 'white');
        textoGrilla="DETALLE DE ARCHIVO: INTERBANKING";

        $("#titulo_main_grid").text("Archivos incorporados: INTERBANKING");

        p_archivo='INTBK';
        p_id_archivo='';
        
    });
    
    $('#e-pagos').click(function(){
        $('.custom-button').css("background-color","#e9e9ed");
        $('.custom-button').css("color","black");
        $('#e-pagos').css("background-color","#3d0066");
        $('#e-pagos').css('color', 'white');
        $("#titulo_main_grid").text("Archivos incorporados: EPAGO");
        textoGrilla="DETALLE DE ARCHIVO: E-PAGOS";

        $('#detalle_grid').jqGrid('clearGridData');
        
        p_archivo='EPAGO';
        p_id_archivo='';
        
        
    });
    
}



$("#btn_buscar").click(function(){
    
    if(p_archivo!=p_archivo_aux){
        deseleccionar_todo(p_archivo);
    }

    $("#banelco").attr('disabled',true);
    $("#interbanking").attr('disabled',true);
    $("#e-pagos").attr('disabled',true);


    $("#chk_ingresado").attr('disabled',true);

    $("#chk_controlado").attr('disabled',true);

    $("#chk_acreditado").attr('disabled',true);

    $("#chk_erroneo").attr('disabled',true);


    $("#f_desde").attr('disabled',true);

    $("#f_hasta").attr('disabled',true);

    $("#btn_buscar").attr('disabled', true);

    

    p_id_archivo='';
    
    filtros_no_nativos_ar = [];
    filtros_arr_main = [];

    if(p_filtro!= ''){
        filtros_arr_main.push("Tipo de archivo: "+p_archivo);

        filtros_arr_main.push("F. desde: "+p_f_desde);

        filtros_arr_main.push("F. hasta: "+p_f_hasta);

    };

    

    filtros_no_nativos_ar['main_grid_epago'] = filtros_arr_main;

    filtros_no_nativos_ar['main_grid_intbk'] = filtros_arr_main;

    filtros_no_nativos_ar['main_grid_ban'] = filtros_arr_main;
    
    setea_parametros('#main_grid',{'p_tipo_archivo':p_archivo,
        'p_filtro':p_filtro,
        'p_f_desde':p_f_desde,
        'p_f_hasta':p_f_hasta});
    
        setea_parametros('#main_grid_ban',{
            'p_filtro':p_filtro,
            'p_f_desde':p_f_desde,
            'p_f_hasta':p_f_hasta,
            'p_id_sesion':$("#id_sesion").val()});
        
            setea_parametros('#main_grid_intbk',{
            'p_filtro':p_filtro,
            'p_f_desde':p_f_desde,
            'p_f_hasta':p_f_hasta,
            'p_id_sesion':$("#id_sesion").val()});
    
            setea_parametros('#main_grid_epago',{
            'p_filtro':p_filtro,
            'p_f_desde':p_f_desde,
            'p_f_hasta':p_f_hasta,
            'p_id_sesion':$("#id_sesion").val()});
    
        $("#main_grid_intbk").trigger('reloadGrid');

        $('#main_grid').jqGrid('clearGridData');
        $('#detalle_grid').jqGrid('clearGridData');
        $("#suma_grid").jqGrid('clearGridData');

    setea_parametros('#detalle_grid',{
        'p_archivo':p_archivo,
        'p_id_archivo':p_id_archivo
    });

    $("#detalle_grid").setCaption(textoGrilla);

    p_archivo_aux=p_archivo;

    mostrarGrilla(p_archivo);
})