<?php

$oper = $_POST['p_oper'];

switch ($oper) {
    case "getMensaje":
        $result = getMensaje();
        echo json_encode($result);
        break;

}

function getMensaje() {

    try {
        $respuesta = null;
        $p_id_conversacion = $_POST['id_conversacion'];

        $logon = new oci_Logon();
        $sql = "SELECT d_mensaje FROM PPAL.MSJ_CONVERSACION WHERE id_conversacion = :p_id_conversacion";

        $s = oci_parse($logon -> getCon(), $sql);
        oci_bind_by_name($s, ':p_id_conversacion', $p_id_conversacion);
        oci_execute($s);
        $arr = oci_fetch_array($s, OCI_ASSOC);

        $respuesta = array(
            'p_d_mensaje' => $arr['D_MENSAJE']
        );

        return($respuesta);
    } catch (Exception $e) {
        die( $e->getMessage());
    }

}
