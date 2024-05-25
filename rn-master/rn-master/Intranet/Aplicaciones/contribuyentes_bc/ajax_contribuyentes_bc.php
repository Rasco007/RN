<?php

require_once("php/ClienteBCAfip.php");
require_once("php/ContribuyenteBC.php");
require_once("php/DomicilioContribuyente.php");
require_once("php/ImpuestoContribuyente.php");

$accion = $_POST['accion'];

switch ($accion) {

    case 'alta': altaConstribuyentes();breack;
    case 'estado': estadoContribuyente();breack;
}


function estadoContribuyente(){

    $cliente = new clienteBCAfip();

    //echo $_POST['cuit'];exit();

    $cliente->getPersona($_POST['cuit']);
    $ccResponse = $cliente->getCcResponse();

    mostrarTabs($ccResponse);

}

function altaConstribuyentes(){

    $cliente = new clienteBCAfip();

    $nuevos_contrib = json_decode($_POST['nuevos_contrib']);
    $fechaactualizacion = date('d/m/Y');

    $contribuyente = null;
    $result = array();

    foreach ($nuevos_contrib as $contrib){

        /*
        $cliente->getPersona(27261363831);
        $ccResponse = $cliente->getCcResponse();
        print_r($ccResponse);exit();
        */

        if($contrib->tipopersona == 'F') {

            $cliente->getPersona($contrib->cuit);
            $ccResponse = $cliente->getCcResponse();

            $fecha = date($ccResponse->persona->nacimiento);
            $nuevafecha = strtotime ( "now" , strtotime ( $fecha ) ) ;
            $fechanacimiento = date ( 'j/m/Y' , $nuevafecha );

            $contribuyente = new ContribuyenteBC($ccResponse->id,
                                                $fechaactualizacion,
                                  $ccResponse->persona->apellido . " " . $ccResponse->persona->nombre,
                                                $ccResponse->persona->tipo,
                                                $ccResponse->persona->documento->tipo,
                                                $ccResponse->persona->documento->numero,
                                                $ccResponse->persona->sexo,
                                                $fechanacimiento);


            foreach($ccResponse->domicilios as $dom){
                if($dom->orden = 1 && $dom->org = 1 && $dom->tipo = 1){

                    $fecha = date($dom->dc);
                    $nuevafecha = strtotime ( "now" , strtotime ( $fecha ) ) ;
                    $fechadesde = date ( 'j/m/Y' , $nuevafecha );

                    $contribuyente->setDomicilios(new DomicilioContribuyente($dom->tipo,
                        $dom->nomenclador,
                        $dom->calle,
                        $dom->numero,
                        $dom->adicional->tipo,
                        $dom->adicional->dato,
                        $dom->cp,
                        $fechadesde));

                    break;
                }
            }

            //print_r($contribuyente->getDomicilios());

            $impuesto = new ImpuestoContribuyente();
            foreach($ccResponse->impuestos as $imp){

                if($imp->estado == 'AC') {
                    if (($imp->impuesto == 20 || $imp->impuesto == 30)) {
                        $impuesto->setImpuesto($imp->impuesto);
                        $impuesto->setEstado($imp->estado);
                    }
                }
                break;
            }
            //print_r($impuesto);exit();

            $contribuyente->setImpuestos($impuesto);

            array_push($result, $cliente->guardarContribuyente($contribuyente));


        }

    }

    echo json_encode($result);

}


