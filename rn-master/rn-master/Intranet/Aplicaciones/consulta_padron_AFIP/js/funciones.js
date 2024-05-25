function completarDenominacion(){
    let cuit_sin_guiones =limpiar_formato_cuit($('#n_cuit_filtro').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "ajax_genericos/autocomplete.php",
        type:"POST",
        dataType: "JSON",
        data:{oper: 3,term: cuit_sin_guiones},
        success: function(res) {
            $('#main').procOverlay({visible:false});
            if(res != null){
                var info = res.data_raz[0];
                $("#d_denominacion_filtro").val(info.razon_social);
                $("#id_contribuyente").val(info.id_contribuyente);
                $('#lupa_d_denominacion').show().css('display', 'table-cell');
                $('#mascara_lupa_d_denominacion').hide();
                $('#d_denominacion_mayuscula').val($('#d_denominacion_filtro').val().toUpperCase());
            }else{
                mostrar_cuadro('E', 'Error', 'No se ha encontrado un contribuyente para el cuit ingresado.');
                $("#d_denominacion_filtro").val(null);
                $("#id_contribuyente").val(null);
                $("#n_cuit_filtro").val(null);
            }
        }
    });
}

function buscar_datos_ppales(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "consulta_padron_AFIP/php/autocomplete.php",
        data: {oper:'2',term: limpia_cuit($('#n_cuit_filtro').val())},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            ajax_autocomplete = null;
            if(data) {
                $("#sexo_filtro").val(data.C_SEXO);
                $("#d_denominacion_filtro").val(data.D_DENOMINACION);
                $("#d_casada_filtro").val(data.D_APE_CASADA);
                $("#d_materno_filtro").val(data.D_APE_MATERNO);
                $("#f_primera").val(data.F_ACT_PRINCIPAL);
                $("#n_primera").val(data.C_ACT_PRINCIPAL);
                $("#f_segunda").val(data.F_ACT_SEGUNDA);
                $("#n_segunda").val(data.C_ACT_SEGUNDA);
                $("#f_tercera").val(data.F_ACT_TERCERA);
                $("#n_tercera").val(data.C_ACT_TERCERA);
                $("#f_nacimiento").val(data.F_NAC_CONTRATO);
                $("#f_alta").val(data.F_ALTA_AFIP);
                $("#d_calle").val(data.D_CALLE);
                $("#n_calle").val(data.N_NUMERO);
                $("#d_barrio").val(data.D_BARRIO);
                $("#d_manzana").val(data.D_MANZANA);
                $("#n_torre").val(data.D_TORRE);
                $("#n_depto").val(data.D_DEPARTAMENTO);
                $("#n_piso").val(data.D_PISO);
                $("#d_sec").val(data.D_SECTOR);
                $("#d_depend").val(data.D_DEPENDENCIA);
                $("#d_loc").val(data.D_LOCALIDAD);
                $("#n_cp").val(data.D_CODPOSTAL);
                $("#d_pcia").val(data.D_PROVINCIA);
                $("#n_ganancia").val(data.C_GANANCIA);
                $("#n_iva").val(data.C_IVA);
                $("#d_autonomo").val(data.C_AUTONOMO);
                $("#d_empleador").val(data.C_EMPLEADOR);
                $("#d_tipo_persona").val(data.C_MARCA_CUIT);
                $("#n_juridica").val(data.D_FORM_JURIDICA);
                $("#d_emp_promovida").val(data.C_EMP_PROMO);
                $("#d_gran_contr").val(data.C_MARCA_GRAN_CONT);
                $("#d_pasivo").val(data.C_MARCA_PAS);
                $("#d_monotributo").val(data.C_MONOTRIBUTO);
                $("#d_cat_monotributo").val(data.C_CAT_MONO);
                $("#n_act_monotributo").val(data.C_MONO_ACT);
                $("#d_cat_auto").val(data.C_CAT_AUTO_MONO);
                $("#d_cat_autonomo").val(data.C_AUTONOMO_CAT);
                $("#f_cquieb").val(data.F_CONC_QUIEBRA);
                $("#d_cquieb").val(data.C_CONC_QUIEBRA);
                $("#f_fallecimiento").val(data.F_FALLECIMIENTO);
                $("#d_sucesion").val(data.C_SUCESION);
                $("#n_pc_cuit_filtro").val(data.PARTE_CENTRAL);

                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_user":null,
                     "id_menu":v_id_menu,
                     "n_orden":0
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            console.log(data.retorno);
                          if(data.retorno == 'N'){
                            $('#btn_ddjj_datos').attr('disabled', true);
                            $('#btn_historico').attr('disabled', true);
                          }
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 

                $('#btn_buscar').attr('disabled', false);
                $('#btn_historico').attr('disabled', false);
                $('#btn_legajo').attr('disabled', false);

                // if($('#n_cuit_filtro').val()) $('#btn_legajo').attr('disabled', true);

            }
        }
    });

}



