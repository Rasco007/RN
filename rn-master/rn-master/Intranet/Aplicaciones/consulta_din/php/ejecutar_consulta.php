<?php
    $p_d_procedimiento = $_POST['p_d_procedimiento'];
    $p_id_consulta_din = $_POST['p_id_consulta_din'];

    $parametros = array(':p_id_consulta_din'=>$p_id_consulta_din, ':p_error' => $p_error,':p_error_ora' => $p_error_ora,);


    $sql = "SELECT COUNT (1)     cant
            FROM PARAM_CONSULTA_DINAMICA_PARAM fp
            WHERE     ID_CONS_DINAMICA = (SELECT id_cons_dinamica
                                            FROM TMP_CONSULTAS_DINAMICAS
                                            WHERE ID_CONSULTA_DIN = :P_ID_CONSULTA_DIN)
                AND m_obligatorio = 'S'
                AND NOT EXISTS
                        (SELECT 1
                            FROM TMP_CONSULTAS_DINAMICAS_PARAM gp
                        WHERE     ID_CONSULTA_DIN = :P_ID_CONSULTA_DIN
                                AND fp.n_secuencia = gp.n_secuencia
                                AND gp.d_valor IS NOT NULL)
            ";

    $db_query = new DB_Query($sql);
    $rows = $db_query->do_query($parametros);

    if($rows[0]['CANT'] > 0){
        $result['resultado'] = "No se han cargado todos los campos obligatorios.";
    } else {
        $procedure = "begin ".$p_d_procedimiento."(:p_id_consulta_din, :p_error, :p_error_ora); end;";
    
        $p_error = '';
        $p_error_ora = '';
    
    
        $db_procedure = new DB_Procedure($procedure);
    
        $result = $db_procedure->execute_query($parametros);
    }


    echo json_encode($result);
?>