function mostrarTabs($ccResponse){
    /*
    echo count($ccResponse->relaciones);
    exit();
    */

    if($ccResponse->persona->tipo =='F') {
        $selected_fisica = 'selected="selected"';
        $selected_juridica = '';
    }else{
        $selected_fisica='';
        $selected_juridica='selected="selected"';
    }

    if($ccResponse->persona->sexo =='M') {
        $selected_sexo_m = 'selected="selected"';
        $selected_sexo_f = '';
    }else{
        $selected_sexo_m ='';
        $selected_sexo_f ='selected="selected"';
    }

    if($ccResponse->persona->estado =='A') {
        $selected_estado_a = 'selected="selected"';
        $selected_estado_i = '';
    }else{
        $selected_estado_a ='';
        $selected_estado_i ='selected="selected"';
    }

    $tabRelaciones = "";
    $div_tab_datos_relaciones = "";
    if(count($ccResponse->relaciones) > 0){
        $tabRelaciones = "<li data-grid='grid_datos_relaciones'><a href='#datos_relaciones' id='8' data-toggle='tab'>Relaciones</a></li>";
        $div_tab_datos_relaciones.=
            "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_relaciones'>".
            "<div id='div_grid_datos_relaciones' style='width:100%;'>".
            "<table id='grid_datos_relaciones' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
            "<thead>".
            "<tr>".
            "<th>PERSONA</th>".
            "<th>TIPO</th>".
            "<th>SUBTIPO</th>".
            "<th>DESDE</th>".
            "<th>DS</th>".
            "</tr>".
            "</thead>".
            "<tbody></tbody>".
            "</table>".
            "<div id='grid_datos_relaciones_pager' class='scroll' style='text-align: center;'></div>".
            "</div>".
            "</div>";
    }

    $tabJurisdicciones = "";
    $div_tab_datos_jurisdicciones = "";
    if(count($ccResponse->jurisdicciones) > 0){
        $tabJurisdicciones = "<li data-grid='grid_datos_jurisdicciones'><a href='#datos_jurisdicciones' id='8' data-toggle='tab'>Jurisdicciones</a></li>";
        $div_tab_datos_jurisdicciones.=
            "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_jurisdicciones'>".
            "<div id='div_grid_datos_jurisdicciones' style='width:100%;'>".
            "<table id='grid_datos_jurisdicciones' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
            "<thead>".
            "<tr>".
            "<th>PROVINCIA</th>".
            "<th>DESDE</th>".
            "<th>ORG</th>".
            "<th>DS</th>".
            "</tr>".
            "</thead>".
            "<tbody></tbody>".
            "</table>".
            "<div id='grid_datos_jurisdicciones_pager' class='scroll' style='text-align: center;'></div>".
            "</div>".
            "</div>";
    }

    $header =
        "<div id='general'>".
        "<div id='tabs' style=''>".
        "<div  id='datos_contribuyente' class='tab-content'>".
        "<div class='row'>".
        "<div id='d_idcontribuyente_div' class='form-group col-md-4'>".
        "<label for='d_idcontribuyente'>ID Contribuyente</label>".
        "<div id='div_idcontribuyente' class='input-group'>".
        "<input name='idcontribuyente' id='idcontribuyente' type='text' class='form-control input-sm input-desc-long validate[required]' value='".$ccResponse->id."' readonly>".
        "</div>".
        "</div>";

        if($ccResponse->persona->tipo =='F') {
            $header .= "<div id='d_documento_div' class='form-group col-md-4'>".
                        "<label for='d_documento'>Documento</label>".
                        "<div id='div_d_documento' class='input-group'>".
                        "<input name='d_documento' id='d_documento' type='text' class='form-control input-sm input-desc-long validate[required]' value='".$ccResponse->persona->documento->numero."' readonly>".
                        "</div>".
                        "</div>";
        }else{
            $header .= "<div id='d_mescierre_div' class='form-group col-md-4'>".
                        "<label for='d_mescierre'>Mes de Cierre</label>".
                        "<div id='div_d_mescierre' class='input-group'>".
                        "<input name='d_mescierre' id='d_mescierre' type='text' class='form-control input-sm input-desc-long validate[required]' value='".$ccResponse->persona->mescierre."' readonly>".
                        "</div>".
                        "</div>";
        }

        $header .= "</div>".
                    "<div class='row'>";

        if($ccResponse->persona->tipo =='F') {
            $header .=  "<div id='d_nombre_div' class='form-group col-md-4'>" .
                        "<label for='d_nombre'>Nombre</label>" .
                        "<div id='div_nombre' class='input-group'>" .
                        "<input name='d_nombre' id='d_nombre' type='text' class='form-control input-sm input-desc-long validate[required]' value='" . $ccResponse->persona->nombre . "' readonly>" .
                        "</div>" .
                        "</div>" .
                        "<div id='c_apellido_div' class='form-group col-md-4'>" .
                        "<label for='c_apellido'>Apellido</label>" .
                        "<div id='div_apelliso' class='input-group'>" .
                        "<input name='d_apellido' id='d_apellido' type='text' class='form-control input-sm input-desc-long validate[required]' value='" . $ccResponse->persona->apellido . "' readonly>" .
                        "</div>" .
                        "</div>";
        }else{
            $header .=  "<div id='d_razonsocial_div' class='form-group col-md-4'>" .
                        "<label for='d_razonsocial'>Razón Social</label>" .
                        "<div id='div_razonsocial'>" .
                        "<input style='width:100% !important;' name='d_razonsocial' id='d_razonsocial' type='text'class='form-control input-sm input-desc-long validate[required]' value='" . $ccResponse->persona->razonsocial . "' readonly>" .
                        "</div>" .
                        "</div>" ;
        }

        $header .=
        "<div id='m_persona_div' class='form-group col-md-4'>".
        "<label for='m_persona'>Tipo de Persona</label>".
        "<div id='div_m_persona'>".
        "<select name='m_persona' id='m_persona' data-live-search='true' title='Seleccione' class='form-control input-sm validate[required]' data-style='cDropdown'>".
        "<option $selected_fisica value='F'>Física</option>".
        "<option $selected_juridica value='J'>Jurídica</option>".
        "</select>".
        "</div>".
        "</div>".
        "</div>".
        "<div class='row'>".
        "<div class='form-group col-md-4'>".
        "<label for='d_sexo'>Sexo</label>".
        "<div class='input-group'>".
        "<select name='d_sexo' id='d_sexo' data-live-search='true' title='Seleccione' class='form-control input-sm validate[required]' data-style='cDropdown'>".
        "<option $selected_sexo_m value='M'>Masculino</option>".
        "<option $selected_sexo_f value='F'>Femenino</option>".
        "</select>".
        "</div>".
        "</div>".
        "<div class='form-group col-md-4'>".
        "<label for='d_estado'>Estado</label>".
        "<div class='input-group'>".
        "<select name='d_estado' id='d_estado' data-live-search='true' title='Seleccione' class='form-control input-sm validate[required]' data-style='cDropdown'>".
        "<option $selected_estado_a value='A'>Activo</option>".
        "<option $selected_estado_i value='I'>Inactivo</option>".
        "</select>".
        "</div>".
        "</div>".
        "<div class='form-group col-md-1'>".
        "<label>Fecha de Alta</label>".
        "<div class='input-group'>".
        "<input name='f_alta' id='f_alta' type='text' class='form-control input-sm input-desc-long validate[required]' value='".$ccResponse->persona->ds."' readonly>".
        "</div>".
        "</div>";

        if($ccResponse->persona->tipo =='F') {
            $header .=  "<div class='form-group col-md-2'>".
                        "<label>Fecha de Nacimiento</label>".
                        "<div class='input-group'>".
                        "<input name='f_nacimiento' id='f_nacimiento' type='text' class='form-control input-sm input-desc-long validate[required]' value='".$ccResponse->persona->nacimiento."' readonly>".
                        "</div>".
                        "</div>";
        }else{
            $header .=  "<div class='form-group col-md-2'>".
                        "<label>Contrato Social</label>".
                        "<div class='input-group'>".
                        "<input name='f_contratosocial' id='f_contratosocial' type='text' class='form-control input-sm input-desc-long validate[required]' value='".$ccResponse->persona->contratosocial."' readonly>".
                        "</div>".
                        "</div>";
        }

        $header .=
        "</div>".
        "<br>".
        "<div class='tab-content' id='tabs-content'>".
        "<ul class='nav nav-wizard'>".
        //"<li data-grid='grid_datos_contribuyente' class='active'><a href='#datos_contribuyente' id='0' data-toggle='tab'>Contribuyente</a></li>".
        "<li data-grid='grid_datos_actividades' class='active'><a href='#datos_actividades' id='1' data-toggle='tab'>Actividades</a></li>".
        "<li data-grid='grid_datos_impuestos'><a href='#datos_impuestos' id='2' data-toggle='tab'>Impuestos</a></li>".
        "<li data-grid='grid_datos_domicilios'><a href='#datos_domicilios' id='3' data-toggle='tab'>Domicilios</a></li>".
        "<li data-grid='grid_datos_telefonos' id='li_p_fisica'><a href='#datos_telefonos' id='4' data-toggle='tab'>Telefonos</a></li>".
        "<li data-grid='grid_datos_emails' id='li_p_juridica'><a href='#datos_emails' id='5' data-toggle='tab'>Emails</a></li>".
        "<li data-grid='grid_datos_archivos'><a href='#datos_archivos' id='6' data-toggle='tab'>Archivos</a></li>".
        "<li data-grid='grid_datos_categorias'><a href='#datos_categorias' id='7' data-toggle='tab'>Categorias</a></li>".
        "<li data-grid='grid_datos_contribmunis'><a href='#datos_contribmunis' id='8' data-toggle='tab'>Contribuciones Municipales</a></li>".
        $tabRelaciones.
        $tabJurisdicciones.
        "</ul>";


    $div_tab_actividades .=
        "<div role='tabpanel' class='tab-pane fade in active form-group' id='datos_actividades' style='width:100%;'>".
        "<div id='div_grid_datos_actividades' style='width:100%;'>".
        "<table id='grid_datos_actividades' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
        "<thead>".
            "<tr>".
                "<th>ORG</th>".
                "<th>ACTIVIDAD</th>".
                "<th>ORDEN</th>".
                "<th>DESDE</th>".
                "<th>DS</th>".
            "</tr>".
        "</thead>".
        "<tbody></tbody>".
        "</table>".
        "<div id='grid_datos_actividades_pager' class='scroll' style='text-align: center;'></div>".
        "</div>".
        "</div>";


    $div_tab_impuestos .=
        "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_impuestos' style='width:100%;'>".
        "<div id='div_grid_datos_impuestos' style='width:100%;'>".
        "<table id='grid_datos_impuestos' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
        "<thead>".
            "<tr>".
                "<th>IMPUESTO</th>".
                "<th>ESTADO</th>".
                "<th>PERIODO</th>".
                "<th>DIA</th>".
                "<th>MOTIVO</th>".
                "<th>INSCRIPCIÓN</th>".
                "<th>DS</th>".
            "</tr>".
        "</thead>".
        "<tbody></tbody>".
        "</table>".
        "<div id='grid_datos_impuestos_pager' class='scroll' style='text-align: center;'></div>".
        "<p style='color:blue;font-weight: 700;font-size: 90%;'>$datos_tel</p>".
        "</div>".
        "</div>";

    $div_tab_datos_domicilios .=
        "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_domicilios'>".
        "<div id='div_grid_datos_domicilios' style='width:100%;'>".
        "<table id='grid_datos_domicilios' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
        "<thead>".
            "<tr>".
                "<th>ORG</th>".
                "<th>TIPO</th>".
                "<th>ESTADO</th>".
                "<th>CALLE</th>".
                "<th>NÚMERO</th>".
                "<th>PISO</th>".
                "<th>SECTOR</th>".
                "<th>MANZANA</th>".
                "<th>TORRE</th>".
                "<th>UNIDAD</th>".
                "<th>PROVINCIA</th>".
                "<th>LOCALIDAD</th>".
                "<th>CP</th>".
                "<th>NOMENCLADOR</th>".
                "<th>NOMBRE</th>".
                "<th>ADICIONAL</th>".
                "<th>BAJA</th>".
                "<th>PARTIDO</th>".
                "<th>PARTIDA</th>".
                "<th>DS</th>".
            "</tr>".
        "</thead>".
        "<tbody></tbody>".
        "</table>".
        "<div id='grid_datos_domicilios_pager' class='scroll' style='text-align: center;'></div>".
        "</div>".
        "</div>";

    $div_tab_datos_telefonos .=
        "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_telefonos'>".
        "<div id='div_grid_datos_telefonos' style='width:100%;'>".
        "<table id='grid_datos_telefonos' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
        "<thead>".
            "<tr>".
                "<th>ORDEN</th>".
                "<th>PAÍS</th>".
                "<th>CÓDIGO DE AREA</th>".
                "<th>NÚMERO</th>".
                "<th>TIPO</th>".
                "<th>DS</th>".
            "</tr>".
        "</thead>".
        "<tbody></tbody>".
        "</table>".
        "<div id='grid_datos_telefonos_pager' class='scroll' style='text-align: center;'></div>".
        "</div>".
        "</div>";

    $div_tab_datos_emails .=
        "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_emails'>".
        "<div id='div_grid_datos_emails' style='width:100%;'>".
        "<table id='grid_datos_emails' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
        "<thead>".
            "<tr>".
                "<th>ORDEN</th>".
                "<th>DIRECCIÓN</th>".
                "<th>TIPO</th>".
                "<th>ESTADO</th>".
                "<th>DS</th>".
            "</tr>".
        "</thead>".
        "<tbody></tbody>".
        "</table>".
        "<div id='grid_datos_emails_pager' class='scroll' style='text-align: center;'></div>".
        "</div>".
        "</div>";

    $div_tab_datos_archivos .=
        "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_archivos'>".
        "<div id='div_grid_datos_archivos' style='width:100%;'>".
        "<table id='grid_datos_archivos' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
        "<thead>".
            "<tr>".
                "<th>ORDEN</th>".
                "<th>TIPO</th>".
                "<th>DS</th>".
            "</tr>".
        "</thead>".
        "<tbody></tbody>".
        "</table>".
        "<div id='grid_datos_archivos_pager' class='scroll' style='text-align: center;'></div>".
        "</div>".
        "</div>";

    $div_tab_datos_categorias .=
        "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_categorias'>".
        "<div id='div_grid_datos_categorias' style='width:100%;'>".
        "<table id='grid_datos_categorias' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
        "<thead>".
            "<tr>".
                "<th>IMPUESTO</th>".
                "<th>CATEGORIA</th>".
                "<th>ESTADO</th>".
                "<th>PERIODO</th>".
                "<th>MOTIVO</th>".
                "<th>DS</th>".
            "</tr>".
        "</thead>".
        "<tbody></tbody>".
        "</table>".
        "<div id='grid_datos_categorias_pager' class='scroll' style='text-align: center;'></div>".
        "</div>".
        "</div>";

    $div_tab_datos_contribmunis.=
        "<div role='tabpanel' class='tab-pane fade in form-group' id='datos_contribmunis'>".
        "<div id='div_grid_datos_contribmunis' style='width:100%;'>".
        "<table id='grid_datos_contribmunis' class='table table-hover w-100 scroll' cellpadding='0' cellspacing='0' style='width:100%;'>".
        "<thead>".
            "<tr>".
                "<th>IMPUESTO</th>".
                "<th>MUNICIPIO</th>".
                "<th>PROVINCIA</th>".
                "<th>DESDE</th>".
                "<th>HASTA</th>".
                "<th>DS</th>".
            "</tr>".
        "</thead>".
        "<tbody></tbody>".
        "</table>".
        "<div id='grid_datos_contribmunis_pager' class='scroll' style='text-align: center;'></div>".
        "</div>".
        "</div>";


    $cierres_divs .=
        "</div>".
        "</div>". //tab-content
        "</div>". //tabs
        "</div>"; //general


    $maqueta = $header.$div_tab_actividades.$div_tab_impuestos.$div_tab_datos_domicilios.$div_tab_datos_telefonos.$div_tab_datos_emails.$div_tab_datos_archivos.$div_tab_datos_categorias.$div_tab_datos_contribmunis.$div_tab_datos_relaciones.$div_tab_datos_jurisdicciones.$cierres_divs;

    $result = array(
        "maqueta" => $maqueta,
        "ccResponse" => $ccResponse
    );


    echo json_encode($result);
}
