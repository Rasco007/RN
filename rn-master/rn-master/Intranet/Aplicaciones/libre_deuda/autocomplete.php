<?php

$p_oper = $_POST['p_oper'];
$filtro = $_POST['filtro'];

if ($p_oper === 'cuit'){
	
    $db_query = new DB_Query(
		"SELECT
			c.d_denominacion, n_cuit, c.id_contribuyente, c.c_tipo_documento, c.n_documento,
			d.d_calle ||' '|| d.n_numero || d.d_piso || d.d_depto d_domicilio,
			(SELECT SUBSTR(d_descrip,1,25) FROM localidades l WHERE l.c_localidad = d.c_localidad AND l.c_provincia = d.c_provincia AND l.c_departamento = d.c_departamento) ||' - (CP '|| d.c_postal ||') - '|| (select d_dato from tablas_generales where n_tabla = 16 and c_dato = d.c_provincia) d_localidad
		FROM contribuyentes c, domicilios d
		where d.id_contribuyente = c.id_contribuyente and d.C_TIPO_DOMICILIO = '1'
			and n_cuit = :filtro"
	);

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper === 'denominacion'){
	$db_query = new DB_Query(
		"SELECT
			c.d_denominacion, fun_formato_cuit(n_cuit) n_cuit, c.id_contribuyente, c.c_tipo_documento, c.n_documento,
			d.d_calle ||' '|| d.n_numero || d.d_piso || d.d_depto d_domicilio,
			(SELECT SUBSTR(d_descrip,1,25) FROM localidades l WHERE l.c_localidad = d.c_localidad AND l.c_provincia = d.c_provincia AND l.c_departamento = d.c_departamento) ||' - (CP '|| d.c_postal ||') - '|| (select d_dato from tablas_generales where n_tabla = 16 and c_dato = d.c_provincia) d_localidad
		FROM contribuyentes c, domicilios d
		where d.id_contribuyente = c.id_contribuyente and d.C_TIPO_DOMICILIO = '1'
			and substr(fun_transformar_cadena(d_denominacion), 1, 200) like fun_transformar_cadena('%'|| :filtro ||'%') and rownum <= 5"
	);

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['N_CUIT'].' - '.$row_query[$i]['D_DENOMINACION'],
            'cuit' => $row_query[$i]['N_CUIT'],
            'razon_social' => $row_query[$i]['D_DENOMINACION'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'd_domicilio' => $row_query[$i]['D_DOMICILIO'],
            'd_localidad' => $row_query[$i]['D_LOCALIDAD']
        );
    }

    echo json_encode($options);
}

if ($p_oper === 'nomenclatura'){
	
    $db_query = new DB_Query(
		"SELECT d_nomenclatura_real 
		from inmuebles
		where :d_objeto = d_nomenclatura"
	);

    $par = array(':d_objeto' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($p_oper === 'objeto'){

	$p_tributo = $_POST['p_tributo'];

	$db_query = new DB_Query(
		"SELECT distinct
			fun_formato_cuit(c.n_cuit) n_cuit,
			c.d_denominacion,
			c.id_contribuyente,
			(case to_number(:p_tributo)
	       		when 60 then (SELECT d_nomenclatura_real
					from inmuebles
					where :filtro = d_nomenclatura)
				else null
			end) d_nomenclatura_real
		from   objetos_contribuyentes ct, 
		       contribuyentes c
		where  ct.c_tributo = :p_tributo
		and    ct.d_objeto_hecho like :filtro
		and    ct.c_tipo_respon = '4'
	    and    ct.id_contribuyente = c.id_contribuyente    
	    and    nvl(ct.f_vig_hasta,to_date('01/01/2222','dd/mm/yyyy')) =
	    		(select max(nvl(cc.f_vig_hasta, to_date('01/01/2222','dd/mm/yyyy')))
                   from objetos_contribuyentes cc
                  where ct.c_tributo      = cc.c_tributo
                    and ct.d_objeto_hecho = cc.d_objeto_hecho
                    and ct.c_tipo_respon = '4') 
	    and    rownum < 2"
    );

    $par = array(':filtro' => $filtro, ':p_tributo' => $p_tributo);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($p_oper === 'pago_cuenta'){

	$p_modo = $_POST['p_modo'];
	if ($p_modo === 'cuit'){

		$db_query = new DB_Query(
			"SELECT
			    count(1) over() cant,
			    c.d_denominacion nombre,
			    fun_formato_cuit(n_cuit) cuit,
			    c.id_contribuyente,
			    c.c_tipo_documento doc_tipo,
			    c.n_documento doc_nro,
			    d.d_calle || ' ' || d.n_numero || d.d_piso || d.d_depto domicilio,
			    (SELECT SUBSTR (d_descrip, 1, 25)
			       FROM localidades l
			      WHERE l.c_localidad = d.c_localidad
			        AND l.c_provincia = d.c_provincia
			        AND l.c_departamento = d.c_departamento)
			    || ' - (CP '|| d.c_postal|| ') - '
			    || (SELECT d_dato
			          FROM tablas_generales
			         WHERE n_tabla = 16 AND c_dato = d.c_provincia) localidad,
			    ct.d_objeto_hecho n_inscripcion,
			    ct.c_tributo||'-'||t.d_descrip d_tributo,
			    ct.c_tributo
			FROM contribuyentes c, domicilios d, contribuyentes_tributos ct, tributos t
			WHERE d.id_contribuyente = c.id_contribuyente AND d.C_TIPO_DOMICILIO = '1'
			    and c.n_cuit = :filtro
			    and c.id_contribuyente = ct.id_contribuyente
			    and ct.c_tributo in (10, 20)
			    and ct.f_vig_hasta is null
			    and ct.f_cese_provisorio is null
			    and ct.c_tributo = t.c_tributo"
	    );

	    $par = array(':filtro' => $filtro);
	    $row_query = $db_query->do_query($par);

	    echo json_encode($row_query[0]);
	}
}

?>