<?php
$n_cuit = ($_POST['n_cuit']);
$id_contribuyente = ($_POST['id_contribuyente']);
$db_query = new DB_Query("select 
								d_denominacion,
								id_contribuyente,
								fun_formato_cuit(n_cuit) n_cuit,
								c_tipo_documento,
								(SELECT 
									d_dato 
								from 
									tablas_generales tg
								where 
									tg.n_tabla = c.n_tabla_tipo_doc
									AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
								n_documento
						  from 
								contribuyentes c
						  where 
							n_cuit = :n_cuit
						  	or id_contribuyente = :id_contribuyente");
$par = array(':n_cuit' => $n_cuit,
			 ':id_contribuyente' => $id_contribuyente);
$row_query = $db_query->do_query($par);


echo json_encode($row_query[0]);

?>


