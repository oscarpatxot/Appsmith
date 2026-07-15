export default {

    async limpiarFormulario() {

        resetWidget("selProyectoOS", true);

        resetWidget("selSuplidoresOS", true);

        resetWidget("selMonedaOS", true);

        resetWidget("inpMontoOS", true);

        resetWidget("dpFechaOS", true);

        resetWidget("inpReferenciaOS", true);

        resetWidget("inpSolicitudOS", true);

        resetWidget("inpComentarioOS", true);

    },

    async guardar() {

        try {

            const respuesta =
                await qryOSCrear.run();

            await storeValue(
                "ultimaOS",
                respuesta[0].id_otras_solicitudes
            );

            await storeValue(
                "ultimoNumeroOS",
                respuesta[0].numero_otras_solicitudes
            );

            showAlert(
                respuesta[0].mensaje,
                "success"
            );

            await this.limpiarFormulario();

            await qryOSConsultar.run();

        }
        catch (e) {

            showAlert(
                e.message,
                "error"
            );

        }

    },
	
async actualizarSeguimiento() {

    try {

        const completada =
            Number(selCompletadoOS.selectedOptionValue);

        //--------------------------------------------------
        // VALIDAR FECHA ENVIADO
        //--------------------------------------------------

        if (
            completada === 1 &&
            !dpFechaEnviadoOS.selectedDate
        ) {

            showAlert(
                "Debe indicar la fecha de envío antes de completar la solicitud.",
                "warning"
            );

            return;

        }

        //--------------------------------------------------
        // VALIDAR FECHA COMPLETADA
        //--------------------------------------------------

        if (
            completada === 1 &&
            !dpFechaCompletadoOS.selectedDate
        ) {

            showAlert(
                "Debe indicar la fecha de completado.",
                "warning"
            );

            return;

        }

        //--------------------------------------------------
        // ACTUALIZAR
        //--------------------------------------------------

        const respuesta =
            await qryOSSeguimientoActualizar.run();

        showAlert(
            respuesta[0].mensaje,
            "success"
        );

        //--------------------------------------------------
        // REFRESCAR TABLA
        //--------------------------------------------------

        await qryOSConsultar.run();

    }
    catch (e) {

        showAlert(
            e.message,
            "error"
        );

    }

},
	
	async anular() {

    try {

        if (!tblSeguimientoOS.selectedRow.id_otras_solicitudes) {

            showAlert(
                "Seleccione una solicitud.",
                "warning"
            );

            return;

        }

        if (!inpMotivoAnulacionOS.text.trim()) {

            showAlert(
                "Debe indicar el motivo de la anulación.",
                "warning"
            );

            return;

        }

        const respuesta =
            await qryOSAnular.run();

        showAlert(
            respuesta[0].mensaje,
            "success"
        );

        closeModal("mdlAnularOS");

        resetWidget(
            "inpMotivoAnulacionOS",
            true
        );

        await qryOSConsultar.run();

        await storeValue(
            "osSeguimiento",
            null
        );

    }
    catch (e) {

        showAlert(
            e.message,
            "error"
        );

    }

}

}