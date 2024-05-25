<?php
function traer_datos($p_n_tabla)
{
    $procedure = "pac_admin_inspecciones.fun_traer_datos_tabla_general(:p_n_tabla)";

    $parametros = array(':p_n_tabla' => $p_n_tabla);

    $data = getArrayResult($procedure, $parametros);

    return $data->datos;
}
?>