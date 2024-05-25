<?php

$p_oper = $_POST['p_oper'];

if($p_oper === "valida_lote"){
    $p_id_sesion = $_POST['p_id_sesion'];

    $db_query = new DB_Query(
        "SELECT distinct
            case when trunc(sysdate) <= (select distinct f_vto_2 from boletas_emitidas where id_sesion = :p_id_sesion) then 'S'
                else 'N'
            end f_valida,
            case when exists(SELECT 1 from pagos_efectuados 
                where n_comprobante in(select to_char(id_boletas) from boletas_emitidas where id_sesion = :p_id_sesion) 
                and c_tipo_form = 'BA') then 'S'
                else 'N'
            end m_pagas 
        from dual");

    $param = array(':p_id_sesion' => $p_id_sesion);
    $row_query = $db_query->do_query($param);

    if ($row_query[0]['F_VALIDA'] == 'S' && $row_query[0]['M_PAGAS'] == 'N'){
        $result->resultado = 'OK';
    }else{
        $result->resultado = 'NOOK';
        if($row_query[0]['F_VALIDA'] == 'N'){
            $result->d_error = 'FECHA';
        }else{
           if($row_query[0]['M_PAGAS'] == 'S'){
                $result->d_error = 'PAGO';
           }
        }
    }

    echo json_encode($result);
}

if($p_oper === "valida_boleta"){
    $p_id_sesion = $_POST['p_id_sesion'];
    $p_id_boleta = $_POST['p_id_boleta'];

    $db_query = new DB_Query(
        "SELECT 
            case 
                when f_valida = 'N' and m_paga ='S' then 'NOOK'
                when f_valida = 'N' and m_paga ='N' then 'FECHA'
                when f_valida = 'S' and m_paga ='S' then 'PAGO'
                when f_valida = 'S' and m_paga ='N' then 'OK'
            end error
        FROM (SELECT distinct
                case when trunc(sysdate) <= (select distinct f_vto_2 from boletas_emitidas where id_sesion = :p_id_sesion) then 'S'
                    else 'N'
                end f_valida,
                case when exists(SELECT 1 from pagos_efectuados 
                        where n_comprobante = to_char(:p_id_boleta)
                        and c_tipo_form = 'BA') then 'S'
                    else 'N'
                end m_paga
            from dual)");

    $param = array(':p_id_sesion' => $p_id_sesion, ':p_id_boleta' => $p_id_boleta);
    $row_query = $db_query->do_query($param);

    switch ($row_query[0]['ERROR']){
        case 'OK': $result->resultado = 'OK';
            break;
        case 'NOOK': $result->resultado = 'NOOK';
            break;
        case 'FECHA': $result->resultado = 'FECHA';
            break;
        case 'PAGO': $result->resultado = 'PAGO';
            break;
    }

    echo json_encode($result);
}

if($p_oper === "valida_orden"){
    $p_id_sesion = $_POST['p_id_sesion'];
    $p_id_boleta = $_POST['p_id_boleta'];

    if(isset($p_id_boleta)){
        $db_query = new DB_Query(
            "SELECT distinct 1 existe from boletas_emitidas
            where id_sesion = :p_id_sesion
            and id_boletas = :p_id_boleta
            and n_orden=0");    
        $param = array(':p_id_sesion' => $p_id_sesion, ':p_id_boleta' => $p_id_boleta);
    }else{
        $db_query = new DB_Query(
            "SELECT distinct 1 existe from boletas_emitidas
            where id_sesion = :p_id_sesion
            and n_orden=0");
        $param = array(':p_id_sesion' => $p_id_sesion);
    }

    $row_query = $db_query->do_query($param);

    if (!isset($row_query[0]['EXISTE'])){
        $result->resultado = 'OK';
    }else{
        $result->resultado = 'NOOK';
    }

    echo json_encode($result);
}

?>