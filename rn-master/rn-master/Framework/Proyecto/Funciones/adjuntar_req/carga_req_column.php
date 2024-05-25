<style type="text/css">
    #form_adjuntar_p_c_tipo_doc input{
        float: left;
    }

    #form_adjuntar_p_c_tipo_doc button{
        text-align: center;
        float: left;
        width: 30px;
        height: 20px;
        margin-left: 3px;
        margin-top: 2px;
    }
</style>

<form id="form_adjuntar_p_c_tipo_doc" action="" method="post" target="upload_target" enctype="multipart/form-data" style="margin-left: 5px;">
<p style="overflow: hidden; white-space: normal; margin-bottom: 0px">
        <input id="d_file_adjunto_p_c_tipo_doc" maxlength="400" placeholder="Seleccione un Archivo..." class="input-sm" style="width: 80%"/>
        <input id="file_adjunto_p_c_tipo_doc" name="file_adjunto" type="file" style="display: none;"/>
        <button id="btn_file_info_p_c_tipo_doc" class="glyphicon glyphicon-info-sign div_btn_info_p_c_tipo_doc" type="button" style="top:1px;"></button>
        <button id="btn_file_adjunto_p_c_tipo_doc" class="glyphicon glyphicon-search div_btn_fileSearch_p_c_tipo_doc" type="button"></button>
  		<button id="btn_file_delete_p_c_tipo_doc" class="glyphicon glyphicon-trash div_btn_fileDelete_p_c_tipo_doc" type="button"></button>
   		<button id="btn_file_View_p_c_tipo_doc" class="glyphicon glyphicon-eye-open div_btn_fileView_p_c_tipo_doc" type="button"></button>
        <input type="hidden" id="id_documento_p_c_tipo_doc"/>
        <input type="hidden" id="d_nombre_p_c_tipo_doc"/>
        <input type="hidden" id="d_nombre_tmp_p_c_tipo_doc"/>
        <input type="hidden" name="p_n_id_menu" value="10666"/>
    </p>
</form>