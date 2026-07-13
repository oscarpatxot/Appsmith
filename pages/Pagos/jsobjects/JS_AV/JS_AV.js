export default {

  async nuevo() {

    await Promise.all([

      resetWidget("inpLlamarSA", true),

      resetWidget("inpID_AV", true),
      resetWidget("inpNumeroAV", true),

      resetWidget("inpSA_AV", true),
      resetWidget("inpNumeroSA_AV", true),

      resetWidget("selProyecto_AV", true),
      resetWidget("sel_Suplidor_AV", true),

      resetWidget("inpConcepto_AV", true),
      resetWidget("inpObservacionAV", true),

      resetWidget("dpFecha_AV", true),

      resetWidget("selMoneda_AV", true),
      resetWidget("selMetodo_de_Pago_AV", true),

      resetWidget("inpReferenciaAV", true),

      resetWidget("inpRetencionItbisAV", true),
      resetWidget("inpRetencionDGIIAV", true),
      resetWidget("inpRetencionGarantiaAV", true),
      resetWidget("inpRetencionTSS_AV", true),

      resetWidget("selTipoRetITBIS_AV", true),
      resetWidget("selTipoRetDGII_AV", true),
      resetWidget("selTipoRetGarantiaAV", true),
      resetWidget("selTipoRetTSS_AV", true),

      resetWidget("selOtraMonedaAV", true),
      resetWidget("selOtraMonedaCodigoAV", true),
      resetWidget("inpTasaOtraMonedaAV", true),

      resetWidget("inpAplicadoOtraMonedaAV", true),
      resetWidget("inpDesembolsoOtraMonedaAV", true),

      resetWidget("inpID_OC_AV", true),
      resetWidget("inpMontoSolicitadoAV", true),
      resetWidget("inpCotizacionDeOC_AV", true),
      resetWidget("inpMontoTotal_AV", true),
      resetWidget("inpBalancePendOC_AV", true),

      resetWidget("inpSubtotalAV", true),
      resetWidget("inpTotalDesembolsoAV", true)

    ]);

    await storeValue("modoAV", null);
    await storeValue("idAVModificar", null);
    await storeValue("encabezadoAV", null);
    await storeValue("avanceActual", null);

  },

  async cargarModificar() {

    await qryAVBuscarModificar.run();

    const encabezado = qryAVBuscarModificar.data?.[0];

    if (!encabezado) {

      showAlert(
        "Avance no encontrado",
        "error"
      );

      return;

    }

    await storeValue(
      "encabezadoAV",
      encabezado
    );

    showAlert(
      "Avance cargado para modificar",
      "success"
    );

  }

}