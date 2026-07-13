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

	generarHTMLPA() {

		const pa = appsmith.store.paImpresion;

		const detalle =
			appsmith.store.detallePAImpresion || [];

		let filasDetalle = "";

		detalle.forEach(x => {

			filasDetalle += `

		<tr>

			<td>${x.id_factura_compra}</td>

			<td>${x.numero_factura}</td>

			<td>
				${x.fecha_factura.split('-').reverse().join('/')}
			</td>

			<td style="text-align:right;">
				${this.formatoAccounting(
					x.monto_aplicado
				)}
			</td>

		</tr>

		`;

		});

		return `

<html>

<head>

<title>
${pa.numero_pago}
</title>

<style>

body {
	font-family: Arial, sans-serif;
	font-size: 12px;
	margin: 20px;
}

.titulo {
	text-align:center;
	font-size:34px;
	font-weight:bold;
	margin-bottom:20px;
}

.fila {
	display:flex;
	gap:20px;
	margin-bottom:20px;
}

.izquierda {
	width:${pa.otra_moneda ? "55%" : "100%"};
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
	margin-bottom:30px;
}

.tabla-detalle th {
	border:1px solid #999;
	padding:4px;
	background:#f0f0f0;
	font-size:10px;
}

.tabla-detalle td {
	border:1px solid #999;
	padding:4px;
	font-size:10px;
}

</style>

</head>

<body>

<div class="titulo">

	PAGO

</div>

<div class="fila">

	<div class="izquierda">

		<div class="caja">

			<div class="linea">
				Proyecto:
			</div>

			<div class="linea">
				<strong>${pa.nombre_proyecto}</strong>
			</div>

			<div class="linea">
				RNC:
			</div>

			<div class="linea">
				<strong>${pa.rnc || ""}</strong>
			</div>

		</div>

		<br>

		<div class="caja">

			<div class="linea">
				Suplidor:
			</div>

			<div class="linea">
				<strong>${pa.razon_social}</strong>
			</div>

			<div class="linea">
				RNC / Cédula:
			</div>

			<div class="linea">
				<strong>${pa.numero_documento || ""}</strong>
			</div>

		</div>

	</div>

	<div class="derecha">

		<div class="caja">

			<div class="linea" style="text-align:center;font-size:16px;">
				<strong>ID:</strong>
				${pa.id_pago}
			</div>

			<div class="linea">
				<span class="label">Pago:</span>
				${pa.numero_pago}
			</div>

			<div class="linea">
				<span class="label">Fecha:</span>
				${pa.fecha_pago.split('-').reverse().join('/')}
			</div>

			<div class="linea">
				<span class="label">Moneda:</span>
				${pa.codigo_iso}
			</div>

			<div class="linea">
				<span class="label">Estado:</span>
				${pa.estado}
			</div>

			<div class="linea">
				<span class="label">Método:</span>
				${pa.metodo_pago}
			</div>

			<div class="linea">
				<span class="label">Referencia:</span>
				${pa.referencia || ""}
			</div>

			<div class="linea">
				<span class="label">Concepto:</span>
				${pa.concepto || ""}
			</div>

		</div>

	</div>

</div>

<table class="tabla-detalle">

	<thead>

		<tr>

			<th>ID Factura</th>
			<th>Número Factura</th>
			<th>Fecha Factura</th>
			<th>Monto Aplicado</th>

		</tr>

	</thead>

	<tbody>

		${filasDetalle}

	</tbody>

</table>

<div class="fila">

	<div class="izquierda">

		<div class="caja">

			<div
				style="
					font-size:16px;
					font-weight:bold;
					text-align:center;
					margin-bottom:15px;
				"
			>
				RESUMEN FINANCIERO
			</div>

			<div class="linea">
				<span class="label">
					Monto pagado:
				</span>
				${this.formatoAccounting(
					pa.monto_pagado
				)}
			</div>

${
	pa.monto_retencion_itbis > 0
	? `
			<div class="linea">
				<span class="label">
					Retención ITBIS:
				</span>
				${this.formatoAccounting(
					pa.monto_retencion_itbis
				)}
			</div>
	`
	: ""
}

${
	pa.monto_retencion_dgii > 0
	? `
			<div class="linea">
				<span class="label">
					Retención DGII:
				</span>
				${this.formatoAccounting(
					pa.monto_retencion_dgii
				)}
			</div>
	`
	: ""
}

${
	pa.monto_retencion_garantia > 0
	? `
			<div class="linea">
				<span class="label">
					Retención Garantía:
				</span>
				${this.formatoAccounting(
					pa.monto_retencion_garantia
				)}
			</div>
	`
	: ""
}

${
	pa.monto_retencion_tss > 0
	? `
			<div class="linea">
				<span class="label">
					Retención TSS:
				</span>
				${this.formatoAccounting(
					pa.monto_retencion_tss
				)}
			</div>
	`
	: ""
}

			<hr>

			<div class="linea">

				<span class="label">
					Total retenciones:
				</span>

				${this.formatoAccounting(

					Number(pa.monto_retencion_itbis || 0)
					+ Number(pa.monto_retencion_dgii || 0)
					+ Number(pa.monto_retencion_garantia || 0)
					+ Number(pa.monto_retencion_tss || 0)

				)}

			</div>

			<hr>

			<div class="linea">

				<span class="label">
					Total desembolso:
				</span>

				${this.formatoAccounting(
					pa.total_desembolso
				)}

			</div>

		</div>

	</div>

${
	pa.otra_moneda
	? `
	
		<div class="derecha">

		<div class="caja">

			<div
				style="
					font-size:16px;
					font-weight:bold;
					text-align:center;
					margin-bottom:15px;
				"
			>
				DESEMBOLSO
			</div>

			<div class="linea">
				<span class="label">
					Moneda pago:
				</span>
				${pa.moneda_pago}
			</div>

			<div class="linea">
				<span class="label">
					Tasa:
				</span>
				${this.formatoAccounting(
					pa.tasa_pago_otra_moneda
				)}
			</div>

			<hr>

			<div class="linea">
				<span class="label">
					Monto pagado ${pa.moneda_pago}:
				</span>
				${this.formatoAccounting(
					pa.monto_pagado_otra_moneda
				)}
			</div>

			<div class="linea">
				<span class="label">
					Total desembolso ${pa.moneda_pago}:
				</span>
				${this.formatoAccounting(
					pa.desembolso_otra_moneda
				)}
			</div>

		</div>

	</div>

	`
	: ""
}

</div>



</body>

</html>

	`;

	}

}