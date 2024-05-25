<?php
function traer_datos()
{
    $procedure = "pkg_ddjj_agentes.fun_traer_datos";

    $parametros = array();

    $data = getArrayResult($procedure, $parametros);

    return $data->datos;
}
?>