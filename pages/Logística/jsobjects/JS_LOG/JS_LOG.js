export default {

  async guardar() {

    // Documento seleccionado
    if (!tblDocumentoLog.selectedRow.id_documento) {
      showAlert("Debe buscar un documento.", "warning");
      return;
    }

    // Fecha de envío
  

    // Fecha pagado
    if (
      Number(selPagadoCreditoDocLog.selectedOptionValue) === 1 &&
      !dpFechaPagadoCreditoDocLog.selectedDate
    ) {
      showAlert("Debe indicar la fecha de pagado.", "warning");
      return;
    }

    // Fecha entregado
    if (
      Number(selEntregadoDocLog.selectedOptionValue) === 1 &&
      !dpEntregadoDocLog.selectedDate
    ) {
      showAlert("Debe indicar la fecha de entregado.", "warning");
      return;
    }

    try {

      await qryLogCrearDocumento.run();

      showAlert(
        "Documento registrado correctamente.",
        "success"
      );

      this.limpiar(false);

    } catch (error) {

      showAlert(
        error.message || "Error al guardar el documento.",
        "error"
      );

    }

  },

  limpiar(mostrarMensaje = true) {

    resetWidget("selTipoDocumentoLog");
    resetWidget("inpIdDocumentoLog");

    resetWidget("inpReferenciaDocLog");
    resetWidget("inpComentariosDocLog");

    resetWidget("dpFechaEnvioDocLog");

    resetWidget("selPagadoCreditoDocLog");
    resetWidget("dpFechaPagadoCreditoDocLog");

    resetWidget("selEntregadoDocLog");
    resetWidget("dpEntregadoDocLog");

    resetWidget("tblDocumentoLog");

    qryLogSeguimiento.run();

    if (mostrarMensaje) {
      showAlert(
        "Formulario limpiado.",
        "success"
      );
    }

  },

  async actualizar() {

    if (!tblSeguimientoLogistico.selectedRow.id) {
      showAlert(
        "Debe seleccionar un documento.",
        "warning"
      );
      return;
    }

    // Fecha de envío


    // Fecha pagado
    if (
      Number(selPagadoCreditoAct.selectedOptionValue) === 1 &&
      !dpFechaPagadoAct.selectedDate
    ) {
      showAlert(
        "Debe indicar la fecha de pagado.",
        "warning"
      );
      return;
    }

    // Fecha entregado
    if (
      Number(selEntregadoAct.selectedOptionValue) === 1 &&
      !dpFechaEntregadoAct.selectedDate
    ) {
      showAlert(
        "Debe indicar la fecha de entregado.",
        "warning"
      );
      return;
    }

    try {

      await qryLogActualizarDocumento.run();

      showAlert(
        "Documento actualizado correctamente.",
        "success"
      );

      await qryLogSeguimiento.run();

    } catch (error) {

      showAlert(
        error.message || "Error al actualizar.",
        "error"
      );

    }

  }

}