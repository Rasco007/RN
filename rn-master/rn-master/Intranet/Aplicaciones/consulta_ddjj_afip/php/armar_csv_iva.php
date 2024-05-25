<?php

$tipo_consulta = $_POST['p_tipo_consulta'];
$n_cuit = $_POST['p_n_cuit'];
$separador = ';';

$par = array(
    ':p_n_cuit' => $n_cuit
);


if($tipo_consulta == 'iva'){
    $data = getArrayResult('PAC_CONTRIBUYENTES_AFIP.FUN_TRAER_CONS_IVA(:p_n_cuit)', $par);
    $filename = ROOT_DIR . $n_cuit .'-IVA.csv';

    if (!$archivo    = fopen("$filename", "w")) {
        die("Error al crear el archivo");
    }

    $linea =   '"' . 'ID_ARCHIVO' . '"' . $separador .
		   '"' . 'N_TRANSACCION_AFIP' . '"' . $separador .
           '"' .'PERIODO' . '"' . $separador .
           '"' .'N_CUIT' . '"' . $separador .
           '"' .'F_PRESENTACION' . '"' . $separador .
							'"' . 'IMP117' . '"' . $separador .
							'"' . 'IMP117_A00' . '"' . $separador .
							'"' . 'IMP117_A10' . '"' . $separador .
							'"' . 'IMP117_A13' . '"' . $separador .
							'"' . 'IMP117_A21' . '"' . $separador .
							'"' . 'IMP117_A27' . '"' . $separador .
							'"' . 'IMP118' . '"' . $separador .
							'"' . 'IMP118_A00' . '"' . $separador .
							'"' . 'IMP118_A10' . '"' . $separador .
							'"' . 'IMP118_A13' . '"' . $separador .
							'"' . 'IMP118_A21' . '"' . $separador .
							'"' . 'IMP118_A27' . '"' . $separador .
							'"' . 'IMP119_127' . '"' . $separador .
							'"' . 'IMP120_128' . '"' . $separador .
							'"' . 'IMP125' . '"' . $separador .
							'"' . 'IMP125_A00' . '"' . $separador .
							'"' . 'IMP125_A025' . '"' . $separador .
							'"' . 'IMP125_A05' . '"' . $separador .
							'"' . 'IMP125_A10' . '"' . $separador .
							'"' . 'IMP125_A13' . '"' . $separador .
							'"' . 'IMP125_A21' . '"' . $separador .
							'"' . 'IMP125_A27' . '"' . $separador .
							'"' . 'IMP126' . '"' . $separador .
							'"' . 'IMP126_A00' . '"' . $separador .
							'"' . 'IMP126_A025' . '"' . $separador .
							'"' . 'IMP126_A05' . '"' . $separador .
							'"' . 'IMP126_A10' . '"' . $separador .
							'"' . 'IMP126_A13' . '"' . $separador .
							'"' . 'IMP126_A21' . '"' . $separador .
							'"' . 'IMP126_A27' . '"' . $separador .
							'"' . 'IMP133' . '"' . $separador .
							'"' . 'IMP133_A10' . '"' . $separador .
							'"' . 'IMP133_A21' . '"' . $separador .
							'"' . 'IMP134' . '"' . $separador .
							'"' . 'IMP134_A10' . '"' . $separador .
							'"' . 'IMP134_A21' . '"' . $separador .
							'"' . 'IMP135_137' . '"' . $separador .
							'"' . 'IMP136_139' . '"' . $separador .
							'"' . 'IMP140' . '"' . $separador .
							'"' . 'IMP141' . '"' . $separador .
							'"' . 'IMP221' . '"' . $separador .
							'"' . 'IMP222_224' . '"' . $separador .
							'"' . 'IMP265_271' . '"' . $separador .
							'"' . 'IMP272' . '"' . $separador .
							'"' . 'IMP300' . '"' . $separador .
							'"' . 'IMP600' . '"' . $separador .
							'"' . 'IMP605_611' . '"' . $separador .
							'"' . 'IMP613_618' . '"' . $separador .
							'"' . 'IMP619' . '"' . $separador .
							'"' . 'IMP620' . '"' . $separador .
							'"' . 'IMP621_628' . '"' . $separador .
							'"' . 'IMP622_629' . '"' . $separador .
							'"' . 'IMP626' . '"' . $separador .
							'"' . 'IMP626_A00' . '"' . $separador .
							'"' . 'IMP626_A025' . '"' . $separador .
							'"' . 'IMP626_A05' . '"' . $separador .
							'"' . 'IMP626_A10' . '"' . $separador .
							'"' . 'IMP626_A13' . '"' . $separador .
							'"' . 'IMP626_A21' . '"' . $separador .
							'"' . 'IMP626_A27' . '"' . $separador .							
							'"' . 'IMP627' . '"' . $separador .
							'"' . 'IMP627_A00' . '"' . $separador .
							'"' . 'IMP627_A025' . '"' . $separador .
							'"' . 'IMP627_A05' . '"' . $separador .
							'"' . 'IMP627_A10' . '"' . $separador .
							'"' . 'IMP627_A13' . '"' . $separador .
							'"' . 'IMP627_A21' . '"' . $separador .
							'"' . 'IMP627_A27' . '"' . $separador .								
							'"' . 'IMP634_635' . '"';
    
    fwrite($archivo, $linea . PHP_EOL);

    $par = array();
                            
    $row_query = $data->datos;

    echo($row_query);

    if(count($row_query) == 0){
        return;
    }
                                  
    for ($i = 0; $i < count($row_query); $i++) {
                            
        $linea =    $row_query[$i]['ID_ARCHIVO'] .  $separador .
             $row_query[$i]['N_TRANSACCION_AFIP'] .  $separador .
                 $row_query[$i]['PERIODO'] .  $separador .
                 $row_query[$i]['N_CUIT'] .  $separador .
                 $row_query[$i]['F_PRESENTACION'] .  $separador .
                 $row_query[$i]['IMP117'] .  $separador .
                 $row_query[$i]['IMP117_A00'] .  $separador .
                 $row_query[$i]['IMP117_A10'] .  $separador .
                 $row_query[$i]['IMP117_A13'] .  $separador .
                 $row_query[$i]['IMP117_A21'] .  $separador .
                 $row_query[$i]['IMP117_A27'] .  $separador .
                 $row_query[$i]['IMP118'] .  $separador .
                 $row_query[$i]['IMP118_A00'] .  $separador .
                 $row_query[$i]['IMP118_A10'] .  $separador .
                 $row_query[$i]['IMP118_A13'] .  $separador .
                 $row_query[$i]['IMP118_A21'] .  $separador .
                 $row_query[$i]['IMP118_A27'] .  $separador .
                 $row_query[$i]['IMP119_127'] .  $separador .
                 $row_query[$i]['IMP120_128'] .  $separador .
                 $row_query[$i]['IMP125'] .  $separador .
                 $row_query[$i]['IMP125_A00'] .  $separador .
                 $row_query[$i]['IMP125_A025'] .  $separador .
                 $row_query[$i]['IMP125_A05'] .  $separador .
                 $row_query[$i]['IMP125_A10'] .  $separador .
                 $row_query[$i]['IMP125_A13'] .  $separador .
                 $row_query[$i]['IMP125_A21'] .  $separador .
                 $row_query[$i]['IMP125_A27'] .  $separador .
                 $row_query[$i]['IMP126'] .  $separador .
                 $row_query[$i]['IMP126_A00'] .  $separador .
                 $row_query[$i]['IMP126_A025'] .  $separador .
                 $row_query[$i]['IMP126_A05'] .  $separador .
                 $row_query[$i]['IMP126_A10'] .  $separador .
                 $row_query[$i]['IMP126_A13'] .  $separador .
                 $row_query[$i]['IMP126_A21'] .  $separador .
                 $row_query[$i]['IMP126_A27'] .  $separador .
                 $row_query[$i]['IMP133'] .  $separador .
                 $row_query[$i]['IMP133_A10'] .  $separador .
                 $row_query[$i]['IMP133_A21'] .  $separador .
                 $row_query[$i]['IMP134'] .  $separador .
                 $row_query[$i]['IMP134_A10'] .  $separador .
                 $row_query[$i]['IMP134_A21'] .  $separador .
                 $row_query[$i]['IMP135_137'] .  $separador .
                 $row_query[$i]['IMP136_139'] .  $separador .
                 $row_query[$i]['IMP140'] .  $separador .
                 $row_query[$i]['IMP141'] .  $separador .
                 $row_query[$i]['IMP221'] .  $separador .
                 $row_query[$i]['IMP222_224'] .  $separador .
                 $row_query[$i]['IMP265_271'] .  $separador .
                 $row_query[$i]['IMP272'] .  $separador .
                 $row_query[$i]['IMP300'] .  $separador .
                 $row_query[$i]['IMP600'] .  $separador .
                 $row_query[$i]['IMP605_611'] .  $separador .
                 $row_query[$i]['IMP613_618'] .  $separador .
                 $row_query[$i]['IMP619'] .  $separador .
                 $row_query[$i]['IMP620'] .  $separador .
                 $row_query[$i]['IMP621_628'] .  $separador .
                 $row_query[$i]['IMP622_629'] .  $separador .
                 $row_query[$i]['IMP626'] .  $separador .
                 $row_query[$i]['IMP626_A00'] .  $separador .
                 $row_query[$i]['IMP626_A025'] .  $separador .
                 $row_query[$i]['IMP626_A05'] .  $separador .
                 $row_query[$i]['IMP626_A10'] .  $separador .
                 $row_query[$i]['IMP626_A13'] .  $separador .
                 $row_query[$i]['IMP626_A21'] .  $separador .
                 $row_query[$i]['IMP626_A27'] .  $separador .							
                 $row_query[$i]['IMP627'] .  $separador .
                 $row_query[$i]['IMP627_A00'] .  $separador .
                 $row_query[$i]['IMP627_A025'] .  $separador .
                 $row_query[$i]['IMP627_A05'] .  $separador .
                 $row_query[$i]['IMP627_A10'] .  $separador .
                 $row_query[$i]['IMP627_A13'] .  $separador .
                 $row_query[$i]['IMP627_A21'] .  $separador .
                 $row_query[$i]['IMP627_A27'] .  $separador .								
                 $row_query[$i]['IMP634_635'] ;
                            
        fwrite($archivo, $linea . PHP_EOL);
    }
    fwrite($archivo, PHP_EOL);
                
} 
else if($tipo_consulta == 'empleadores'){
    $data = getArrayResult('PAC_CONTRIBUYENTES_AFIP.FUN_TRAER_CONS_EMPLEADORES(:p_n_cuit)', $par);
    $filename = ROOT_DIR . $n_cuit . '-EMP.csv';

    if (!$archivo    = fopen("$filename", "w")) {
        die("Error al crear el archivo");
    }

    $linea =   '"' . 'PERIODO' . '"' . $separador .
		   '"' . 'N_CUIT' . '"' . $separador .
           '"' .'F_PRESENTACION' . '"' . $separador .
           '"' .'CANT_EMP' . '"' . $separador .
           '"' .'IMP700' . '"' . $separador .
		   '"' . 'IMP705' . '"' . $separador .
			'"' . 'IMP710' . '"' . $separador .
			'"' . 'IMP715' . '"' . $separador .
			'"' . 'ID_ARCHIVO' . '"' . $separador .
			'"' . 'F_ALTA' . '"' . $separador .
			'"' . 'C_USUARIOALT' . '"' . $separador .
			'"' . 'M_ULT_PRESENTADA' . '"' . $separador .
			'"' . 'C_IMPUESTO' . '"' . $separador .
			'"' . 'C_FORM' . '"' . $separador .
			'"' . 'C_VERSION' . '"' . $separador .
			'"' . 'C_RECTIFICATIVA' . '"' . $separador .
			'"' . 'C_TIPO' . '"' . $separador .
			'"' . 'N_TRANSACCION_AFIP' . '"';
    
    fwrite($archivo, $linea . PHP_EOL);

    $par = array();
                            
    $row_query = $data->datos;

    if(count($row_query) == 0){
        return;
    }
                            
                            
    for ($i = 0; $i < count($row_query); $i++) {

        $linea =    $row_query[$i]['PERIODO'] .  $separador .
		    $row_query[$i]['N_CUIT'] .  $separador .
            $row_query[$i]['F_PRESENTACION'] .  $separador .
            $row_query[$i]['CANT_EMP'] .  $separador .
            $row_query[$i]['IMP700'] .  $separador .
		    $row_query[$i]['IMP705'] .  $separador .
			 $row_query[$i]['IMP710'] .  $separador .
			 $row_query[$i]['IMP715'] .  $separador .
			 $row_query[$i]['ID_ARCHIVO'] .  $separador .
			 $row_query[$i]['F_ALTA'] .  $separador .
			 $row_query[$i]['C_USUARIOALT'] .  $separador .
			 $row_query[$i]['M_ULT_PRESENTADA'] .  $separador .
			 $row_query[$i]['C_IMPUESTO'] .  $separador .
			 $row_query[$i]['C_FORM'] .  $separador .
			 $row_query[$i]['C_VERSION'] .  $separador .
			 $row_query[$i]['C_RECTIFICATIVA'] .  $separador .
			 $row_query[$i]['C_TIPO'] .  $separador .
			 $row_query[$i]['N_TRANSACCION_AFIP'] ;
                            
        fwrite($archivo, $linea . PHP_EOL);
    }
    fwrite($archivo, PHP_EOL);
}
else if($tipo_consulta == 'gan pf'){
    $data = getArrayResult('PAC_CONTRIBUYENTES_AFIP.FUN_TRAER_CONS_GAN_PF(:p_n_cuit)', $par);
    $filename = ROOT_DIR . $n_cuit .'-GAN_PF.csv';

    if (!$archivo    = fopen("$filename", "w")) {
        die("Error al crear el archivo");
    }

    $linea = '"' . 'PERIODO' . '"' . $separador .
            '"' . 'N_CUIT' . '"' . $separador .
            '"' . 'F_PRESENTACION' . '"' . $separador .
            '"' . 'IMP213' . '"' . $separador .
            '"' . 'IMP106' . '"' . $separador .
            '"' . 'IMP590' . '"' . $separador .
            '"' . 'IMP103' . '"' . $separador .
            '"' . 'IMP591' . '"' . $separador .
            '"' . 'IMP592' . '"' . $separador .
            '"' . 'IMP030' . '"' . $separador .
            '"' . 'IMP032' . '"' . $separador .
            '"' . 'IMP3002' . '"' . $separador .
            '"' . 'IMP145' . '"' . $separador .
            '"' . 'IMP009' . '"' . $separador .
            '"' . 'IMP010' . '"' . $separador .
            '"' . 'IMP011' . '"' . $separador .
            '"' . 'IMP007' . '"' . $separador .
            '"' . 'IMP008' . '"' . $separador .
            '"' . 'IMP031' . '"' . $separador .
            '"' . 'IMP593' . '"' . $separador .
            '"' . 'IMP595' . '"' . $separador .
            '"' . 'IMP594' . '"' . $separador .
            '"' . 'IMP596' . '"' . $separador .
            '"' . 'IMP3003' . '"' . $separador .
            '"' . 'IMP129' . '"' . $separador .
            '"' . 'IMP130' . '"' . $separador .
            '"' . 'IMP3031' . '"' . $separador .
            '"' . 'IMP396' . '"' . $separador .
            '"' . 'IMP107' . '"' . $separador .
            '"' . 'IMP612' . '"' . $separador .
            '"' . 'IMP104' . '"' . $separador .
            '"' . 'IMP833' . '"' . $separador .
            '"' . 'IMP353' . '"' . $separador .
            '"' . 'IMP3009' . '"' . $separador .
            '"' . 'IMP100' . '"' . $separador .
            '"' . 'IMP101' . '"' . $separador .
            '"' . 'IMP3035' . '"' . $separador .
            '"' . 'IMP361' . '"' . $separador .
            '"' . 'IMP102' . '"' . $separador .
            '"' . 'IMP048' . '"' . $separador .
            '"' . 'IMP083' . '"' . $separador .
            '"' . 'IMP972' . '"' . $separador .
            '"' . 'IMP3110' . '"' . $separador .
            '"' . 'IMP978' . '"' . $separador .
            '"' . 'IMP979' . '"' . $separador .
            '"' . 'IMP013' . '"' . $separador .
            '"' . 'IMP3004' . '"' . $separador .
            '"' . 'IMP2000' . '"' . $separador .
            '"' . 'IMP2001' . '"' . $separador .
            '"' . 'IMP2002' . '"' . $separador .
            '"' . 'IMP2003' . '"' . $separador .
            '"' . 'IMP2004' . '"' . $separador .
            '"' . 'IMP2005' . '"' . $separador .
            '"' . 'IMP2006' . '"' . $separador .
            '"' . 'IMP2007' . '"' . $separador .
            '"' . 'IMP2008' . '"' . $separador .
            '"' . 'IMP2009' . '"' . $separador .
            '"' . 'IMP2010' . '"' . $separador .
            '"' . 'IMP2011' . '"' . $separador .
            '"' . 'IMP2012' . '"' . $separador .
            '"' . 'IMP2013' . '"' . $separador .
            '"' . 'IMP2014' . '"' . $separador .
            '"' . 'IMP2015' . '"' . $separador .
            '"' . 'IMP2016' . '"' . $separador .
            '"' . 'IMP2017' . '"' . $separador .
            '"' . 'IMP2018' . '"' . $separador .
            '"' . 'IMP2019' . '"' . $separador .
            '"' . 'IMP2020' . '"' . $separador .
            '"' . 'IMP2021' . '"' . $separador .
            '"' . 'IMP2022' . '"' . $separador .
            '"' . 'ID_ARCHIVO' . '"' . $separador .
            '"' . 'F_ALTA' . '"' . $separador .
            '"' . 'C_USUARIOALT' . '"' . $separador .
            '"' . 'C_IMPUESTO' . '"' . $separador .
            '"' . 'C_FORM' . '"' . $separador .
            '"' . 'C_VERSION' . '"' . $separador .
            '"' . 'C_RECTIFICATIVA' . '"' . $separador .
            '"' . 'C_TIPO' . '"' . $separador .
            '"' . 'N_TRANSACCION_AFIP' . '"';
    
    fwrite($archivo, $linea . PHP_EOL);

    $par = array();
                            
    $row_query = $data->datos;

    if(count($row_query) == 0){
        return;
    }
                            
                            
    for ($i = 0; $i < count($row_query); $i++) {

        $linea =  $row_query[$i]['PERIODO'] .  $separador .
             $row_query[$i]['N_CUIT'] .  $separador .
             $row_query[$i]['F_PRESENTACION'] .  $separador .
             $row_query[$i]['IMP213'] .  $separador .
             $row_query[$i]['IMP106'] .  $separador .
             $row_query[$i]['IMP590'] .  $separador .
             $row_query[$i]['IMP103'] .  $separador .
             $row_query[$i]['IMP591'] .  $separador .
             $row_query[$i]['IMP592'] .  $separador .
             $row_query[$i]['IMP030'] .  $separador .
             $row_query[$i]['IMP032'] .  $separador .
             $row_query[$i]['IMP3002'] .  $separador .
             $row_query[$i]['IMP145'] .  $separador .
             $row_query[$i]['IMP009'] .  $separador .
             $row_query[$i]['IMP010'] .  $separador .
             $row_query[$i]['IMP011'] .  $separador .
             $row_query[$i]['IMP007'] .  $separador .
             $row_query[$i]['IMP008'] .  $separador .
             $row_query[$i]['IMP031'] .  $separador .
             $row_query[$i]['IMP593'] .  $separador .
             $row_query[$i]['IMP595'] .  $separador .
             $row_query[$i]['IMP594'] .  $separador .
             $row_query[$i]['IMP596'] .  $separador .
             $row_query[$i]['IMP3003'] .  $separador .
             $row_query[$i]['IMP129'] .  $separador .
             $row_query[$i]['IMP130'] .  $separador .
             $row_query[$i]['IMP3031'] .  $separador .
             $row_query[$i]['IMP396'] .  $separador .
             $row_query[$i]['IMP107'] .  $separador .
             $row_query[$i]['IMP612'] .  $separador .
             $row_query[$i]['IMP104'] .  $separador .
             $row_query[$i]['IMP833'] .  $separador .
             $row_query[$i]['IMP353'] .  $separador .
             $row_query[$i]['IMP3009'] .  $separador .
             $row_query[$i]['IMP100'] .  $separador .
             $row_query[$i]['IMP101'] .  $separador .
             $row_query[$i]['IMP3035'] .  $separador .
             $row_query[$i]['IMP361'] .  $separador .
             $row_query[$i]['IMP102'] .  $separador .
             $row_query[$i]['IMP048'] .  $separador .
             $row_query[$i]['IMP083'] .  $separador .
             $row_query[$i]['IMP972'] .  $separador .
             $row_query[$i]['IMP3110'] .  $separador .
             $row_query[$i]['IMP978'] .  $separador .
             $row_query[$i]['IMP979'] .  $separador .
             $row_query[$i]['IMP013'] .  $separador .
             $row_query[$i]['IMP3004'] .  $separador .
             $row_query[$i]['IMP2000'] .  $separador .
             $row_query[$i]['IMP2001'] .  $separador .
             $row_query[$i]['IMP2002'] .  $separador .
             $row_query[$i]['IMP2003'] .  $separador .
             $row_query[$i]['IMP2004'] .  $separador .
             $row_query[$i]['IMP2005'] .  $separador .
             $row_query[$i]['IMP2006'] .  $separador .
             $row_query[$i]['IMP2007'] .  $separador .
             $row_query[$i]['IMP2008'] .  $separador .
             $row_query[$i]['IMP2009'] .  $separador .
             $row_query[$i]['IMP2010'] .  $separador .
             $row_query[$i]['IMP2011'] .  $separador .
             $row_query[$i]['IMP2012'] .  $separador .
             $row_query[$i]['IMP2013'] .  $separador .
             $row_query[$i]['IMP2014'] .  $separador .
             $row_query[$i]['IMP2015'] .  $separador .
             $row_query[$i]['IMP2016'] .  $separador .
             $row_query[$i]['IMP2017'] .  $separador .
             $row_query[$i]['IMP2018'] .  $separador .
             $row_query[$i]['IMP2019'] .  $separador .
             $row_query[$i]['IMP2020'] .  $separador .
             $row_query[$i]['IMP2021'] .  $separador .
             $row_query[$i]['IMP2022'] .  $separador .
             $row_query[$i]['ID_ARCHIVO'] .  $separador .
             $row_query[$i]['F_ALTA'] .  $separador .
             $row_query[$i]['C_USUARIOALT'] .  $separador .
             $row_query[$i]['C_IMPUESTO'] .  $separador .
             $row_query[$i]['C_FORM'] .  $separador .
             $row_query[$i]['C_VERSION'] .  $separador .
             $row_query[$i]['C_RECTIFICATIVA'] .  $separador .
             $row_query[$i]['C_TIPO'] .  $separador .
             $row_query[$i]['N_TRANSACCION_AFIP'] ;
                            
        fwrite($archivo, $linea . PHP_EOL);
    }
    fwrite($archivo, PHP_EOL);
}
else if($tipo_consulta == 'gan soc'){
    $data = getArrayResult('PAC_CONTRIBUYENTES_AFIP.FUN_TRAER_CONS_GAN_SOC(:p_n_cuit)', $par);
    $filename = ROOT_DIR . $n_cuit .'-GAN_SOC.csv';

    if (!$archivo    = fopen("$filename", "w")) {
        die("Error al crear el archivo");
    }

    $linea = '"' . 'PERIODO' . '"' . $separador .
            '"' . 'N_CUIT' . '"' . $separador .
            '"' . 'F_PRESENTACION' . '"' . $separador .
            '"' . 'IMP663' . '"' . $separador .
            '"' . 'IMP671' . '"' . $separador .
            '"' . 'IMP670' . '"' . $separador .
            '"' . 'IMP12503' . '"' . $separador .
            '"' . 'IMP12505' . '"' . $separador .
            '"' . 'IMP12504' . '"' . $separador .
            '"' . 'IMP361' . '"' . $separador .
            '"' . 'IMP388' . '"' . $separador .
            '"' . 'IMP13502' . '"' . $separador .
            '"' . 'IMP690' . '"' . $separador .
            '"' . 'IMP18201' . '"' . $separador .
            '"' . 'IMP213' . '"' . $separador .
            '"' . 'IMP010' . '"' . $separador .
            '"' . 'IMP18202' . '"' . $separador .
            '"' . 'IMP272' . '"' . $separador .
            '"' . 'IMP264' . '"' . $separador .
            '"' . 'IMP922' . '"' . $separador .
            '"' . 'IMP921' . '"' . $separador .
            '"' . 'IMP17803' . '"' . $separador .
            '"' . 'IMP17802' . '"' . $separador .
            '"' . 'IMP17801' . '"' . $separador .
            '"' . 'IMP14103' . '"' . $separador .
            '"' . 'IMP14106' . '"' . $separador .
            '"' . 'IMP17806' . '"' . $separador .
            '"' . 'IMP011' . '"' . $separador .
            '"' . 'IMP012' . '"' . $separador .
            '"' . 'IMP013' . '"' . $separador .
            '"' . 'IMP515' . '"' . $separador .
            '"' . 'IMP518' . '"' . $separador .
            '"' . 'IMP18203' . '"' . $separador .
            '"' . 'IMP015' . '"' . $separador .
            '"' . 'IMP108' . '"' . $separador .
            '"' . 'IMP016' . '"' . $separador .
            '"' . 'IMP017' . '"' . $separador .
            '"' . 'IMP047' . '"' . $separador .
            '"' . 'IMP018' . '"' . $separador .
            '"' . 'IMP18101' . '"' . $separador .
            '"' . 'IMP688' . '"' . $separador .
            '"' . 'IMP17502' . '"' . $separador .
            '"' . 'IMP17506' . '"' . $separador .
            '"' . 'IMP17504' . '"' . $separador .
            '"' . 'IMP17503' . '"' . $separador .
            '"' . 'IMP17501' . '"' . $separador .
            '"' . 'IMP17507' . '"' . $separador .
            '"' . 'IMP689' . '"' . $separador .
            '"' . 'IMP18102' . '"' . $separador .
            '"' . 'IMP18402' . '"' . $separador .
            '"' . 'IMP18403' . '"' . $separador .
            '"' . 'IMP18404' . '"' . $separador .
            '"' . 'IMP7912' . '"' . $separador .
            '"' . 'IMP8009' . '"' . $separador .
            '"' . 'IMP7909' . '"' . $separador .
            '"' . 'IMP8008' . '"' . $separador .
            '"' . 'IMP7908' . '"' . $separador .
            '"' . 'IMP8007' . '"' . $separador .
            '"' . 'IMP7907' . '"' . $separador .
            '"' . 'IMP7905' . '"' . $separador .
            '"' . 'IMP8005' . '"' . $separador .
            '"' . 'IMP7903' . '"' . $separador .
            '"' . 'IMP8004' . '"' . $separador .
            '"' . 'IMP7906' . '"' . $separador .
            '"' . 'IMP8006' . '"' . $separador .
            '"' . 'IMP8001' . '"' . $separador .
            '"' . 'IMP7902' . '"' . $separador .
            '"' . 'IMP8003' . '"' . $separador .
            '"' . 'IMP8002' . '"' . $separador .
            '"' . 'IMP7901' . '"' . $separador .
            '"' . 'IMP672' . '"' . $separador .
            '"' . 'IMP923' . '"' . $separador .
            '"' . 'IMP873' . '"' . $separador .
            '"' . 'PF_SALDO_CTA' . '"' . $separador .
            '"' . 'PF_MONTO_PCTA' . '"' . $separador .
            '"' . 'PF_CANT_CTA_SOL' . '"' . $separador .
            '"' . 'N_CUIT_CONT' . '"' . $separador .
            '"' . 'ID_ARCHIVO' . '"' . $separador .
            '"' . 'F_ALTA' . '"' . $separador .
            '"' . 'C_USUARIOALT' . '"' . $separador .
            '"' . 'C_IMPUESTO' . '"' . $separador .
            '"' . 'C_FORM' . '"' . $separador .
            '"' . 'C_VERSION' . '"' . $separador .
            '"' . 'C_RECTIFICATIVA' . '"' . $separador .
            '"' . 'C_TIPO' . '"' . $separador .
            '"' . 'N_TRANSACCION_AFIP' . '"';
    
    fwrite($archivo, $linea . PHP_EOL);

    $par = array();
                            
    $row_query = $data->datos;

    if(count($row_query) == 0){
        return;
    }
                            
                            
    for ($i = 0; $i < count($row_query); $i++) {

        $linea =  $row_query[$i]['PERIODO'] .  $separador .
             $row_query[$i]['N_CUIT'] .  $separador .
             $row_query[$i]['F_PRESENTACION'] .  $separador .
             $row_query[$i]['IMP663'] .  $separador .
             $row_query[$i]['IMP671'] .  $separador .
             $row_query[$i]['IMP670'] .  $separador .
             $row_query[$i]['IMP12503'] .  $separador .
             $row_query[$i]['IMP12505'] .  $separador .
             $row_query[$i]['IMP12504'] .  $separador .
             $row_query[$i]['IMP361'] .  $separador .
             $row_query[$i]['IMP388'] .  $separador .
             $row_query[$i]['IMP13502'] .  $separador .
             $row_query[$i]['IMP690'] .  $separador .
             $row_query[$i]['IMP18201'] .  $separador .
             $row_query[$i]['IMP213'] .  $separador .
             $row_query[$i]['IMP010'] .  $separador .
             $row_query[$i]['IMP18202'] .  $separador .
             $row_query[$i]['IMP272'] .  $separador .
             $row_query[$i]['IMP264'] .  $separador .
             $row_query[$i]['IMP922'] .  $separador .
             $row_query[$i]['IMP921'] .  $separador .
             $row_query[$i]['IMP17803'] .  $separador .
             $row_query[$i]['IMP17802'] .  $separador .
             $row_query[$i]['IMP17801'] .  $separador .
             $row_query[$i]['IMP14103'] .  $separador .
             $row_query[$i]['IMP14106'] .  $separador .
             $row_query[$i]['IMP17806'] .  $separador .
             $row_query[$i]['IMP011'] .  $separador .
             $row_query[$i]['IMP012'] .  $separador .
             $row_query[$i]['IMP013'] .  $separador .
             $row_query[$i]['IMP515'] .  $separador .
             $row_query[$i]['IMP518'] .  $separador .
             $row_query[$i]['IMP18203'] .  $separador .
             $row_query[$i]['IMP015'] .  $separador .
             $row_query[$i]['IMP108'] .  $separador .
             $row_query[$i]['IMP016'] .  $separador .
             $row_query[$i]['IMP017'] .  $separador .
             $row_query[$i]['IMP047'] .  $separador .
             $row_query[$i]['IMP018'] .  $separador .
             $row_query[$i]['IMP18101'] .  $separador .
             $row_query[$i]['IMP688'] .  $separador .
             $row_query[$i]['IMP17502'] .  $separador .
             $row_query[$i]['IMP17506'] .  $separador .
             $row_query[$i]['IMP17504'] .  $separador .
             $row_query[$i]['IMP17503'] .  $separador .
             $row_query[$i]['IMP17501'] .  $separador .
             $row_query[$i]['IMP17507'] .  $separador .
             $row_query[$i]['IMP689'] .  $separador .
             $row_query[$i]['IMP18102'] .  $separador .
             $row_query[$i]['IMP18402'] .  $separador .
             $row_query[$i]['IMP18403'] .  $separador .
             $row_query[$i]['IMP18404'] .  $separador .
             $row_query[$i]['IMP7912'] .  $separador .
             $row_query[$i]['IMP8009'] .  $separador .
             $row_query[$i]['IMP7909'] .  $separador .
             $row_query[$i]['IMP8008'] .  $separador .
             $row_query[$i]['IMP7908'] .  $separador .
             $row_query[$i]['IMP8007'] .  $separador .
             $row_query[$i]['IMP7907'] .  $separador .
             $row_query[$i]['IMP7905'] .  $separador .
             $row_query[$i]['IMP8005'] .  $separador .
             $row_query[$i]['IMP7903'] .  $separador .
             $row_query[$i]['IMP8004'] .  $separador .
             $row_query[$i]['IMP7906'] .  $separador .
             $row_query[$i]['IMP8006'] .  $separador .
             $row_query[$i]['IMP8001'] .  $separador .
             $row_query[$i]['IMP7902'] .  $separador .
             $row_query[$i]['IMP8003'] .  $separador .
             $row_query[$i]['IMP8002'] .  $separador .
             $row_query[$i]['IMP7901'] .  $separador .
             $row_query[$i]['IMP672'] .  $separador .
             $row_query[$i]['IMP923'] .  $separador .
             $row_query[$i]['IMP873'] .  $separador .
             $row_query[$i]['PF_SALDO_CTA'] .  $separador .
             $row_query[$i]['PF_MONTO_PCTA'] .  $separador .
             $row_query[$i]['PF_CANT_CTA_SOL'] .  $separador .
             $row_query[$i]['N_CUIT_CONT'] .  $separador .
             $row_query[$i]['ID_ARCHIVO'] .  $separador .
             $row_query[$i]['F_ALTA'] .  $separador .
             $row_query[$i]['C_USUARIOALT'] .  $separador .
             $row_query[$i]['C_IMPUESTO'] .  $separador .
             $row_query[$i]['C_FORM'] .  $separador .
             $row_query[$i]['C_VERSION'] .  $separador .
             $row_query[$i]['C_RECTIFICATIVA'] .  $separador .
             $row_query[$i]['C_TIPO'] .  $separador .
             $row_query[$i]['N_TRANSACCION_AFIP'] ;
                            
        fwrite($archivo, $linea . PHP_EOL);
    }
    fwrite($archivo, PHP_EOL);
}
else if($tipo_consulta == 'iva web'){
    $data = getArrayResult('PAC_CONTRIBUYENTES_AFIP.FUN_TRAER_CONS_IVA_WEB(:p_n_cuit)', $par);
    $filename = ROOT_DIR . $n_cuit .'-IVA-WEB.csv';

    if (!$archivo    = fopen("$filename", "w")) {
        die("Error al crear el archivo");
    }

    $linea = '"' . 'N_CUIT' . '"' . $separador .
            '"' . 'PERIODO' . '"' . $separador .
            '"' . 'F_PRESENTACION' . '"' . $separador .
            '"' . 'C_MARCA' . '"' . $separador .
            '"' . 'COD_ACTIVIDAD' . '"' . $separador .
            '"' . 'DES_ACTIVIDAD' . '"' . $separador .
            '"' . 'R5_DF_NETO_GR_OP_RI' . '"' . $separador .
            '"' . 'R5_DF_FACT_OP_RI' . '"' . $separador .
            '"' . 'R7_DF_NETO_GR_OP_MONO' . '"' . $separador .
            '"' . 'R8_DF_NETO_GR_OP_OTROS' . '"' . $separador .
            '"' . 'R8_DF_FACT_OP_OTROS' . '"' . $separador .
            '"' . 'R9_MONTO_NETO_DEB_FIS' . '"' . $separador .
            '"' . 'R10_DF_NETO_OP_RI' . '"' . $separador .
            '"' . 'R10_DF_FACT_OP_RI' . '"' . $separador .
            '"' . 'R12_RCF_TOTAL_COMP_BS_MERC_EX' . '"' . $separador .
            '"' . 'R13_RCF_TOTAL_LOCACIONES' . '"' . $separador .
            '"' . 'R14_RCF_TOTAL_PREST_SERV' . '"' . $separador .
            '"' . 'R15_RCF_TOTAL_INV_B_USO' . '"' . $separador .
            '"' . 'R16_RCF_TOTAL_COMP_B_USADOS' . '"' . $separador .
            '"' . 'R17_RCF_FACT_OTROS_CONC' . '"' . $separador .
            '"' . 'R27_OQNGCF_COMP_NOGR_EX' . '"' . $separador .
            '"' . 'R27_OQNGCF_COMP_A_MONO' . '"' . $separador .
            '"' . 'R28_OQNGCF_OTRAS_COMP' . '"' . $separador .
            '"' . 'R33_TOTAL_DEB_FIS_PER' . '"' . $separador .
            '"' . 'R33_TOTAL_CRE_FIS_PER' . '"' . $separador .
            '"' . 'R33_SALDO_TEC_A_FAV_RESP' . '"' . $separador .
            '"' . 'R33_SALDO_TEC_A_FAV_AFIP' . '"' . $separador .
            '"' . 'R35_TOTAL_RET' . '"' . $separador .
            '"' . 'R37_TOTAL_PER' . '"' . $separador .
            '"' . 'R40_TOTAL_PAGO_A_CTA' . '"';
    
    fwrite($archivo, $linea . PHP_EOL);

    $par = array();
                            
    $row_query = $data->datos;

    if(count($row_query) == 0){
        return;
    }
                            
                            
    for ($i = 0; $i < count($row_query); $i++) {

        $linea =  $row_query[$i]['N_CUIT'] .  $separador .
             $row_query[$i]['PERIODO'] .  $separador .
             $row_query[$i]['F_PRESENTACION'] .  $separador .
             $row_query[$i]['C_MARCA'] .  $separador .
             $row_query[$i]['C_ACTIVIDAD'] .  $separador .
             $row_query[$i]['D_ACTIVIDAD'] .  $separador .
             $row_query[$i]['R5_DF_NETO_GR_OP_RI'] .  $separador .
             $row_query[$i]['R5_DF_FACT_OP_RI'] .  $separador .
             $row_query[$i]['R7_DF_NETO_GR_OP_MONO'] .  $separador .
             $row_query[$i]['R8_DF_NETO_GR_OP_OTROS'] .  $separador .
             $row_query[$i]['R8_DF_FACT_OP_OTROS'] .  $separador .
             $row_query[$i]['R9_MONTO_NETO_DEB_FIS'] .  $separador .
             $row_query[$i]['R10_DF_NETO_OP_RI'] .  $separador .
             $row_query[$i]['R10_DF_FACT_OP_RI'] .  $separador .
             $row_query[$i]['R12_RCF_TOTAL_COMP_BS_MERC_EX'] .  $separador .
             $row_query[$i]['R13_RCF_TOTAL_LOCACIONES'] .  $separador .
             $row_query[$i]['R14_RCF_TOTAL_PREST_SERV'] .  $separador .
             $row_query[$i]['R15_RCF_TOTAL_INV_B_USO'] .  $separador .
             $row_query[$i]['R16_RCF_TOTAL_COMP_B_USADOS'] .  $separador .
             $row_query[$i]['R17_RCF_FACT_OTROS_CONC'] .  $separador .
             $row_query[$i]['R27_OQNGCF_COMP_NOGR_EX'] .  $separador .
             $row_query[$i]['R27_OQNGCF_COMP_A_MONO'] .  $separador .
             $row_query[$i]['R28_OQNGCF_OTRAS_COMP'] .  $separador .
             $row_query[$i]['R33_TOTAL_DEB_FIS_PER'] .  $separador .
             $row_query[$i]['R33_TOTAL_CRE_FIS_PER'] .  $separador .
             $row_query[$i]['R33_SALDO_TEC_A_FAV_RESP'] .  $separador .
             $row_query[$i]['R33_SALDO_TEC_A_FAV_AFIP'] .  $separador .
             $row_query[$i]['R35_TOTAL_RET'] .  $separador .
             $row_query[$i]['R37_TOTAL_PER'] .  $separador .
             $row_query[$i]['R40_TOTAL_PAGO_A_CTA'];
                            
        fwrite($archivo, $linea . PHP_EOL);
    }
    fwrite($archivo, PHP_EOL);
}
else if($tipo_consulta == 'iva web ii'){
    $data = getArrayResult('PAC_CONTRIBUYENTES_AFIP.FUN_TRAER_CONS_IVA_WEB_2(:p_n_cuit)', $par);
    $filename = ROOT_DIR . $n_cuit .'-IVA-WEBII.csv';

    if (!$archivo    = fopen("$filename", "w")) {
        die("Error al crear el archivo");
    }

    $linea = '"' . 'N_CUIT_00'                       . '"' . $separador .                    
            '"' . 'N_PERIODO_DDJJ'                  . '"' . $separador .                    
            '"' . 'N_SECUENCIA  '                   . '"' . $separador .                    
            '"' . 'F_PRESENTACION '                 . '"' . $separador .                    
            '"' . 'C_SIN_MOVIMIENTO '               . '"' . $separador .                    
            '"' . 'C_ACTIVIDAD  '                   . '"' . $separador .                    
            '"' . 'N_TOTAL_DEB_FISCAL_ACT  '        . '"' . $separador .                    
            '"' . 'Total DF generado  '             . '"' . $separador .                    
            '"' . 'Total del DF Bienes de uso'      . '"' . $separador .                    
            '"' . 'Total del CF Restituido'         . '"' . $separador .                    
            '"' . 'TOTAL DEL DF DEL PERIODO '       . '"' . $separador .                    
            '"' . 'Total CF operaciones Compras'    . '"' . $separador .                    
            '"' . 'Total Oper. que no generan CF'   . '"' . $separador .                    
            '"' . 'Total DF a restituir'            . '"' . $separador .                    
            '"' . 'TOTAL DEL CF DEL PERIODO'        . '"' . $separador .                    
            '"' . 'Total Compras y RCF '            . '"' . $separador .                    
            '"' . 'Total Compras NO gravadas '      . '"' . $separador .                    
            '"' . 'Compras serv en el exterior '    . '"' . $separador .                    
            '"' . 'Op RI 10.5- MNG '    . '"' . $separador .                                
            '"' . 'Op RI 21- MNG '  . '"' . $separador .                                    
            '"' . 'Op RI 27- MNG '  . '"' . $separador .                                    
            '"' . 'Op RI 2.5- MNG '  . '"' . $separador .                                   
            '"' . 'Op RI 5- MNG  '  . '"' . $separador .                                    
            '"' . 'Op CFin, ex, ng 10.5- MNG '    . '"' . $separador .                      
            '"' . 'Op CFin, ex, ng 21- MNG '  . '"' . $separador .                          
            '"' . 'Op CFin, ex, ng 27- MNG '  . '"' . $separador .                          
            '"' . 'Op CFin, ex, ng 2.5- MNG '  . '"' . $separador .                         
            '"' . 'Op CFin, ex, ng 5- MNG  ' . '"' . $separador .                        
            '"' . 'Op MT Alic 10.5 - MTF '   . '"' . $separador .                                
            '"' . 'Op MT Alic 21 - MTF'      . '"' . $separador .                                
            '"' . 'Op MT Alic 27 - MTF'      . '"' . $separador .                                
            '"' . 'Op MT Alic 2.5 - MTF'     . '"' . $separador .                                
            '"' . 'Op MT Alic 5 - MTF'       . '"' . $separador .                                
            '"' . 'Op otros  10.5- MNG' . '"' . $separador .                                
            '"' . 'Op otros  21- MNG'  . '"' . $separador .                                 
            '"' . 'Op otros  27- MNG '  . '"' . $separador .                                
            '"' . 'Op otros  2.5- MNG'  . '"' . $separador .                                
            '"' . 'Op otros  5- MNG '  . '"' . $separador .                                 
            '"' . 'R9_OPER_NO_GRAV y EX '   . '"' . $separador .                            
            '"' . 'Vta BU a Ri 10.5- MNG'  . '"' . $separador .                             
            '"' . 'Vta BU a Ri  21- MNG'  . '"' . $separador .                              
            '"' . 'Vta BU a Ri   27- MNG '  . '"' . $separador .                            
            '"' . 'Vta BU a Ri  2.5- MNG'  . '"' . $separador .                             
            '"' . 'Vta BU a Ri  5- MNG '  . '"' . $separador .                              
            '"' . 'Vta BU a CFin,ex,ng 10.5- MNG'  . '"' . $separador .                     
            '"' . 'Vta BU CFin,ex,ng 21- MNG'  . '"' . $separador .                         
            '"' . 'Vta BU CFin,ex,ng 27- MNG '  . '"' . $separador .                        
            '"' . 'Vta BU CFin,ex,ng 2.5- MNG'  . '"' . $separador .                        
            '"' . 'Vta BU CFin,ex,ng 5- MNG '  . '"' . $separador .                         
           '"' .  'RDF RI y Otros 10.5 MNG ' . '"' . $separador .                           
           '"' .  'RDF RI y Otros 21 MNG ' . '"' . $separador .                             
           '"' .  'RDF RI y Otros 27 MNG' . '"' . $separador .                              
           '"' .  'RDF RI y Otros 2.5 MNG ' . '"' . $separador .                            
           '"' .  'RDF RI y Otros 5 MNG' . '"' . $separador .                               
           '"' .  'RDF CFin,ex,ng 10.5 MNG ' . '"' . $separador .                           
           '"' .  'RDF CFin,ex,ng 21 MNG ' . '"' . $separador .                             
           '"' .  'RDF CFin,ex,ng 27 MNG' . '"' . $separador .                              
           '"' .  'RDF CFin,ex,ng 2.5 MNG ' . '"' . $separador .                            
           '"' .  'RDF CFin,ex,ng 5 MNG' . '"' . $separador .                               
           '"' . 'ID_SESION         ' . '"' . $separador .                                 
            '"' . 'N_LINEA           ' . '"' . $separador .                                 
            '"' . 'N_TRANSACCION ' . '"';
    
    fwrite($archivo, $linea . PHP_EOL);

    $par = array();
                            
    $row_query = $data->datos;

    if(count($row_query) == 0){
        return;
    }
                            
                            
    for ($i = 0; $i < count($row_query); $i++) {

        $linea =  $row_query[$i]['N_CUIT_00']                     .  $separador .                      
                 $row_query[$i]['N_PERIODO_DDJJ']       .  $separador .                
                 $row_query[$i]['N_SECUENCIA']          .  $separador .                 
                 $row_query[$i]['F_PRESENTACION']      .  $separador .              
                 $row_query[$i]['C_SIN_MOVIMIENTO']     .  $separador .          
                 $row_query[$i]['C_ACTIVIDAD']          .  $separador .       
                 $row_query[$i]['N_TOTAL_DEB_FISCAL_ACT']     .  $separador .        
                 $row_query[$i]['R4_N_TOTAL_DEB_FISC_GEN']    .  $separador .      
                 $row_query[$i]['R4_N_TOT_DEB_FIS_GEN_OP_VTA_BU'].  $separador . 
                 $row_query[$i]['R4_TOTAL_CRED_FISC_REST']       .  $separador .      
                 $row_query[$i]['R4_N_TOTAL_DEB_FISC_PERIODO']   .  $separador .    
                 $row_query[$i]['R19_N_TOT_CF_GEN_OP_COMPRAS']   .  $separador .   
                 $row_query[$i]['R19_N_TOT_OP_NO_GEN_CRED_FISC'] .  $separador .  
                 $row_query[$i]['R19_N_TOT_DEB_FISC_A_REST']     .  $separador .    
                 $row_query[$i]['R19_N_TOT_CRED_FISC_PER']       .  $separador .      
                 $row_query[$i]['R19_N_TOT_COMP_GRAV_RFC']       .  $separador .        
                 $row_query[$i]['R19_N_TOT_COMP_GRAV']           .  $separador .        
                 $row_query[$i]['R19_N_COMP_SERV_EXT_IMP_IEFC']  .  $separador .   
                 $row_query[$i]['R5_ALICUOTA_1_NG']   .  $separador .             
                 $row_query[$i]['R5_ALICUOTA_2_NG']   .  $separador .             
                 $row_query[$i]['R5_ALICUOTA_3_NG']   .  $separador .            
                 $row_query[$i]['R5_ALICUOTA_4_NG']   .  $separador .             
                 $row_query[$i]['R5_ALICUOTA_5_NG']   .  $separador .             
                 $row_query[$i]['R6_ALICUOTA_1_NG']   .  $separador .             
                 $row_query[$i]['R6_ALICUOTA_2_NG']   .  $separador .             
                 $row_query[$i]['R6_ALICUOTA_3_NG']   .  $separador .             
                 $row_query[$i]['R6_ALICUOTA_4_NG']   .  $separador .             
                 $row_query[$i]['R6_ALICUOTA_5_NG']   .  $separador .             
                 $row_query[$i]['R7_ALICUOTA_1_NG']   .  $separador .             
                 $row_query[$i]['R7_ALICUOTA_2_NG']   .  $separador .             
                 $row_query[$i]['R7_ALICUOTA_3_NG']   .  $separador .             
                 $row_query[$i]['R7_ALICUOTA_4_NG']   .  $separador .             
                 $row_query[$i]['R7_ALICUOTA_5_NG']   .  $separador .             
                 $row_query[$i]['R8_ALICUOTA_1_NG']   .  $separador .             
                 $row_query[$i]['R8_ALICUOTA_2_NG']   .  $separador .             
                 $row_query[$i]['R8_ALICUOTA_3_NG']   .  $separador .             
                 $row_query[$i]['R8_ALICUOTA_4_NG']   .  $separador .             
                 $row_query[$i]['R8_ALICUOTA_5_NG']   .  $separador .              
                 $row_query[$i]['R9_OPER_NO_GRAV']    .  $separador .             
                 $row_query[$i]['R10_ALICUOTA_1_NG']  .  $separador .              
                 $row_query[$i]['R10_ALICUOTA_2_NG']  .  $separador .             
                 $row_query[$i]['R10_ALICUOTA_3_NG']  .  $separador .             
                 $row_query[$i]['R10_ALICUOTA_4_NG']  .  $separador .             
                 $row_query[$i]['R10_ALICUOTA_5_NG']  .  $separador .             
                 $row_query[$i]['R11_ALICUOTA_1_NG']  .  $separador .             
                 $row_query[$i]['R11_ALICUOTA_2_NG']  .  $separador .             
                 $row_query[$i]['R11_ALICUOTA_3_NG']  .  $separador .            
                 $row_query[$i]['R11_ALICUOTA_4_NG']  .  $separador .             
                 $row_query[$i]['R11_ALICUOTA_5_NG']  .  $separador .             
                 $row_query[$i]['R29_ALICUOTA_1_NG']  .  $separador .             
                 $row_query[$i]['R29_ALICUOTA_2_NG']  .  $separador .             
                 $row_query[$i]['R29_ALICUOTA_3_NG']  .  $separador .             
                 $row_query[$i]['R29_ALICUOTA_4_NG']  .  $separador .             
                 $row_query[$i]['R29_ALICUOTA_5_NG']  .  $separador .            
                 $row_query[$i]['R30_ALICUOTA_1_NG']  .  $separador .             
                 $row_query[$i]['R30_ALICUOTA_2_NG']  .  $separador .             
                 $row_query[$i]['R30_ALICUOTA_3_NG']  .  $separador .            
                 $row_query[$i]['R30_ALICUOTA_4_NG']  .  $separador .             
                 $row_query[$i]['R30_ALICUOTA_5_NG']  .  $separador .             
                 $row_query[$i]['ID_SESION']          .  $separador .                
                 $row_query[$i]['N_LINEA']            .  $separador .                 
                 $row_query[$i]['N_TRANSACCION'] ;
                            
        fwrite($archivo, $linea . PHP_EOL);
    }
    fwrite($archivo, PHP_EOL);
}


if (file_exists($filename)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/forced-download; charset=utf-8');
    header('Content-Disposition: attachment; filename=' . basename($filename));
    readfile($filename);
    unlink($filename);
    exit;
}

$resultado = 'OK';