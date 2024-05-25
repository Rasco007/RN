<?php

$p_oper = $_POST['p_oper'];
$filtro = $_POST['filtro'];

if ($p_oper === 'cuit'){
    $db_query = new DB_Query(
		"SELECT d_denominacion, fun_formato_cuit(n_cuit) as n_cuit, id_contribuyente
		from contribuyentes c
		where n_cuit = :filtro");
	$par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper === 'denominacion'){
	$db_query = new DB_Query(
		"SELECT
			c.d_denominacion, fun_formato_cuit(n_cuit) as n_cuit, c.id_contribuyente
		FROM contribuyentes c
		where substr(fun_transformar_cadena(d_denominacion), 1, 200) like fun_transformar_cadena('%'|| :filtro ||'%')
			and rownum <= 5"
	);

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['N_CUIT'].' - '.$row_query[$i]['D_DENOMINACION'],
            'cuit' => $row_query[$i]['N_CUIT'],
            'razon_social' => $row_query[$i]['D_DENOMINACION'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE']
        );
    }

    echo json_encode($options);
}

// if ($p_oper === 'plano'){
	
//     $db_query = new DB_Query(
// 		"SELECT C_TIPO_INSCR_DOM, D_INSCR_DOMINIO
//           FROM INMUEBLES
//           WHERE D_NOMENCLATURA = :filtro"
// 	);

//     $par = array(':filtro' => $filtro);
//     $row_query = $db_query->do_query($par);

//     if ($row_query[0]['C_TIPO_INSCR_DOM']){
//     	$row_query[0]['N_PLANO_MENSURA'] = $row_query[0]['C_TIPO_INSCR_DOM'].'-'.$row_query[0]['D_INSCR_DOMINIO'];
//     }

//     echo json_encode($row_query[0]);
// }

// if ($p_oper === 'objeto'){

// 	$p_tributo = $_POST['p_tributo'];

// 	$db_query = new DB_Query(
// 		"SELECT distinct
// 			fun_formato_cuit(c.n_cuit) n_cuit,
// 			c.d_denominacion,
// 			c.id_contribuyente,
// 			(case to_number(:p_tributo)
// 	       		when 60 then (SELECT d_nomenclatura_real
// 					from inmuebles
// 					where :filtro = d_nomenclatura)
// 				else null
// 			end) d_nomenclatura_real
// 		from   objetos_contribuyentes ct, contribuyentes c
// 		where  ct.c_tributo = :p_tributo
// 		and    ct.d_objeto_hecho like :filtro
// 		and    ct.c_tipo_respon = '4'
// 	    and    ct.id_contribuyente = c.id_contribuyente    
// 	    and    nvl(ct.f_vig_hasta,to_date('01/01/2222','dd/mm/yyyy')) =
// 	    		(select max(nvl(cc.f_vig_hasta, to_date('01/01/2222','dd/mm/yyyy')))
//                    from objetos_contribuyentes cc
//                   where ct.c_tributo      = cc.c_tributo
//                     and ct.d_objeto_hecho = cc.d_objeto_hecho
//                     and ct.c_tipo_respon = '4')
// 	    and    rownum < 2"
//     );

//     $par = array(':filtro' => $filtro, ':p_tributo' => $p_tributo);
//     $row_query = $db_query->do_query($par);

//     echo json_encode($row_query[0]);
// }

?>