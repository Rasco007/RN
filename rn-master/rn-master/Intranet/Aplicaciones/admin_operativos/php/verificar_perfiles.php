<?php
function verificar_perfiles($p_usuario)
{
    $procedure = "pac_operativos_fisca.fun_verificar_perfil(:p_usuario)";

    $parametros = array(':p_usuario' => $p_usuario);

    $data = getArrayResult($procedure, $parametros);

    return $data->datos[0];
}
?>