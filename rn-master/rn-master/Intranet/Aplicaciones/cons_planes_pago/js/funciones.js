function n_cuit_focusout(){
    if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "cons_planes_pago/autocomplete.php",
            type:"POST",
            dataType: 'JSON',
            data:{ p_oper:'cuit', filtro: limpia_cuit($('#n_cuit').val())},
            success: function(response){
                $('#main').procOverlay({visible:false});
                if (response){
                    $("#d_denominacion").val(response['D_DENOMINACION']);
                    $("#id_contribuyente").val(response['ID_CONTRIBUYENTE']);
                }
            }
        });
    }
}

function evento_boton(boton){
    var id = $("#planes_grid").getGridParam('selrow');
    if(id){
        switch (boton) {
            case ("btn_const_plan"):
                fun_btn_const_plan();
                break;
            case ("btn_honorarios"):
                fun_btn_honorarios();
                break;
            case ("btn_emitir_chequera"):
                fun_btn_emitir_chequera();
                break;
            case ("btn_contrato"):
                fun_btn_contrato();
                break;
            case ("btn_const_cad"):
                fun_btn_const_cad();
                break;
            case ("btn_contrato_pdf"):
                fun_btn_contrato_pdf();
                break;
        }
    }else{
        mostrar_validacion('Seleccione un registro de la grilla para continuar.');
    }
}

function fun_btn_const_plan(){
    mostrar_validacion('Reporte FACPL002.rdf en desarrollo.');

    // Add_Parameter(lista_id,'P_PLAN', TEXT_PARAMETER, :pp.n_plan_pago);
    // Add_Parameter(lista_id,'P_TIPO_PLAN', TEXT_PARAMETER, :pp.c_tipo_plan_pago);
    // Run_Product(REPORTS,'FACPL002.rdf',ASYNCHRONOUS,RUNTIME,FILESYSTEM,lista_id,null);
}

function fun_btn_honorarios(){
    mostrar_validacion('En desarrollo.');
    // bloques pph y ppr, lienzo c_honorario
}

function fun_btn_emitir_chequera(){
    mostrar_validacion('En desarrollo.');
    // bloque chequera, lienzo c_chequera

    // Add_Parameter(lista_id,'P_ID_SESION', TEXT_PARAMETER, sesion);
    // Run_Product(REPORTS,'RECAL075_pdf.rdf',SYNCHRONOUS,RUNTIME,FILESYSTEM,lista_id,null);
}

function fun_btn_contrato(){
    mostrar_validacion('33? Reportes En desarrollo.');
    // Select distinct d_archivo_contrato
    // from tipos_planes_de_pago
}

function fun_btn_const_cad(){
    mostrar_validacion('Reporte facpl041 En desarrollo.');
    // Add_Parameter(lista_id, 'N_PLAN_PAGO', TEXT_PARAMETER, :pp.n_plan_pago);
    // Add_Parameter(lista_id, 'C_TIPO_PLAN_PAGO', TEXT_PARAMETER, :pp.c_tipo_plan_pago);
    // Run_Product(REPORTS, 'facpl041', ASYNCHRONOUS, RUNTIME, FILESYSTEM, lista_id, null);
}
function fun_btn_contrato_pdf(){
    mostrar_validacion('En desarrollo.');
    // go_item('pp.PB_HONORARIOS');
    // imprimir_contrato_pdf;
    // reporte se guarda en :c/pdf
}