<?php
$oper = ($_REQUEST['oper']);
$c_provincia = ($_REQUEST['c_provincia']);
$c_departamento = ($_REQUEST['c_departamento']);
$c_ente = ($_REQUEST['c_ente']);
$c_organismo = ($_REQUEST['c_organismo']);
$n_cuit = ($_REQUEST['n_cuit']);
$id_infraccion = ($_REQUEST['id_infraccion']);
$f_generacion = ($_REQUEST['f_generacion']);
$m_persona = ($_REQUEST['m_persona']);
$id_contribuyente = ($_REQUEST['id_contribuyente']);
$id_multa = ($_REQUEST['id_multa']);
$i_multa = ($_REQUEST['i_multa']);
$i_multa_ori = ($_REQUEST['i_multa_ori']);
$i_monto_fijo_desde = ($_REQUEST['i_monto_fijo_desde']);
$i_monto_fijo_hasta = ($_REQUEST['i_monto_fijo_hasta']);
$p_descuento_vto = ($_REQUEST['p_descuento_vto']);

if($oper == 'departamentos'){
    $db_query = new DB_Query("select c_departamento, d_descrip from siat.departamentos where c_provincia = :c_provincia");
    $par = array(':c_provincia' => $c_provincia);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++){
        $result.='<option value="'.$row_query[$i]['C_DEPARTAMENTO'].'">'.$row_query[$i]['D_DESCRIP']." - Cod: ".$row_query[$i]['C_DEPARTAMENTO'].'</option>';
    }

    echo $result;
}

if ($oper == 'localidades'){
    $db_query = new DB_Query("select c_localidad, d_descrip, c_postal from siat.localidades where c_provincia = :c_provincia and c_departamento = :c_departamento");
    $par = array(':c_provincia' => $c_provincia,':c_departamento' => $c_departamento);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++){
        $result.='<option value="'.$row_query[$i]['C_LOCALIDAD'].'" data-cpostal="'.$row_query[$i]['C_POSTAL'].'">'.$row_query[$i]['D_DESCRIP']." - Cod: ".$row_query[$i]['C_LOCALIDAD'].'</option>';
    }

    echo $result;
}

if ($oper == 'delegacion'){
    $db_query = new DB_Query(
        "select c_organismo, d_organismo from param_organismos o where o.c_ente = :c_ente"
    );
    $par = array(':c_ente' => $c_ente);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++){
        $result.='<option value="'.$row_query[$i]['C_ORGANISMO'].'">'.$row_query[$i]['D_ORGANISMO'].'</option>';
    }

    echo $result;
}

if ($oper == 'tipo_multas'){
    $db_query = new DB_Query(
        "select id_infraccion, d_infraccion from param_infracciones p,  param_organismos o where o.c_ente = :c_ente and o.c_organismo = :c_organismo and p.c_ente = o.c_ente"
    );
    $par = array(':c_ente' => $c_ente, ':c_organismo' => $c_organismo);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++){
        $result.='<option value="'.$row_query[$i]['ID_INFRACCION'].'">'.$row_query[$i]['D_INFRACCION'].'</option>';
    }

    echo $result;
}

