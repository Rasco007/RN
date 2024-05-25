

function initEventos(){
    $('#lupa_d_denominacion').hide();

   $("#n_cuit_filtro").mask("99-99999999-9");
   



    $('#btn_buscar').click(function(){
        let tipo_liq = $("#tipo_liq_filtro").val();
        let exp_admin = limpia_cuit($('#exp_admin_filtro').val());
        let id_contribuyente = $("#id_contribuyente_filtro").val();
        let n_cuit = $("#n_cuit_filtro").val();
        
        
        

        if(n_cuit == ''){

            mostrar_cuadro('E', 'Error', 'Se debe ingresar el CUIT');


        }else if(exp_admin == ''){
            mostrar_cuadro('E', 'Error','Se debe ingresar el expediente administrativo');

        }else{
        

            llamar_report('COFL024','P_C_EXPEDIENTE|'+exp_admin+
                        '&P_VERIFICACION_TARDIA|'+tipo_liq,'PDF');
        
            
        }
    
    });
    
   
    $('#btn_limpiar').click(function(){
        $('#n_cuit_filtro').val(null);
        $('#d_denominacion_filtro').val(null);
        $('#tipo_liq_filtro').val(null);
        $('#exp_admin_filtro').val(null);

        

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#d_denominacion_filtro').attr('readonly', false);
        $('#d_denominacion_filtro').attr('disabled', false);
    });

    
}



function inicializarLupas(){


    $("#lupa_exp_admin").lupa_generica({
        id_lista:v_lista_expedientes,
        titulos:['Expediente','Instancia', 'Descrip. Instancia','CUIT', 'Denominación','ID Contribuyente'],
        grid:[  {index:'c_expediente',width:120},
            {index:'c_instancia',width:110,hidden:true},
            {index:'d_dato',width:100, hidden:true},
            {index:'cuit',width:100},
            {index:'denominacion',width:170},
            {index:'id_contribuyente',width:100, hidden:true}],
        caption:'LISTADO DE EXPEDIENTES',
        sortname:'c_expediente',
        sortorder:'desc',
        campos:{c_expediente:'exp_admin_filtro',
        cuit:'n_cuit_filtro',
        denominacion:'d_denominacion_filtro', 
        id_contribuyente: 'id_contribuyente_filtro'},
        width:760,
        keyNav:true,
        searchInput: '#exp_admin_filtro',
        searchCode: true,
        filtros:['#id_contribuyente_filtro'],
        filtrosNulos:[true],
        filtrosTitulos:['ID contribuyente']
        
    });


    $("#lupa_d_denominacion").lupa_generica({
        id_lista: v_lista_denominaciones,
        titulos:['ID_contribuyente','CUIT', 'Denominación', 'Código tipo de documento','Tipo de Documento', 'Numero de Documento', 'F. Alta'],
        grid:[{index:'id_contribuyente',width:100, hidden: true},
        {index:'n_cuit',width:100},
            {index:'d_denominacion',width:200},
            {index:'c_tipo_documento',width:200, hidden: true},
            {index:'d_tipo_documento',width:140},
            {index:'n_documento',width:160},
            {index:'f_alta',width:80, hidden: true}],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion_filtro'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{n_cuit: 'n_cuit_filtro', d_denominacion:'d_denominacion_filtro'},
        keyNav:true,
        draggable:true,
        onClose(){
            if($('#n_cuit_filtro').val() != ''){
                completarDenominacion();
            }
        }
    });

   
    
function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit_filtro').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "ajax_genericos/autocomplete.php",
        type:"POST",
        dataType: "JSON",
        data:{oper: 3,term: cuit_sin_guiones},
        success: function(res) {
            $('#main').procOverlay({visible:false});
            if(res != null){
                var info = res.data_raz[0];
                $("#d_denominacion_filtro").val(info.razon_social);
                $("#id_contribuyente_filtro").val(info.id_contribuyente);
                $('#lupa_d_denominacion').show().css('display', 'table-cell');
                $('#mascara_lupa_d_denominacion').hide();
                $('#d_denominacion_mayuscula').val($('#d_denominacion_filtro').val().toUpperCase());
            }else{
                mostrar_cuadro('E', 'Error', 'No se ha encontrado un contribuyente para el cuit ingresado.');
                $("#d_denominacion_filtro").val(null);
                $("#id_contribuyente_filtro").val(null);
                $("#n_cuit_filtro").val(null);
            }
        }
    });
}
    
    $('#n_cuit_filtro').focusout(function(){
        if ($('#n_cuit_filtro').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit_filtro').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "reimpresion_informe_CyQ/php/autocomplete.php",
                        data: {oper:'2',term: limpia_cuit($('#n_cuit_filtro').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion_filtro").val(data.DENOMINACION);
                               
                                $("#id_contribuyente_filtro").val(data.ID_CONTRIBUYENTE);
        
                                         
                              }       
                        }
                    });
        
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });


    $('#d_denominacion_filtro').keydown(function () {
        if ($('#d_denominacion_filtro').val().length >= 2){
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });
}

