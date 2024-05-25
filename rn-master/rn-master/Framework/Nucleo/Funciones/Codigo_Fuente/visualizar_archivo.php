<?php
	session_write_close();
    $d_archivo = (isset($_REQUEST["d_archivo"])) ? ROOT_DIR.$_REQUEST["d_archivo"] : "";
    $d_nom_original = (isset($_REQUEST["d_nom_original"])) ? $_REQUEST["d_nom_original"] : "";
    $d_ext = '';

    $pos = strpos($d_nom_original, ".");
    if ($pos !== false)
        $d_ext= strtoupper(substr($d_nom_original, $pos+1));


    if(!file_exists($d_archivo)){
        die('No se puede encontrar el archivo solicitado:   '.$d_nom_original);
    }

    //----------------------------------------------------------------------------------------------
    // Prepara la pagina según el tipo de archivo y lo transfiere
    //----------------------------------------------------------------------------------------------
    header('Content-Disposition: inline; filename="' . $d_nom_original . '"');
    header('Content-Transfer-Encoding: binary');
    header('Content-Length: ' . filesize($d_archivo));
    header('Accept-Ranges: bytes');
    header("Expires: 0");

    if ($d_ext == 'PDF')
        header('Content-type: application/pdf'); //El pdf se abre en una ventana nueva (si se le agrega / al final, se descarga)

    /*else if($d_ext == 'JPG' or $d_ext == 'GIF' or $d_ext == 'PNG' or $d_ext == 'BMP')
        header('Content-type: image/');

    else if($d_ext == 'XLS' or $d_ext == 'XLSX'){
        header('Content-Description: File Transfer');
        header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    else if($d_ext == 'DOC' or $d_ext == 'DOCX'){
        header('Content-Description: File Transfer');
        header("Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    }*/

    /*else if($d_ext == 'TXT'){
        header('Content-type: text/html/');
    }*/

    else{
        header('Content-Type: application/octet-stream');
    }
	session_start();
    // Transfiere el archivo
    @readfile($d_archivo);

    /*
        Pendientes:
          1) Checklogin
          2) Ofuscacion de los nombres de los documentos
          3) Seguir completando la funcionalidad según el tipo de archivo
        Extension MIME Type
        .doc      application/msword
        .dot      application/msword

        .docx     application/vnd.openxmlformats-officedocument.wordprocessingml.document
        .dotx     application/vnd.openxmlformats-officedocument.wordprocessingml.template
        .docm     application/vnd.ms-word.document.macroEnabled.12
        .dotm     application/vnd.ms-word.template.macroEnabled.12

        .xls      application/vnd.ms-excel
        .xlt      application/vnd.ms-excel
        .xla      application/vnd.ms-excel

        .xlsx     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        .xltx     application/vnd.openxmlformats-officedocument.spreadsheetml.template
        .xlsm     application/vnd.ms-excel.sheet.macroEnabled.12
        .xltm     application/vnd.ms-excel.template.macroEnabled.12
        .xlam     application/vnd.ms-excel.addin.macroEnabled.12
        .xlsb     application/vnd.ms-excel.sheet.binary.macroEnabled.12

        .ppt      application/vnd.ms-powerpoint
        .pot      application/vnd.ms-powerpoint
        .pps      application/vnd.ms-powerpoint
        .ppa      application/vnd.ms-powerpoint

        .pptx     application/vnd.openxmlformats-officedocument.presentationml.presentation
        .potx     application/vnd.openxmlformats-officedocument.presentationml.template
        .ppsx     application/vnd.openxmlformats-officedocument.presentationml.slideshow
        .ppam     application/vnd.ms-powerpoint.addin.macroEnabled.12
        .pptm     application/vnd.ms-powerpoint.presentation.macroEnabled.12
        .potm     application/vnd.ms-powerpoint.template.macroEnabled.12
        .ppsm     application/vnd.ms-powerpoint.slideshow.macroEnabled.12

        .mdb      application/vnd.ms-access
        */

?>

