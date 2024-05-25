<?php

$oper = $_POST['p_oper'];

switch ($oper) {
    case "getDatos":
        $result = getDatos();
        echo json_encode($result);
        break;

    case "getActividad":
        $result = getActividad();
        echo json_encode($result);
        break;

    case "trasladarSaF":
        $result = trasladarSaF();
        echo json_encode($result);
        break;

    case "getDatosVerif":
        $result = getDatosVerif();
        echo json_encode($result);
        break;

    case "getTratFiscal":
        $result = getTratFiscal();
        echo json_encode($result);
        break;

    case "getArticulo":
        $result = getArticulo();
        echo json_encode($result);
        break;

    case "getTotalDed":
        $result = getTotalDed();
        echo json_encode($result);
        break;

    case "getDeduccionesRSAnual":
        $result = getDeduccionesRSAnual();
        echo json_encode($result);
        break;

    case "getTiposActividad":
        $result = getTiposActividad();
        echo json_encode($result);
        break;

    case "getCategorias":
        $result = getCategorias();
        echo json_encode($result);
        break;

}

function getDeduccionesRSAnual() {
    $sql = "SELECT i_retencion, i_percepcion
            FROM   OBLIGACIONES om
                   INNER JOIN obligaciones oa
                       ON     om.id_contribuyente = oa.ID_CONTRIBUYENTE
                          AND om.c_tributo = oa.c_tributo
                          AND om.c_tipo_imponible = oa.c_tipo_imponible
                          AND om.n_posicion_fiscal = oa.n_posicion_fiscal
                          AND om.id_obligacion != oa.id_obligacion
                          AND oa.n_cuota_anticipo = 0
                   INNER JOIN DDJJ DJ
                       ON     dj.id_obligacion = oa.id_obligacion
                          AND dj.m_ult_presentada = 'S'
                   INNER JOIN DDJJ_DETALLE_ANUAL dd ON dd.id_ddjj = dj.id_ddjj
                   and dd.n_periodo = om.n_posicion_fiscal + om.n_cuota_anticipo
            WHERE  om.ID_OBLIGACION = :p_id_obligacion
            ";

    $db_query = new DB_Query($sql);

    $par =
        [':p_id_obligacion' => $_POST['p_id_obligacion']];

    $results = $db_query->do_query($par);

    if (!empty($results)){
        $result['i_retencion'] = $results[0]['I_RETENCION'];
        $result['i_percepcion'] =  $results[0]['I_PERCEPCION'];
        $result['resultado'] = 'DJ';
    }else{
        $result['resultado'] = 'NDJ';
    }

    return $result;
}

function getTotalDed() {
        $sql = "select nvl(sum(n_importe),0) total_ded
                FROM F109_DEDUCCIONES_DET	
                where   n_instancia = :p_n_instancia 
                        and n_orden = :p_n_orden 
                        and id_obligacion = :p_id_obligacion 
                        and c_tipo_deduccion = :p_c_tipo_deduccion";

    $db_query = new DB_Query($sql);

    $par =
        [':p_n_instancia' => $_POST['p_n_instancia'],
        ':p_n_orden' => $_POST['p_n_orden'],
        ':p_id_obligacion' => $_POST['p_id_obligacion'],
        ':p_c_tipo_deduccion' => $_POST['p_c_tipo_deduccion']
        ];

    $results = $db_query->do_query($par);

    if (!empty($results)){
        $result['i_total_deduccion'] = $results[0]['TOTAL_DED'];
        $result['resultado'] = 'OK';
    }else{
        $result['resultado'] = 'El código ingresado no pertenece a una Actividad.';
    }

    return $result;
}

