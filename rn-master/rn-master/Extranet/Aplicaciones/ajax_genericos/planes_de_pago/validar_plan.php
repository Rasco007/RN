<?php

	$c_tipo_plan_pago = $_POST['c_tipo_plan_pago'];
	$n_plan_pago= $_POST['n_plan_pago'];
	
	
	/*EL MODO DEFINE QUE PANTALLA ES LA QUE ESTA VALIDANDO
	CP-Consulta Detallada
	MP-Modificar Plan
	LIQ-Liquidacion anticipada 
	CM-Confirmacion Manual 
	  */
	$modo_pantalla=$_POST['modo_pantalla'];

	$parametros = array(':c_tipo_plan_pago'=>$c_tipo_plan_pago,':n_plan_pago'=>$n_plan_pago);
	
	
	if($modo_pantalla=='CP'){

        if(isset($_POST['tipo_planes'])){
            $query1 = new DB_Query("select count(*) as cant
                                    from planes_de_pago p
                                    where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
                                    and p.n_plan_pago = :n_plan_pago
                                    AND F_EFECTIVACION IS NOT NULL"
                                    );
        }
        else{
            $query1 = new DB_Query("select count(*) as cant
                                    from planes_de_pago p
                                    where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
                                    and p.n_plan_pago = :n_plan_pago"
                                    );
        }
        $result = $query1->do_query($parametros);

        if($result[0]['CANT'] == 0){
            if(isset($_POST['tipo_planes'])){
                $db_qry_type = new DB_Query("select count(*) as cant
                                        from planes_de_pago p
                                        where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
                                        and p.n_plan_pago = :n_plan_pago");
                $res_type = $db_qry_type->do_query($parametros);
                if($res_type[0]['CANT'] > 0){
                    echo ('Solo puede desasociarse deuda de Planes de Pagos Efectivizados.');
                }
                else{
                    echo ('No existe plan de pago para los datos ingresados.');
                }
            }
            else{
                echo ('No existe plan de pago para los datos ingresados.');
            }
            die();
        }

        if($result[0]['CANT'] == 1){
            if($c_tipo_plan_pago==null){
                $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                                    from planes_de_pago p
                                    where p.n_plan_pago = :n_plan_pago and rownum = 1"
                );
            }
            else{
                $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                                    from planes_de_pago p
                                    where p.n_plan_pago = :n_plan_pago and p.c_tipo_plan_pago = :c_tipo_plan_pago and rownum = 1"
                );
            }
            $res_tipo_plan = $query_c_tipo_plan->do_query($parametros);
            $c_tipo_plan_pago = $res_tipo_plan[0]['C_TIPO_PLAN_PAGO'];
        }

        if($result[0]['CANT'] > 1){
            $query_lista_planes = new DB_Query("	select c_tipo_plan_pago
                                    from planes_de_pago p
                                    where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
                                    and p.n_plan_pago = :n_plan_pago"
                                );
            $res_lista_planes = $query_lista_planes->do_query($parametros);
            $tipo_planes = '';
            foreach($res_lista_planes as $pos){
                $tipo_planes .= '<button class="button_tipo" type="button" onclick="choosePlan(\''.$pos['C_TIPO_PLAN_PAGO'].'\', this)">'.$pos['C_TIPO_PLAN_PAGO'].'</button>';
            }
            $tipo_planes =  substr($tipo_planes, 0, -2).'.';
            echo ('Existe más de un plan con este número. Debe seleccionar el Tipo de Plan entre: '.$tipo_planes);
            die();
        }

        echo ('OK#sep#'.$c_tipo_plan_pago);
        die();
	}
	
	if($modo_pantalla=='MP'){

	$query1 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago"
							);
							
							
	$query2 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago
								and p.f_caducidad is null"
							);
			
							
	$result = $query1->do_query($parametros);
	
	if($result[0]['CANT'] == 0){
		echo ('No existe plan de pago para los datos ingresados.');
		die();
	}

    if($result[0]['CANT'] > 1){
        $query_lista_planes = new DB_Query("	select c_tipo_plan_pago
                    from planes_de_pago p
                    where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
                    and p.n_plan_pago = :n_plan_pago"
        );
        $res_lista_planes = $query_lista_planes->do_query($parametros);
        $tipo_planes = '';
        foreach($res_lista_planes as $pos){
            $tipo_planes .= '<button class="button_tipo" type="button" onclick="choosePlan(\''.$pos['C_TIPO_PLAN_PAGO'].'\', this)">'.$pos['C_TIPO_PLAN_PAGO'].'</button>';
        }
        $tipo_planes =  substr($tipo_planes, 0, -2).'.';
        echo ('Existe más de un plan con este número. Debe seleccionar el Tipo de Plan entre: '.$tipo_planes);
        die();
    }


	$result2 = $query2->do_query($parametros);

	/*if($result2[0]['CANT'] == 0){
		echo ('El plan de pago seleccionado ha caducado.');
		die();
	}*/


    if($result[0]['CANT'] == 1){
        if($c_tipo_plan_pago==null){
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.n_plan_pago = :n_plan_pago and rownum = 1"
            );
        }
        else{
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.n_plan_pago = :n_plan_pago and p.c_tipo_plan_pago = :c_tipo_plan_pago and rownum = 1"
            );
        }
        $res_tipo_plan = $query_c_tipo_plan->do_query($parametros);
        $c_tipo_plan_pago = $res_tipo_plan[0]['C_TIPO_PLAN_PAGO'];
        echo ('OK#sep#'.$c_tipo_plan_pago);
        die();
    }





	echo ('OK');
	die();
	}
	
	if($modo_pantalla=='LIQ'){

	$query1 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago"
							);
							
	$query2 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago
								and p.f_efectivacion is not null"
							);
							
	$query3 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago
								and p.f_caducidad is null"
							);
							
	$query4 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago
								and p.f_marca_caducidad is null"
							);						

	$result1 = $query1->do_query($parametros);

    if($c_tipo_plan_pago==null){
        if($result1[0]['CANT'] > 1){
            $query_lista_planes = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
                        and p.n_plan_pago = :n_plan_pago"
            );
            $res_lista_planes = $query_lista_planes->do_query($parametros);
            $tipo_planes = '';
            foreach($res_lista_planes as $pos){
                $tipo_planes .= '<button class="button_tipo" type="button" onclick="choosePlan(\''.$pos['C_TIPO_PLAN_PAGO'].'\', this)">'.$pos['C_TIPO_PLAN_PAGO'].'</button>';
            }
            $tipo_planes =  substr($tipo_planes, 0, -2).'.';
            echo ('Existe más de un plan con este número. Debe seleccionar el Tipo de Plan entre: '.$tipo_planes);
            die();
        }
    }

	if($result1[0]['CANT'] == 0){
		echo ('No existe plan de pago para los datos ingresados.');
		die();
	}
	
	$result2 = $query2->do_query($parametros);

	if($result2[0]['CANT'] == 0){
		echo ('El plan de pago seleccionado no ha sido efectivizado.');
		die();
	}
	
	$result3 = $query3->do_query($parametros);

	if($result3[0]['CANT'] == 0){
		echo ('El plan de pago seleccionado ha caducado.');
		die();
	}
	
	$result4 = $query4->do_query($parametros);
	
	if($result4[0]['CANT'] == 0){
		echo ('El plan de pago seleccionado esta en condiciones de caducar.');
		die();
	}

    if($result2[0]['CANT'] == 1){
        if($c_tipo_plan_pago==null){
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.n_plan_pago = :n_plan_pago
                        and p.f_efectivacion is not null
                        and rownum = 1"
            );
        }
        else{
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.n_plan_pago = :n_plan_pago and p.c_tipo_plan_pago = :c_tipo_plan_pago and rownum = 1"
            );
        }
        $res_tipo_plan = $query_c_tipo_plan->do_query($parametros);
        $c_tipo_plan_pago = $res_tipo_plan[0]['C_TIPO_PLAN_PAGO'];
        echo ('OK#sep#'.$c_tipo_plan_pago);
        die();
    }

    if($result3[0]['CANT'] == 1){
        if($c_tipo_plan_pago==null){
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                    from planes_de_pago p
                    where p.n_plan_pago = :n_plan_pago and p.f_caducidad is null and rownum = 1"
            );
        }
        else{
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                    from planes_de_pago p
                    where p.n_plan_pago = :n_plan_pago and p.c_tipo_plan_pago = :c_tipo_plan_pago and rownum = 1"
            );
        }
        $res_tipo_plan = $query_c_tipo_plan->do_query($parametros);
        $c_tipo_plan_pago = $res_tipo_plan[0]['C_TIPO_PLAN_PAGO'];
        echo ('OK#sep#'.$c_tipo_plan_pago);
        die();
    }

    if($result4[0]['CANT'] == 1){
        if($c_tipo_plan_pago==null){
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                    from planes_de_pago p
                    where p.n_plan_pago = :n_plan_pago and p.f_marca_caducidad is null and rownum = 1"
            );
        }
        else{
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                    from planes_de_pago p
                    where p.n_plan_pago = :n_plan_pago and p.c_tipo_plan_pago = :c_tipo_plan_pago and rownum = 1"
            );
        }
        $res_tipo_plan = $query_c_tipo_plan->do_query($parametros);
        $c_tipo_plan_pago = $res_tipo_plan[0]['C_TIPO_PLAN_PAGO'];
        echo ('OK#sep#'.$c_tipo_plan_pago);
        die();
    }
	

	}
	
	if($modo_pantalla=='CM'){

	$query1 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago"
							);
							
	$query2 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago
								and p.f_efectivacion is null"
							);
							
	$query3 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago
								and p.f_caducidad is null"
							);
							
	$query4 = new DB_Query("	select count(*) as cant 
								from planes_de_pago p
								where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
								and p.n_plan_pago = :n_plan_pago
								and p.f_marca_caducidad is null"
							);

    $result = $query1->do_query($parametros);

    if($c_tipo_plan_pago==null){
        if($result[0]['CANT'] > 1){
            $query_lista_planes = new DB_Query("	select c_tipo_plan_pago
                            from planes_de_pago p
                            where p.c_tipo_plan_pago = nvl(:c_tipo_plan_pago, p.c_tipo_plan_pago)
                            and p.n_plan_pago = :n_plan_pago"
            );
            $res_lista_planes = $query_lista_planes->do_query($parametros);
            $tipo_planes = '';
            foreach($res_lista_planes as $pos){
                $tipo_planes .= '<button class="button_tipo" type="button" onclick="choosePlan(\''.$pos['C_TIPO_PLAN_PAGO'].'\', this)">'.$pos['C_TIPO_PLAN_PAGO'].'</button>';
            }
            $tipo_planes =  substr($tipo_planes, 0, -2).'.';
            echo ('Existe más de un plan con este número. Debe seleccionar el Tipo de Plan entre: '.$tipo_planes);
            die();
        }
    }

	if($result[0]['CANT'] == 0){
		echo ('No existe plan de pago para los datos ingresados.');
		die();
	}
	
	$result2 = $query2->do_query($parametros);

	if($result2[0]['CANT'] == 0){
		echo ('El plan de pago seleccionado ya ha sido efectivizado.');
		die();
	}

	$result3 = $query3->do_query($parametros);

	if($result3[0]['CANT'] == 0){
		echo ('El plan de pago seleccionado ha caducado.');
		die();
	}
	
	$result4 = $query4->do_query($parametros);
	
	if($result4[0]['CANT'] == 0){
		echo ('El plan de pago seleccionado esta en condiciones de caducar.');
		die();
	}

    if($result2[0]['CANT'] == 1){
        if($c_tipo_plan_pago==null){
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                            from planes_de_pago p
                            where p.n_plan_pago = :n_plan_pago
                            and p.f_efectivacion is null
                            and rownum = 1"
            );
        }
        else{
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                            from planes_de_pago p
                            where p.n_plan_pago = :n_plan_pago and p.c_tipo_plan_pago = :c_tipo_plan_pago and rownum = 1"
            );
        }
        $res_tipo_plan = $query_c_tipo_plan->do_query($parametros);
        $c_tipo_plan_pago = $res_tipo_plan[0]['C_TIPO_PLAN_PAGO'];
        echo ('OK#sep#'.$c_tipo_plan_pago);
        die();
    }

    if($result3[0]['CANT'] == 1){
        if($c_tipo_plan_pago==null){
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.n_plan_pago = :n_plan_pago and p.f_caducidad is null and rownum = 1"
            );
        }
        else{
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.n_plan_pago = :n_plan_pago and p.c_tipo_plan_pago = :c_tipo_plan_pago and rownum = 1"
            );
        }
        $res_tipo_plan = $query_c_tipo_plan->do_query($parametros);
        $c_tipo_plan_pago = $res_tipo_plan[0]['C_TIPO_PLAN_PAGO'];
        echo ('OK#sep#'.$c_tipo_plan_pago);
        die();
    }

    if($result4[0]['CANT'] == 1){
        if($c_tipo_plan_pago==null){
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.n_plan_pago = :n_plan_pago and p.f_marca_caducidad is null and rownum = 1"
            );
        }
        else{
            $query_c_tipo_plan = new DB_Query("	select c_tipo_plan_pago
                        from planes_de_pago p
                        where p.n_plan_pago = :n_plan_pago and p.c_tipo_plan_pago = :c_tipo_plan_pago and rownum = 1"
            );
        }
        $res_tipo_plan = $query_c_tipo_plan->do_query($parametros);
        $c_tipo_plan_pago = $res_tipo_plan[0]['C_TIPO_PLAN_PAGO'];
        echo ('OK#sep#'.$c_tipo_plan_pago);
        die();
    }

	echo ('OK');
	die();
	}
?>