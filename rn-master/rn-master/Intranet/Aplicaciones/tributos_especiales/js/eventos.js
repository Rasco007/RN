function init_eventos() {

  limpiar_tmp();

  $("#lupa_obj_hecho").hide();
  $("#lupa_denominacion").hide();

  $("#n_cuit").blur(function () {
    $("#n_cuit").mask("99-99999999-9");
  });
  $("#n_cuit").mask("99-99999999-9");

  $("#btn_legajo").prop("disabled", true);
  $("#btn_nuevo_contribuyente").prop("disabled", true);

  $("#btn_legajo").click(function () {
    if ($("#id_contribuyente").val()) {
      post_to_url(
        "legajo_contribuyente.php",
        { p_id_contribuyente: $("#id_contribuyente").val() },
        "_blank",
        "POST"
      );
    }
  });

  $("#btn_nuevo_contribuyente").click(function () {
    if ($("#id_contribuyente").val()) {
      post_to_url(
        "contribuyentes.php",
        { P_SINTRIBUTO: "S" },
        "_blank",
        "POST"
      );
    }
  });

  $("#btn_generar_obligaciones").click(function () {
    if ($("#grid_generar_obl").jqGrid("getGridParam", "records") == 0) {
      mostrar_cuadro(
        "I",
        "Atención",
        "Debe cargar antes las obligaciones que desea generar."
      );
      return;
    } else {
      $.ajax({
        type: "POST",
        url: FUNCIONES_BASEPATH + "maestro_abm.php",
        data: {
          id_menu: v_id_menu,
          n_orden: 4,
        },
        dataType: "json",
        success: function (data) {
          if (data.resultado == "OK") {
            if (data.p_preguntar == "S") {
              mostrar_cuadro(
                "Q",
                "Confirmación",
                "La boleta de deuda está Anulada. ¿Confirma la generación de la deuda de honorarios?",
                function () {
                  return;
                },
                function () {
                  mostrar_cuadro("I", "Cancelada", "Generación cancelada.");
                  return;
                },
                500
              );
              return;
            }
            else{
              mostrar_cuadro("S", "Exito", "Se han generado las obligaciones correctamente");
              return;
            }
          } else {
            mostrar_cuadro("E", "Error", data.resultado);
            return;
          }
        },
      });
    }
  });

  $("#btn_limpiar").click(function () {
    $(".limpiar").val("");
    $("#btn_legajo").prop("disabled", true);
    $("#btn_nuevo_contribuyente").prop("disabled", true);
    limpiar_tmp();
    $('#refresh_grid_generar_obl').click();
  });

  $("#objeto").on("keydown focusout", function (event) {
    if (event.type === "keydown" && $(this).val().length >= 2) {
      $("#lupa_obj_hecho").show().css("display", "table-cell");
      $("#mascara_lupa_obj_hecho").hide();
    } else if (event.type === "keydown") {
      $("#lupa_obj_hecho").hide();
      $("#mascara_lupa_obj_hecho").show().css("display", "table-cell");
      $("#btn_legajo").prop("disabled", true);
      $("#btn_nuevo_contribuyente").prop("disabled", true);
    } else if (event.type === "focusout" && $(this).val().length <= 2) {
      $("#lupa_obj_hecho").hide();
      $("#mascara_lupa_obj_hecho").show().css("display", "table-cell");
      $("#btn_legajo").prop("disabled", true);
      $("#btn_nuevo_contribuyente").prop("disabled", true);
    }
  });

  $("#lupa_tipo_domicilio").lupa_generica({
    id_lista: v_lista_tdom,
    titulos: ["Cód. Tipo Domicilio", "Tipo Domicilio", "Descripción"],
    grid: [
      { index: "c_dato", width: 150 },
      { index: "d_dato", width: 420 },
      { index: "domi", width: 420 },
    ],
    caption: "Lista de Tipos de Domicilio",
    sortname: "d_dato",
    sortorder: "asc",
    filtros: ["#id_contribuyente"],
    filtroNull: true,
    campos: { c_dato: "tipo_domicilio", d_dato: "d_tipo_domicilio" },
    keyNav: true,
    searchInput: "#tipo_domicilio",
    searchCode: true,
    exactField: "c_dato",
  });

  $("#lupa_c_tributo").lupa_generica({
    id_lista: v_lista_tributos,
    titulos: ["Cód. Tributo", "Tributo"],
    grid: [
      { index: "c_tributo", width: 100 },
      { index: "d_descrip", width: 450 },
    ],
    caption: "Lista de Tributos",
    sortname: "c_tributo",
    sortorder: "asc",
    campos: { c_tributo: "c_tributo", d_descrip: "d_tributo" },
    keyNav: true,
    searchInput: "#c_tributo",
    searchCode: true,
    exactField: "c_tributo",
    onClose: function(){
      if (!$('#n_cuit').val() && $('#c_tributo').val() === '110'){
        mostrar_error("Ingrese primero el CUIT.");
        $('#c_tributo, #d_tributo').val(null);
      }
    }
  });

  $("#n_cuit, #c_tributo").focusout(function () {
    if ($("#n_cuit").val() !== "") {
      try {
        if (limpia_cuit($("#n_cuit").val()).length === 11) {
          $('#main').procOverlay({visible:true});
          $.ajax({
            type: "POST",
            url: "ajax_genericos/autocomplete.php",
            data: { oper: "3", term: limpia_cuit($("#n_cuit").val()) },
            dataType: "json",
            success: function (data) {
              ajax_autocomplete = null;
              if (data) {
                $("#d_denominacion").val(data.data_raz[0].razon_social);
                $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                $("#objeto").keydown();
                $("#btn_legajo").prop("disabled", false);
                $("#btn_nuevo_contribuyente").prop("disabled", false);
              }
            },
          });
        } else {
          // $('#btn_limpiar').click();
        }
      } catch (err) {}
    }
  });

  $("#objeto").focusout(function () {
    if ($("#c_tributo").val() == 110 && $("#objeto").val() != '' && $(this).val().length >= 6) {
      if($("#n_cuit").val()!= ''){
        $("#tipo_domicilio").blur();
        $.ajax({
          type: "POST",
          url: FUNCIONES_BASEPATH + "maestro_abm.php",
          data: {
            p_d_objeto_hecho: $("#objeto").val(),
            p_id_contribuyente: $("#id_contribuyente").val(),
            id_menu: v_id_menu,
            n_orden: 3,
          },
          dataType: "json",
          success: function (data) {
            if (data.resultado == "OK") {
              if (data.p_preguntar == "S") {
                mostrar_cuadro(
                    "Q",
                    "Confirmación",
                    "La boleta de deuda está Anulada. ¿Confirma la generación de la deuda de honorarios?",
                    function () {
                      return;
                    },
                    function () {
                      mostrar_cuadro("E", "Error", "Generación cancelada.");
                      return;
                    },
                    500
                );
              }
            } else {
              mostrar_cuadro("E", "Error", data.resultado,function(){
                $("#objeto").val(null);
                $("#tipo_domicilio").val(null);
                $("#d_tipo_domicilio").val(null);
              });
            }
          },
        });
      }else{
        mostrar_cuadro("E", "Error", "Debe ingresar el CUIT.");
        $("#objeto").val(null);
      }
    }
  });

  $("#objeto").focusout(function () {
    if (!$("#n_cuit").val()) {
      mostrar_cuadro("E", "Error", "Debe ingresar el CUIT.");
      $("#objeto").val(null);
    }
  });



  $("#d_denominacion").on("keydown focusout", function (event) {
    if (event.type === "keydown" && $(this).val().length >= 4) {
      $("#lupa_denominacion").show().css("display", "table-cell");
      $("#mascara_lupa_denominacion").hide();
    } else if (event.type === "keydown") {
      $("#lupa_denominacion").hide();
      $("#mascara_lupa_denominacion").show().css("display", "table-cell");
    } else if (event.type === "focusout" && $(this).val().length <= 4) {
      $("#lupa_denominacion").hide();
      $("#mascara_lupa_denominacion").show().css("display", "table-cell");
    }
  });

  $("#lupa_denominacion").lupa_generica({
    id_lista: vg_lista_denominaciones,
    titulos: [
      "ID contribuyente",
      "CUIT",
      "Denominación",
      "Código de Documento",
      "Tipo de Documento",
      "Numero de Documento",
      "F. Alta",
    ],
    grid: [
      { index: "id_contribuyente", width: 100, hidden: true },
      { index: "n_cuit", width: 100 },
      { index: "d_denominacion", width: 200 },
      { index: "c_tipo_documento", width: 140, hidden: true },
      { index: "d_tipo_documento", width: 140 },
      { index: "n_documento", width: 160 },
      { index: "f_alta", width: 80 },
    ],
    caption: "Lista de Denominaciones",
    sortname: "d_denominacion",
    sortorder: "asc",
    filtros: ["#d_denominacion"],
    filtrosTitulos: ["Denominación"],
    filtrosNulos: [false],
    campos: {
      id_contribuyente: "id_contribuyente",
      n_cuit: "n_cuit",
      d_denominacion: "d_denominacion",
    },
    keyNav: true,
    draggable: true,
    onClose: function () {
      if ($("#id_contribuyente").val() == null) {
        $("#btn_legajo").prop("disabled", true);
        $("#btn_nuevo_contribuyente").prop("disabled", true);
      } else {
        $("#btn_legajo").prop("disabled", false);
        $("#btn_nuevo_contribuyente").prop("disabled", false);
      }
    },
  });

  $("#lupa_obj_hecho").lupa_generica({
    id_lista: v_lista_obj,
    titulos: [
      "Objeto/Hecho",
      "ID Contribuyente",
      "CUIT",
      "Denominación",
      "Tipo Domicilio",
    ],
    grid: [
      { index: "d_objeto_hecho", width: 100 },
      { index: "id_contribuyente", hidden: true },
      { index: "n_cuit", width: 100 },
      { index: "d_denominacion", width: 250 },
      { index: "c_tipo_domicilio", width: 250 },
    ],
    caption: "Lista de Objeto/Hecho",
    sortname: "d_objeto_hecho",
    sortorder: "asc",
    filtros: ["#c_tributo", "#objeto", "#id_contribuyente"],
    filtrosTitulos: ["Tributo", "Objeto Hecho", "CUIT"],
    filtrosNulos: [false, true, false],
    campos: {
      d_objeto_hecho: "objeto",
      d_denominacion: "d_denominacion",
      n_cuit: "n_cuit",
      id_contribuyente: "id_contribuyente",
      c_tipo_domicilio: "tipo_domicilio",
    },
    onClose: function () {
      if ($("#objeto").val() == "") {
        $("#objeto").val(objeto);
      }
      if ($("#d_denominacion").val() == "") {
        $("#d_denominacion").val(d_denominacion);
      }
      if ($("#n_cuit").val() == "") {
        $("#n_cuit").val(n_cuit);
      }
      if ($("#id_contribuyente").val() == "") {
        $("#id_contribuyente").val(id_contribuyente);
      }

      if ($("#c_tributo").val() == 110 && $("#objeto").val() != null) {
        $("#tipo_domicilio").blur();
        $.ajax({
          type: "POST",
          url: FUNCIONES_BASEPATH + "maestro_abm.php",
          data: {
            p_d_objeto_hecho: $("#objeto").val(),
            p_id_contribuyente: $("#id_contribuyente").val(),
            id_menu: v_id_menu,
            n_orden: 3,
          },
          dataType: "json",
          success: function (data) {
            if (data.resultado === "OK") {
              if (data.p_preguntar === "S") {
                mostrar_cuadro(
                  "Q",
                  "Confirmación",
                  "La boleta de deuda está Anulada. ¿Confirma la generación de la deuda de honorarios?",
                  function () {
                  },
                  function () {
                    mostrar_cuadro("E", "Error", "Generación cancelada.");
                  },
                  500
                );
              }
            } else {
              mostrar_cuadro("E", "Error", data.resultado,function(){
                $("#objeto").val(null);
                $("#tipo_domicilio").val(null);
                $("#d_tipo_domicilio").val(null);
              });
            }
          },
        });
      }
    },
  });
}

function limpiar_tmp() {
  $.ajax({
    type:'POST',
    url: FUNCIONES_BASEPATH+'maestro_abm.php',
    data:{
      "id_menu":v_id_menu,
      "n_orden":5
    },
    dataType:'json',
    success: function( data ) {
      if(data.resultado === 'OK'){

      }
      else{
        mostrar_cuadro('E', 'Error', data.resultado);
      }
    }
  });
}
