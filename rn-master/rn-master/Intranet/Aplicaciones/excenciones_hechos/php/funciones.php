<?php
$oper = $_POST['p_oper'];

if ($oper === 'getDatosDomi'){
    $db_query = new DB_Query("SELECT dom.D_CALLE, dom.N_NUMERO, dom.D_MONOBLOCK, dom.D_PUERTA, dom.D_PISO, dom.D_MANZANA, dom.D_DEPTO,
                                               dom.D_OFICINA, dom.C_BEPO, dom.D_BEPO, dom.C_LOCALIDAD,
                                               (SELECT d_descrip FROM LOCALIDADES where c_localidad = dom.c_localidad and c_departamento = dom.c_departamento and c_provincia = dom.c_provincia) D_LOCALIDAD,
                                               dom.C_DEPARTAMENTO,
                                               (SELECT d_descrip FROM DEPARTAMENTOS where c_departamento = dom.c_departamento and c_provincia = dom.c_provincia) D_DEPARTAMENTO,
                                               dom.C_PROVINCIA,
                                               (SELECT d_dato FROM siat.tablas_generales where n_tabla = dom.N_TABLA_PROVINCIA and c_dato = dom.C_PROVINCIA) D_PROVINCIA,
                                               dom.C_POSTAL, dom.C_USUARIOALT, dom.N_OFICINA, dom.C_USUARIOACT, TRUNC(dom.F_ACTUALIZAC) F_ACTUALIZAC
                                          FROM domicilios dom
                                         WHERE     dom.ID_CONTRIBUYENTE = :p_id_contribuyente
                                               AND dom.C_TIPO_DOMICILIO = :p_c_tipo_domicilio");

    $par = array(':p_id_contribuyente' => $_POST['p_id_contribuyente'],':p_c_tipo_domicilio' => $_POST['p_c_tipo_domicilio']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'checkDigito'){
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:p_objeto_hecho) digito FROM DUAL");

    $par = array(':p_objeto_hecho' => $_POST['p_objeto_hecho']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getDatosAdicionales'){
    if ($_POST['p_c_tributo'] == 60){
        $db_query = new DB_Query("SELECT d_domicilio,
                                                   c_zona,
                                                   (SELECT d_dato
                                                      FROM siat.tablas_generales
                                                     WHERE n_tabla = n_tabla_zona AND c_dato = c_zona) d_zona,
                                                   (SELECT d_dato
                                                      FROM siat.tablas_generales
                                                     WHERE n_tabla = n_tabla_uso_prop AND c_dato = c_uso_prop) d_uso
                                              FROM inmuebles
                                             WHERE d_nomenclatura = :p_objeto_hecho");
    }elseif ($_POST['p_c_tributo'] == 90){
        $db_query = new DB_Query("SELECT a.d_patente_vieja,
                                    NVL2 (
                                       a.c_marca_aut,
                                       (SELECT d_dato
                                          FROM siat.tablas_generales
                                         WHERE n_tabla = a.n_tabla_marca_aut AND c_dato = a.c_marca_aut),
                                       a.d_texto_marca)                                marca,
                                    NVL2 (
                                       a.id_modelo,
                                       (SELECT d_descrip
                                          FROM aut_modelos am
                                         WHERE     am.id_modelo = a.id_modelo
                                               AND am.c_marca_aut = a.c_marca_aut),
                                       a.d_texto_modelo) modelo,
                                    case 
                                        when a.id_descripcion is not null then  
                                            (SELECT d_descrip
                                            FROM aut_descripcion ad
                                            WHERE ad.id_descripcion = a.id_descripcion
                                            AND ad.id_modelo = a.id_modelo
                                            AND ad.c_marca_aut = a.c_marca_aut)
                                        when a.id_descripcion is null and a.d_texto_descripcion is not null then a.d_texto_descripcion
                                        when a.c_fmcamod is not null and a.id_descripcion is null and a.d_texto_descripcion is null then
                                            (select d_marca||'-'||d_descripcion
                                            from siat.tab_acara_codigos   
                                            where c_fmcamod = a.c_fmcamod)
                                        else '?????????????????'
                                    end descripcion,
                                    a.n_modelo_año anio
                                FROM automotores a
                                WHERE d_patente = :p_objeto_hecho");
    }

    if($_POST['p_c_tributo'] == 60 || $_POST['p_c_tributo'] == 90){
        $par = array(':p_objeto_hecho' => $_POST['p_objeto_hecho']);
        $row_query = $db_query->do_query($par);
    }


    echo json_encode($row_query[0]);
}