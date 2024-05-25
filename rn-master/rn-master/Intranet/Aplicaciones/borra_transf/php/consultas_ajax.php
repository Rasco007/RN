<?php
$p_oper = $_POST['p_oper'];
$p_modo = $_POST['p_modo'];
$p_c_tributo = $_POST['p_c_tributo'];
$p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];

if($p_oper === 'partida'){
    $db_query = new DB_Query(
        "SELECT id_contribuyente, c_motivo_alta, n_tabla_mot_alta,
            (select tg.d_dato from tablas_generales tg where  tg.n_tabla = n_tabla_mot_alta and tg.c_dato = c_motivo_alta) d_baja
        from contribuyentes_tributos
        where d_objeto_hecho = :p_d_objeto_hecho
        and  c_tributo = :p_c_tributo
        and f_vig_hasta is null
        and f_cese_provisorio is null
        and ((
                 c_motivo_alta in ('7','23','24','31','32','8','38','41')
             and :p_modo is null
            )
           or ( c_motivo_alta in ('38') and :p_modo = 'D')
           or  (
             exists (select 1
                     from   contribuyentes_Tributos ct2
                     where  ct2.c_tributo         = contribuyentes_tributos.c_tributo
                     and    ct2.d_objeto_hecho    = contribuyentes_tributos.d_objeto_hecho
                     and    ct2.id_contribuyente != contribuyentes_tributos.id_contribuyente
                     and    ct2.c_motivo_baja     = '10'
                     and    ct2.f_vig_hasta       = contribuyentes_tributos.f_vig_desde-1)
             and :p_modo='R'))");

    $par = array(':p_d_objeto_hecho' => $p_d_objeto_hecho,
        ':p_c_tributo' => $p_c_tributo,
        ':p_modo' => $p_modo);
    $row_query1 = $db_query->do_query($par);

    $id_contribuyente = $row_query1[0]['ID_CONTRIBUYENTE'];

    $db_query = new DB_Query(
        "SELECT fun_formato_cuit(n_cuit) n_cuit, d_denominacion, id_contribuyente,
		    c_tipo_documento,
		    (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento,
		    n_documento, f_vig_desde, f_vig_hasta
		from   contribuyentes c
		where  id_contribuyente = :id_contribuyente
		and    f_vig_hasta is null");

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    $db_query = new DB_Query(
        "select f_vig_desde f_desde_obj
    from objetos_contribuyentes
    where c_tributo = :p_c_tributo and
       d_objeto_hecho = :p_d_objeto_hecho and
      f_vig_hasta is null and
       c_tipo_respon = '9'");  // Tiene excepcion¿?

    $par = array(':p_d_objeto_hecho' => $p_d_objeto_hecho,
        ':p_c_tributo' => $p_c_tributo);

    $row_query2 = $db_query->do_query($par);
    if (count($row_query1) == 0){
        $result->error = 'PRINCIPAL';
        echo json_encode($result);
    }elseif (count($row_query) == 0){
        $result->error = 'CONTRIB';
        echo json_encode($result);
    }elseif (count($row_query2) == 0){
        $result->error = 'RESPON';
        echo json_encode($result);
    }else{
        echo json_encode(array_merge($row_query[0],$row_query1[0],$row_query2[0]));
    }
}

if ($p_oper === 'checkDigito'){
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:param) digito FROM DUAL");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($p_oper === 'getDatosFiltros'){
    $filtro = null;
    if ($_POST['p_tributo'] == 60){
        if ($_POST['p_partida']){
            $filtro = $_POST['p_partida'];
            $query = "SELECT d_nomenclatura objeto1, d_nomenclatura_real objeto2
                    FROM inmuebles where d_nomenclatura = :filtro";
        }elseif($_POST['p_nomenclatura']){
            $filtro = $_POST['p_nomenclatura'];
            $query = "SELECT d_nomenclatura objeto1, d_nomenclatura_real objeto2
                    FROM inmuebles where d_nomenclatura_real = :filtro";
        }
    }elseif($_POST['p_tributo'] == 90){
        if ($_POST['p_partida']){
            $filtro = $_POST['p_partida'];
            $query = "SELECT d_patente objeto1,SIAT.fun_calcula_digito_verificador(d_patente) digito1,
                             d_patente_vieja objeto2,SIAT.fun_calcula_digito_verificador(d_patente_vieja) digito2
                    FROM automotores where d_patente = :filtro";
        }elseif($_POST['p_nomenclatura']){
            $filtro = $_POST['p_nomenclatura'];
            $query = "SELECT d_patente objeto1,SIAT.fun_calcula_digito_verificador(d_patente) digito1,
                             d_patente_vieja objeto2,SIAT.fun_calcula_digito_verificador(d_patente_vieja) digito2
                    FROM automotores where d_patente_vieja = :filtro";
        }
    }
    $db_query = new DB_Query($query);
    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}
?>