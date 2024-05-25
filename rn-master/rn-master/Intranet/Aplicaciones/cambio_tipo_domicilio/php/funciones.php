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