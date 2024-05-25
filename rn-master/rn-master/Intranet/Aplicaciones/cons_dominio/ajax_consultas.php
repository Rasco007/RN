<?php

$p_oper = $_POST['p_oper'];
$filtro = $_POST['filtro'];
$p_id_contribuyente = $_POST['p_id_contribuyente'];
$p_id_contribuyente_new = $_POST['p_id_contribuyente_new'];
$p_c_tributo = $_POST['p_c_tributo'];
$p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
$p_f_vig_hasta = $_POST['p_f_vig_hasta'];
$p_uso = $_POST['p_uso'];

if ($p_oper === 'get_datos'){
    $db_query = new DB_Query(
    	"SELECT
			C_MOTIVO_ALTA,
			(select d_dato from tablas_generales
				where  n_tabla=n_tabla_motivo_alta and c_dato=a.C_MOTIVO_ALTA) AS D_MOTIVO_ALTA,
			M_SIN_CONVOCATORIA,
			C_MARCA_AUT,
			(select d_dato from tablas_generales
				where  n_tabla=n_tabla_marca_aut and c_dato=a.C_MARCA_AUT) AS D_MARCA_AUT,
			ID_MODELO,
			(select am.d_descrip
				from   aut_modelos am
				where  am.c_marca_aut = a.c_marca_aut
		            and id_modelo = a.id_modelo) AS D_MODELO,
			ID_DESCRIPCION,
			(select ad.d_descrip  
				from   aut_descripcion ad
				where  ad.c_marca_aut = a.c_marca_aut
				and    ad.id_modelo   = a.id_modelo
				and id_descripcion = a.id_descripcion) AS D_DESCRIPCION,
			C_TIPO,
			(select d_dato from tablas_generales
				where  n_tabla=n_tabla_tipo and c_dato=a.C_TIPO) AS D_TIPO,
			N_MODELO_AÑO,
			N_PESO_CILINDRADA,
			(select d_dato2
			 from   tablas_generales tg,
			        aut_tipos_grupos ag
			 where  n_tabla          = fun_obtener_n_tabla('AUT_GRUPOS')
			 	and ag.n_tabla_grupo = tg.n_tabla
			 	and ag.c_grupo       = tg.c_dato
			 	and ag.c_tipo        = a.c_tipo
			 	and ag.c_grupo       = a.c_grupo) N_PESO_MAX,
			N_HP,
			C_GRUPO,
			(select d_dato from tablas_generales
				where  n_tabla=n_tabla_grupo and c_dato=a.C_GRUPO) AS D_GRUPO,
			C_FMCAMOD,
			(select d_marca ||' - '||D_DESCRIPCION ||' - '|| D_TIPO Detalle
		      from siat.tab_acara_codigos
		     where  c_fmcamod = a.c_fmcamod) AS D_FMCAMOD,
			M_NACIONAL_IMPORTADO,
			C_COMBUSTIBLE,
			(select d_dato from tablas_generales
				where  n_tabla=n_tabla_combustible and c_dato=a.C_COMBUSTIBLE) AS D_COMBUSTIBLE,
			D_TEXTO_MARCA,
			D_TEXTO_MODELO,
			D_TEXTO_DESCRIPCION,
			D_MARCA_MOTOR,
			NRO_MOTOR,
			D_MARCA_CHASIS,
			NRO_CHASIS,
			C_RNPA,
			(select d_dato from tablas_generales
				where  n_tabla=n_tabla_rnpa and c_dato=a.C_RNPA) AS D_RNPA,
			F_RADICACION,
			F_INSCRIPCION,
			F_BAJA,
			F_ULT_TRANSFORMACION,
			(SELECT count(1) cant
			from   obligaciones
			where  c_tributo = 90
			and    d_objeto_hecho = a.d_patente) n_obligs
		FROM automotores a
		where   ((d_patente = :p_d_patente and :p_d_patente is not null)
		        or
		        :p_d_patente is null)
		    and
		        ((d_patente_vieja = :p_d_patente_vieja and :p_d_patente_vieja is not null)
		        or
		        :p_d_patente_vieja is null)");

    $par = array(':p_d_patente' => $_POST['p_d_patente'],
    			':p_d_patente_vieja' => $_POST['p_d_patente_vieja']);
    $row_query = $db_query->do_query($par);

    $resultado->c_motivo_alta = $row_query[0]['C_MOTIVO_ALTA'];
    $resultado->d_motivo_alta = $row_query[0]['D_MOTIVO_ALTA'];
    $resultado->m_sin_convocatoria = $row_query[0]['M_SIN_CONVOCATORIA'];
    $resultado->c_marca_aut = $row_query[0]['C_MARCA_AUT'];
    $resultado->d_marca_aut = $row_query[0]['D_MARCA_AUT'];
    $resultado->id_modelo = $row_query[0]['ID_MODELO'];
    $resultado->d_modelo = $row_query[0]['D_MODELO'];
    $resultado->id_descripcion = $row_query[0]['ID_DESCRIPCION'];
    $resultado->d_descripcion = $row_query[0]['D_DESCRIPCION'];
    $resultado->c_tipo = $row_query[0]['C_TIPO'];
    $resultado->d_tipo = $row_query[0]['D_TIPO'];
    $resultado->n_modelo_año = $row_query[0]['N_MODELO_AÑO'];
    $resultado->n_peso_cilindrada = $row_query[0]['N_PESO_CILINDRADA'];
    $resultado->n_peso_max = $row_query[0]['N_PESO_MAX'];
    $resultado->n_hp = $row_query[0]['N_HP'];
    $resultado->c_grupo = $row_query[0]['C_GRUPO'];
    $resultado->d_grupo = $row_query[0]['D_GRUPO'];
    $resultado->c_fmcamod = $row_query[0]['C_FMCAMOD'];
    $resultado->d_fmcamod = $row_query[0]['D_FMCAMOD'];
    $resultado->m_nacional_importado = $row_query[0]['M_NACIONAL_IMPORTADO'];
    $resultado->c_combustible = $row_query[0]['C_COMBUSTIBLE'];
    $resultado->d_combustible = $row_query[0]['D_COMBUSTIBLE'];
    $resultado->d_texto_marca = $row_query[0]['D_TEXTO_MARCA'];
    $resultado->d_texto_modelo = $row_query[0]['D_TEXTO_MODELO'];
    $resultado->d_texto_descripcion = $row_query[0]['D_TEXTO_DESCRIPCION'];
    $resultado->d_marca_motor = $row_query[0]['D_MARCA_MOTOR'];
    $resultado->nro_motor = $row_query[0]['NRO_MOTOR'];
    $resultado->d_marca_chasis = $row_query[0]['D_MARCA_CHASIS'];
    $resultado->nro_chasis = $row_query[0]['NRO_CHASIS'];
    $resultado->c_rnpa = $row_query[0]['C_RNPA'];
    $resultado->d_rnpa = $row_query[0]['D_RNPA'];
    $resultado->f_radicacion = $row_query[0]['F_RADICACION'];
    $resultado->f_inscripcion = $row_query[0]['F_INSCRIPCION'];
    $resultado->f_baja = $row_query[0]['F_BAJA'];
    $resultado->f_ult_transformacion = $row_query[0]['F_ULT_TRANSFORMACION'];
    $resultado->n_obligs = $row_query[0]['N_OBLIGS'];

    echo json_encode($resultado);
}

if ($p_oper === 'n_cilindrada'){
	$p_n_peso = $_POST['p_n_peso'];
    $db_query = new DB_Query(
    	"SELECT n_cilindrada
		from   aut_descripcion
		where  c_marca_aut    = :p_c_marca_aut 
		and    id_modelo      = :p_id_modelo 
		and    id_descripcion = :p_id_descripcion");

    $par = array(':p_c_marca_aut' => $_POST['p_c_marca_aut'],
    			':p_id_modelo' => $_POST['p_id_modelo'],
    			':p_id_descripcion' => $_POST['p_id_descripcion']);
    $row_query = $db_query->do_query($par);
    $n_cilindrada = $row_query[0]['N_CILINDRADA'];

    if(!isset($n_cilindrada)){
    	$resultado->error = 'Error al buscar cilindrada.';
    }else{
    	if($p_n_peso < $n_cilindrada){
    		$resultado->error = 'Las cilindradas ingresada no es valida.';
    	}
    }

    echo json_encode($resultado);
}

if ($p_oper === 'existe_patente'){
	$p_filtro_lista0 = $_POST['p_filtro_lista0'];
	$p_filtro_lista1 = $_POST['p_filtro_lista1'];
	$p_filtro_lista2 = $_POST['p_filtro_lista2'];

    $db_query = new DB_Query(
        "SELECT count(1) cant
		from  automotores a
		where d_patente = :p_filtro_lista1");

    $par = array(':p_filtro_lista1' => $p_filtro_lista1);
    $row_query = $db_query->do_query($par);
    $cant_dom = $row_query[0]['CANT'];

    $db_query = new DB_Query(
        "SELECT count(1) cant
		from  automotores a
		where d_patente_vieja = :p_filtro_lista2");

    $par = array(':p_filtro_lista2' => $p_filtro_lista2);
    $row_query = $db_query->do_query($par);
    $cant_dom_ant = $row_query[0]['CANT'];

    if($cant_dom > 0 || $cant_dom_ant > 0){
        $resultado->error = 'OK';
        $resultado->dom = $cant_dom;
        $resultado->dom_ant = $cant_dom_ant;
    }else{
        $resultado->error = 'NOOK';
    }

    echo json_encode($resultado);
}

if ($p_oper === 'cuit'){
	
    $db_query = new DB_Query(
	"SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion, c.c_tipo_documento,
		(select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento,
		fun_formato_numerico(c.n_documento,0) n_documento
	from contribuyentes c where n_cuit = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper === 'denominacion'){
	$db_query = new DB_Query(
	"SELECT v.id_contribuyente, v.cuit, v.denominacion, v.c_tipo_documento, v.d_tipo_documento, v.n_documento
    FROM (
        SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion,
            c.c_tipo_documento, (select d_dato from tablas_generales where n_tabla = 1 and c_dato = c.c_tipo_documento) d_tipo_documento,
            fun_formato_numerico(c.n_documento,0) n_documento
        from contribuyentes c where substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
    ) v where rownum <= 5");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
            'razon_social' => $row_query[$i]['DENOMINACION'],
            'cuit' => $row_query[$i]['CUIT'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'd_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO']
        );
    }

    echo json_encode($options);
}

if ($p_oper === 'documento'){
    $c_tipo_documento = ($_POST['c_tipo_documento']);
	
    $db_query = new DB_Query(
	"SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion, c.c_tipo_documento,
		(select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento,
		fun_formato_numerico(c.n_documento,0) n_documento
	from contribuyentes c
	where c_tipo_documento = nvl(:c_tipo_documento,c_tipo_documento)
	  	AND n_documento = :filtro");

    $par = array(':c_tipo_documento' => $c_tipo_documento,
        ':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'marca_modelo'){
    $p_c_grupo = $_POST['p_c_grupo'];
    $db_query = new DB_Query(
        "SELECT d_dato1 d_texto_marca, d_dato1 d_texto_modelo
		 from tablas_generales tg
		where c_dato = :p_c_grupo and
		    tg.n_tabla = 220 and
		    tg.d_dato1 = 'AFF'");

    $par = array(':p_c_grupo' => $p_c_grupo);
    $row_query = $db_query->do_query($par);
	$resultado->d_texto_marca = $row_query[0]['D_TEXTO_MARCA'];
	$resultado->d_texto_modelo = $row_query[0]['D_TEXTO_MODELO'];

    echo json_encode($resultado);
}

if($p_oper == 'excenciones'){
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_d_patente = $_POST['p_d_patente'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
        from   exenciones_objetos
        where  c_tributo = 90
        and    d_objeto  = :p_d_patente
        and    id_contribuyente = :p_id_contribuyente
        and    rownum   <= 1");

    $par = array(':p_id_contribuyente' => $p_id_contribuyente,
    			':p_d_patente' => $p_d_patente);
    $row_query = $db_query->do_query($par);
    $resultado->cant = $row_query[0]['CANT'];

    echo json_encode($resultado);
}

if ($p_oper === 'checkDigito'){
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:param) digito FROM DUAL");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);
    $resultado->digito = $row_query[0]['DIGITO'];

    echo json_encode($resultado);
}

if ($p_oper === 'getDominio'){
    if ($_POST['obtener'] === 'patente'){
        $query = "SELECT d_patente objeto,SIAT.fun_calcula_digito_verificador(d_patente) digito
                    FROM automotores where d_patente_vieja = :dominio";
    }else if ($_POST['obtener'] === 'patente_vieja'){
        $query = "SELECT d_patente_vieja objeto,SIAT.fun_calcula_digito_verificador(d_patente_vieja) digito
                    FROM automotores where d_patente = :dominio";
    }
    $db_query = new DB_Query($query);
    $par = array(':dominio' => $_POST['dominio']);
    $row_query = $db_query->do_query($par);
    $resultado->objeto = $row_query[0]['OBJETO'];
    $resultado->digito = $row_query[0]['DIGITO'];
    echo json_encode($resultado);
}

if ($p_oper === 'fmcamod'){

    $db_query = new DB_Query(
        "select d_marca ||' - '||D_DESCRIPCION ||' - '|| D_TIPO as d_fmcamod
		     from siat.tab_acara_codigos
		    where c_fmcamod = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

?>