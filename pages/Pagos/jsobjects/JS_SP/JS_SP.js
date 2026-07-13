export default {

  async agregarFactura() {

    const factura = qrySPBuscarFactura.data?.[0];

    if (!factura) {
      showAlert("Factura no encontrada", "error");
      return;
    }

    const montoSolicitado = Number(inpValorSolicitadoSP.text || 0);

    if (montoSolicitado <= 0) {
      showAlert("Debe indicar un valor solicitado mayor que cero", "error");
      return;
    }

    const detalleActual = appsmith.store.detalleSP || [];
	
		
		const existe = detalleActual.some(
  x => x.id_factura_compra === factura.id_factura_compra
);

if (existe) {
  showAlert("Esta factura ya fue agregada", "warning");
  return;
}

    // Primera factura
    if (detalleActual.length === 0) {

      await storeValue("idProyectoSP", factura.id_proyecto);
      await storeValue("idSuplidorSP", factura.id_suplidor);
      await storeValue("idMonedaSP", factura.id_moneda);

    }
    else {

      // Validar proyecto
      if (factura.id_proyecto !== appsmith.store.idProyectoSP) {
        showAlert("Proyecto no coincide", "error");
        return;
      }

      // Validar suplidor
      if (factura.id_suplidor !== appsmith.store.idSuplidorSP) {
        showAlert("Suplidor no coincide", "error");
        return;
      }

      // Validar moneda
      if (factura.id_moneda !== appsmith.store.idMonedaSP) {
        showAlert("Moneda no coincide", "error");
        return;
      }

    }

    detalleActual.push({
      id_factura_compra: factura.id_factura_compra,
      numero_factura: factura.numero_factura,
      fecha_factura: factura.fecha_factura,
      monto_factura: factura.monto_total,
      estado: factura.estado,

      monto_solicitado: montoSolicitado,

      id_suplidor: factura.id_suplidor,
      razon_social: factura.razon_social,

      id_proyecto: factura.id_proyecto,
      nombre_proyecto: factura.nombre_proyecto,

      id_moneda: factura.id_moneda,
      codigo_iso: factura.codigo_iso
    });

    await storeValue("detalleSP", detalleActual);

    resetWidget("inpFCparaSPlinea");
    resetWidget("inpValorSolicitadoSP");

  },
	
	async eliminarFactura(idFactura) {

  const detalle = (appsmith.store.detalleSP || [])
    .filter(x => x.id_factura_compra !== idFactura);

  await storeValue("detalleSP", detalle);

  // Si se eliminó la última factura, limpiar encabezado
  if (detalle.length === 0) {

    await storeValue("idProyectoSP", null);
    await storeValue("idSuplidorSP", null);
    await storeValue("idMonedaSP", null);

  }

},
	
	async generarJSON() {

  const payload = {

    id_suplidor: selSuplidorSP.selectedOptionValue,
    id_proyecto: selProyectoSP.selectedOptionValue,

    fecha_solicitud: dpFechaSP.selectedDate,

    concepto: inpConceptoSP.text,

    retencion_itbis_posible:
      Number(inpRetIbisSP.text?.replace(/,/g, '') || 0),

    retencion_dgii_posible:
      Number(inpRetDGIISP.text?.replace(/,/g, '') || 0),

    retencion_garantia_posible:
      Number(inpRetGarantiaSP.text?.replace(/,/g, '') || 0),

    retencion_tss_posible:
      Number(inpRetTSSSP.text?.replace(/,/g, '') || 0),

    otra_moneda:
      Number(selOtraMonedaSP.selectedOptionValue || 0),

id_moneda_otra_moneda:
  Number(selOtraMonedaCodigoSP.selectedOptionValue || 0),

tasa_pago_otra_moneda:
  inpTasaOtraMoneda.text
    ? Number(inpTasaOtraMoneda.text)
    : null,

    detalle: (appsmith.store.detalleSP || []).map(x => ({
      id_factura_compra: x.id_factura_compra,
      monto_solicitado: x.monto_solicitado
    }))

  };

  console.log(payload);

  showAlert(
    JSON.stringify(payload, null, 2),
    "info"
  );

},
	
	obtenerDetalleJSON()
{
  return JSON.stringify(
    (appsmith.store.detalleSP || []).map(x => ({
      id_factura_compra: x.id_factura_compra,
      monto_solicitado: x.monto_solicitado
    }))
  );
},
	
	async cargarModificar() {

  await qrySPBuscarModificar.run();
  await qrySPBuscarDetalleModificar.run();

  const encabezado = qrySPBuscarModificar.data?.[0];

  if (!encabezado) {

    showAlert(
      "Solicitud no encontrada",
      "error"
    );

    return;

  }

await storeValue(
  "encabezadoSP",
  encabezado
);

await storeValue(
  "detalleSP",
  (qrySPBuscarDetalleModificar.data || []).map(x => ({
    id_factura_compra: x.id_factura_compra,
    numero_factura: x.numero_factura,
    fecha_factura: x.fecha_factura,
    monto_factura: x.monto_factura,
    estado: x.estado,
    monto_solicitado: x.monto_solicitado,

    id_suplidor: x.id_suplidor || null,
    razon_social: x.razon_social || null,
    id_proyecto: x.id_proyecto || null,
    nombre_proyecto: x.nombre_proyecto || null,
    id_moneda: x.id_moneda || null,
    codigo_iso: x.codigo_iso || null
  }))
);

showAlert(
  "Solicitud cargada correctamente",
  "success"
);

}

}