function getDatos() {


    $sql = "SELECT o.id_obligacion,
                 o.id_contribuyente,
                 o.c_tributo,
                 o.n_posicion_fiscal,
                 o.n_cuota_anticipo,
                 o.n_posicion_fiscal || '/' || o.n_cuota_anticipo  AS pos_fiscal, 
                 o.d_objeto_hecho,
                 fun_formato_numerico(nvl(i_bonificado,0)) I_BONIFICADO, --BONIFICACION VERIFICADO
                 fun_formato_numerico(nvl(i_bonif_declarada,0)) I_BONIF_DECLARADA, --BONIFICACION DECLARADO
                 fun_formato_numerico(nvl(I_PAGOS_DECLA,0)) I_PAGOS_DECLA,--PAGOS DECLARADO
                 fun_formato_numerico(nvl(I_OTROS_CRED_DECLA,0)) I_OTROS_CRED_DECLA,--OTROS CREDITOS DECLARADO
                 fun_formato_numerico(nvl(I_OTROS_DEB_DECLA,0)) I_OTROS_DEB_DECLA,--OTROS DEBITOS DECLARADO
                 fun_formato_numerico(nvl(I_RET_DECL,0)) I_RET_DECL, --RETENIDO IIBB DECLARADO
                 fun_formato_numerico(nvl(I_RETENIDO,0)) I_RETENIDO, --RETENIDO IIBB VERIFICADO
                 fun_formato_numerico(nvl(I_RET_BANC_DECL,0)) I_RET_BANC_DECL, --RETENIDO BANCO DECLARADO
                 fun_formato_numerico(nvl(I_RET_BANC_VERIF,0)) I_RET_BANC_VERIF, --RETENIDO BANCO VERIFICADO
                 fun_formato_numerico(nvl(I_PER_DECL,0)) I_PER_DECL, --PERCEPCIONES DECLARADO
                 fun_formato_numerico(nvl(I_PERCIBIDO,0)) I_PERCIBIDO, --PERCEPCIONES VERIFICADO
                 fun_formato_numerico(nvl(I_PER_ADU_DECL,0)) I_PER_ADU_DECL, --PERCEPCIONES ADUANA DECLARADO
                 fun_formato_numerico(nvl(I_PER_ADU_VERIF,0)) I_PER_ADU_VERIF, --PERCEPCIONES ADUANA VERIFICADO
                 fun_formato_numerico(nvl(I_SALDO_FAVOR_DECL,0)) I_SALDO_FAVOR_DECL, --SALDO A FAVOR DECLARADO
                 fun_formato_numerico(nvl(I_SALDO_FAVOR,0)) I_SALDO_FAVOR, --SALDO A FAVOR VERIFICADO
                 fun_formato_numerico(nvl(I_OTROS_CRED_VERIF,0)) I_OTROS_CRED_VERIF, --OTROS CREDITOS VERIFICADO
                 fun_formato_numerico(nvl(I_OTROS_DEB_VERIF,0)) I_OTROS_DEB_VERIF, --OTROS DEBITOS VERIFICADO
                 fun_formato_numerico(nvl(I_PAGO_A_CUENTA,0)) I_PAGO_A_CUENTA, --CREDITOS ANTERIORES VERIFICADO
                 fun_formato_numerico(nvl(I_AJUSTE_MINIMO,0)) I_AJUSTE_MINIMO,--AJUSTE MINIMO VERIFICADO
                 fun_formato_numerico(nvl(I_PAGOS_POSTERIORES,0)) I_PAGOS_POSTERIORES, --CREDITOS ANTERIORES VERIFICADO
                 fun_formato_numerico(nvl(I_INTERES_DET,0) + nvl(SALDO_INTERES_CTACTE,0)) I_INTERES_DET,--INTERESES VERIFICADO
                 C_REGIMEN_DECLA, --REGIMEN DECLARADO
                 C_TIPO_ACTIVIDAD_DECLA, --TIPO ACTIVIDAD DECLARADO
                 C_CATEGORIA_DECLA, --CATEGORIA DECLARADO
                 C_REGIMEN_VERIF, --REGIMEN VERIFICADO
                 C_TIPO_ACTIVIDAD_VERIF, --TIPO ACTIVIDAD VERIFICADO
                 C_CATEGORIA_VERIF, --CATEGORIA VERIFICADO
                 I_IMPUESTO_DECLA_MONO, --IMPUESTO DECLARADO
                 I_IMPUESTO_VERIF_MONO, --IMPUESTO VERIFICADO
                 NVL(M_TRASLADO_SAF,'N') M_TRASLADO_SAF, --MARCA TRASLADAR SALDO
                 --FUN_FORMATO_NUMERICO(nvl(I_SALDO_VERIF,0)) I_SALDO_F_FISCA, --SALDO CONTR./SALDO ART,
                 FUN_FORMATO_NUMERICO(nvl(PAC_INSPECCIONES.FUN_GET_SALDO_FISCA_OBL (:p_n_instancia, :p_n_orden, :p_id_obligacion,'HIST'),0)) I_SALDO_F_FISCA, --SALDO CONTR./SALDO ART,  
                 M_APLICA_CTACTE,
                 (SELECT COUNT (1)
                      FROM cuenta_corriente
                     WHERE id_obligacion = o.id_obligacion AND c_tipo_movi = '22')
                       m_pago_prov,
                 (SELECT COUNT (1)
                      FROM cuenta_corriente
                     WHERE     id_obligacion = o.id_obligacion
                           AND c_tipo_movi IN ('14', '25'))
                       m_jcq,
                (SELECT COUNT (1)
                      FROM planes_de_pago_detalle pfpd, planes_de_pago pfp, cuenta_corriente cc
                     WHERE     pfpd.id_obligacion = o.id_obligacion
                           AND pfp.n_plan_pago = pfpd.n_plan_pago
                           AND pfp.f_efectivacion is not null
                           AND pfp.f_caducidad is null
                           AND pfp.f_cancelacion is null
                           AND cc.id_obligacion = o.id_obligacion
                           AND cc.c_tipo_movi IN ('7'))
                       m_pfp_vigente,
                 (select count(*) from cuenta_corriente  
                  where  id_obligacion = :p_id_obligacion
                         and c_tipo_movi = '48' 
                         and c_concepto_mov = '104' 
                 ) ANUL_SAF,
                 PAC_INSPECCIONES.FUN_GET_OBL(:p_n_instancia,:p_n_orden,'FIRST') FIRST_OBL
            FROM tmp_f13 tmp
                 INNER JOIN obligaciones o
                     ON o.id_obligacion = tmp.id_obligacion
           WHERE tmp.n_instancia = :p_n_instancia AND tmp.n_orden = :p_n_orden and tmp.id_obligacion = :p_id_obligacion";

    $db_query = new DB_Query($sql);

    $par = [':p_n_instancia' => $_POST['p_n_instancia'],
        ':p_n_orden' => $_POST['p_n_orden'],
        ':p_id_obligacion' => $_POST['p_id_obligacion']];

    $results = $db_query->do_query($par);

    if (!empty($results)){
        /*DATOS GENERALES*/
        $result['id_obligacion'] = $results[0]['ID_OBLIGACION'];
        $result['id_contribuyente'] = $results[0]['ID_CONTRIBUYENTE'];
        $result['c_tributo'] = $results[0]['C_TRIBUTO'];
        $result['n_posicion_fiscal'] = $results[0]['N_POSICION_FISCAL'];
        $result['n_cuota_anticipo'] = $results[0]['N_CUOTA_ANTICIPO'];
        $result['pos_fiscal'] = $results[0]['POS_FISCAL'];
        $result['m_aplica_ctacte'] = $results[0]['M_APLICA_CTACTE'];
        $result['d_objeto_hecho'] = $results[0]['D_OBJETO_HECHO'];



        /*DATOS REGIMEN DECLARADO*/
        $result['c_regimen_decla'] = $results[0]['C_REGIMEN_DECLA'];
        $result['c_tipo_actividad_decla'] = $results[0]['C_TIPO_ACTIVIDAD_DECLA'];
        $result['c_categoria_decla'] = $results[0]['C_CATEGORIA_DECLA'];
        $result['i_impuesto_decla_mono'] = $results[0]['I_IMPUESTO_DECLA_MONO'];

        /*DATOS REGIMEN VERIFICADO*/
        $result['c_regimen_verif'] = $results[0]['C_REGIMEN_VERIF'];
        $result['c_tipo_actividad_verif'] = $results[0]['C_TIPO_ACTIVIDAD_VERIF'];
        $result['c_categoria_verif'] = $results[0]['C_CATEGORIA_VERIF'];
        $result['i_impuesto_verif_mono'] = $results[0]['I_IMPUESTO_VERIF_MONO'];

        /*SECCION SEMAFORO*/
        if ($results[0]['M_PAGO_PROV'] > 0){
            $result['m_pago_prov'] = 'S';
        }else{
            $result['m_pago_prov'] = 'N';
        }
        if ($results[0]['M_JCQ'] > 0){
            $result['m_jcq'] = 'S';
        }else{
            $result['m_jcq'] = 'N';
        }
        if ($results[0]['M_PFP_VIGENTE'] > 0){
            $result['m_pfp_vigente'] = 'S';
        }else{
            $result['m_pfp_vigente'] = 'N';
        }

        /*SECCION DECLARADOS*/
        $result['i_ret_decl'] = $results[0]['I_RET_DECL'];
        $result['i_ret_banc_decl'] = $results[0]['I_RET_BANC_DECL'];
        $result['i_per_decl'] = $results[0]['I_PER_DECL'];
        $result['i_per_adu_decl'] = $results[0]['I_PER_ADU_DECL'];
        $result['i_saldo_favor_decl'] = $results[0]['I_SALDO_FAVOR_DECL'];
        $result['i_pagos_decl'] = $results[0]['I_PAGOS_DECLA'];
        $result['i_otros_cred_decl'] = $results[0]['I_OTROS_CRED_DECLA'];
        $result['i_otros_deb_decl'] = $results[0]['I_OTROS_DEB_DECLA'];
        $result['i_bonif_decl'] = $results[0]['I_BONIF_DECLARADA'];

        /*SECCION VERIFICADOS*/
        $result['i_ret_verif'] = $results[0]['I_RETENIDO'];
        $result['i_ret_banc_verif'] = $results[0]['I_RET_BANC_VERIF'];
        $result['i_per_verif'] = $results[0]['I_PERCIBIDO'];
        $result['i_per_adu_verif'] = $results[0]['I_PER_ADU_VERIF'];
        $result['i_saldo_favor_verif'] = $results[0]['I_SALDO_FAVOR'];
        $result['i_cred_ant_verif'] = $results[0]['I_PAGO_A_CUENTA'];
        $result['i_otros_cred_verif'] = $results[0]['I_OTROS_CRED_VERIF'];
        $result['i_otros_deb_verif'] = $results[0]['I_OTROS_DEB_VERIF'];
        $result['i_bonif_verif'] = $results[0]['I_BONIFICADO'];
        $result['i_ajuste_min_verif'] = $results[0]['I_AJUSTE_MINIMO'];
        $result['i_cred_post_verif'] = $results[0]['I_PAGOS_POSTERIORES'];
        $result['i_intereses_verif'] = $results[0]['I_INTERES_DET'];
        $result['anul_saf'] = $results[0]['ANUL_SAF'];
        $result['first_obl'] = $results[0]['FIRST_OBL'];

        /*Marca Trasladar Saldo*/
        $result['m_traslado_saf'] = $results[0]['M_TRASLADO_SAF'];

        /*SALDO CONTR. / SALDO ART*/
        $result['i_saldo_f_fisca'] = $results[0]['I_SALDO_F_FISCA'];

        $sql ="SELECT   PAC_INSPECCIONES.FUN_GET_OBL(:p_n_instancia, :p_n_orden, 'ANT',:p_id_obligacion)  obl_ant,--FUN_DEVUELVE_OBL_INSTANCIA(:p_n_instancia, :p_n_orden, :p_pos_fis, :p_n_c_ant, 'ANT') obl_ant,
                        PAC_INSPECCIONES.FUN_GET_OBL(:p_n_instancia, :p_n_orden, 'SIG',:p_id_obligacion)  obl_sig  --FUN_DEVUELVE_OBL_INSTANCIA(:p_n_instancia, :p_n_orden, :p_pos_fis, :p_n_c_ant, 'SIG') obl_sig 
                FROM DUAL";

        $db_query = new DB_Query($sql);

        $par = [':p_n_instancia' => $_POST['p_n_instancia'],
            ':p_n_orden' => $_POST['p_n_orden'],
            ':p_id_obligacion' => $_POST['p_id_obligacion']];

        $results = $db_query->do_query($par);

        $result['obl_ant'] = $results[0]['OBL_ANT'];
        $result['obl_sig'] = $results[0]['OBL_SIG'];
        $result['resultado'] = 'OK';
    }else{
        $result['resultado'] = 'NOOK';
    }

    return $result;
}

