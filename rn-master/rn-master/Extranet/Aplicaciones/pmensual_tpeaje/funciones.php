<?php

$oper = $_POST['p_oper'];

if ($oper === 'getDatos'){
    if ($_POST['p_c_clase_aut']){

        $param_query = array();

        $db_query = new DB_Query("SELECT N_VAL_FIJO importe, fun_formato_numerico(N_VAL_FIJO,2) importe_form, tg.d_dato
                                      FROM alicuotas al, siat.tablas_generales tg
                                     WHERE al.c_codigo2 = tg.c_dato
                                           AND tg.n_tabla = 340    
                                           AND al.c_codigo2 = :p_c_clase_aut
                                           AND al.c_codigo1 = '390'
                                           AND al.f_vig_desde =
                                               (SELECT MAX (f_vig_desde)
                                                  FROM alicuotas
                                                 WHERE c_codigo2 = :p_c_clase_aut
                                                 AND c_codigo1 = '390' 
                                                 AND f_vig_desde <= trunc(SYSDATE)
                                                 AND (f_vig_hasta is null or f_vig_hasta >= trunc(SYSDATE)))");

        $param_query = array(':p_c_clase_aut'=>$_POST['p_c_clase_aut']);

        $row_query = $db_query->do_query($param_query);

        $result->importe = $row_query[0]['IMPORTE'];
        $result->importe_form = $row_query[0]['IMPORTE_FORM'];
        $result->tipos_aut = $row_query[0]['D_DATO'];
    }else{
        $db_query = new DB_Query("SELECT C_DATO, D_DATO, a.N_VAL_FIJO importe ,fun_formato_numerico(a.N_VAL_FIJO) importe_form
                                      FROM siat.tablas_generales tg
                                           INNER JOIN alicuotas a ON tg.c_dato = a.c_codigo2 AND c_codigo1 = '390'
                                           AND f_vig_desde =
                                               (SELECT MAX (f_vig_desde)
                                                  FROM alicuotas
                                                 WHERE     c_codigo2 = a.c_codigo2
                                                       AND c_codigo1 = '390'
                                                       AND f_vig_desde <= trunc(SYSDATE)
                                                       AND (f_vig_hasta IS NULL OR f_vig_hasta >= trunc(SYSDATE)))
                                     WHERE n_tabla = 340");

        $param_query = array();

        $row_query = $db_query->do_query($param_query);

        $result->tipos_aut = $row_query;
    }

    $result->resultado = 'OK';
    echo json_encode($result);
}

if ($oper === 'validarVigencia'){
    try{
        $param_query = array();

        $db_query = new DB_Query("SELECT COUNT (1) total
                                          FROM PASES_MENSUALES
                                         WHERE     D_PATENTE = :p_d_patente
                                               AND C_CLASE_AUT = :p_c_clase_aut
                                               AND F_PAGO IS NOT NULL
                                               AND F_VIG_HASTA >= TRUNC (SYSDATE)");

        $param_query = array(':p_d_patente'=>$_POST['p_d_patente'],':p_c_clase_aut'=>$_POST['p_c_clase_aut']);

        $row_query = $db_query->do_query($param_query);

        if ($row_query[0]['TOTAL'] > 0){
            $result->resultado = 'NOOK';
            $result->error = 'Este dominio ya registra un pase mensual vigente.';
        }else{
            $db_query = new DB_Query("SELECT COUNT (1) total
                                                  FROM PASES_MENSUALES
                                                 WHERE     D_PATENTE = :p_d_patente
                                                       AND C_CLASE_AUT = :p_c_clase_aut
                                                       AND F_COMPRA <= TRUNC(SYSDATE)
                                                       AND F_VIG_HASTA IS NULL");

            $param_query = array(':p_d_patente'=>$_POST['p_d_patente'],':p_c_clase_aut'=>$_POST['p_c_clase_aut']);

            $row_query = $db_query->do_query($param_query);

            if ($row_query[0]['TOTAL'] > 0) {
                $result->falta_pago = 'SI';
            }
            $result->resultado = 'OK';
        }
    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    echo json_encode($result);
}