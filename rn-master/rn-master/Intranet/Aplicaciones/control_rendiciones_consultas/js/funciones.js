function inicializarLupas() {
    $("#lupa_banco").lupa_generica({
        id_lista:v_lista_bancos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_banco',width:100},
            {index:'d_descrip',width:450}],
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
    });

    $("#lupa_sucursal").lupa_generica({
        id_lista:v_lista_sucursales,
        titulos:['Banco', 'Cod. Sucursal' , 'Descripción'],
        grid:[  {index:'c_banco',width:100},
                {index:'c_sucursal',width:130},
            {index:'d_descrip',width:450}],
        caption:'Sucursales',
        sortname:'c_sucursal, c_banco',
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
}
function definir_checks(checks){
    let m_automatica_chequeada = $('#check_automat').is(':checked');
    let m_manual_chequeada = $('#check_manual').is(':checked');
    let m_normal_chequeada = $('#check_normal').is(':checked');
    let m_rts_chequeada = $('#check_rts').is(':checked');

    let m_automatica;
    let m_manual;
    let m_normal;
    let m_rts;

    if(m_automatica_chequeada){
        m_automatica = 'A';
    }else{
        m_automatica = '0';
    }

    if(m_manual_chequeada){
        m_manual = 'M';
    }else{
        m_manual = '0';
    }

    if(m_normal_chequeada){
        m_normal = 'NORMAL';
    }else{
        m_normal = '0';
    }

    if(m_rts_chequeada){
        m_rts = 'RTS';
    }else{
        m_rts = '0';
    }

    checks.push(m_automatica);
    checks.push(m_manual);
    checks.push(m_normal);
    checks.push(m_rts);

    return checks;
};
function llenar_checks(){
    let tipo_rendiciones = [];
    
    definir_checks(tipo_rendiciones);

    if(tipo_rendiciones[0] != 'A'){
        $("#check_automat").prop("checked", true);
    }
    if(tipo_rendiciones[1] != 'M'){
        $("#check_manual").prop("checked", true);
    }
    if(tipo_rendiciones[2] != 'NORMAL'){
        $("#check_normal").prop("checked", true);
    }
    if(tipo_rendiciones[3] != 'RTS'){
        $("#check_rts").prop("checked", true);
    }
}

function validar_nulos(){
    let c_banco = $('#c_banco').val();
    let m_automatica_chequeada = $('#check_automat').is(':checked');
    let m_manual_chequeada = $('#check_manual').is(':checked');
    let m_normal_chequeada = $('#check_normal').is(':checked');
    let m_rts_chequeada = $('#check_rts').is(':checked');

    let valido = true;
    let msj_error;

    if(!c_banco){
        msj_error = 'Debe seleccioner un Banco';
        valido = false;
    }
    else if(!m_automatica_chequeada && !m_manual_chequeada){
        msj_error = 'Debe seleccioner al menos un Tipo de Rendicion, AUTOMATICA o MANUAL'
        valido = false;
    } 
    else if(!m_normal_chequeada && !m_rts_chequeada){
        msj_error = 'Debe seleccioner al menos un Tipo de Rendicion, NORMAL o RTS'
        valido = false;
    }

    return [valido, msj_error];
}

function verificar_btn_controlar(){
    let tipo_rendiciones = [];
    
    definir_checks(tipo_rendiciones);

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_f_acred": $('#f_acred').val(),
         "p_f_pago": $('#f_pago').val(),
         "p_c_banco": $('#c_banco').val(),
         "p_c_sucursal": $('#c_sucursal').val(),
         "p_m_automatica": tipo_rendiciones[0],
         "p_m_manual": tipo_rendiciones[1],
         "p_m_normal": tipo_rendiciones[2],
         "p_m_rts": tipo_rendiciones[3],
         "id_menu":p_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(data.retorno == 1 && p_modo != 'C'){
                    $("#btn_controlado").prop("disabled", false);
                } else{
                    $("#btn_controlado").prop("disabled", true);
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function controlar(){
    let tipo_rendiciones = [];
    
    definir_checks(tipo_rendiciones);

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_banco": $('#c_banco').val(),
         "p_c_sucursal": $('#c_sucursal').val(),
         "p_f_acred": $('#f_acred').val(),
         "p_f_pago": $('#f_pago').val(),
         "p_m_automatica": tipo_rendiciones[0],
         "p_m_manual": tipo_rendiciones[1],
         "p_m_normal": tipo_rendiciones[2],
         "p_m_rts": tipo_rendiciones[3],
         "id_menu":p_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                setea_parametros('#rendiciones_grid', {'p_f_acred': $('#f_acred').val(),
                                                    'p_f_pago': $('#f_pago').val(),
                                                    'p_c_banco': $('#c_banco').val(),
                                                    'p_c_sucursal': $('#c_sucursal').val(),
                                                    'p_m_automatica': tipo_rendiciones[0],
                                                    'p_m_manual':tipo_rendiciones[1],
                                                    'p_m_normal':tipo_rendiciones[2],
                                                    'p_m_rts':tipo_rendiciones[3]});
                verificar_btn_controlar();
                $("#btn_controlado").prop("disabled", true);
                mostrar_cuadro('I', 'Informaci&oacute;n', 'El proceso finaliz&oacute; correctamente');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function carga_tmp() {
    let tipo_rendiciones = [];

    definir_checks(tipo_rendiciones);

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_f_acred": $('#f_acred').val(),
            "p_f_pago": $('#f_pago').val(),
            "p_c_banco": $('#c_banco').val(),
            "p_c_sucursal": $('#c_sucursal').val(),
            "p_m_automatica": tipo_rendiciones[0],
            "p_m_manual": tipo_rendiciones[1],
            "p_m_normal": tipo_rendiciones[2],
            "p_m_rts": tipo_rendiciones[3],
            "id_menu":p_id_menu,
            "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
               alert(data.p_id_sesion);
               console.log(data.p_id_sesion);
                id_sesion = data.p_id_sesion
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}