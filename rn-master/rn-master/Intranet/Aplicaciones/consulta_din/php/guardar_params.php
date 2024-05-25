<?php
    $array_parametros = array();
    $array_valores = array();
    $array_nombres = array();

    $solo_valores = $_POST['p_solo_valores'];
    if ($solo_valores == 'S'){
        $arr_par[':p_vec_par'] = $_POST['parametros'];
    } else if ($solo_valores == 'N'){
        $arr_par[':p_vec_par'] = json_decode($_POST['parametros'], true);
    }

    $parametros[':p_error'] = NULL;
    $parametros[':p_error_ora'] = NULL;

    $parametros[':p_id_cons_dinamica'] =  $_POST['p_id_cons_dinamica'];
    $parametros[':p_id_consulta_din'] =  $_POST['p_id_consulta_din'];

    if($solo_valores == 'S'){
    
        $array_parametros = array(
            ':vec_params' => $arr_par[':p_vec_par'],
        );
    
        $db_procedure = new DB_Procedure(
            "begin PAC_CONS_DINAMICA.PRC_AGREGAR_PARAM_WORKFLOW(
                :p_id_cons_dinamica,
                :p_id_consulta_din,
                :vec_params,
                :p_error,
                :p_error_ora
            );
            END;"
        );

    } else {
        foreach ($arr_par[':p_vec_par'] as $key => $value){
            if(substr($key,-5) !='_DESC'){
                $array_valores[] = $value;
                $array_nombres[] = $key;
            }
        }
    
        $array_parametros = array(
            ':vec_nombres' => $array_nombres,
            ':vec_valores' => $array_valores
        );
    
        $db_procedure = new DB_Procedure(
            "begin PAC_CONS_DINAMICA.PRC_EDITAR_PARAM(
                :p_id_cons_dinamica,
                :p_id_consulta_din,
                :vec_nombres,
                :vec_valores,
                :p_error,
                :p_error_ora
            );
            END;"
        );
    }

    
    $response = $db_procedure->execute_query($parametros,$array_parametros);
    echo json_encode($response);
?>
