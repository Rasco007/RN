function inicializarLupas() {
    $("#lupa_banco").lupa_generica({
        id_lista:v_lista_bancos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_banco',width:100},
            {index:'d_descrip',width:449}],
        caption:'Bancos',
        sortname:'c_banco',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_banco',
        exactField: 'c_banco',
        filtros: ['#c_banco'],
        filtrosNulos: [true],
        campos:{c_banco:'c_banco', d_descrip:'d_banco'},
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            if( $('#c_banco').val() == ''){
                $('#c_sucursal').val(null);
                $('#d_sucursal').val(null);
            }
        }
    });

    $("#lupa_sucursal").lupa_generica({
        id_lista:v_lista_sucursales,
        titulos:['Banco', 'Cod. Sucursal' , 'Descripción'],
        grid:[  {index:'c_banco',width:90},
                {index:'c_sucursal',width:130},
            {index:'d_descrip',width:328}],
        caption:'Sucursales',
        sortname:'c_sucursal',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_sucursal',
        exactField: 'c_sucursal',
        filtros: ['#c_banco', '#c_sucursal'],
        filtrosNulos: [true, true],
        campos:{c_sucursal:'c_sucursal', d_descrip:'d_sucursal'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_remito").lupa_generica({
        id_lista:v_lista_remitos,
        titulos:['Remito', 'Banco' , 'Desc. Banco', 'F. Remesa', 'Cantidad', 'Importe Remito'],
        grid:[{index:'n_remito',width:100},
                {index:'c_banco',width:100},
                {index:'d_descrip',width:300},
                {index:'f_remesa',width:100},
                {index:'n_cantidad',width:50},
                {index:'i_remito',width:100}],
        caption:'Remitos',
        sortname:'n_remito',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#n_remito',
        exactField: 'n_remito',
        campos:{n_remito:'n_remito', c_banco:'c_banco', d_descrip:'d_banco'},
        keyNav:true,
        limpiarCod: true,
    });
};




function procesar_remito(filas_marcadas){
    //PRC_BTN_PROCESAR
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_estado": null,
         "p_c_banco": $('#c_banco').val(),
         "p_d_banco": $('#d_banco').val(),
         "id_menu":p_id_menu,
         "n_orden":9
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                setea_parametros('#agrup_det_grid', {});
                                    
                if(data.p_estado == 'PROCESO FINALIZADO CORRECTAMENTE'){
                    mostrar_cuadro('S', 'Remito Procesado', data.p_estado);
                    $("#agrup_det_grid").trigger("reloadGrid");
                } else {
                   mostrar_cuadro('I', 'Informaci&oacute;n', data.p_estado);
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
};

function valida_nulo_consulta_remesa(){
    let c_banco = $('#c_banco').val();
    let c_manual = $('#check_manual').is(':checked');
    let c_automatico = $('#check_automat').is(':checked');
    let n_remito = $('#n_remito').val();

    if(!n_remito){
        if(!c_banco){
            mostrar_cuadro('I', 'Informaci&oacute;n', 'El campo Banco no puede quedar vac&iacute;o');
            return false;
        }
        if(!c_manual && !c_automatico){
            mostrar_cuadro('I', 'Informaci&oacute;n', 'Debe seleccionar Remesas Manuales y/o Automaticas');
            return false;
        }
    } 
    
    return true;   
};

function definir_checks(){
    let checks = [];
    
    let m_automatica_chequeada = $('#check_automat').is(':checked');
    let m_manual_chequeada = $('#check_manual').is(':checked');

    let m_automatica;
    let m_manual;

    if(m_automatica_chequeada){
        m_automatica = 'A';
    }else{
        m_automatica = '0';
    }

    if(m_manual_chequeada){
        m_manual = 'F';
    }else{
        m_manual = '0';
    }

    checks.push(m_automatica);
    checks.push(m_manual);

    return checks;
};

function llenar_checks(){
    let tipo_rendiciones = [];
    
    definir_checks(tipo_rendiciones);

    if(tipo_rendiciones[0] != 'A'){
        $("#check_automat").prop("checked", true);
    }
    if(tipo_rendiciones[1] != 'F'){
        $("#check_manual").prop("checked", true);
    }
}

function selectCheck(id_fila){
    let fila_chequeada = $('#'+id_fila).is(':checked');
    let num_fila = id_fila.split('_')[2];
    let marca = 0;

    if(fila_chequeada){
        marca = 1;
    }
    
    //PRC_ACTUALIZAR_MARCA_ACRED
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_marca": marca,
         "p_n_remito": $('#agrup_det_grid').getCell(num_fila, 'n_remito'),
         "id_menu":p_id_menu,
         "n_orden":7
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#agrup_det_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function selectCheckCasoEsp(id_fila){
    let fila_chequeada = $('#'+id_fila).is(':checked');
    let num_fila = id_fila.split('_')[3];
    let marca = 0;

    if(fila_chequeada){
        marca = 1;
    }
    //PRC_ACTUALIZAR_MARCA_CASOS_ESP
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_marca": marca,
         "p_n_secuencia": $('#casos_especiales_grid').getCell(num_fila, 'n_secuencia'),
         "id_menu":p_id_menu,
         "n_orden":11
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#casos_especiales_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function cargar_casos_especiales(){
    //prc_btn_casos_especiales
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_n_remito": p_remito_esp,
         "id_menu":p_id_menu,
         "n_orden":10
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                setea_parametros('#casos_especiales_grid', {});
                $('#casos_especiales_modal').modal('show');
                $(window).resize();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function borrar_tmp_casos_especiales(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "id_menu":p_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}


function limpiar_tmp() {
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{

            "id_menu":p_id_menu,
            "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){

            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}
