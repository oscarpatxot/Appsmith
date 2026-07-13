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

    generarHTMLNC() {

        const nc = appsmith.store.ncImpresion;

       const fc =
    appsmith.store.fcAfectadaNCImpresion?.[0]
    || {};

        return `

<html>

<head>

<title>
${nc.numero_nota_credito}
</title>

<style>
* {
    box-sizing:border-box;
}
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
    box-sizing:border-box;
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

.tabla-factura {
    width:100%;
    border-collapse:collapse;
    margin-top:20px;
}

.tabla-factura th {
    border:1px solid #999;
    padding:5px;
    background:#f0f0f0;
    font-size:11px;
}

.tabla-factura td {
    border:1px solid #999;
    padding:4px;
    font-size:10px;
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

    NOTA DE CREDITO

</div>

<div class="fila">

<div class="izquierda">

<div class="caja">

    <div class="linea">
        Proyecto:
    </div>

    <div class="linea">
        <strong>${nc.nombre_proyecto}</strong>
    </div>

    <div class="linea">
        ${nc.rnc || ""}
    </div>

</div>

<br>

<div class="caja">

    <div class="linea">
        Suplidor:
    </div>

    <div class="linea">
        <strong>${nc.razon_social}</strong>
    </div>

    <div class="linea">
        RNC:
    </div>

    <div class="linea">
        <strong>${nc.numero_documento || ""}</strong>
    </div>

</div>

</div>

<div class="derecha">

    <div class="caja">

        <div class="linea" style="text-align:center;font-size:16px;">
            <span class="label">ID:</span>
            ${nc.id_nota_credito}
        </div>

        <div class="linea">
            <span class="label">Fecha:</span>
            ${nc.fecha_nota.split('-').reverse().join('/')}
        </div>

        <div class="linea">
            <span class="label">NC #:</span>
            ${nc.numero_nota_credito}
        </div>

        <div class="linea">
            <span class="label">Moneda:</span>
            ${nc.codigo_iso}
        </div>

    </div>

    <br>

    <div class="caja">

        <div class="linea">
            <span class="label">NCF:</span>
            ${nc.ncf || ""}
        </div>

        <div class="linea">
            <span class="label">Código de Seguridad:</span>
            ${nc.codigo_seguridad || ""}
        </div>

        <div class="linea">
            <span class="label">Concepto:</span>
            ${nc.concepto || ""}
        </div>

    </div>

    <br>

    <div class="totales">

        <table>

            <tr>
                <td style="text-align:right;font-weight:bold;">
                    Subtotal gravado:
                </td>

                <td>
                    ${this.formatoAccounting(
                        nc.subtotal_gravado
                    )}
                </td>
            </tr>

            <tr>
                <td style="text-align:right;font-weight:bold;">
                    ITBIS:
                </td>

                <td>
                    ${this.formatoAccounting(
                        nc.monto_itbis
                    )}
                </td>
            </tr>

            <tr>
                <td style="text-align:right;font-weight:bold;">
                    No gravado:
                </td>

                <td>
                    ${this.formatoAccounting(
                        nc.subtotal_exento
                    )}
                </td>
            </tr>

            <tr>
                <td style="text-align:right;font-weight:bold;">
                    Total:
                </td>

                <td>
                    ${this.formatoAccounting(
                        nc.monto_total
                    )}
                </td>
            </tr>

            <tr>
                <td style="text-align:right;font-weight:bold;">
                    Moneda:
                </td>

                <td>
                    ${nc.codigo_iso}
                </td>
            </tr>

        </table>

    </div>

</div>

</div>

<h2>

    Factura Afectada

</h2>

<table class="tabla-factura">

    <thead>

        <tr>

            <th>ID Fact. Afectada</th>
            <th># Factura</th>
            <th>Fecha</th>
            <th>NCF</th>
            <th>Monto Total</th>
            <th>Moneda</th>

        </tr>

    </thead>

    <tbody>

        <tr>

            <td>
                ${fc.id_factura_compra}
            </td>

            <td>
                ${fc.numero_factura}
            </td>

            <td>
                ${
    fc.fecha_factura
        ? fc.fecha_factura.split('-').reverse().join('/')
        : ""
}
            </td>

            <td>
                ${fc.ncf || ""}
            </td>

            <td style="text-align:right;">

                ${this.formatoAccounting(
                    fc.monto_total
                )}

            </td>

            <td>
                ${fc.codigo_iso}
            </td>

        </tr>

    </tbody>

</table>

</body>

</html>

`;

    }

}