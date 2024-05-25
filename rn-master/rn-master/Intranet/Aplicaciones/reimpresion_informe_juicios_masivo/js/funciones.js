function generar_pdf(){
    let n_cuit_rep = null;
    if($('#n_cuit_rep').val()){
        n_cuit_rep = limpiar_formato_cuit($('#n_cuit_rep').val());
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_grupo": $('#id_grupo').val(),
         "p_seleccion": $('#n_seleccion').val(),
         "p_cuit_repres": n_cuit_rep,
         "p_monto_fiscalia": $('#monto_fisc').val(),
         "p_n_cuit": v_n_cuit,
         "p_desc_denom": v_d_denominacion,
         "p_id_contribuyente": v_id_contribuyente,
         "p_fecha_envio": v_fecha_envio,
         "p_f_confirmacion": v_f_confirmacion,
         "p_expediente": v_expediente,
         "p_generadas": null,
         "p_masivo": v_masivo,
         "p_chk_crear_pdf": v_chk_crear_pdf,
         "id_menu":v_id_menu,
         "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              $('#n_generadas').val(data.p_generadas);
              v_n_cuit = data.p_n_cuit;
              v_d_denominacion = data.p_desc_denom;
              v_id_contribuyente = data.p_id_contribuyente;
              v_fecha_envio = data.p_fecha_envio;
              v_f_confirmacion = data.p_f_confirmacion;
              v_expediente = data.p_expediente;

              filtros_arr_main = [];
              filtros_no_nativos_ar = [];

              
              filtros_arr_main.push('Grupo: '+ $('#id_grupo').val());
              filtros_arr_main.push('Selección: '+ $('#n_seleccion').val());
              if($('#monto_fisc').val()){
                filtros_arr_main.push('Monto Fiscalía: '+ $('#monto_fisc').val());
              }
              if($('#n_cuit_rep').val()){
                filtros_arr_main.push('CUIT Representante: '+ $('#n_cuit_rep').val());
              }
              filtros_no_nativos_ar['resultado_generacion_grid'] = filtros_arr_main;
              

              setea_parametros('#resultado_generacion_grid');
              $('#resultado_generacion_modal').modal('show');
              $(window).resize();
              resultado_cargado = true;
              mostrar_cuadro('S', 'Generación Finalizada', ' ');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function imprimir_liq_original(id_boleta_deuda,boton, tributo,deno_pre,deno_patro){
    let parametros = 'P_ID_BOLETA_DEUDA|' + id_boleta_deuda + 
                     '&P_VERIFICACION_TARDIA|' + 'N';
    let name_pdf;

    boton = 'BOLETA';

    if(deno_patro == null || deno_patro == ''){
        name_pdf = deno_pre+'_'+id_boleta_deuda+'_'+boton;
    }else{
        name_pdf = deno_pre+'_'+id_boleta_deuda+'_'+boton+'_'+deno_patro;
    }

                            
    llamar_report_file('COFL052', parametros, 'PDF',null,name_pdf);


}

function imprimir_demanda(p_id_boleta_deuda, p_boton, p_tributo,deno_pre,deno_patro){
    let parametros = 'P_PAR01|' + p_id_boleta_deuda + 
                     '&P_PAR02|' + p_boton +
                     '&P_PAR03|' + p_tributo;
    let name_pdf;
    if(p_boton == null || p_boton == ''){
        p_boton = 'DEMANDA';
    }else{
        p_boton = 'DEMANDA_'+p_boton;
    }

    if(deno_patro == null || deno_patro == ''){
        name_pdf = deno_pre+'_'+p_id_boleta_deuda+'_'+p_boton;
    }else{
        name_pdf = deno_pre+'_'+p_id_boleta_deuda+'_'+p_boton+'_'+deno_patro;
    }

    llamar_report_file('COFL055', parametros, 'PDF',null,name_pdf);
}

function limpiar_formato_cuit(n_cuit){
    if(n_cuit[2] != '-'){
        return n_cuit;
    } else{
        return n_cuit.replace(/-/g, '');
    }
}