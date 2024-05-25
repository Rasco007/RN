<?php
$tipo_consulta = $_POST['p_tipo_consulta'];
$id_plan_fis = $_POST['p_id_plan_fis'];

switch ($tipo_consulta) {
    case 'FrmGrid_main_grid':
        $db_query = new DB_Query("SELECT ID_PLAN_FIS_SEQ.NEXTVAL ID_PLAN
        FROM DUAL
        ");
        $par = array(); 
        //echo  $par;                        
        $row_query = $db_query->do_query();
 
        echo json_encode($row_query[0]);
        break;

        
    case 'FrmGrid_detalles_grid':

        $procedure = "PAC_FISCA_PLAN_PERSONAL.FUN_TRAER_N_PROGRAMA(:p_id_plan_fis)";     
        $parametros = array(':p_id_plan_fis'=>$id_plan_fis);         
        $data = getArrayResult($procedure, $parametros);     
        echo json_encode($data->datos[0]);


       
        break;


        case 'calcular_horas_totales':
            $db_query = new DB_Query(" SELECT SUM (n_horas_est) tot_horas
            FROM planes_fiscalizacion_detalle pfd_aux
           WHERE pfd_aux.id_plan_fis = :p_id_plan_fis
            ");
            $par = array(':p_id_plan_fis' => $id_plan_fis); 
            //echo  $par;                        
            $row_query = $db_query->do_query($par);
            
           
                echo json_encode($row_query[0]);
            break;

    default:
        $response->resultado = 'La Interfaz no está preparada para recibir el proceso.';
        echo json_encode($response);
    break;


   
}

?>