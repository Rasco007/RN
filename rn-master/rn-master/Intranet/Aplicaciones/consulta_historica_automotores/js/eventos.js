function inicializa_eventos(){

    $("#anio_filtro").mask("9999");
    $("#mes_filtro").mask("99");
    $('#lupa_d_patente').hide();
    $('#lupa_d_patente_vieja').hide();


    $('#c_motivo_alta').attr('disabled', false);
    $('#d_motivo_alta').attr('disabled', false);
    $('#f_desarme').attr('disabled', false);
    $('#f_transfor').attr('disabled', false);
    $('#f_radicacion').attr('disabled', false);
    $('#c_rnpa').attr('disabled', false);
    $('#d_rnpa').attr('disabled', false);
    $('#f_auditoria').attr('disabled', false);
    $('#d_usuario').attr('disabled', false);
    $('#c_operacion').attr('disabled', false);
    $('#f_inscripcion').attr('disabled', false);
    $('#d_operacion').attr('disabled', false);


    $('#c_motivo_alta').attr('readonly', true);
    $('#d_motivo_alta').attr('readonly', true);
    $('#f_desarme').attr('readonly', true);
    $('#f_transfor').attr('readonly', true);
    $('#f_radicacion').attr('readonly', true);
    $('#c_rnpa').attr('readonly', true);
    $('#d_rnpa').attr('readonly', true);
    $('#f_auditoria').attr('readonly', true);
    $('#d_usuario').attr('readonly', true);
    $('#c_operacion').attr('readonly', true);
    $('#f_inscripcion').attr('readonly', true);
    $('#d_operacion').attr('readonly', true);
    
    $(".datepicker").datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });
   

    $('#btn_limpiar').click(function(){
        
        $('#d_patente_filtro').val(null);
        $('#d_patente_vieja_filtro').val(null);
        $('#c_motivo_alta').val(null);
        $('#d_motivo_alta').val(null);
        $('#f_desarme').val(null);
        $('#f_transfor').val(null);
        $('#f_radicacion').val(null);
        $('#c_rnpa').val(null);
        $('#d_rnpa').val(null);
        $('#f_auditoria').val(null);
        $('#d_usuario').val(null);
        $('#c_operacion').val(null);
        $('#f_inscripcion').val(null);
        $('#d_operacion').val(null);
        
        
        
        $('#d_patente_filtro').attr('disabled', false);
        $('#d_patente_vieja_filtro').attr('disabled', false);

        $('#mascara_lupa_d_patente').show().css('display', 'table-cell');
        $('#mascara_lupa_d_patente_vieja').show().css('display', 'table-cell');
        $('#lupa_d_patente').hide();
        $('#lupa_d_patente_vieja').hide();

        $("#sin_convocatoria").prop("checked", false);

        $('#main_grid').clearGridData();

         setea_parametros('#main_grid',{
                ':p_d_patente':null});
        

    });
    $("#btn_buscar").click(function(){

        if(!$('#d_patente_filtro').val()){
            mostrar_cuadro('E', 'Error', 'Debe ingresar un Dominio');
    
        }else{

            $('#d_patente_filtro').attr('disabled', true);
            $('#d_patente_vieja_filtro').attr('disabled', true);

            $('#mascara_lupa_d_patente').show().css('display', 'table-cell');
            $('#mascara_lupa_d_patente_vieja').show().css('display', 'table-cell');
            $('#lupa_d_patente').hide();
            $('#lupa_d_patente_vieja').hide();

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($("#d_patente_filtro").val() != ''){
                filtros_arr_main.push('Dominio: '+ $("#d_patente_filtro").val());
            }
            if($("#d_patente_vieja_filtro").val() != ''){
                filtros_arr_main.push('Dominio Anterior: '+ $("#d_patente_vieja_filtro").val());
            }
            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;

             setea_parametros('#main_grid',{
            ':p_d_patente':$('#d_patente_filtro').val()});



            $.ajax({
                type:'POST',
                url: "consulta_historica_automotores/php/autocomplete.php",
                data: {oper:'2',term: $('#d_patente_filtro').val(),term1: $('#d_patente_vieja_filtro').val()},
                dataType: 'json',
                success: function( data ) {
                    ajax_autocomplete = null;
                    if(data) {
                        $("#c_motivo_alta").val(data.C_MOTIVO_ALTA);
                        $("#d_motivo_alta").val(data.D_MOTIVO_ALTA);
                        $("#f_desarme").val(data.F_BAJA);

                        $("#f_transfor").val(data.F_TRANSFOR);
                        $("#f_radicacion").val(data.F_RADICACION);
                        $("#c_rnpa").val(data.C_RNPA);
                        $("#d_rnpa").val(data.D_RNPA);
                        
                        $("#f_auditoria").val(data.F_AUDITORIA);
                        $("#d_usuario").val(data.D_USUARIO);

                        $("#c_operacion").val(data.C_OPERACION);
                        $("#f_inscripcion").val(data.F_INSCRIPCION);

                        $("#d_operacion").val(data.D_OPERACION);

                        if(data.M_SIN_CONVOCATORIA){
                            $("#sin_convocatoria").prop("checked", true);
                        }

                      }       
                }
            });

        }
        
       
    });



    
     
    $("#d_patente_filtro").focusout(function () {
        if($('#d_patente_filtro').val() == "" && $('#d_patente_vieja_filtro').val() == ""){
            $('#btn_buscar').attr('disabled', true);
        } else{
            $('#btn_buscar').attr('disabled', false);
        }
    });


    $('#d_patente_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_patente').show().css('display', 'table-cell');
            $('#mascara_lupa_d_patente').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_patente').hide();
            $('#mascara_lupa_d_patente').show().css('display', 'table-cell');
            $('#id_contribuyente_filtro').val(null);
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_d_patente').hide();
            $('#mascara_lupa_d_patente').show().css('display', 'table-cell');
            $('#id_contribuyente_filtro').val(null);
        }
    });

    $('#d_patente_vieja_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_patente_vieja').show().css('display', 'table-cell');
            $('#mascara_lupa_d_patente_vieja').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_patente_vieja').hide();
            $('#mascara_lupa_d_patente_vieja').show().css('display', 'table-cell');
            $('#id_contribuyente_filtro').val(null);
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_d_patente_vieja').hide();
            $('#mascara_lupa_d_patente_vieja').show().css('display', 'table-cell');
            $('#id_contribuyente_filtro').val(null);
        }
    });

}