if ($oper == 'contrib'){
    $db_query = new DB_Query(
        "select id_contribuyente, d_denominacion, m_persona c_personeria, (case when m_persona = 'F' then 'Humana' else 'Jurídica' end) d_personeria,
			(select c_forma_juridica from siat.personas_juridicas where id_contribuyente = c.id_contribuyente) c_forma_juridica,
			(select (select d_dato from siat.tablas_generales where n_tabla = j.n_tabla_forma_jur and c_dato = j.c_forma_juridica)
			from siat.personas_juridicas j where j.id_contribuyente = c.id_contribuyente) d_forma_juridica,
			c_tipo_documento, (select d_dato from siat.tablas_generales where n_tabla = c.n_tabla_tipo_doc and c_dato = c.c_tipo_documento) d_tipo_documento,
			n_documento from siat.contribuyentes c where n_cuit = :n_cuit");
    $par = array(':n_cuit' => $n_cuit);
    $row_query = $db_query->do_query($par);

    $result->id_contribuyente = $row_query[0]['ID_CONTRIBUYENTE'];
    $result->d_denominacion = $row_query[0]['D_DENOMINACION'];
    $result->c_personeria = $row_query[0]['C_PERSONERIA'];
    $result->d_personeria = $row_query[0]['D_PERSONERIA'];
    $result->c_forma_jur = $row_query[0]['C_FORMA_JURIDICA'];
    $result->d_forma_jur = $row_query[0]['D_FORMA_JURIDICA'];
    $result->c_tipo_doc = $row_query[0]['C_TIPO_DOCUMENTO'];
    $result->d_tipo_doc = $row_query[0]['D_TIPO_DOCUMENTO'];
    $result->n_documento = $row_query[0]['N_DOCUMENTO'];

    $db_query = new DB_Query(
        "select v.n_telefono from (
				select nvl(n_telefono1, n_telefono2) n_telefono from siat.telefonos where id_contribuyente = :id_contribuyente
				and trunc(sysdate) between trunc(f_vig_desde) and nvl(f_vig_hasta, trunc(sysdate))
				and (n_telefono1 is not null or n_telefono2 is not null) order by trunc(f_vig_desde) desc
			) v where rownum = 1");
    $par = array(':id_contribuyente' => $result->id_contribuyente);
    $row_query = $db_query->do_query($par);

    $result->n_telefono = $row_query[0]['N_TELEFONO'];

    $db_query = new DB_Query(
        "select v.d_mail from (
				select nvl(d_email1, d_email2) d_mail from siat.telefonos where id_contribuyente = :id_contribuyente
				and trunc(sysdate) between trunc(f_vig_desde) and nvl(f_vig_hasta, trunc(sysdate))
				and (d_email1 is not null or d_email2 is not null) order by trunc(f_vig_desde) desc
			) v where rownum = 1");
    $par = array(':id_contribuyente' => $result->id_contribuyente);
    $row_query = $db_query->do_query($par);

    $result->d_mail = $row_query[0]['D_MAIL'];

    echo json_encode($result);
}

if ($oper == 'contrib_int'){
    $db_query = new DB_Query(
        "select id_contribuyente, d_denominacion, c_tipo_documento,
			(select d_dato from siat.tablas_generales where n_tabla = c.n_tabla_tipo_doc and c_dato = c.c_tipo_documento) d_tipo_documento,
			n_documento from siat.contribuyentes c where n_cuit = :n_cuit");
    $par = array(':n_cuit' => $n_cuit);
    $row_query = $db_query->do_query($par);

    $result->id_contribuyente = $row_query[0]['ID_CONTRIBUYENTE'];
    $result->d_denominacion = $row_query[0]['D_DENOMINACION'];
    $result->c_tipo_doc = $row_query[0]['C_TIPO_DOCUMENTO'];
    $result->d_tipo_doc = $row_query[0]['D_TIPO_DOCUMENTO'];
    $result->n_documento = $row_query[0]['N_DOCUMENTO'];

    $db_query = new DB_Query(
        "select v.n_telefono from (
				select nvl(n_telefono1, n_telefono2) n_telefono from siat.telefonos where id_contribuyente = :id_contribuyente
				and trunc(sysdate) between trunc(f_vig_desde) and nvl(f_vig_hasta, trunc(sysdate))
				and (n_telefono1 is not null or n_telefono2 is not null) order by trunc(f_vig_desde) desc
			) v where rownum = 1");
    $par = array(':id_contribuyente' => $result->id_contribuyente);
    $row_query = $db_query->do_query($par);

    $result->n_telefono = $row_query[0]['N_TELEFONO'];

    $db_query = new DB_Query(
        "select v.d_mail from (
				select nvl(d_email1, d_email2) d_mail from siat.telefonos where id_contribuyente = :id_contribuyente
				and trunc(sysdate) between trunc(f_vig_desde) and nvl(f_vig_hasta, trunc(sysdate))
				and (d_email1 is not null or d_email2 is not null) order by trunc(f_vig_desde) desc
			) v where rownum = 1");
    $par = array(':id_contribuyente' => $result->id_contribuyente);
    $row_query = $db_query->do_query($par);

    $result->d_mail = $row_query[0]['D_MAIL'];

    $db_query = new DB_Query(
        "select c_provincia, (select d_dato from siat.tablas_generales where n_tabla = d.n_tabla_provincia and c_dato = d.c_provincia) d_provincia,
			c_departamento, (select d_descrip from siat.departamentos where c_provincia = d.c_provincia and c_departamento = d.c_departamento) d_departamento,
			c_localidad, (select d_descrip from siat.localidades where c_provincia = d.c_provincia and c_departamento = d.c_departamento and c_localidad = d.c_localidad) d_localidad,
			nvl(d_calle, d_calle_afip) d_calle, n_numero, d_piso, d_depto, d_puerta, d_oficina, c_postal
			from siat.domicilios d where c_tipo_domicilio = '1' and id_contribuyente = :id_contribuyente");
    $par = array(':id_contribuyente' => $result->id_contribuyente);
    $row_query = $db_query->do_query($par);

    $result->c_provincia = $row_query[0]['C_PROVINCIA'];
    $result->d_provincia = $row_query[0]['D_PROVINCIA'];
    $result->c_departamento = $row_query[0]['C_DEPARTAMENTO'];
    $result->d_departamento = $row_query[0]['D_DEPARTAMENTO'];
    $result->c_localidad = $row_query[0]['C_LOCALIDAD'];
    $result->d_localidad = $row_query[0]['D_LOCALIDAD'];
    $result->d_calle = $row_query[0]['D_CALLE'];
    $result->n_numero = $row_query[0]['N_NUMERO'];
    $result->d_piso = $row_query[0]['D_PISO'];
    $result->d_depto = $row_query[0]['D_DEPTO'];
    $result->d_puerta = $row_query[0]['D_PUERTA'];
    $result->d_oficina = $row_query[0]['D_OFICINA'];
    $result->c_postal = $row_query[0]['C_POSTAL'];

    echo json_encode($result);
}

if ($oper == 'multas'){
    $db_query = new DB_Query(
        "select PAC_MULTAS.fun_devuelve_id_multa(:id_infraccion, 
                                                :f_generacion,
                                                null, -- tributo
                                                null, -- concepto
                                                null, -- regimen
                                                :m_persona) ids from dual"
    );
    $par = array(':id_infraccion' => $id_infraccion, 
                ':f_generacion' => $f_generacion,
                ':m_persona' => $m_persona);
    $row_query = $db_query->do_query($par);

    $ids_multas = $row_query[0]['IDS'];

    $db_query = new DB_Query(
        "select id_multa, fun_devuelve_descrip_infrac(id_multa) d_multa from param_infracciones_valores where id_multa in ($ids_multas)"
    );
    $row_query = $db_query->do_query();

    for ($i=0; $i < count($row_query); $i++){
        $result.='<option value="'.$row_query[$i]['ID_MULTA'].'">'.$row_query[$i]['D_MULTA'].'</option>';
    }

    echo $result;
}

if ($oper == 'liquidacion'){
    $db_query = new DB_Query(
        "SELECT CASE
                           WHEN n_dias_vto IS NOT NULL THEN
                               fun_calc_dias_h_c (TO_DATE ( :f_generacion, 'dd/mm/rrrr'),
                                                  n_dias_vto,
                                                  c_tipo_dias)
                           ELSE
                               TO_DATE ( :f_generacion, 'dd/mm/rrrr')
                       END f_vto,
                       CASE
                           WHEN n_dias_vto IS NOT NULL THEN
                                 fun_calc_dias_h_c (TO_DATE ( :f_generacion, 'dd/mm/rrrr'),
                                                    n_dias_vto,
                                                    c_tipo_dias)
                               - TO_DATE ( :f_generacion, 'dd/mm/rrrr')
                           ELSE
                               0
                       END n_dias_vto,
                       fun_formato_numerico (NVL (i_monto_fijo, 0), 2) i_monto_fijo,
                       CASE
                           WHEN i_monto_fijo_desde IS NULL THEN '-1'
                           ELSE fun_formato_numerico (i_monto_fijo_desde, 2)
                       END i_monto_fijo_desde,
                       CASE
                           WHEN i_monto_fijo_hasta IS NULL THEN '-1'
                           ELSE fun_formato_numerico (i_monto_fijo_hasta, 2)
                       END i_monto_fijo_hasta,
                       CASE
                           WHEN p_descuento_vto IS NULL THEN '-1'
                           ELSE fun_formato_numerico (p_descuento_vto, 2)
                       END p_descuento_vto,
                       m_automatica,
                       CASE
                           WHEN i_monto_fijo IS NOT NULL THEN
                               (CASE
                                    WHEN p_descuento_vto IS NOT NULL THEN
                                        fun_formato_numerico (
                                            (i_monto_fijo * (p_descuento_vto / 100)),
                                            2)
                                    ELSE
                                        NULL
                                END)
                           ELSE
                               NULL
                       END descuento,
                       CASE
                           WHEN i_monto_fijo IS NOT NULL THEN
                               (CASE
                                    WHEN p_descuento_vto IS NOT NULL THEN
                                        fun_formato_numerico (
                                              i_monto_fijo
                                            - (i_monto_fijo * (p_descuento_vto / 100)),
                                            2)
                                    ELSE
                                        NULL
                                END)
                           ELSE
                               NULL
                       END total
                FROM   param_infracciones_valores
                WHERE  id_multa = :id_multa"
    );
    $par = array(':id_multa' => $id_multa,':f_generacion' => $f_generacion);
    $row_query = $db_query->do_query($par);

    $result->f_vto = $row_query[0]['F_VTO'];
    $result->n_dias_vto = $row_query[0]['N_DIAS_VTO'];
    $result->i_monto_fijo = $row_query[0]['I_MONTO_FIJO'];
    $result->i_monto_fijo_desde = $row_query[0]['I_MONTO_FIJO_DESDE'];  //rangos para validar importes
    $result->i_monto_fijo_hasta = $row_query[0]['I_MONTO_FIJO_HASTA'];  //
    $result->m_automatica = $row_query[0]['M_AUTOMATICA'];
    $result->p_descuento_vto = $row_query[0]['P_DESCUENTO_VTO'];
    $result->descuento = $row_query[0]['DESCUENTO'];
    $result->total = $row_query[0]['TOTAL'];

    echo json_encode($result);
}

if ($oper == 'validacion'){
    $aux = -1;

    $db_query = new DB_Query("select case when FUN_CONVIERTE_A_NUMERO(:i_multa) >= 1 then 'S' else 'N' end valida from dual");
    $par = array(':i_multa' => $i_multa);
    $row_query = $db_query->do_query($par);

    $valida = $row_query[0]['VALIDA'];

    if($valida != 'S' and $aux == -1){
        $result->resultado = 'El valor de la multa no puede ser menor a $1.';
        $aux = 1;
    }

    if($i_monto_fijo_desde != '-1' and $aux == -1){
        $db_query = new DB_Query("select case when FUN_CONVIERTE_A_NUMERO(:i_multa) >= FUN_CONVIERTE_A_NUMERO(:i_monto_fijo_desde) then 'S' else 'N' end valida from dual");
        $par = array(':i_multa' => $i_multa, ':i_monto_fijo_desde' => $i_monto_fijo_desde);
        $row_query = $db_query->do_query($par);

        $valida = $row_query[0]['VALIDA'];

        if($valida != 'S'){
            $result->resultado = 'El valor mínimo de la multa debe ser mayor o igual a '.$i_monto_fijo_desde.'.';
            $aux = 1;
        }
    }

    if($i_monto_fijo_hasta != '-1' and $aux == -1){
        $db_query = new DB_Query("select case when FUN_CONVIERTE_A_NUMERO(:i_multa) <= FUN_CONVIERTE_A_NUMERO(:i_monto_fijo_hasta) then 'S' else 'N' end valida from dual");
        $par = array(':i_multa' => $i_multa, ':i_monto_fijo_hasta' => $i_monto_fijo_hasta);
        $row_query = $db_query->do_query($par);

        $valida = $row_query[0]['VALIDA'];

        if($valida != 'S'){
            $result->resultado = 'El valor máximo de la multa debe ser menor o igual a '.$i_monto_fijo_hasta.'.';
            $aux = 1;
        }
    }

    if($p_descuento_vto != '-1' and $aux == -1){
        $db_query = new DB_Query(
            "select fun_formato_numerico((FUN_CONVIERTE_A_NUMERO(:i_multa) * (FUN_CONVIERTE_A_NUMERO(:p_descuento_vto) / 100)),2) descuento,
				fun_formato_numerico(FUN_CONVIERTE_A_NUMERO(:i_multa) - (FUN_CONVIERTE_A_NUMERO(:i_multa) * (FUN_CONVIERTE_A_NUMERO(:p_descuento_vto) / 100)), 2) total from dual"
        );
        $par = array(':i_multa' => $i_multa, ':p_descuento_vto' => $p_descuento_vto);
        $row_query = $db_query->do_query($par);

        $result->descuento = $row_query[0]['DESCUENTO'];
        $result->total = $row_query[0]['TOTAL'];
    } else {
        $result->descuento = '';
        $result->total = $i_multa;
    }

    if($aux != -1) {
        $result->i_multa = $i_multa_ori;

        if($p_descuento_vto != '-1'){
            $db_query = new DB_Query(
                "select fun_formato_numerico((FUN_CONVIERTE_A_NUMERO(:i_multa) * (FUN_CONVIERTE_A_NUMERO(:p_descuento_vto) / 100)),2) descuento,
					fun_formato_numerico(FUN_CONVIERTE_A_NUMERO(:i_multa) - (FUN_CONVIERTE_A_NUMERO(:i_multa) * (FUN_CONVIERTE_A_NUMERO(:p_descuento_vto) / 100)), 2) total from dual"
            );
            $par = array(':i_multa' => $i_multa_ori, ':p_descuento_vto' => $p_descuento_vto);
            $row_query = $db_query->do_query($par);

            $result->descuento = $row_query[0]['DESCUENTO'];
            $result->total = $row_query[0]['TOTAL'];
        } else {
            $result->descuento = '';
            $result->total = $i_multa_ori;
        }
    } else {
        $result->resultado = 'OK';
    }

    echo json_encode($result);
}
?>