export default {
  numero(v) {
    return Number(String(v || "0").replace(/,/g, "")) || 0;
  },

  validarNC() {
    if (!inpIDFCAfectada.text) {
      showAlert("Debe cargar una factura afectada.", "warning");
      return false;
    }

    if (!selProyectoNC.selectedOptionValue) {
      showAlert("Debe seleccionar el proyecto.", "warning");
      return false;
    }

    if (!selSuplidorNC.selectedOptionValue) {
      showAlert("Debe seleccionar el suplidor.", "warning");
      return false;
    }

    if (!selMonedaNC.selectedOptionValue) {
      showAlert("Debe seleccionar la moneda.", "warning");
      return false;
    }

    if (!dpFechaNC.selectedDate) {
      showAlert("Debe indicar la fecha de la nota de crédito.", "warning");
      return false;
    }

    if (!inpNCF_NC.text) {
      showAlert("Debe indicar el NCF.", "warning");
      return false;
    }

    if (!inpConceptoNC.text) {
      showAlert("Debe indicar el concepto.", "warning");
      return false;
    }

    if (this.numero(inpTotalNC.text) <= 0) {
      showAlert("El total de la nota de crédito debe ser mayor que cero.", "warning");
      return false;
    }

    return true;
  },

async guardarNC() {

    if (!this.validarNC()) {
        return;
    }

    if (appsmith.store.modoNC === "MODIFICAR") {

        await qryNCModificar.run();
			
			await storeValue(
    "ultimaNCTrabajada",
    appsmith.store.idNCModificar
);

        showAlert(
            "Nota de crédito modificada correctamente",
            "success"
        );

    } else {

        await qryNCCrear.run();

        await storeValue(
            "ultimaNCTrabajada",
            qryNCCrear.data[0].id_nota_credito
        );

        showAlert(
            "Nota de crédito creada: " +
            qryNCCrear.data[0].numero_nota_credito,
            "success"
        );

    }

    await this.nuevaNC();

},
	
	async nuevaNC() {
await storeValue(
        "modoNC",
        "CREAR"
    );
		await storeValue(
    "idNCModificar",
    null
);
		
    await storeValue(
        "facturaNCCargada",
        false
    );
await storeValue(
    "facturaAfectadaNC",
    null
);
    await storeValue(
        "ultimaFacturaNC",
        null
    );

    await resetWidget("inpIDFCAfectada");

    await resetWidget("selProyectoNC");
    await resetWidget("dpFechaNC");
    await resetWidget("selMonedaNC");
    await resetWidget("selSuplidorNC");

    await resetWidget("inpConceptoNC");
    await resetWidget("inpNCF_NC");

    await resetWidget("inpST_Gravado_NC");
    await resetWidget("inpITBIS_NC");
    await resetWidget("selPorcentajeItbisNC");
    await resetWidget("inpSTnoGravadoNC");

    await resetWidget("inpCodigoDeSeguridadNC");
    await resetWidget("inpComentarioNC");
    await resetWidget("inpTotalNC");

    await resetWidget("inpNCF_FacturaAfectada");
    await resetWidget("dpFechaFCAfectada");
    await resetWidget("selMonedaFCAfectada");

    await resetWidget("inpSTGravadoFCAfectada");
    await resetWidget("inpDescuentoFC_Afectada");
    await resetWidget("inpSTGravadoConDescFCAfectada");

    await resetWidget("selProyectoFCAfectada");
    await resetWidget("selSuplidorFCAfectada");

    await resetWidget("inpITBISFCAfectada");
    await resetWidget("selPorcentajeItbisFCAfectada");

    await resetWidget("inpNumeroFCAfectada");
    await resetWidget("inpSTNoGravadoFCAfectada");
    await resetWidget("inpTotalFCAfectada");

    showAlert(
        "Modo nueva nota de crédito activado",
        "success"
    );

},
	
	async prepararModificarNC() {

    await storeValue(
        "idNCModificar",
        tblConsultaNC.selectedRow.id_nota_credito
    );

    await NCModificarEncabezado.run();

    await NCModificarFacturaAfectada.run();

    await storeValue(
        "facturaAfectadaNC",
        NCModificarFacturaAfectada.data[0]
    );

    await storeValue(
        "facturaNCCargada",
        true
    );

    await storeValue(
        "modoNC",
        "MODIFICAR"
    );

    showAlert(
        "NC cargada para modificar",
        "success"
    );

}
}