function limpiar_formato_cuit(n_cuit){
    if(n_cuit[2] != '-'){
        return n_cuit;
    } else{
        return n_cuit.replace(/-/g, '');
    }
}

function autocompletar_PC_con_ceros(n_pc_cuit_filtro){
    if(n_pc_cuit_filtro){
        var str  = n_pc_cuit_filtro.toString();
        while (str .length < 8) {
            str  = "0" + str ;
        }
        $('#n_pc_cuit_filtro').val(str)
    }
}


function buscar_codigo(codigo){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "consulta_padron_AFIP/php/autocomplete.php",
        data: {oper:'cod_afip', p_c_cod: codigo},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data){
                $('#ayuda').val(data.DESCRIPCION);
            }else{
                $.ajax({
                type:'POST',
                url: "consulta_padron_AFIP/php/autocomplete.php",
                data: {oper:'cod_siat', p_c_cod: codigo},
                dataType: 'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data){
                        $('#ayuda').val(data.DESCRIPCION);
                    }else{
                        mostrar_cuadro('E', 'Error', 'No se pudo encontrar la descripción para la actividad '+codigo);
                    }
                }
            });
            }
        }
    });
}

function clicks_de_ayudas(){
    $('#n_juridica').click(function(){
        if($('#n_juridica').val() === '009') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> EMPRESA UNIPERSONAL');
        else if($('#n_juridica').val() === '019') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> EMPRESA UNIPERSONAL');
        else if($('#n_juridica').val() === '027') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> COMANDITA POR ACCIONES');
        else if($('#n_juridica').val() === '035') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> RESPONSABILIDAD LIMITADA');
        else if($('#n_juridica').val() === '043') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> COLECTIVA');
        else if($('#n_juridica').val() === '051') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> CAPITAL E INDUSTRIA');
        else if($('#n_juridica').val() === '067') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> COMANDITA SIMPLE');
        else if($('#n_juridica').val() === '078') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> DE HECHO');
        else if($('#n_juridica').val() === '086') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> ASOCIACION');
        else if($('#n_juridica').val() === '087') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> FUNDACION');
        else if($('#n_juridica').val() === '094') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> COOPERATIVA');
        else if($('#n_juridica').val() === '108') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> ECONOMIA MIXTO');
        else if($('#n_juridica').val() === '116') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> EMPRESA DEL ESTADO');
        else if($('#n_juridica').val() === '124') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> CON PART. EST. MAYORITARIA');
        else if($('#n_juridica').val() === '125') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> ORAGNISMO PUBLICO');
        else if($('#n_juridica').val() === '132') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> SUC.EMP.EXTRANJERA');
        else if($('#n_juridica').val() === '159') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> UNION TRANSITORIA');
        else if($('#n_juridica').val() === '167') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> CONSORICIO PROPIETARIO');
        else if($('#n_juridica').val() === '175') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> D.ADMINITRATIVA');
        else if($('#n_juridica').val() === '183') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> SOC.GARANTI .RECIPROCA');
        else if($('#n_juridica').val() === '191') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> SOCIEDAD EN FORMACION');
        else if($('#n_juridica').val() === '203') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> MUTAL');
        else if($('#n_juridica').val() === '215') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> COOPERADORA');
        else if($('#n_juridica').val() === '223') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> OTRAS ENTIDADES CIVILES');
        else if($('#n_juridica').val() === '237') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> OTRAS SOCIEDADES');
        else if($('#n_juridica').val() === '238') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> FONDO COMUN DE INVERSION');
        else if($('#n_juridica').val() === '239') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> FIDELCOMISO');
        else if($('#n_juridica').val() === '240') $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> FIDELCOMISO FINANCIERO');
        else $('#ayuda').val('Forma Juridica ('+$('#n_juridica').val()+') --> '+$('#n_juridica').val());
    });

    $('#n_primera').click(function(){
        $('#ayuda').val('Código de actividad Principal --> Hace doble click para consultar la actividad !!');
    });
    $('#n_primera').dblclick(function(){
        if($('#n_primera').val()) buscar_codigo($('#n_primera').val())
    });

    $('#n_segunda').click(function(){
        $('#ayuda').val('Código de actividad Segunda --> Hace doble click para consultar la actividad !!');
    });
    $('#n_segunda').dblclick(function(){
        if($('#n_segunda').val()) buscar_codigo($('#n_segunda').val())
    });

    $('#n_tercera').click(function(){
        $('#ayuda').val('Código de actividad Tercera --> Hace doble click para consultar la actividad !!');
    });
    $('#n_tercera').dblclick(function(){
        if($('#n_tercera').val()) buscar_codigo($('#n_tercera').val())
    });

    $('#d_gran_contr').click(function(){
        if($('#n_tercera').val() === '*'){
            $('#ayuda').val('* = Gran contribuyente.');
        }else{
            $('#ayuda').val('Campo Gran Contribuyente. Un * indica Gran Contribuyente.');
        }
    });

    $('#d_monotributo').click(function(){
        if($('#d_monotributo').val() === 'M'){
            $('#ayuda').val('M = Monotributista Individual/Sociedad.');
        }else if($('#d_monotributo').val() === 'i'){
            $('#ayuda').val('i = Integrante de Sociedad.');
        }else{
            $('#ayuda').val('');
        }
    });

    $('#n_baja').click(function(){
        if($('#n_baja').val() === 'P'){
            $('#ayuda').val('Marca de BAJA --> P = indica que el cuit se a dado de baja.');
        }else{
            $('#ayuda').val('Marca de BAJA --> El CUIT '+$('#n_cuit_filtro').val()+' esta ACTIVO.');
        }
    });

    $('#d_tipo_persona').click(function(){
        if($('#d_tipo_persona').val() === 'F'){
            $('#ayuda').val('F = Persona Física.');
        }else{
            $('#ayuda').val('J = Persona Jurídica.');
        }
    });

    $('#d_pasivo').click(function(){
        if($('#d_pasivo').val() === 'S'){
            $('#ayuda').val('S = Pasivo.');
        }else{
            $('#ayuda').val('Activo.');
        }
    });

    $('#d_cquieb').click(function(){
        if($('#d_cquieb').val() === '38'){
            $('#ayuda').val('38 = Quiebra.');
        }else if($('#d_cquieb').val() === '39'){
            $('#ayuda').val('39 = Concurso Preventivo.');
        }else{
            $('#ayuda').val('');
        }
    });

    $('#n_ganancia').click(function(){
        if($('#n_ganancia').val() === '  0') $('#ayuda').val('0 = Baja definitiva.');
        else if($('#n_ganancia').val() === '1') $('#ayuda').val('1 = Activo.');
        else if($('#n_ganancia').val() === '2') $('#ayuda').val('2 = Baja Provisoria.');
        else if($('#n_ganancia').val() === '3') $('#ayuda').val('3 = Exento.');
        else if($('#n_ganancia').val() === '4') $('#ayuda').val('4 = Exento en tramite.');
        else if($('#n_ganancia').val() === '5') $('#ayuda').val('5 = Activo en Tramite.');
        else $('#ayuda').val('** No se encuentra activo **');
    });

    $('#n_iva').click(function(){
        if($('#n_iva').val() === '  0') $('#ayuda').val('0 = Baja definitiva.');
        else if($('#n_iva').val() === '1') $('#ayuda').val('1 = Activo.');
        else if($('#n_iva').val() === '2') $('#ayuda').val('2 = Baja Provisoria.');
        else if($('#n_iva').val() === '3') $('#ayuda').val('3 = Exento.');
        else if($('#n_iva').val() === '4') $('#ayuda').val('4 = Exento en tramite.');
        else if($('#n_iva').val() === '5') $('#ayuda').val('5 = Activo en Tramite.');
        else $('#ayuda').val('** No se encuentra activo **');
    });

    $('#d_autonomo').click(function(){
        if($('#d_autonomo').val() === '0') $('#ayuda').val('0 = Baja definitiva.');
        else if($('#d_autonomo').val() === '1') $('#ayuda').val('1 = Activo.');
        else if($('#d_autonomo').val() === '2') $('#ayuda').val('2 = Baja Provisoria.');
        else if($('#d_autonomo').val() === '3') $('#ayuda').val('3 = Exento.');
        else if($('#d_autonomo').val() === '4') $('#ayuda').val('4 = Exento en tramite.');
        else if($('#d_autonomo').val() === '5') $('#ayuda').val('5 = Activo en Tramite.');
        else $('#ayuda').val('** No se encuentra activo **');
    });

    $('#d_empleador').click(function(){
        if($('#d_empleador').val() === '  0') $('#ayuda').val('0 = Baja definitiva.');
        else if($('#d_empleador').val() === '1') $('#ayuda').val('1 = Activo.');
        else if($('#d_empleador').val() === '2') $('#ayuda').val('2 = Baja Provisoria.');
        else if($('#d_empleador').val() === '3') $('#ayuda').val('3 = Exento.');
        else if($('#d_empleador').val() === '4') $('#ayuda').val('4 = Exento en tramite.');
        else if($('#d_empleador').val() === '5') $('#ayuda').val('5 = Activo en Tramite.');
        else $('#ayuda').val('** No se encuentra activo **');
    });

    $('#d_cat_monotributo').click(function(){
        if($('#d_cat_monotributo').val() === 'EV') $('#ayuda').val('Categoria de Monotributo --> EV = EVENTUAL');
        else if($('#d_cat_monotributo').val() === 'EE') $('#ayuda').val('Categoria de Monotributo --> EE = EVENTUAL MONOTRIBUTISTA SOCIAL');
        else if($('#d_cat_monotributo').val() === 'FA') $('#ayuda').val('Categoria de Monotributo --> FA = F-ACTIVIDAD PRIMARIA');
        else if($('#d_cat_monotributo').val() === 'AE') $('#ayuda').val('Categoria de Monotributo --> AE = A-MONOTRIBUTISTA SOCIAL');
        else if($('#d_cat_monotributo').val() === 'FE') $('#ayuda').val('Categoria de Monotributo --> FE = F-MONOTRIBUTISTA SOCIAL');
        else if($('#d_cat_monotributo').val() === 'B2') $('#ayuda').val('Categoria de Monotributo --> B2 = B CON 2 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'G2') $('#ayuda').val('Categoria de Monotributo --> G2 = G CON 2 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'C3') $('#ayuda').val('Categoria de Monotributo --> C3 = C CON 3 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'H3') $('#ayuda').val('Categoria de Monotributo --> H3 = H CON 3 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'D2') $('#ayuda').val('Categoria de Monotributo --> D2 = D CON 2 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'D3') $('#ayuda').val('Categoria de Monotributo --> D3 = D CON 3 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'E2') $('#ayuda').val('Categoria de Monotributo --> E2 = E CON 2 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'E3') $('#ayuda').val('Categoria de Monotributo --> E3 = E CON 3 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'J2') $('#ayuda').val('Categoria de Monotributo --> J2 = J CON 2 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'J3') $('#ayuda').val('Categoria de Monotributo --> J3 = J CON 3 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'K2') $('#ayuda').val('Categoria de Monotributo --> K2 = K CON 2 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'K3') $('#ayuda').val('Categoria de Monotributo --> K3 = K CON 3 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'L2') $('#ayuda').val('Categoria de Monotributo --> L2 = L CON 2 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'L3') $('#ayuda').val('Categoria de Monotributo --> L3 = L CON 3 SOCIOS');
        else if($('#d_cat_monotributo').val() === 'M2') $('#ayuda').val('Categoria de Monotributo --> M2 = M CON 2 SOCIOS');
        else $('#ayuda').val('Categoria de Monotributo -->');
    });

    $('#n_pc_cuit_filtro').click(function(){
        $('#ayuda').val('Parte central del CUIT. Utilice este campo para consultar especificamente por la parte central del CUIT.');
    });

    $('#f_nacimiento').click(function(){
        if($('#d_tipo_persona').val() === 'F'){
            $('#ayuda').val('Fecha de Nacimiento : '+$('#f_nacimiento').val());
        }else{
            $('#ayuda').val('Fecha de contrato social : '+$('#f_nacimiento').val());
        }
    });

    $('#n_cuit_reemp_filtro').click(function(){
        if(!$('#n_cuit_reemp_filtro').val()){
            $('#ayuda').val('En este campo se muestra el Cuit de reemplazo.');
        }else{
            $('#ayuda').val('El CUIT '+ $('#n_cuit_filtro').val() + ' se reemplazo por --> ' +$('#n_cuit_reemp_filtro').val()+ ' - Doble Click para consultarla!!');
        }
    });

    $('#n_cuit_filtro').click(function(){
        if($('#n_cuit_filtro').val() && $('#n_cuit_reemp_filtro').val()){
            $('#ayuda').val('Haga doble clik para volver a la CUIT Reemplazada!  --> '+$('#n_cuit_reemp_filtro').val());
        }
    });

    $('#sexo_filtro,#d_denominacion_filtro,#d_casada_filtro,#d_materno_filtro,#f_primera,#f_segunda,#f_tercera,#f_alta,#d_calle,#n_calle,#d_barrio,#d_manzana,#n_torre,#n_depto,#n_piso,#d_sec,#d_depend,#d_loc,#d_pcia,#n_cp,#n_act_monotributo,#d_cat_auto,#d_cat_autonomo,#f_cquieb,#f_fallecimiento,#d_sucesion,#d_emp_promovida').click(function(){
        $('#ayuda').val('');
    });
}

function buscar(){

    $('#main').procOverlay({visible: true});

    if (!$('#n_cuit_filtro').val() && !$('#n_pc_cuit_filtro').val() && !$('#d_denominacion_filtro').val() || (!$('#n_cuit_filtro').val() && $('#n_pc_cuit_filtro').val())){
        mostrar_error('Ingrese un criterio de consulta: CUIT, Razón Social o Parte Central de CUIT.');
        $('#n_pc_cuit_filtro').val(null);
        $('#main').procOverlay({visible: false});
        return;
    }

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    $('#lupa_pc_cuit_filtro').hide();
    $('#mascara_lupa_pc_cuit_filtro').show().css('display', 'table-cell');

    buscar_datos_ppales();
    autocompletar_PC_con_ceros($('#n_pc_cuit_filtro').val());
    clicks_de_ayudas();

    $('#n_cuit_filtro').attr('disabled', true);
    $('#n_pc_cuit_filtro').attr('disabled', true);
    $('#d_denominacion_filtro').attr('disabled', true);

    $('#main').procOverlay({visible: false});

}