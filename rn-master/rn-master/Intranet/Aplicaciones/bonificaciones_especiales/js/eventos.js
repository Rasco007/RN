function init_eventos(){
    $("#btn_buscar").click(function(){
        if(!chequearNulos()){
            mostrar_cuadro('E','Atencion','Ingresar valores de filtro');
        }else{
            setea_parametros($("#main_Grid"),{
                ':p_c_tributo':$("#c_tributo").val(),
                ':p_c_objeto':$("#c_objeto").val()
            })
        }
        

    });

    

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999").change(function () {
        if ($(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });
}

