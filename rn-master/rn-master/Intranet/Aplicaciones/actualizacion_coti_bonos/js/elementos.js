function init_elementos(){

    $(".datepicker").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#lupa_c_bono').lupa_generica({
        id_lista:v_lista_tipos_bonos,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Códigos de Especie',
        sortname:'d_descrip',
        sortorder:'asc',
        searchInput: '#bono_c_tipo',
        searchCode: true,
        limpiarCod: true,
        exactField: 'c_codigo',
        campos:{c_codigo:'bono_c_tipo',d_descrip:'bono_d_tipo'},
        keyNav:true
    });
}