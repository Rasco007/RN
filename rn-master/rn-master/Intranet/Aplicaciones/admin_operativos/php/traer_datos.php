<?php
function traer_datos($p_n_tabla, $p_oper, $p_marca)
{
    if($p_oper == 'tablaGeneral'){
        $procedure = "pac_operativos_fisca.fun_traer_datos_tabla_general(:p_n_tabla, :p_n_marca)";

        $parametros = array(':p_n_tabla' => $p_n_tabla, ':p_n_marca' => $p_marca);

        $data = getArrayResult($procedure, $parametros);
    }

    if($p_oper == 'tributo'){
        $procedure = "pac_operativos_fisca.fun_traer_datos_tributo()";

        $parametros = array();

        $data = getArrayResult($procedure, $parametros);
    }

    if($p_oper == 'plantilla'){
        $procedure = "pac_operativos_fisca.fun_traer_datos_plantilla()";

        $parametros = array();

        $data = getArrayResult($procedure, $parametros);
    }

    return $data->datos;
}
?>