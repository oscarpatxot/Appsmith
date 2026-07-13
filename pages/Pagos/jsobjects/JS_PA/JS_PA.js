export default {

  async resetEncabezado() {

  await storeValue("pagoActual", null);
  await storeValue("detallePago", []);

  await Promise.all([

    // NO limpiar inpID_SolPago_PA_llamar

    resetWidget("inpNumeroSolPago_PA", true),

    resetWidget("inpID_PA", true),
    resetWidget("inpNumeroPA", true),

    resetWidget("dpFechaPA", true),

    resetWidget("selProyectoPA", true),
    resetWidget("selSuplidorPA", true),
    resetWidget("inpConceptoPA", true),

    resetWidget("selMonedaPA", true),

    resetWidget("selMetodosPagoPA", true),
    resetWidget("inpReferenciaPA", true),

    resetWidget("selTipoRetITBIS_PA", true),
    resetWidget("selTipoRetDGII_PA", true),
    resetWidget("selTipoRetGarantiaPA", true),
    resetWidget("selTipoRetTSS_PA", true),

    resetWidget("inpRetencionItbisPA", true),
    resetWidget("inpRetencionDGIIPA", true),
    resetWidget("inpRetencionGarantiaPA", true),
    resetWidget("inpRetencionTSS_PA", true),

    resetWidget("selOtraMonedaPA", true),
    resetWidget("selOtraMonedaCodigoPA", true),

    resetWidget("inpTasaOtraMonedaPA", true),
    resetWidget("inpMontoTotalOtraMonedaPA", true),
    resetWidget("inpDesembolsoOtraMonedaPA", true),

    resetWidget("tblDetallePagosPA", true)

  ]);

},

  async nuevo() {

    await storeValue("pagoActual", null);
    await storeValue("detallePago", []);

    await Promise.all([

      resetWidget("inpID_SolPago_Pa", true),
      resetWidget("inpNumeroSolPago_PA", true),

      resetWidget("inpID_PA", true),
      resetWidget("inpNumeroPA", true),

      resetWidget("dpFechaPA", true),
			resetWidget("inpID_SolPago_PA_llamar", true),

      resetWidget("selProyectoPA", true),
      resetWidget("selSuplidorPA", true),
      resetWidget("inpConceptoPA", true),

      resetWidget("selMonedaPA", true),

      resetWidget("selMetodosPagoPA", true),
      resetWidget("inpReferenciaPA", true),

      resetWidget("selTipoRetITBIS_PA", true),
      resetWidget("selTipoRetDGII_PA", true),
      resetWidget("selTipoRetGarantiaPA", true),
      resetWidget("selTipoRetTSS_PA", true),

      resetWidget("inpRetencionItbisPA", true),
      resetWidget("inpRetencionDGIIPA", true),
      resetWidget("inpRetencionGarantiaPA", true),
      resetWidget("inpRetencionTSS_PA", true),

      resetWidget("selOtraMonedaPA", true),
      resetWidget("selOtraMonedaCodigoPA", true),

      resetWidget("inpTasaOtraMonedaPA", true),
      resetWidget("inpMontoTotalOtraMonedaPA", true),
      resetWidget("inpDesembolsoOtraMonedaPA", true),

      resetWidget("tblDetallePagosPA", true)

    ]);

  },
	
	async cargarModificar() {

  await qryPABuscarModificar.run();
  await qryPABuscarDetalleModificar.run();

  const encabezado = qryPABuscarModificar.data?.[0];

  if (!encabezado) {

    showAlert(
      "Pago no encontrado",
      "error"
    );

    return;

  }

  await storeValue(
    "encabezadoPA",
    encabezado
  );

  await storeValue(
    "detallePA",
    qryPABuscarDetalleModificar.data || []
  );

  showAlert(
    "Pago cargado correctamente",
    "success"
  );

}

}