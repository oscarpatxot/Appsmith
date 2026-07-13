export default {

	async prepararImpresionOC() {

		await ImprimirOCEncabezado.run();

		await ImprimirOCDetalle.run();

		await storeValue(
			"idOCImprimir",
			tblOCConsulta.selectedRow.id_orden_compra
		);

		showAlert(
			"Orden cargada para impresión",
			"success"
		);

	},

generarHTMLOC() {

	const oc = appsmith.store.ocImpresion;
	
	showAlert(JSON.stringify(oc.fecha_orden));

	const detalle = appsmith.store.detalleOCImpresion || [];

	let filasDetalle = "";

	detalle.forEach(x => {

		filasDetalle += `
		<tr>

			<td>${x.linea}</td>

			<td>${x.descripcion}</td>

			<td>${x.unidad}</td>

			<td style="text-align:right;">
				${Number(x.cantidad).toLocaleString("en-US", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}
			</td>

			<td style="text-align:right;">
				${Number(x.precio_unitario).toLocaleString("en-US", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}
			</td>

			<td style="text-align:center;">
				${x.gravado}
			</td>

			<td style="text-align:right;">
				${Number(x.total_linea).toLocaleString("en-US", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}
			</td>

		</tr>
		`;

	});

	return `
	<html>

	<head>

		<title>${oc.numero_orden}</title>

		<style>

			body {
				font-family: Arial, sans-serif;
				font-size: 12px;
				margin: 20px;
			}

			.titulo {
				text-align: center;
				font-size: 22px;
				font-weight: bold;
				margin-bottom: 20px;
			}

			.fila {
				display: flex;
				gap: 20px;
				margin-bottom: 15px;
			}

			.caja {
				border: 1px solid #999;
				padding: 10px;
				border-radius: 4px;
			}

			.izquierda {
				width: 60%;
			}

			.derecha {
				width: 40%;
			}

			.label {
				font-weight: bold;
			}

			.linea {
				margin-bottom: 8px;
			}

			.tabla-detalle {
				width: 100%;
				border-collapse: collapse;
				margin-top: 15px;
			}

			.tabla-detalle th {
	border: 1px solid #999;
	padding: 5px;
	background: #f0f0f0;
	font-size: 11px;
}

.tabla-detalle td {
	border: 1px solid #999;
	padding: 4px;
	font-size: 10px;
}

		</style>

	</head>

	<body>

		<div class="titulo">
			ORDEN DE COMPRA
		</div>

		<div class="fila">

			<div class="caja izquierda">

				<div class="linea">
					<strong>${oc.nombre_proyecto}</strong>
				</div>

				<div class="linea">
					RNC: ${oc.rnc || ""}
				</div>

				<div class="linea">
					${oc.descripcion || ""}
				</div>

			</div>

			<div class="caja derecha">

				<div class="linea">
					<span class="label">ID Orden:</span>
					${oc.id_orden_compra}
				</div>

<div class="linea">
	<span class="label">Fecha:</span>
	${oc.fecha_orden.split('-').reverse().join('/')}
</div>

				<div class="linea">
					<span class="label">Orden:</span>
					${oc.numero_orden}
				</div>

				<div class="linea">
					<span class="label">Cotización:</span>
					${oc.cotizacion || ""}
				</div>

				<div class="linea">
					<span class="label">Moneda:</span>
					${oc.codigo_iso}
				</div>

			</div>

		</div>

		<div class="caja">

			<div style="display:flex;">

				<div style="width:50%;">

					<div class="linea">
						<span class="label">Suplidor:</span>
					</div>

					<div class="linea">
						${oc.razon_social || ""}
					</div>

					<div class="linea">
						RNC: ${oc.numero_documento || ""}
					</div>

				</div>

				<div style="width:50%;">

					<div class="linea">
						<span class="label">Teléfono suplidor:</span>
					</div>

					<div class="linea">
						${oc.telefono_suplidor || ""}
					</div>

					<div class="linea">
						<span class="label">Dirección suplidor:</span>
					</div>

					<div class="linea">
						${oc.direccion_proveedor || ""}
					</div>

					<div class="linea">
						<span class="label">Correo suplidor:</span>
					</div>

					<div class="linea">
						${oc.correo_proveedor || ""}
					</div>

				</div>

			</div>

		</div>

		<table class="tabla-detalle">

			<thead>

				<tr>

					<th>Línea</th>
					<th>Descripción</th>
					<th>Unidad</th>
					<th>Cantidad</th>
					<th>Precio</th>
					<th>Gravado</th>
					<th>Total Línea</th>

				</tr>

			</thead>

			<tbody>

				${filasDetalle}

			</tbody>

		</table>

		<br>

<div style="
	width:300px;
	margin-left:auto;
	border:1px solid #999;
	padding:10px;
	border-radius:4px;
	font-size:10px;
">

	<table style="
		width:100%;
		border-collapse:collapse;
	">

		<tr>
			<td style="text-align:right;font-weight:bold;padding:3px;width:65%;">
				Subtotal gravado:
			</td>

			<td style="text-align:left;padding:3px;">
				${Number(oc.subtotal || 0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;padding:3px;">
				Descuento:
			</td>

			<td style="text-align:left;padding:3px;">
				${Number(oc.descuento || 0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;padding:3px;">
				ITBIS:
			</td>

			<td style="text-align:left;padding:3px;">
				${Number(oc.itbis || 0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;padding:3px;">
				Subtotal no gravado:
			</td>

			<td style="text-align:left;padding:3px;">
				${Number(oc.subtotal_no_gravado || 0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
			</td>
		</tr>

		<tr>
			<td style="
				text-align:right;
				font-weight:bold;
				padding:3px;
			">
				Total:
			</td>

			<td style="
				text-align:left;
				padding:3px;
			">
				${Number(oc.total_estimado || 0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;padding:3px;">
				Moneda:
			</td>

			<td style="text-align:left;padding:3px;">
				${oc.codigo_iso}
			</td>
		</tr>

	</table>

</div>

		<br><br><br><br>

		<div style="
			width:300px;
			text-align:center;
			margin-top:50px;
		">

			<hr>

			<div>
				Autorizado por
			</div>

		</div>

	</body>

	</html>
	`;

}
	
}