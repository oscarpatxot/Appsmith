export default {

    agregarLinea() {

   if ((appsmith.store.detalleFactura || []).length === 0) {

            selProyecto.setSelectedOption(qryFCBuscarOC.data[0].id_proyecto);

            selSuplidor.setSelectedOption(qryFCBuscarOC.data[0].id_suplidor);

            selMoneda.setSelectedOption(qryFCBuscarOC.data[0].id_moneda);

        } else {

            const existeOC = (appsmith.store.detalleFactura || []).some(
                x => x.id_oc === qryFCBuscarOC.data[0].id_orden_compra
            );

            if (existeOC) {

                showAlert(
                    "Esta Orden de Compra ya fue agregada a la factura.",
                    "warning"
                );

                return;
            }

            if (
                qryFCBuscarOC.data[0].id_proyecto !== selProyecto.selectedOptionValue ||
                qryFCBuscarOC.data[0].id_suplidor !== selSuplidor.selectedOptionValue ||
                qryFCBuscarOC.data[0].id_moneda !== selMoneda.selectedOptionValue
            ) {

                showAlert(
                    "La OC no pertenece al mismo proyecto, suplidor o moneda.",
                    "error"
                );

                return;
            }
        }

        storeValue(
            "detalleFactura",
            [
                ...(appsmith.store.detalleFactura || []),
                {
                    id_oc: qryFCBuscarOC.data[0].id_orden_compra,
                    descripcion: qryFCBuscarOC.data[0].cotizacion,
                    numero_orden: qryFCBuscarOC.data[0].numero_orden,
                    tipo_gasto: selTipoGasto.selectedOptionLabel,
                    id_tipo_gasto: selTipoGasto.selectedOptionValue,
                    total_linea: Number(inpTotalLinea.text)
                }
            ]
        );

        showAlert("Línea agregada", "success");

    },

    eliminarLinea(idOC) {

    const nuevaLista = (appsmith.store.detalleFactura || []).filter(
        x => x.id_oc !== idOC
    );

    storeValue("detalleFactura", nuevaLista);

    if (nuevaLista.length === 0) {

selProyecto.setSelectedOption("");
selSuplidor.setSelectedOption("");
selMoneda.setSelectedOption("");

    }

    showAlert("Línea eliminada", "success");

},
	
	validarFactura() {

    if ((appsmith.store.detalleFactura || []).length === 0) {
        showAlert("Debe agregar al menos una Orden de Compra.", "warning");
        return false;
    }

    if (!inpNumeroFactura.text) {
        showAlert("Debe indicar el número de factura.", "warning");
        return false;
    }

    if (!dpFecha.selectedDate) {
        showAlert("Debe indicar la fecha de factura.", "warning");
        return false;
    }
if (!selCondicion.selectedOptionValue) {
    showAlert("Debe seleccionar la condición de pago.", "warning");
    return false;
}
		if (!selPorcentajeItbis.selectedOptionValue && selPorcentajeItbis.selectedOptionValue !== 0) {
    showAlert("Debe seleccionar el porcentaje de ITBIS.", "warning");
    return false;
}
    if (!dpVence.selectedDate) {
        showAlert("Debe seleccionar la fecha de vencimiento.", "warning");
        return false;
    }

    const totalLineas = (appsmith.store.detalleFactura || [])
        .reduce((s, x) => s + Number(x.total_linea || 0), 0);

    const totalFactura = Number(inpTotal.text || 0);

    if (totalFactura <= 0) {
        showAlert("El total de la factura debe ser mayor que cero.", "warning");
        return false;
    }

if (Math.abs(totalLineas - totalFactura) > 0.05) {
    showAlert(
        "El total de la factura debe coincidir con la suma de las líneas.",
        "warning"
    );
    return false;
}

    return true;

},
	
	async limpiarFormulario() {

    await storeValue("detalleFactura", []);

    selProyecto.setSelectedOption("");
    selSuplidor.setSelectedOption("");
    selMoneda.setSelectedOption("");

    selCondicion.setSelectedOption("");

    inpNumeroFactura.setValue("");
    inpComentario.setValue("");
    inpNCF.setValue("");
    inpCodigoSeguridad.setValue("");

    inpSubtotalGravado.setValue("");
    inpDescuento.setValue("");
    inpSubtotalNoGravado.setValue("");

    inpIDOrdenCompra.setValue("");
    inpTotalLinea.setValue("");

    dpFecha.setValue("");
    dpVence.setValue("");

    selPorcentajeItbis.setSelectedOption(0.18);

},
	
	async prepararModificarFC() {

    await storeValue(
        "idFCModificar",
        tblFCConsulta.selectedRow.id_factura_compra
    );

    await ObtenerFCModificar.run();

    await ObtenerDetalleFCModificar.run();

    await storeValue(
        "modoFC",
        "MODIFICAR"
    );

    await storeValue(
        "fcModificar",
        ObtenerFCModificar.data[0]
    );

    await storeValue(
        "detalleFactura",
        ObtenerDetalleFCModificar.data
    );

    showAlert(
        "Factura cargada para modificar",
        "success"
    );

},
	
	async nuevaFactura() {

    await storeValue(
        "modoFC",
        "CREAR"
    );

    await storeValue(
        "idFCModificar",
        null
    );

    await storeValue(
        "fcModificar",
        null
    );

    await this.limpiarFormulario();

    showAlert(
        "Modo creación activado",
        "success"
    );

}

}