function init_eventos(){

    $('.numerico').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $('.alfanumerico').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57) || (tecla.charCode >= 65 && tecla.charCode <= 90);
    });

    $('#btn_buscar').click(function () {
        $("#btn_buscar").attr('disabled',true);
        $('#frm_consulta :input').prop('readonly',true);
        $('#contenedor_grilla').show();
        setea_parametros('#d_historicos_grid',{':p_tributo':p_tributo,':p_objeto':$('#objeto').val(),
            ':p_cd_mov_hist':$('#cd_mov_hist').val(), ':p_dt_mov_hist_audit':$('#dt_mov_hist_audit').val(),
            ':p_dt_mov_audit':$('#dt_mov_audit').val(), ':p_tm_mov_audit':$('#tm_mov_audit').val(),
            ':p_cd_docu_ref':$('#cd_docu_ref').val(), ':p_provincia':$('#provincia').val(),
            ':p_oficina':$('#oficina').val(), ':p_cd_user_audit':$('#cd_user_audit').val(),
            ':p_cd_prog_audit':$('#cd_prog_audit').val()},'S');
    });

    $('#btn_limpiar').click(function () {
        resetearFiltros();
    });

    $('#btn_modificar_historico').click(function () {
        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            async:false,
            data:{
                "p_row_id": $('#rowid').val(),
                "p_cd_mov_hist": $('#edit_cd_mov_hist').val(),
                "p_dt_mov_hist_audit": $('#edit_dt_mov_hist_audit').val(),
                "p_dt_mov_audit": $('#edit_dt_mov_audit').val(),
                "p_tm_mov_audit": $('#edit_tm_mov_audit').val(),
                "p_provincia": $('#edit_provincia').val(),
                "p_oficina": $('#edit_oficina').val(),
                "p_cd_user_audit": $('#edit_cd_user_audit').val(),
                "p_cd_prog_audit": $('#edit_cd_prog_audit').val(),
                "p_cd_docu_ref": $('#edit_cd_docu_ref').val(),
                "id_menu":v_id_menu,
                "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible: false});
                if(data.resultado == 'OK'){
                    $('#edit_historico').modal("hide");
                    mostrar_confirmacion("Registro actualizado");
                    $('#btn_buscar').click();
                }
                else{
                    mostrar_error(data.resultado);
                    return;
                }
            }
        });
    });
}

