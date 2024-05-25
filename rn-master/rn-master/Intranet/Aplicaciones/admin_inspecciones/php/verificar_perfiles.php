<?php
function verificar_perfiles($p_usuario)
{
    $procedure = "pac_admin_inspecciones.fun_verificar_perfiles(:p_usuario)";

    $parametros = array(':p_usuario' => $p_usuario);

    $data = getArrayResult($procedure, $parametros);

    return $data->datos[0];
}
?>