function inicializa_lupas(){

    $("#lupa_d_patente").lupa_generica({
        id_lista: v_lista_dominios,
        titulos:['Dominio','Dominio Anterior'],
        grid:[{index:'d_patente',width:282},
            {index:'d_patente_vieja',width:283}],
        caption:'Lista de Dominios',
        sortname:'d_patente',
        sortorder:'asc',
        campos:{d_patente:'d_patente_filtro',d_patente_vieja:'d_patente_vieja_filtro'},
        filtros:['#d_patente_filtro'],
        filtrosTitulos:['Dominio'],
        filtrosNulos:[false],
        keyNav:true,
    });

    $("#lupa_d_patente_vieja").lupa_generica({
        id_lista: v_lista_dominios_viejos,
        titulos:['Dominio','Dominio Anterior'],
        grid:[{index:'d_patente',width:282},
            {index:'d_patente_vieja',width:283}],
        caption:'Lista de Dominios Anteriores',
        sortname:'d_patente',
        sortorder:'asc',
        campos:{d_patente:'d_patente_filtro',d_patente_vieja:'d_patente_vieja_filtro'},
        filtros:['#d_patente_vieja_filtro'],
        filtrosTitulos:['Dominio Anterior'],
        filtrosNulos:[false],
        keyNav:true,
    });

}



