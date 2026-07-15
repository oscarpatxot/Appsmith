export default {

  async guardar() {

    // Documento seleccionado
    if (!tblDocumentoLog.selectedRow.id_documento) {
      showAlert("Debe buscar un documento.", "warning");
      return;
    }

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

      showAlert("Documento registrado correctamente.", "success");

      this.limpiar(false);

      // Si luego haces una consulta del historial:
      // await qryLogConsultar.run();

    } catch (error) {

      showAlert(error.message || "Error al guardar el documento.", "error");

    }

  },

  limpiar(mostrarMensaje = true) {

    resetWidget("selTipoDocumentoLog");
    resetWidget("inpIdDocumentoLog");

    resetWidget("inpReferenciaDocLog");
    resetWidget("inpComentariosDocLog");

    resetWidget("dpFechaEnvio1DocLog");

    resetWidget("selPagadoCreditoDocLog");
    resetWidget("dpFechaPagadoCreditoDocLog");

    resetWidget("selEntregadoDocLog");
    resetWidget("dpEntregadoDocLog");

    // Limpiar la tabla también
    resetWidget("tblDocumentoLog");

    if (mostrarMensaje) {
      showAlert("Formulario limpiado.", "success");
    }

  }

}