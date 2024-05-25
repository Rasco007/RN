<?php

$p_oper = $_POST['p_oper'];
$filtro = $_POST['filtro'];
$p_id_contribuyente = $_POST['p_id_contribuyente'];
$p_id_contribuyente_new = $_POST['p_id_contribuyente_new'];
$p_c_tributo = $_POST['p_c_tributo'];
$p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
$p_f_vig_hasta = $_POST['p_f_vig_hasta'];
$p_uso = $_POST['p_uso'];

if($p_oper === 'objeto'){
	$db_query = new DB_Query(
		"SELECT id_contribuyente,
			f_vig_desde, f_vig_hasta
		from contribuyentes_tributos ct
		where d_objeto_hecho = :p_d_objeto_hecho and
		f_vig_hasta is null and 
		f_cese_provisorio is null and
		c_tributo = :p_c_tributo and
		((:p_uso='R' and c_motivo_alta not in ('7','23','8','31','32') ) or
			:p_uso='T') and
		((:p_c_tributo = 90 AND
				 0 < (select count(1)
				       from obligaciones 
				       where c_tributo = :p_c_tributo and
				             d_objeto_hecho = ct.d_objeto_hecho)
				 or
				 pack_automotores.auto_exento(ct.d_objeto_hecho) = 'S')
		  OR
		  (:p_c_tributo != 90))");

	$par = array(':p_d_objeto_hecho' => $p_d_objeto_hecho,
		':p_c_tributo' => $p_c_tributo,
		':p_uso' => $p_uso);
	$row_query1 = $db_query->do_query($par);

	$id_contribuyente = $row_query1[0]['ID_CONTRIBUYENTE'];
	$f_vig_desde = $row_query1[0]['F_VIG_DESDE'];
	$f_vig_hasta = $row_query1[0]['F_VIG_HASTA'];

	$db_query = new DB_Query(
		"SELECT fun_formato_cuit(n_cuit) n_cuit, d_denominacion, id_contribuyente,
		    c_tipo_documento,
		    (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento,
		    n_documento, :f_vig_desde as f_vig_desde, :f_vig_hasta as f_vig_hasta
		from   contribuyentes c
		where  id_contribuyente = :id_contribuyente
		and    f_vig_hasta is null");

	$par = array(':id_contribuyente' => $id_contribuyente,
				':f_vig_desde' => $f_vig_desde,
				':f_vig_hasta' => $f_vig_hasta);
	$row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($p_oper === 'cuit'){
	$db_query = new DB_Query(
		"SELECT id_contribuyente, d_denominacion, fun_formato_cuit(n_cuit) as n_cuit, c.c_tipo_documento,
			(select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, fun_formato_numerico(c.n_documento,0) n_documento
		from contribuyentes c where n_cuit = :filtro"
	);

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

	$row_query[0]['ERROR'] = validar_contrib($p_c_tributo, $p_d_objeto_hecho,
								$row_query[0]['ID_CONTRIBUYENTE'], $p_id_contribuyente,
								$p_f_vig_hasta, $p_uso);

    echo json_encode($row_query[0]);
}

if($p_oper === 'documento'){
    $c_tipo_documento = ($_POST['c_tipo_documento']);
    $n_documento = ($_POST['n_documento']);
    $db_query = new DB_Query(
        "SELECT id_contribuyente, fun_formato_cuit(n_cuit) as n_cuit, d_denominacion as d_denominacion, c.c_tipo_documento, 
            (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, 
            fun_formato_numerico(c.n_documento,0) n_documento
		from contribuyentes c
		where c_tipo_documento = nvl(:c_tipo_documento,c_tipo_documento)
	  	AND n_documento = :n_documento");

    $par = array(':c_tipo_documento' => $c_tipo_documento,
        ':n_documento' => $n_documento);
    $row_query = $db_query->do_query($par);

    $row_query[0]['ERROR'] = validar_contrib($p_c_tributo, $p_d_objeto_hecho,
								$row_query[0]['ID_CONTRIBUYENTE'], $p_id_contribuyente,
								$p_f_vig_hasta, $p_uso);

    echo json_encode($row_query[0]);
}

function validar_contrib($p_c_tributo,$p_d_objeto_hecho,$p_id_contribuyente_new,$p_id_contribuyente,$p_f_vig_hasta,$p_uso){
	if($p_uso === 'R'){
		$db_query = new DB_Query(
			"SELECT 1 as aux
			from   objetos_contribuyentes  oc
			where  oc.c_tributo      = :p_c_tributo
			and    oc.d_objeto_hecho = :p_d_objeto_hecho
			and    oc.id_contribuyente = :p_id_contribuyente_new
			and    oc.id_contribuyente != :p_id_contribuyente
			and    (oc.f_vig_hasta is null or :p_f_vig_hasta < oc.f_vig_hasta)");

		$par = array(':p_c_tributo' => $p_c_tributo,
			':p_d_objeto_hecho' => $p_d_objeto_hecho,
			':p_id_contribuyente_new' => $p_id_contribuyente_new,
			':p_id_contribuyente' => $p_id_contribuyente,
			':p_f_vig_hasta' => $p_f_vig_hasta);
		$row_query = $db_query->do_query($par);

		if(count($row_query) > 1 || count($row_query) == 0){
			$error = 'No puede realizarse este movimiento a este contribuyente.';
		}else{
			$error = 'OK';
		}
	}else{
		$error = 'OK';
	}

	return $error;
}

if($p_oper === 'denominacion'){
	$db_query = new DB_Query(
	"SELECT id_contribuyente,
	       d_denominacion,
	       fun_formato_cuit(n_cuit) n_cuit,
	       c_tipo_documento,
	       (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento,
	       n_documento,
	       n_tabla_tipo_doc
	from   contribuyentes c
	WHERE  substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
	and rownum <= 5");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['N_CUIT'].' - '.$row_query[$i]['D_DENOMINACION'],
            'razon_social' => $row_query[$i]['D_DENOMINACION'],
            'cuit' => $row_query[$i]['N_CUIT'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'd_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO']
        );
    }

    echo json_encode($options);
}

if($p_oper === 'delegacion'){
	if ($p_c_tributo == 60){
		$db_query = new DB_Query(
			"SELECT tg.c_dato, tg.d_dato
		    from  tablas_generales tg,
		          inmuebles i
		    where tg.n_tabla       = fun_obtener_n_tabla('DELEG')
		    and   tg.c_dato        = lpad(i.c_provincia_oficina, 2, 0)||lpad(i.n_oficina, 3, 0)
		    and   tg.d_dato2       is null
		    and   i.d_nomenclatura = :p_d_objeto_hecho");
	}else{
		$db_query = new DB_Query(
			"SELECT tg.c_dato,
	           		tg.d_dato
		    from  tablas_generales tg,
		          domicilios d
		    where d.id_contribuyente = :p_id_contribuyente
		    and   d.c_tipo_domicilio = '1'
		    and   tg.n_tabla         = fun_obtener_n_tabla('DELEG')
		    and   d.n_oficina        is not null
		    and   d.c_provincia      = 'R'
		    and   tg.c_dato          = d.n_oficina
		    and   tg.d_dato2         is null
		    union
		    select tg.c_dato,
		           tg.d_dato
		    from   tablas_generales tg,
		           domicilios d
		    where d.id_contribuyente = :p_id_contribuyente
		    and   d.c_tipo_domicilio = '1'
		    and   tg.n_tabla         = fun_obtener_n_tabla('DELEG')
		    and   d.n_oficina        is not null
		    and   d.c_provincia      != 'R' 
		    and   tg.d_dato2         is null");
	}

	$par = array(':p_id_contribuyente' => $p_id_contribuyente,
		':p_d_objeto_hecho' => $p_d_objeto_hecho);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper === 'dominio'){
    $p_dominio_anterior = $_POST['p_d_dominio_anterior'];
    $db_query = new DB_Query(
        "SELECT c_motivo_alta
		from   contribuyentes_Tributos
		where  id_contribuyente = :p_id_contribuyente
		and    c_tributo        = :p_c_tributo
		and    d_objeto_hecho   = :p_d_objeto_hecho
		and    f_vig_hasta      is null");

    $par = array(':p_id_contribuyente' => $p_id_contribuyente,
        ':p_c_tributo' => $p_c_tributo,
        ':p_d_objeto_hecho' => $p_d_objeto_hecho);
    $row_query = $db_query->do_query($par);
    $c_motivo_alta = $row_query[0]['C_MOTIVO_ALTA'];

    if(isset($c_motivo_alta) and $p_c_tributo == 90){
	    $db_query = new DB_Query(
	        "SELECT c_delegacion,
		            n_tabla_deleg,
		            d_dato
		     from   aut_movimientos a,
		            tablas_generales tg
		     where  n_tabla       = n_tabla_deleg
		     and    c_dato        = c_delegacion
		     and    d_patente     = :p_d_objeto_hecho
		     and    f_movimiento  = :p_f_vig_hasta
		     and    c_motivo_alta = :c_motivo_alta
		     and    nvl(a.f_Actualizac, a.f_alta) = (select max(nvl(f_Actualizac, f_alta))
							     from   aut_movimientos am
							     where  am.d_patente     = a.d_patente
							     and    am.c_motivo_alta = a.c_motivo_alta
							     and    am.f_movimiento  = a.f_movimiento)");

	    $par = array(':p_d_objeto_hecho' => $p_d_objeto_hecho,
	        ':p_f_vig_hasta' => $p_f_vig_hasta,
	        ':c_motivo_alta' => $c_motivo_alta);
	    $row_query = $db_query->do_query($par);
    }

    $db_query = new DB_Query(
        "SELECT fun_calcula_digito_verificador(:p_d_objeto_hecho) as d_verif_dom,
			fun_calcula_digito_verificador(:p_dominio_anterior) as d_verif_dom_ant
		from dual");

    $par = array(':p_d_objeto_hecho' => $p_d_objeto_hecho,
        ':p_dominio_anterior' => $p_dominio_anterior);
    $row_query2 = $db_query->do_query($par);
    $digito = $row_query2[0]['D_VERIF_DOM'];
    $digito_ant = $row_query2[0]['D_VERIF_DOM_ANT'];

    $row_query[0]['C_MOTIVO_ALTA'] = $c_motivo_alta;
    $row_query[0]['D_VERIF_DOM'] = $digito;
	$row_query[0]['D_VERIF_DOM_ANT'] = $digito_ant;

    echo json_encode($row_query[0]);
}

if ($p_oper === 'checkDigito'){
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:param) digito FROM DUAL");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($p_oper === 'getDominio'){
    if ($_POST['obtener'] === 'patente_vieja'){
        $query = "SELECT d_patente_vieja objeto,SIAT.fun_calcula_digito_verificador(d_patente_vieja) digito
                    FROM automotores where d_patente = :dominio";
    }else if ($_POST['obtener'] === 'patente'){
        $query = "SELECT d_patente objeto,SIAT.fun_calcula_digito_verificador(d_patente) digito
                    FROM automotores where d_patente_vieja = :dominio";
    }
    $db_query = new DB_Query($query);
    $par = array(':dominio' => $_POST['dominio']);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}

?>