<?php
/**
 * Created by PhpStorm.
 * User: gochoa
 * Date: 07/03/2017
 * Time: 03:06 PM
 */
$accion = $_POST['accion'];

switch($accion){
    case 'sugerirClave':

        $parametros = array(':p_length' => 8);

        $db_query = new DB_Query("SELECT pac_encripta.sugerir_clave(:p_length) pass_nueva FROM dual");

        $row_query = $db_query->do_query($parametros);

        echo (json_encode($row_query[0]));
        break;
}
?>