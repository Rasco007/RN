function init_grillas() {
  datos_generar_obl = new GridParam({
    id_menu: v_id_menu,
    n_grid: 0,
    n_orden: 0,
  });

  $("#grid_generar_obl")
    .jqGrid({
      colNames: datos_generar_obl.colNames(),
      colModel: datos_generar_obl.colModel(),
      shrinkToFit: true,
      height: 180,
      pager: $("#grid_generar_obl_pager"),
      caption: "Obligaciones a Generar:",
      sortname: "C_TRIBUTO,N_POSICION_FISCAL,F_VTO_PAGO",
      sortorder: "DESC",
      postData: datos_generar_obl.postData(),
      editurl: FUNCIONES_BASEPATH + "maestro_abm.php",
      loadComplete: function () {},
    })
    .navGrid(
      "#grid_generar_obl_pager",
      { add: true, edit: true, del: true },
      {
        top: 500,
        left: 0,
        width: 700,
        onInitializeForm: defaultInitForm(function (formid) {
          inicializa_lupas_main_grid(formid);
        }),
        closeAfterEdit: true,
      }, //edit
      {
        top: 500,
        left: 0,
        width: 700,
        onInitializeForm: defaultInitForm(function (formid) {
          inicializa_lupas_main_grid(formid);
          $("#p_f_vto_pago").val(fecha_hoy);
          $("#p_id_contribuyente").val($("#id_contribuyente").val());
          $("#p_d_objeto_hecho").val($("#objeto").val());
          $("#p_c_tributo").val($("#c_tributo").val());
          $("#p_c_tipo_domicilio").val($("#tipo_domicilio").val());
          $("#p_n_cuota_anticipo").val(0);
          $("#p_n_posicion_fiscal").val(año + '00');
        }),
        closeAfterAdd: true,
      }, //add
      {} //del
    );
}
