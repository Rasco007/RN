<?php
$control_xss = false;
if ($_SESSION['entorno'] !='WEBSERVICE'){

    if (isset($_SERVER['HTTP_X_ID_MENU']) || isset($_POST['p_n_id_menu'])) {

        if (isset($_SERVER['HTTP_X_ID_MENU'])) {
            $param = array(':id_menu' => $_SERVER['HTTP_X_ID_MENU']);
        } else {
            $param = array(':id_menu' => $_POST['p_n_id_menu']);
        }

    }
    else{
        $v=explode('/', $_SERVER['HTTP_REFERER']);
        $php_referer = end ($v);

        if ($php_referer != ''){
            $db_query = new DB_Query("select listagg(id_menu, '|') within group (order by id_menu) as id_menu from menu
                                  where upper(d_url) = UPPER(:archivo_php)");

            $param = array(':archivo_php' =>$php_referer );

            $row_query = $db_query->do_query($param);

            $param = array(':id_menu' => $row_query[0]['ID_MENU']);
        }
        else{
            $control_xss = true;
        }
    }


    if ($control_xss == false){

        $db_query = new DB_Query("	select count(*) CANTIDAD 
                                        from  menu
                                        where id_menu IN ( SELECT *
                                                            FROM TABLE (
                                                                        CAST ( EXPLODE ('|',:id_menu) AS listtable)
                                                                        ) 
                                                         )
                                        and m_filtrar_param = 'S'");


        $row_query = $db_query->do_query($param);
        if ($row_query[0]['CANTIDAD'] > 0){

            $control_xss = true;
        }
    }

    if ($control_xss == true){


        if( isset($_POST) )    $_POST 	  = seguridad($_POST);
        if( isset($_GET) ) 	   $_GET 	  = seguridad($_GET);
        if( isset($_REQUEST) ) $_REQUEST  = seguridad($_REQUEST);

    }
}

function seguridad( $parametros_ar){

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