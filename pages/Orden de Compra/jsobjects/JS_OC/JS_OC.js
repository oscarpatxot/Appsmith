export default {

	inicializarDetalle() {
		storeValue("detalleOC", []);
	},

	async agregarLinea() {

		const nuevaLinea = {
			id: Date.now(),
			descripcion: inpDescripcion.text,
			cantidad: Number(inpCantidad.text),
			precio_unitario: Number(inpPrecio.text),

			es_gravado: Number(selGravado.selectedOptionValue),
			gravado_texto: selGravado.selectedOptionLabel,

			id_tipo_gasto: Number(selTipoGasto.selectedOptionValue),
			tipo_gasto: selTipoGasto.selectedOptionLabel,

			unidad: selUnidad.selectedOptionValue
		};

		const detalleActual = appsmith.store.detalleOC || [];

		await storeValue(
			"detalleOC",
			[...detalleActual, nuevaLinea]
		);

		await resetWidget("inpDescripcion");
		await resetWidget("inpCantidad");
		await resetWidget("inpPrecio");

	},

	subtotalGravado() {

		const detalle = appsmith.store.detalleOC || [];

		return detalle
			.filter(x => x.es_gravado === 1)
			.reduce(
				(sum, x) => sum + (x.cantidad * x.precio_unitario),
				0
			);

	},

	subtotalNoGravado() {

		const detalle = appsmith.store.detalleOC || [];

		return detalle
			.filter(x => x.es_gravado === 0)
			.reduce(
				(sum, x) => sum + (x.cantidad * x.precio_unitario),
				0
			);

	},

	subtotalConDescuento() {

		return Math.max(
			0,
			JS_OC.subtotalGravado()
			-
			Number(inpDescuento.text || 0)
		);

	},

	itbis() {

		return (
			JS_OC.subtotalConDescuento()
			*
			Number(selITBIS.selectedOptionValue)
		);

	},

	total() {

		return (
			JS_OC.subtotalConDescuento()
			+
			JS_OC.subtotalNoGravado()
			+
			JS_OC.itbis()
		);

	},

	async eliminarLinea(idLinea) {

		const detalleActual = appsmith.store.detalleOC || [];

		const nuevoDetalle =
			detalleActual.filter(
				x => x.id !== idLinea
			);

		await storeValue(
			"detalleOC",
			nuevoDetalle
		);

	},

	validarLinea() {

		if (!inpDescripcion.text.trim()) {
			showAlert(
				"Debe indicar una descripción",
				"warning"
			);
			return false;
		}

		if (Number(inpCantidad.text) <= 0) {
			showAlert(
				"La cantidad debe ser mayor que cero",
				"warning"
			);
			return false;
		}

		if (Number(inpPrecio.text) <= 0) {
			showAlert(
				"El precio debe ser mayor que cero",
				"warning"
			);
			return false;
		}

		if (!selUnidad.selectedOptionValue) {
			showAlert(
				"Seleccione una unidad",
				"warning"
			);
			return false;
		}

		if (!selTipoGasto.selectedOptionValue) {
			showAlert(
				"Seleccione un tipo de gasto",
				"warning"
			);
			return false;
		}

		return true;

	},

	validarOC() {

		if (!selProyecto.selectedOptionValue) {
			showAlert(
				"Seleccione un proyecto",
				"warning"
			);
			return false;
		}

		if (!selSuplidor.selectedOptionValue) {
			showAlert(
				"Seleccione un suplidor",
				"warning"
			);
			return false;
		}

		if (!selMoneda.selectedOptionValue) {
			showAlert(
				"Seleccione una moneda",
				"warning"
			);
			return false;
		}

		if (Number(inpDescuento.text || 0) < 0) {
			showAlert(
				"El descuento no puede ser negativo",
				"warning"
			);
			return false;
		}

		const detalle =
			appsmith.store.detalleOC || [];

		if (detalle.length === 0) {
			showAlert(
				"Debe agregar al menos una línea",
				"warning"
			);
			return false;
		}

		return true;

	},

	async guardarOC() {

		if (!JS_OC.validarOC()) {
			return;
		}

		await CrearOC.run();

await storeValue(
	"ultimaOCCreada",
	CrearOC.data[0].id_orden_compra
);

showAlert(
	"Orden creada: " +
	CrearOC.data[0].numero_orden,
	"success"
);

		console.log(CrearOC.data);

		await storeValue(
			"detalleOC",
			[]
		);

		await resetWidget("inpCotizacion");
		await resetWidget("txtComentarios");
		await resetWidget("inpDescuento");

	},
	
	async guardarFormularioOC() {

	if (!JS_OC.validarOC()) {
		return;
	}

if (appsmith.store.modoOC === "MODIFICAR") {

    await ModificarOC.run();

    await storeValue(
        "ultimaOCCreada",
        appsmith.store.idOCModificar
    );

    showAlert(
        "Orden modificada correctamente",
        "success"
    );

    await BuscarOC.run();

    await JS_OC.nuevaOC();

} else {

		await JS_OC.guardarOC();

		await BuscarOC.run();

	}

},
	
async prepararModificarOC() {

	await storeValue(
		"idOCModificar",
		tblOCConsulta.selectedRow.id_orden_compra
	);

	await ObtenerOCModificar.run();

	await ObtenerDetalleOCModificar.run();

	await storeValue(
		"modoOC",
		"MODIFICAR"
	);

	await storeValue(
		"detalleOC",
		ObtenerDetalleOCModificar.data
	);

	await storeValue(
		"ocModificar",
		ObtenerOCModificar.data[0]
	);

	showAlert(
		"OC cargada para modificar",
		"success"
	);

},
	
async nuevaOC() {

	await storeValue(
		"modoOC",
		"CREAR"
	);

	await storeValue(
		"detalleOC",
		[]
	);

	await storeValue(
		"ocModificar",
		null
	);

	await storeValue(
		"idOCModificar",
		null
	);

	showAlert(
		"Modo creación activado",
		"success"
	);

}
	
}