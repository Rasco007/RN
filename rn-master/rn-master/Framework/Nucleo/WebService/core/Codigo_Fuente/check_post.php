<?php

function seguridad_ws( $parametros_ar){

    $reemp = SEGURIDAD;
    foreach($parametros_ar as $variable => $valor){
        $data_json=array();
        $array_json = json_decode($valor.' ',true);

        if(!is_array($array_json)){
            $array_json=null;
        }
        if ($array_json != null && json_last_error() == JSON_ERROR_NONE){
            foreach($array_json as $indice_json => $valor_json) {

                $data_json_array= array();
                if(is_array($valor_json)){
                    foreach($valor_json as $indice_array => $valor_array){
                        $indice_array = str_ireplace ($reemp, "", $indice_array);
                        $data_json_array[$indice_array] = $valor_array;
                        $data_json_array[$indice_array] = str_ireplace ($reemp, "", $data_json_array[$indice_array]);
                    }
                    $data_json[$indice_json] = $data_json_array;
                }else{
                    $data_json[$indice_json] = $valor_json;
                    $data_json[$indice_json] = str_ireplace ($reemp, "", $data_json[$indice_json]);
                }

            }
            $parametros_ar[$variable] = json_encode($data_json);

            $data_json='';
        }else{
            $parametros_ar[$variable] = $valor;
            $parametros_ar[$variable] = str_ireplace ($reemp, "", $parametros_ar[$variable]);
        }
    }
    return $parametros_ar;

}
?>