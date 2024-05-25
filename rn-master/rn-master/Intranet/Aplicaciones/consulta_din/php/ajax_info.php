<?php
	$parametres = array( 
		':p_id_cons_dinamica' => $_POST['p_id_cons_dinamica']
	);

	$response->tabla = "TMP_CONSULTAS_DINAMICAS_RESU";
    
    $procedure = "PAC_CONS_DINAMICA.FUN_DATOS_RESU(:p_id_cons_dinamica)";

    $resultado = getArrayResult($procedure, $parametres);
    $rows = $resultado->datos;

    
    $response->colnames = "['id_cons_dinamica', 'n_fila' ";

    $cant_cols = 0;

    foreach ($rows as $row){
        $cant_cols += 1;
        $response->colnames = $response->colnames.",'".$row['D_TITULO']."'";
    }

    $response->colnames = $response->colnames."]";


    $response->colmodel = "[{name:'id_cons_dinamica',index:'id_cons_dinamica',hidden:true}, {name:'n_fila',index:'n_fila',hidden:true} ";
    

    foreach (range(1, $cant_cols) as $number) {
        $response->colmodel = $response->colmodel.",{name:'d_valor".$number."',index:'d_valor".$number."'";
        if($rows[$number-1]['D_HTML_OPCIONES']){
            if(strpos($rows[$number-1]['D_HTML_OPCIONES'], "align") === false){
                $response->colmodel = $response->colmodel.", align:'left'";
            }
            $response->colmodel = $response->colmodel.",".$rows[$number-1]['D_HTML_OPCIONES'];
            if(strpos($rows[$number-1]['D_HTML_OPCIONES'], "width") === false){
                $response->colmodel = $response->colmodel.", width:100";
            }
        } else {
            $response->colmodel = $response->colmodel.", align:'left', width:100";
        }
        $response->colmodel = $response->colmodel.", searchoptions:{sopt:['LIKE','LIKSTART','LIKEND','nu']}}";
    }

    

    $response->colmodel = $response->colmodel."]";

	echo json_encode($response);
?>