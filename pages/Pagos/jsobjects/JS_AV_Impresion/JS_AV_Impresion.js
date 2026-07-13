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

	generarHTMLAV() {

		const av = appsmith.store.avanceImpresion;

		return `

<html>

<head>

<title>

${av.numero_avance}

</title>

<style>

body {
	font-family: Arial, sans-serif;
	font-size: 12px;
	margin:20px;
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
	width:${av.otra_moneda ? "55%" : "100%"};
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

</style>

</head>

<body>

<div class="titulo">

	AVANCE

</div>

<div class="fila">

	<div class="izquierda">

		<div class="caja">

			<div class="linea">
				Proyecto:
			</div>

			<div class="linea">
				<strong>${av.nombre_proyecto}</strong>
			</div>

		</div>

		<br>

		<div class="caja">

			<div class="linea">
				Suplidor:
			</div>

			<div class="linea">
				<strong>${av.razon_social}</strong>
			</div>

		</div>

	</div>

	<div class="derecha">

		<div class="caja">

			<div
				class="linea"
				style="text-align:center;font-size:16px;"
			>

				<strong>ID:</strong>

				${av.id_avance}

			</div>

			<div class="linea">

				<span class="label">

					Avance:

				</span>

				${av.numero_avance}

			</div>

			<div class="linea">

				<span class="label">

					Fecha:

				</span>

				${av.fecha_avance.split('-').reverse().join('/')}

			</div>

			<div class="linea">

				<span class="label">

					Moneda:

				</span>

				${av.codigo_iso}

			</div>

			<div class="linea">

				<span class="label">

					Estado:

				</span>

				${av.estado}

			</div>

			<div class="linea">

				<span class="label">

					Método:

				</span>

				${av.metodo_pago}

			</div>

			<div class="linea">

				<span class="label">

					Referencia:

				</span>

				${av.referencia || ""}

			</div>

			<div class="linea">

				<span class="label">

					Concepto:

				</span>

				${av.concepto || ""}

			</div>

			<div class="linea">

				<span class="label">

					Observación:

				</span>

				${av.observacion || ""}

			</div>

		</div>

	</div>

</div>

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

					Monto avanzado:

				</span>

				${this.formatoAccounting(
					av.monto_avanzado
				)}

			</div>

${
	av.monto_retencion_itbis > 0
	? `
			<div class="linea">

				<span class="label">

					Retención ITBIS:

				</span>

				${this.formatoAccounting(
					av.monto_retencion_itbis
				)}

			</div>
	`
	: ""
}

${
	av.monto_retencion_dgii > 0
	? `
			<div class="linea">

				<span class="label">

					Retención DGII:

				</span>

				${this.formatoAccounting(
					av.monto_retencion_dgii
				)}

			</div>
	`
	: ""
}

${
	av.monto_retencion_garantia > 0
	? `
			<div class="linea">

				<span class="label">

					Retención Garantía:

				</span>

				${this.formatoAccounting(
					av.monto_retencion_garantia
				)}

			</div>
	`
	: ""
}

${
	av.monto_retencion_tss > 0
	? `
			<div class="linea">

				<span class="label">

					Retención TSS:

				</span>

				${this.formatoAccounting(
					av.monto_retencion_tss
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

					Number(av.monto_retencion_itbis || 0)
					+ Number(av.monto_retencion_dgii || 0)
					+ Number(av.monto_retencion_garantia || 0)
					+ Number(av.monto_retencion_tss || 0)

				)}

			</div>

			<hr>

			<div class="linea">

				<span class="label">

					Total desembolso:

				</span>

				${this.formatoAccounting(
					av.total_desembolso
				)}

			</div>

		</div>

	</div>

${
	av.otra_moneda
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

				${av.moneda_pago}

			</div>

			<div class="linea">

				<span class="label">

					Tasa:

				</span>

				${this.formatoAccounting(
					av.tasa_pago_otra_moneda
				)}

			</div>

			<hr>

			<div class="linea">

				<span class="label">

					Monto avanzado ${av.moneda_pago}:

				</span>

				${this.formatoAccounting(
					av.monto_avanzado_otra_moneda
				)}

			</div>

			<div class="linea">

				<span class="label">

					Total desembolso ${av.moneda_pago}:

				</span>

				${this.formatoAccounting(
					av.desembolso_otra_moneda
				)}

			</div>

		</div>

	</div>

	`
	: ""
}

</div>

<br>

<div class="caja">

	<div class="linea">

		Observación:

	</div>

	<div
		style="
			min-height:70px;
			white-space:pre-wrap;
			font-weight:bold;
		"
	>

		${pa.observacion || "***"}

	</div>

</div>

</body>

</html>

		`;

	}

}