<?php
function traer_datos_operativo($p_n_operativo, $p_n_orden)
{
    $procedure = "pac_operativos_fisca.fun_traer_datos_operativo(:p_n_operativo, :p_n_orden)";

    $parametros = array(':p_n_operativo' => $p_n_operativo, ':p_n_orden' => $p_n_orden);

    $data = getArrayResult($procedure, $parametros);

    return $data->datos[0];
}
?>