function getActividad() {
    if ($_POST['p_c_tributo'] == '10'){
        $sql = "SELECT SUBSTR (d_actividad_completa, 1, 3500) d_actividad
                  FROM nomenclador_actividades
                 WHERE     c_actividad = :p_c_actividad
                       AND (   (    F_VIG_DESDE >= TO_DATE ( :p_f_posicion_fiscal, 'DD-MM-YYYY\')
                                AND id_nomenclador = 'NAES')
                            OR (    F_VIG_DESDE < TO_DATE ( :p_f_posicion_fiscal, 'DD-MM-YYYY\')
                                AND id_nomenclador = 'IIBB'))
                       AND (   F_VIG_HASTA >= TO_DATE ( :p_f_posicion_fiscal, 'DD-MM-YYYY\')
                            OR F_VIG_HASTA IS NULL)";
    }else{
        $sql = "SELECT SUBSTR (d_actividad_completa, 1, 3500) d_actividad
                  FROM nomenclador_actividades_CM
                 WHERE     c_actividad = :p_c_actividad
                       AND (   (    F_VIG_DESDE >= TO_DATE ( :p_f_posicion_fiscal, 'DD-MM-YYYY\')
                                AND id_nomenclador = 'NAES')
                            OR (    F_VIG_DESDE < TO_DATE ( :p_f_posicion_fiscal, 'DD-MM-YYYY\')
                                AND id_nomenclador = 'CUACM'))
                       AND (   F_VIG_HASTA >= TO_DATE ( :p_f_posicion_fiscal, 'DD-MM-YYYY\')
                            OR F_VIG_HASTA IS NULL)";
    }

    $db_query = new DB_Query($sql);

    $par = [':p_c_actividad' => $_POST['p_c_actividad'],
        ':p_f_posicion_fiscal' => $_POST['p_f_posicion_fiscal']];

    $results = $db_query->do_query($par);

    if (!empty($results)){
        $result['d_actividad'] = $results[0]['D_ACTIVIDAD'];
        $result['resultado'] = 'OK';
    }else{
        $result['resultado'] = 'El código ingresado no pertenece a una Actividad.';
    }

    return $result;
}

function getTratFiscal() {

    $sql = "select c_dato c_dato, d_dato D_TRAT_FISCAL
            from tablas_generales where n_tabla = 322 and to_number(c_dato) = to_number(:p_c_trat_fiscal)";


    $db_query = new DB_Query($sql);

    $par = [':p_c_trat_fiscal' => $_POST['p_c_trat_fiscal']];

    $results = $db_query->do_query($par);

    if (!empty($results)){
        $result['d_trat_fiscal'] = $results[0]['D_TRAT_FISCAL'];
        $result['resultado'] = 'OK';
    }else{
        $result['resultado'] = 'El código ingresado no pertenece a un tratamiento fiscal.';
    }

    return $result;
}

function getArticulo() {

    $sql = "select c_dato c_dato, d_dato D_ARTICULO
            from tablas_generales where n_tabla = 247 and d_dato1 = :p_c_articulo";


    $db_query = new DB_Query($sql);

    $par = [':p_c_articulo' => $_POST['p_c_articulo']];

    $results = $db_query->do_query($par);

    if (!empty($results)){
        $result['d_articulo'] = $results[0]['D_ARTICULO'];
        $result['resultado'] = 'OK';
    }else{
        $result['resultado'] = 'El código ingresado no pertenece a un Artículo.';
    }

    return $result;
}

function trasladarSaF() {
    $sql = "UPDATE tmp_f13
               SET m_traslado_saf = :p_m_trasladar
             WHERE     n_instancia = :p_n_instancia
                   AND n_orden = :p_n_orden
                   AND id_obligacion = :p_id_obligacion";

    $db_query = new DB_Query($sql);

    $par = [':p_m_trasladar' => $_POST['p_m_trasladar'],
        ':p_n_instancia' => $_POST['p_n_instancia'],
        ':p_n_orden' => $_POST['p_n_orden'],
        ':p_id_obligacion' => $_POST['p_id_obligacion']];

    $results = $db_query->do_query($par);
    $db_query->db_commit();

    if ($_POST['p_m_trasladar'] == 'S'){
        $param_prc = array(
            ':p_n_instancia' => $_POST['p_n_instancia'],
            ':p_n_orden' => $_POST['p_n_orden'],
            ':p_id_obligacion_desde' => $_POST['p_id_obligacion'],
            ':p_error' => NULL,
            ':p_error_ora' => NULL,
        );
        $sql = "BEGIN PAC_INSPECCIONES.PRC_ARRASTRAR_SALDO( :p_n_instancia,
    										                :p_n_orden,
                                                            :p_id_obligacion_desde,
                                                            :p_error,
                                                            :p_error_ora);
                                      END;";

        $db_procedure = new DB_Procedure($sql);
        $db_procedure->setQuery($sql);
        $results = $db_procedure->execute_query($param_prc);

        $result['p_error'] = $param_prc{':p_error'};
        if ($result['p_error']){
            $result['resultado'] = 'NOOK';
        }else{
            $result['resultado'] = 'OK';
        }

    }else{
        $result['resultado'] = 'OK';
    }

    return $result;
}

function getDatosVerif() {
    $sql = "SELECT fun_formato_numerico(nvl(i_bonificado,0)) I_BONIFICADO, --BONIFICACION VERIFICADO
                 fun_formato_numerico(nvl(I_RETENIDO,0)) I_RETENIDO, --RETENIDO IIBB VERIFICADO
                 fun_formato_numerico(nvl(I_RET_BANC_VERIF,0)) I_RET_BANC_VERIF, --RETENIDO BANCO VERIFICADO
                 fun_formato_numerico(nvl(I_PERCIBIDO,0)) I_PERCIBIDO, --PERCEPCIONES VERIFICADO
                 fun_formato_numerico(nvl(I_PER_ADU_VERIF,0)) I_PER_ADU_VERIF, --PERCEPCIONES ADUANA VERIFICADO
                 fun_formato_numerico(nvl(I_SALDO_FAVOR,0)) I_SALDO_FAVOR, --SALDO A FAVOR VERIFICADO
                 fun_formato_numerico(nvl(I_OTROS_CRED_VERIF,0)) I_OTROS_CRED_VERIF, --OTROS CREDITOS VERIFICADO
                 fun_formato_numerico(nvl(I_OTROS_DEB_VERIF,0)) I_OTROS_DEB_VERIF, --OTROS DEBITOS VERIFICADO
                 fun_formato_numerico(nvl(I_PAGO_A_CUENTA,0)) I_PAGO_A_CUENTA, --CREDITOS ANTERIORES VERIFICADO
                 fun_formato_numerico(nvl(I_AJUSTE_MINIMO,0)) I_AJUSTE_MINIMO,--AJUSTE MINIMO VERIFICADO
                 fun_formato_numerico(nvl(I_PAGOS_POSTERIORES,0)) I_PAGOS_POSTERIORES, --CREDITOS ANTERIORES VERIFICADO
                 fun_formato_numerico(nvl(I_INTERES_DET,0)) I_INTERES_DET,--INTERESES VERIFICADO
                 C_REGIMEN_VERIF, --REGIMEN VERIFICADO
                 C_TIPO_ACTIVIDAD_VERIF, --TIPO ACTIVIDAD VERIFICADO
                 C_CATEGORIA_VERIF, --CATEGORIA VERIFICADO
                 I_IMPUESTO_VERIF_MONO, --IMPUESTO VERIFICADO
                 FUN_FORMATO_NUMERICO(nvl(PAC_INSPECCIONES.FUN_GET_SALDO_FISCA_OBL (:p_n_instancia, :p_n_orden, :p_id_obligacion,'HIST'),0)) I_SALDO_F_FISCA, --SALDO CONTR./SALDO ART,
                 (select count(*) from cuenta_corriente  
                  where  id_obligacion = :p_id_obligacion
                         and c_tipo_movi = '48' 
                         and c_concepto_mov = '104' 
                 ) ANUL_SAF,
                 PAC_INSPECCIONES.FUN_GET_OBL(:p_n_instancia,:p_n_orden,'FIRST') FIRST_OBL
            FROM tmp_f13 tmp
                 INNER JOIN obligaciones o
                     ON o.id_obligacion = tmp.id_obligacion
           WHERE tmp.n_instancia = :p_n_instancia AND tmp.n_orden = :p_n_orden and tmp.id_obligacion = :p_id_obligacion";

    $db_query = new DB_Query($sql);

    $par = [':p_n_instancia' => $_POST['p_n_instancia'],
        ':p_n_orden' => $_POST['p_n_orden'],
        ':p_id_obligacion' => $_POST['p_id_obligacion']];

    $results = $db_query->do_query($par);

    if (!empty($results)){
        /*DATOS REGIMEN VERIFICADO*/
        $result['c_regimen_verif'] = $results[0]['C_REGIMEN_VERIF'];
        $result['c_tipo_actividad_verif'] = $results[0]['C_TIPO_ACTIVIDAD_VERIF'];
        $result['c_categoria_verif'] = $results[0]['C_CATEGORIA_VERIF'];
        $result['i_impuesto_verif_mono'] = $results[0]['I_IMPUESTO_VERIF_MONO'];

        /*SECCION VERIFICADOS*/
        $result['i_ret_verif'] = $results[0]['I_RETENIDO'];
        $result['i_ret_banc_verif'] = $results[0]['I_RET_BANC_VERIF'];
        $result['i_per_verif'] = $results[0]['I_PERCIBIDO'];
        $result['i_per_adu_verif'] = $results[0]['I_PER_ADU_VERIF'];
        $result['i_saldo_favor_verif'] = $results[0]['I_SALDO_FAVOR'];
        $result['i_cred_ant_verif'] = $results[0]['I_PAGO_A_CUENTA'];
        $result['i_otros_cred_verif'] = $results[0]['I_OTROS_CRED_VERIF'];
        $result['i_otros_deb_verif'] = $results[0]['I_OTROS_DEB_VERIF'];
        $result['i_bonif_verif'] = $results[0]['I_BONIFICADO'];
        $result['i_ajuste_min_verif'] = $results[0]['I_AJUSTE_MINIMO'];
        $result['i_cred_post_verif'] = $results[0]['I_PAGOS_POSTERIORES'];
        $result['i_intereses_verif'] = $results[0]['I_INTERES_DET'];

        /*SALDO CONTR. / SALDO ART*/
        $result['i_saldo_f_fisca'] = $results[0]['I_SALDO_F_FISCA'];

        $result['anul_saf'] = $results[0]['ANUL_SAF'];
        $result['first_obl'] = $results[0]['FIRST_OBL'];

        $result['resultado'] = 'OK';
    }else{
        $result['resultado'] = 'NOOK';
    }

    return $result;
}

function getTiposActividad() {

    $sql = "SELECT DISTINCT cb.c_tipo_actividad, tg.d_dato
            FROM   categorias_ib cb
                   INNER JOIN tablas_generales tg
                       ON tg.n_tabla = 40 AND tg.c_dato = cb.c_tipo_actividad
            WHERE      cb.c_regimen = :p_c_regimen_verif
                   AND (SELECT n_posicion_fiscal + n_cuota_anticipo AS n_pos_fiscal
                        FROM   obligaciones
                        WHERE  id_obligacion = :p_id_obligacion) BETWEEN TO_NUMBER (
                                                                         TO_CHAR (
                                                                             cb.f_vigencia_desde,
                                                                             'RRRRMM'))
                                                                 AND TO_NUMBER (
                                                                         TO_CHAR (
                                                                             NVL (
                                                                                 cb.f_vigencia_hasta,
                                                                                 SYSDATE),
                                                                             'RRRRMM'))";

    $db_query = new DB_Query($sql);
    $par = [':p_id_obligacion' => $_POST['p_id_obligacion'],
            ':p_c_regimen_verif'=> $_POST['p_c_regimen_verif']
            ];
    $results = $db_query->do_query($par);

    if (!empty($results)){
        $result['tiposActividades'] = $results;
        $result['resultado'] = 'OK';
    }else{
        $result['resultado'] = 'NOOK';
    }

    return $result;
}


function getCategorias() {

    $sql = "SELECT CB.C_CATEGORIA C_CATEGORIA
            FROM   categorias_ib cb
            WHERE      cb.c_regimen = :p_c_regimen_verif
                   AND (SELECT n_posicion_fiscal + n_cuota_anticipo AS n_pos_fiscal
                        FROM   obligaciones
                        WHERE  id_obligacion = :p_id_obligacion) BETWEEN TO_NUMBER (TO_CHAR (cb.f_vigencia_desde, 'RRRRMM'))
                                  AND TO_NUMBER (
                                          TO_CHAR (NVL (cb.f_vigencia_hasta, SYSDATE),
                                                   'RRRRMM'))
                   AND CB.C_TIPO_ACTIVIDAD = :p_c_tipo_actividad
            ";

    $db_query = new DB_Query($sql);
    $par = [':p_id_obligacion' => $_POST['p_id_obligacion'],
            ':p_c_regimen_verif'=> $_POST['p_c_regimen_verif'],
            ':p_c_tipo_actividad'=> $_POST['p_c_tipo_actividad']
    ];
    $results = $db_query->do_query($par);

    if (!empty($results)){
        $result['categorias'] = $results;
        $result['resultado'] = 'OK';
    }else{
        $result['resultado'] = 'NOOK';
    }

    return $result;
}