<?php
    $p_id_cons_dinamica = $_POST['p_id_cons_dinamica'];
    $p_id_consulta_din = $_POST['p_id_consulta_din'];

    //BUSCO TODOS LOS CAMPOS QUE TENGO QUE CARGAR CON LOS VALORES QUE YA SE HAYAN CARGADO
    $sql = "SELECT 
            fp.n_secuencia,
            fp.d_ora_parametro,
            fp.d_parametro,
            fp.c_tipo_dato,
            fp.m_obligatorio,
            fp.n_id_lista,
            fp.d_param_lista,
            DECODE (tg.d_dato1,  'DATE', 'center',  'NUMBER', 'right',  'left') tipo_dato,
            tg.d_dato2                  d_validacion,
            tg.d_dato3                  d_clase,
            NVL (tg.d_dato6, '¬valor¬') fun_tipo_dato,
            gp.d_valor valor,
            fp.n_id_lista               n_id_lista,
            NVL (tg.d_dato7, '')        d_mascara
            --                c_tipo_html,
            --                c_options_html       
            FROM PARAM_CONSULTA_DINAMICA_PARAM fp LEFT JOIN TMP_CONSULTAS_DINAMICAS_PARAM gp 
                    ON  fp.n_secuencia = gp.n_secuencia
                        and gp.ID_CONSULTA_DIN = :p_id_consulta_din 
                INNER JOIN TABLAS_GENERALES TG
                    ON tg.n_tabla = 901 and tg.c_dato = fp.c_tipo_dato
            WHERE     
                fp.ID_CONS_DINAMICA = :p_id_cons_dinamica
            ORDER BY fp.n_secuencia";

    $db_query = new DB_Query($sql);
    $param = array( ':p_id_cons_dinamica' => $p_id_cons_dinamica, ':p_id_consulta_din' => $p_id_consulta_din);
    $rows = $db_query->do_query($param);

    //ARMO EL HTML ESTATICO
    $lupas = '';
    $resultado = "<div id='borrar'> <form id='frm_parametros' target='_blank' action='error.php' method='POST'>";

    //ARMO HTML DINAMICO
    foreach($rows as &$row){

        //Iniciamos la Fila
        $resultado.="<div class='row'> <div class='form-group col-md-10 col-md-offset-1'>";

        //Determinamos Atributos
        if($row['N_LONGITUD'] != '' && $row['N_LONGITUD'] != NULL && $row['N_LONGITUD'] > 0){
            $attr .= " maxlength='".$row['N_LONGITUD']."'";
        }

        //Determinamos Estilo
        $style = 'style="text-align:'.$row['TIPO_DATO'].';"';

        //Determinamos las Clases
        $class_input = '';
        if($row['D_CLASE'] != '' && $row['D_CLASE'] != NULL){
            $class_input.= $row['D_CLASE'];
        }

        // Por cada dato, genero el input
        if ($row['M_OBLIGATORIO'] == 'S'){
            $class_input .= " validate[required";
            $row['D_PARAMETRO'] .= " (*)";
        }else{
            $class_input .= " validate[optional";
        }

        if($row['D_VALIDACION'] != '' && $row['D_VALIDACION'] != NULL){
            $class_input .= ", ".$row['D_VALIDACION']."]";
        }else{
            $class_input .= "]";
        }

        //Vemos si ya hay cargado un valor.
        if ($row['VALOR'] != '' && $row['VALOR'] != NULL){
            $value = "value='".$row['VALOR']."'";
            $valor = $row['VALOR'];
        }else{
            $value = "";
        }

        //Incorporamos el Label.
        $resultado .= "<label for='".$row['D_ORA_PARAMETRO']."'>".$row['D_PARAMETRO']."</label>";


        //Si es una lupa, el input se arma diferente, con un extra y otro estilo.
        if($row['N_ID_LISTA'] != '' && $row['N_ID_LISTA'] != NULL) {

            $class_input .= " lupa_input";
            $user_data .= "data-id-lista='".$row['N_ID_LISTA']."'";

            //Conjunto de Inputs
            $input_lupa = "<div class=\"input-group\">
						        <input type=\"text\" class=\"form-control input-sm input-cod-short\" id='".$row['D_ORA_PARAMETRO']."' name='".$row['D_ORA_PARAMETRO']."' $value>";

            if ($row['M_OBLIGATORIO'] == 'S'){
                $input_lupa = $input_lupa."<input type=\"text\" class=\"form-control input-sm input-desc-long validate[required,,]\" id='".$row['D_ORA_PARAMETRO']."_DESC' readonly=''>
						        <span id='".$row['D_ORA_PARAMETRO']."_lupa' class=\"input-group-addon btn_lupa\">
				                   <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>
			                    </span>
					        </div>";
            }else{
                $input_lupa = $input_lupa."<input type=\"text\" class=\"form-control input-sm input-desc-long\" id='".$row['D_ORA_PARAMETRO']."_DESC' readonly=''>
						        <span id='".$row['D_ORA_PARAMETRO']."_lupa' class=\"input-group-addon btn_lupa\">
				                   <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>
			                    </span>
					        </div>";
            }

            if ($row['D_PARAM_LISTA'] != '' && $row['D_PARAM_LISTA'] != NULL){
                $cadena = $row['D_PARAM_LISTA'];
                while(strpos($cadena,'¬') !== false){
                    $pos = strpos($cadena,'¬');
                    $a = substr($cadena, $pos+2);
                    if(strpos($a,'¬') !== false){
                        $npos = strpos($a,'¬');
                        $b = substr($a,0,$npos);

                        $cadena = str_replace('¬'.$b.'¬', "'#$b'", $cadena);

                        $extra_javascript =
                            "$('#$b').change(function(){
								$('#".$row['D_ORA_PARAMETRO']."').val('').change();
							});";
                    }else{
                        $cadena = '';
                    }

                }
                $filtros = '['.$cadena.']';

            }else{
                $filtros = '[\'\']';
            }

            if($row['D_ORA_PARAMETRO'] == 'P_TIPO_IMPONIBLE'){
                $caption = " Lista de Tributos ";
            }elseif($row['D_ORA_PARAMETRO'] == 'P_TRIBUTO'){
                $caption = "Lista de Subtributos ";
            }elseif($row['D_ORA_PARAMETRO'] == 'P_CONCEPTO'){
                $caption = "Lista de Conceptos ";
            }

            $lupas .= "
					$('#".$row['D_ORA_PARAMETRO']."_lupa').lupa_generica({
						id_lista:".$row['N_ID_LISTA'].",
						titulos:['Código','Descripción'],
						grid:[{index:'c_codigo',width:200},
							  {index:'d_descrip',width:500}],
						caption:'".$caption."',
						filtros:$filtros,
						sortname:'c_codigo',
						sortorder:'asc',
						searchCode:true,
						searchInput: '#".$row['D_ORA_PARAMETRO']."',
						exactField: 'c_codigo',
						campos:{c_codigo:'".$row['D_ORA_PARAMETRO']."',d_descrip:'".$row['D_ORA_PARAMETRO']."_DESC'},
                        keyNav:true";
                        
            $datepicker = "$('.datepicker').datepicker(
            {   dateFormat:'dd/mm/yy',
                changeMonth:true,
                changeYear:true,
                dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
                monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
            }).blur(function(){
                formatearFecha($(this));
            }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}});
            ";

            $lupas .= "});
            ";

            $lupas .= "$('#".$row['D_ORA_PARAMETRO']."').change();";


            /*elseif ($row['D_MASCARA'] != '' && $row['D_MASCARA'] != NULL){
            $extra_input = '<i>'.$row['D_MASCARA'].'</i>';*/
            $resultado .= $input_lupa;
        }else{
            $bootstrap = 'form-control ' . $row['D_CLASE'];
            $d_class = 'class="'.$bootstrap.' '.$class_input.'"';
            $resultado .= "<input type='text' ".$attr."  ".$d_class."  id='".$row['D_ORA_PARAMETRO']."' name='".$row['D_ORA_PARAMETRO']."' ".$style." ".$value." />";
        }

        $resultado.="</div></div>";
    }

    $resultado .= "</form>";

    if ($lupas != '') {
        $resultado .= ' <script type="text/javascript">'. $lupas . $datepicker;

        if($extra_javascript != ''){
            $resultado .= $extra_javascript;
        }

        $resultado .= '</script>';
    }

    $resultado .= "</div>";
    $response->estado = 'OK';
    $response->info = $resultado;
    echo json_encode($response);
?>
