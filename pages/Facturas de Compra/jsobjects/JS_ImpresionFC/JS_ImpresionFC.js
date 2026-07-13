export default {

	formatoAccounting(valor) {

		const numero = Number(valor || 0);

		if (numero === 0)
			return "-";

		return numero.toLocaleString(
			"en-US",
			{
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}
		);

	},

	generarHTMLFC() {

		const fc = appsmith.store.fcImpresion;

		const detalle = appsmith.store.detalleFCImpresion || [];

		let filasDetalle = "";

		detalle.forEach(x => {

			filasDetalle += `
			<tr>

				<td>${x.id_orden_compra}</td>

				<td>${x.numero_orden}</td>

				<td>${x.cotizacion || ""}</td>

				<td>${x.descripcion || ""}</td>

				<td>${x.tipo_gasto || ""}</td>

				<td style="text-align:right;">

					${Number(x.total_linea || 0).toLocaleString(
						"en-US",
						{
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						}
					)}

				</td>

			</tr>
			`;

		});

		return `
		
		<html>

<head>

<title>
FC-${String(fc.id_factura_compra).padStart(6,"0")}
</title>

<style>

body {
	font-family: Arial, sans-serif;
	font-size: 12px;
	margin: 20px;
}

.titulo {
	text-align: center;
	font-size: 34px;
	font-weight: bold;
	margin-bottom: 20px;
}

.fila {
	display:flex;
	gap:20px;
	margin-bottom:20px;
}

.izquierda {
	width:55%;
}

.derecha {
	width:45%;
}

.caja {
	border:1px solid #999;
	border-radius:4px;
	padding:12px;
}

.linea {
	margin-bottom:10px;
}

.label {
	font-weight:bold;
}

.tabla-detalle {
	width:100%;
	border-collapse:collapse;
	margin-top:20px;
}

.tabla-detalle th {
	border:1px solid #999;
	padding:4px;
	background:#f0f0f0;
	font-size:10px;
}

.tabla-detalle td {
	border:1px solid #999;
	padding:3px;
	font-size:9px;
}

.totales {
	width:320px;
	margin-left:auto;
	margin-top:20px;
	border:1px solid #999;
	border-radius:4px;
	padding:10px;
}

.totales table {
	width:100%;
	border-collapse:collapse;
}

.totales td {
	padding:5px;
}

</style>

</head>

<body>

<div class="titulo">

	FACTURA DE COMPRA

</div>

<div class="fila">

	<div class="izquierda">

		<div class="caja">

			<div class="linea">
				Proyecto:
			</div>

			<div class="linea">
				<strong>${fc.nombre_proyecto}</strong>
			</div>

			<div class="linea">
				${fc.rnc || ""}
			</div>

		</div>

		<br>

		<div class="caja">

			<div class="linea">
				Suplidor:
			</div>

			<div class="linea">
				<strong>${fc.razon_social}</strong>
			</div>

			<div class="linea">
				RNC:
			</div>

			<div class="linea">
				<strong>${fc.numero_documento || ""}</strong>
			</div>

		</div>

	</div>

<div class="derecha">

	<div class="caja">

		<div class="linea" style="text-align:center;font-size:16px;">
			<span class="label">ID:</span>
			${fc.id_factura_compra}
		</div>

		<div class="linea">
			<span class="label">Fecha:</span>
			${fc.fecha_factura.split('-').reverse().join('/')}
		</div>
			<div class="linea">
				<span class="label">Vence:</span>
				${fc.fecha_vencimiento.split('-').reverse().join('/')}
			</div>

			<div class="linea">
				<span class="label">Factura #:</span>
				${fc.numero_factura}
			</div>

			<div class="linea">
				<span class="label">Moneda:</span>
				${fc.codigo_iso}
			</div>

		</div>

		<br>

		<div class="caja">

			<div class="linea">
				<span class="label">NCF:</span>
				${fc.ncf || ""}
			</div>

			<div class="linea">
				<span class="label">Código de Seguridad:</span>
				${fc.codigo_seguridad || ""}
			</div>

		</div>

	</div>

</div>

<table class="tabla-detalle">

	<thead>

		<tr>

			<th>ID OC</th>
			<th>Número OC</th>
			<th>Cotización</th>
			<th>Descripción</th>
			<th>Tipo de gasto</th>
			<th>Total Línea</th>

		</tr>

	</thead>

	<tbody>

		${filasDetalle}

	</tbody>

</table>

<div class="totales">

	<table>

		<tr>
			<td style="text-align:right;font-weight:bold;">
				Subtotal gravado:
			</td>
			<td>
				${this.formatoAccounting(fc.subtotal_gravado)}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;">
				Descuento:
			</td>
			<td>
				${this.formatoAccounting(fc.descuento_total)}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;">
				ITBIS:
			</td>
			<td>
				${this.formatoAccounting(fc.monto_itbis)}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;">
				No gravado:
			</td>
			<td>
				${this.formatoAccounting(fc.subtotal_exento)}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;">
				Total:
			</td>
			<td>
				${this.formatoAccounting(fc.monto_total)}
			</td>
		</tr>

		<tr>
			<td style="text-align:right;font-weight:bold;">
				Moneda:
			</td>
			<td>
				${fc.codigo_iso}
			</td>
		</tr>

	</table>

</div>

</body>

</html>
`;
	}

}