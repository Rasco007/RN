<?php

$oper = $_POST['p_oper'];

if ($oper === 'checkDigito') {
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:param) digito FROM DUAL");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'completarInfo'){
    $db_query = new DB_Query("select d_patente,siat.fun_calcula_digito_verificador(d_patente) c_verificador
                                        from automotores where d_patente_vieja = :param");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'cargarDatos'){
    $db_query = new DB_Query("select v.c_marca_aut, v.m_sin_convocatoria, v.id_modelo, v.id_descripcion, v.c_tipo,
       v.c_grupo, v.n_peso_cilindrada, v.n_modelo_año, v.m_nacional_importado,
       v.c_combustible, v.d_patente_vieja,siat.fun_calcula_digito_verificador(v.d_patente_vieja) c_verificador_ant, v.f_inscripcion, v.f_radicacion,
nvl((select d_dato from tablas_generales tg
     where n_tabla = v.n_tabla_marca_aut and c_dato = v.c_marca_aut),d_texto_marca) d_marca,
nvl((select am.d_descrip from aut_modelos am
     where am.n_tabla_marca_aut = v.n_tabla_marca_aut
     and am.c_marca_aut = v.c_marca_aut and am.id_modelo = v.id_modelo),d_texto_modelo) d_modelo,   
nvl((select ad.d_descrip from aut_descripcion ad
     where  ad.n_tabla_marca = v.n_tabla_marca_aut
     and ad.c_marca_aut = v.c_marca_aut and ad.id_modelo = v.id_modelo
     and ad.id_descripcion = v.id_descripcion),d_texto_descripcion) d_descripcion,
(select d_dato from tablas_generales tg
  where n_tabla = v.n_tabla_tipo and c_dato = v.c_tipo) d_tipo,
(select d_dato from tablas_generales tg
  where n_tabla = v.n_tabla_grupo and c_dato = v.c_grupo) d_grupo,
(select d_dato from tablas_generales tg
  where n_tabla = v.n_tabla_combustible and c_dato = v.c_combustible) d_combustible,
  v.d_patente         
from automotores v where d_patente = :param");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'validaPatenteVieja') {
    $db_query = new DB_Query("SELECT SIAT.fun_valida_patente_anterior (:param) retorno FROM DUAL");

    $par = array(':param' => $_POST['patente']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}