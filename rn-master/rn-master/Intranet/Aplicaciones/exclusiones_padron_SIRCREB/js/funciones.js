function valida_fechas(formid) {
    if(formid){
        var f_desde = $("#f_certificado",formid).val();
        var f_hasta = $("#f_validez",formid).val();

        const [diaDesde, mesDesde, anioDesde] = f_desde.split('/');
        const [diaHasta, mesHasta, anioHasta] = f_hasta.split('/');

        const fechaDesde = new Date(anioDesde, mesDesde - 1, diaDesde);
        const fechaHasta = new Date(anioHasta, mesHasta - 1, diaHasta);

        if(f_hasta !== ''){
            return fechaHasta >= fechaDesde;
        }else{
            return true;
        }
    }else{
        var f_desde = $("#f_padron_desde",formid).val();
        var f_hasta = $("#f_padron_hasta",formid).val();

        const [diaDesde, mesDesde, anioDesde] = f_desde.split('/');
        const [diaHasta, mesHasta, anioHasta] = f_hasta.split('/');

        const fechaDesde = new Date(anioDesde, mesDesde - 1, diaDesde);
        const fechaHasta = new Date(anioHasta, mesHasta - 1, diaHasta);

        if(f_hasta !== ''){
            return fechaHasta >= fechaDesde;
        }else{
            return true;
        }
    }
}

function limpiar_campos() {
    $('#d_denominacion_filtro').val(null);
    $('#n_cuit_filtro').val(null);
    $('#c_tributo_filtro').val(null);
    $('#d_tributo_filtro').val(null);
    $('#observaciones_filtro').val(null);
    $('#c_alicuota_filtro').val(null);
    $('#d_alicuota_filtro').val(null);
    $('#padron_hasta_filtro').val(null);
    $('#padron_desde_filtro').val(null);
    $('#d_objeto_hecho_filtro').val(null);
    $('#id_contribuyente_filtro').val(null);
    $('#f_padron_hasta').val(null);

    $('#detalles_grid').clearGridData();

    $('#bt_informe_detalles_grid_pager').hide();
    $('#div_d_msg').hide();
    $('#id_contribuyente').hide();
    $('#gridWrapper_detalle').hide();

    $('#n_cuit_filtro').attr('disabled', false);
    $('#d_denominacion_filtro').attr('disabled', false);
    $('#c_tributo_filtro').attr('disabled', false);
    $('#d_objeto_hecho_filtro').attr('disabled', false);
    $('#c_alicuota_filtro').attr('disabled', false);
    $('#f_padron_hasta').attr('disabled', false);
    $('#f_padron_desde').attr('disabled', false);
    $('#btn_buscar').attr('disabled',false);

    $('#mascara_lupa_c_tributo_filtro').hide();
    $('#lupa_c_tributo_filtro').show().css('display', 'table-cell');

    $('#mascara_lupa_c_alicuota_filtro').hide();
    $('#lupa_c_alicuota_filtro').show().css('display', 'table-cell');

    $('#mascara_lupa_d_denominacion').hide();
    $('#lupa_d_denominacion').show().css('display', 'table-cell');

    $('#mascara_lupa_obj_hecho_filtro').hide();
    $('#lupa_obj_hecho_filtro').show().css('display', 'table-cell');
}

function subtractDays(date, days) {
    date.setDate(date.getDate() - days);
    return date;
}

const today = new Date();
const ninetyDaysAgo = subtractDays(today, 90);

const formattedDate = ninetyDaysAgo.toISOString().slice(0, 10).split('-').reverse().join('/');

document.getElementById('fecha-div').innerHTML = `Exclusiones/Reducciones alicuotas SIRCREB con "F. Padrón Hasta" mayor o igual a ${formattedDate}`;
