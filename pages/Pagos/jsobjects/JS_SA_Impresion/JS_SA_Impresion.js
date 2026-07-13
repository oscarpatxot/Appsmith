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

    formatoFecha(fecha) {

        if (!fecha)
            return "";

        return fecha.split("-").reverse().join("/");

    },

    generarHTMLSA() {

        const sa = appsmith.store.saImpresion;

        return `

<html>

<head>

<title>

${sa.numero_solicitud_avance}

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

    width:${sa.otra_moneda ? "55%" : "100%"};

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

    SOLICITUD DE AVANCE

</div>

<div class="fila">

    <div class="izquierda">

        <div class="caja">

            <div class="linea">
                Proyecto:
            </div>

            <div class="linea">
                <strong>${sa.nombre_proyecto}</strong>
            </div>

            <div class="linea">
                RNC:
            </div>

            <div class="linea">
                <strong>${sa.rnc || ""}</strong>
            </div>

        </div>

        <br>

        <div class="caja">

            <div class="linea">
                Suplidor:
            </div>

            <div class="linea">
                <strong>${sa.razon_social}</strong>
            </div>

            <div class="linea">
                RNC / Cédula:
            </div>

            <div class="linea">
                <strong>${sa.numero_documento || ""}</strong>
            </div>

        </div>

    </div>

    <div class="derecha">

        <div class="caja">

            <div class="linea" style="text-align:center;font-size:16px;">

                <strong>ID:</strong>

                ${sa.id_solicitud_avance}

            </div>

            <div class="linea">

                <span class="label">Solicitud:</span>

                ${sa.numero_solicitud_avance}

            </div>

            <div class="linea">

                <span class="label">Fecha:</span>

                ${this.formatoFecha(sa.fecha_solicitud)}

            </div>

            <div class="linea">

                <span class="label">Moneda:</span>

                ${sa.codigo_iso}

            </div>

            <div class="linea">

                <span class="label">Estado:</span>

                ${sa.estado}

            </div>

            <div class="linea">

                <span class="label">Orden Compra:</span>

                ${sa.numero_orden}

            </div>

            <div class="linea">

                <span class="label">Cotización:</span>

                ${sa.cotizacion || ""}

            </div>

        </div>

    </div>

</div>

<div class="caja">

    <div
        style="
            font-size:16px;
            font-weight:bold;
            text-align:center;
            margin-bottom:15px;
        "
    >

        OBSERVACIÓN

    </div>

    ${sa.observacion || ""}

</div>

<br>

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

                    Monto solicitado:

                </span>

                ${this.formatoAccounting(sa.monto_solicitado)}

            </div>

            ${
                sa.retencion_itbis > 0
                ? `
                <div class="linea">
                    <span class="label">Retención ITBIS:</span>
                    ${this.formatoAccounting(sa.retencion_itbis)}
                </div>
                `
                : ""
            }

            ${
                sa.retencion_dgii > 0
                ? `
                <div class="linea">
                    <span class="label">Retención DGII:</span>
                    ${this.formatoAccounting(sa.retencion_dgii)}
                </div>
                `
                : ""
            }

            ${
                sa.retencion_garantia > 0
                ? `
                <div class="linea">
                    <span class="label">Retención Garantía:</span>
                    ${this.formatoAccounting(sa.retencion_garantia)}
                </div>
                `
                : ""
            }

            ${
                sa.retencion_tss > 0
                ? `
                <div class="linea">
                    <span class="label">Retención TSS:</span>
                    ${this.formatoAccounting(sa.retencion_tss)}
                </div>
                `
                : ""
            }

            <hr>

            <div class="linea">

                <span class="label">

                    Total retenciones:

                </span>

                ${this.formatoAccounting(sa.total_retenciones)}

            </div>

            <hr>

            <div class="linea">

                <span class="label">

                    Total desembolso:

                </span>

                ${this.formatoAccounting(sa.total_desembolso)}

            </div>

        </div>

    </div>

    ${
        sa.otra_moneda
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

                    ${sa.moneda_pago}

                </div>

                <div class="linea">

                    <span class="label">

                        Tasa:

                    </span>

                    ${this.formatoAccounting(sa.tasa_pago_otra_moneda)}

                </div>

                <hr>

                <div class="linea">

                    <span class="label">

                        Solicitado ${sa.moneda_pago}:

                    </span>

                    ${this.formatoAccounting(sa.monto_solicitado_otra_moneda)}

                </div>

                <div class="linea">

                    <span class="label">

                        Desembolso ${sa.moneda_pago}:

                    </span>

                    ${this.formatoAccounting(sa.desembolso_otra_moneda)}

                </div>

            </div>

        </div>

        `
        : ""
    }

</div>

<div
    style="
        margin-top:100px;
        text-align:center;
    "
>

    <div
        style="
            width:250px;
            margin:0 auto;
            border-top:1px solid #000;
            padding-top:8px;
            font-weight:bold;
        "
    >

        AUTORIZADO POR

    </div>

</div>

</body>

</html>

        `;

    }

}