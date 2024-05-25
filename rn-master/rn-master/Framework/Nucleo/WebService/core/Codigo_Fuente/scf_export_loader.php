<?php
session_start();

$_SESSION['entorno'] = 'WEBSERVICE';
require_once CONFIG_FRAMEWORK_PROY.'path-conf.php';
require_once CONFIG_FRAMEWORK.'path-conf.php';
require_once 'funciones_webserv.php';

if(isset($_GET['status'])){
    switch ($_GET['status']){
        case 'pdf':
            ini_set("memory_limit", "-1");
            set_time_limit(300);
            require_once(FRAMEWORK_DIR."Recursos/Mpdf/6.1/mpdf.php");

            $orientacion = ($_POST['orientacion']);

            if($orientacion == 'V'){
                $mpdf=new mPDF('c','A4','','',10,10,35,25,10,10);
            }
            if($orientacion == 'H'){
                $mpdf=new mPDF('c','A4-L','','',10,10,35,25,10,10); //LANDSCAPE
            }

            $mpdf->cacheTables = true;
            $mpdf->simpleTables = true;
            $mpdf->packTableData = true;

            $param['id_menu']   = $_POST['id_menu'];
            $param['n_grid']   = $_POST['n_grid'];

            $param['orientacion']   = $_POST['orientacion'];
            $param['title'] = $_POST['title'];
            $param['cond'] = $_POST['cond'];
            $param['param'] = $_POST['param'];
            $param['columnas'] = $_POST['columnas'];

            $param['m_autoquery'] = $_POST['m_autoquery'];
            $param['adv'] = $_POST['adv'];
            $param['sidx'] = $_POST['sidx'];
            $param['sord'] = $_POST['sord'];

            $param['html_filtros'] = $_POST['html_filtros'];
            $param['txt_comentario_informe'] = $_POST['txt_comentario_informe'];

            $response = json_decode(ejecutar_curl(WEBSERVICE_URL. 'get_export_pdf_data/',$param));

            $mpdf->SetTitle($response->title);
            $mpdf->SetHTMLHeader($response->header);
            $mpdf->SetHTMLFooter($response->footer);

            $mpdf->WriteHTML($response->excel_final);
            $mpdf->Output($response->filename,'I');
        break;
        case 'excel':

            set_time_limit( 6000 );
            ini_set("memory_limit","512M");
            $filename = "Export_".date("Y-m-d_H-i",time()).'.xls';
            header("Content-type: application/vnd.ms-excel; name='excel'");  
            header("Content-Disposition: filename=$filename");  
            header("Pragma: no-cache");  
            header("Expires: 0"); 
            ob_clean();
            flush();

            $param['id_menu']   = $_POST['id_menu'];
            $param['n_grid']   = $_POST['n_grid'];
            $param['columnas']   = $_POST['columnas'];
            $param['param'] = $_POST['param'];
            $param['cond'] = $_POST['cond'];
            $param['m_autoquery'] = $_POST['m_autoquery'];
            $param['adv'] = $_POST['adv'];
            $param['sidx'] = $_POST['sidx'];
            $param['sord'] = $_POST['sord'];
            $html = ejecutar_curl(WEBSERVICE_URL. 'get_export_excel_data/',$param);

            echo $html;
        break;
    }
}

?>