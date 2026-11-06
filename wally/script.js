$(document).ready(function() {
    let datosDeportes = {
        wally: { jugadores: [], max: 16 },
        futsal: { jugadores: [], max: 16 },
        voley: { jugadores: [], max: 16 }
    };

    // Menú Hamburguesa
    $('#mobile-menu').click(function() {
        $('.nav-list').toggleClass('active');
    });

    // Cambio de Secciones
    $('.nav-link').click(function(e) {
        e.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');

        let seccionID = $(this).data('section');
        $('.content-section').hide();
        $('#' + seccionID).fadeIn();

        if ($(window).width() <= 768) {
            $('.nav-list').removeClass('active');
        }
    });

    // Modo Oscuro / Claro
    $('#theme-toggle').click(function() {
        if ($('body').attr('data-theme') === 'light') {
            $('body').removeAttr('data-theme');
            $(this).text('🌙 Modo Oscuro');
        } else {
            $('body').attr('data-theme', 'light');
            $(this).text('☀️ Modo Claro');
        }
    });

    // Selección de Cancha en Wally (A, B, C)
    $('.cancha-card').click(function() {
        $('.cancha-card').removeClass('selected');
        $(this).addClass('selected');

        let nombreCancha = $(this).data('cancha');
        let precioCancha = $(this).data('precio');

        $('#lbl-cancha-wally').text(nombreCancha);
        $('#input-precio-wally').val(precioCancha);
        actualizarCalculos('wally');
    });

    // Actualizar cálculos al cambiar precio manual
    $('#input-precio-wally').on('input', function() { actualizarCalculos('wally'); });
    $('#input-precio-futsal').on('input', function() { actualizarCalculos('futsal'); });
    $('#input-precio-voley').on('input', function() { actualizarCalculos('voley'); });

    function actualizarCalculos(sport) {
        let precio = parseFloat($('#input-precio-' + sport).val()) || 0;
        let total = datosDeportes[sport].jugadores.length;

        $('#total-jugadores-' + sport).text(total);

        if (total > 0 && precio > 0) {
            let cuota = (precio / total).toFixed(2);
            $('#cuota-persona-' + sport).text(cuota);
            $('#monto-qr-' + sport).text(cuota);
        } else {
            $('#cuota-persona-' + sport).text('0.00');
            $('#monto-qr-' + sport).text('0.00');
        }
    }

    // Agregar Jugadores
    function agregarJugador(sport) {
        let nombre = $('#nombre-jugador-' + sport).val().trim();

        if (nombre === "") {
            alert("⚠️ Por favor, ingresa el nombre del integrante.");
            return;
        }

        if (datosDeportes[sport].jugadores.length >= datosDeportes[sport].max) {
            alert("⚠️ La lista ya alcanzó el límite máximo de 16 personas.");
            return;
        }

        let jugadorObj = { nombre: nombre, confirmado: false, pagado: false };
        datosDeportes[sport].jugadores.push(jugadorObj);

        renderizarLista(sport);
        $('#nombre-jugador-' + sport).val('');
        actualizarCalculos(sport);
    }

    function renderizarLista(sport) {
        let $lista = $('#lista-jugadores-' + sport);
        $lista.empty();

        datosDeportes[sport].jugadores.forEach((jugador, index) => {
            let claseConfirmado = jugador.confirmado ? 'confirmado' : '';
            let textoConfirmado = jugador.confirmado ? '✔ Confirmado' : '⏳ Pendiente';

            let clasePagado = jugador.pagado ? 'pagado' : '';
            let textoPagado = jugador.pagado ? '🟢 Pagado' : '🔴 Debe';

            let itemHTML = `
                <li>
                    <div class="player-info">
                        <span>${jugador.nombre}</span>
                    </div>
                    <div class="player-actions">
                        <button class="btn-check-asistencia ${claseConfirmado}" data-sport="${sport}" data-index="${index}">${textoConfirmado}</button>
                        <button class="btn-check-pago ${clasePagado}" data-sport="${sport}" data-index="${index}">${textoPagado}</button>
                        <span class="remove-btn" data-sport="${sport}" data-index="${index}" title="Eliminar">✕</span>
                    </div>
                </li>
            `;
            $lista.append(itemHTML);
        });
    }

    // Botones de Anotarse
    $('#btn-anotar-wally').click(function() { agregarJugador('wally'); });
    $('#btn-anotar-futsal').click(function() { agregarJugador('futsal'); });
    $('#btn-anotar-voley').click(function() { agregarJugador('voley'); });

    $('#nombre-jugador-wally').keypress(function(e) { if(e.which == 13) agregarJugador('wally'); });
    $('#nombre-jugador-futsal').keypress(function(e) { if(e.which == 13) agregarJugador('futsal'); });
    $('#nombre-jugador-voley').keypress(function(e) { if(e.which == 13) agregarJugador('voley'); });

    // Cambiar Estado de Asistencia
    $(document).on('click', '.btn-check-asistencia', function() {
        let sport = $(this).data('sport');
        let index = $(this).data('index');
        datosDeportes[sport].jugadores[index].confirmado = !datosDeportes[sport].jugadores[index].confirmado;
        renderizarLista(sport);
    });

    // Cambiar Estado de Pago
    $(document).on('click', '.btn-check-pago', function() {
        let sport = $(this).data('sport');
        let index = $(this).data('index');
        datosDeportes[sport].jugadores[index].pagado = !datosDeportes[sport].jugadores[index].pagado;
        renderizarLista(sport);
    });

    // Eliminar Jugador
    $(document).on('click', '.remove-btn', function() {
        let sport = $(this).data('sport');
        let index = $(this).data('index');
        
        datosDeportes[sport].jugadores.splice(index, 1);
        renderizarLista(sport);
        actualizarCalculos(sport);
    });

    // Métodos de Pago y QR
    $('.pay-btn').click(function() {
        let sport = $(this).data('sport');
        let metodo = $(this).data('method');

        if (metodo === 'qr') {
            if (datosDeportes[sport].jugadores.length === 0) {
                alert("⚠️ Debe haber al menos un jugador anotado para generar el cobro QR.");
                return;
            }
            $('#qr-container-' + sport).slideToggle();
        } else {
            alert("💵 Ha seleccionado pago en efectivo en cancha para " + sport.toUpperCase() + ".");
            $('#qr-container-' + sport).slideUp();
        }
    });

    $('.confirm-btn').click(function() {
        let sport = $(this).data('sport');
        alert("✔ ¡Pago verificado con éxito! Recuerde marcarlo como 'Pagado' en la lista de jugadores.");
        $('#qr-container-' + sport).slideUp();
    });

    // LÓGICA DE FINALIZAR Y REGISTRAR RESERVA
    $('.btn-finalizar-reserva').click(function() {
        let sport = $(this).attr('id').replace('btn-finalizar-', '');
        let fecha = $('#fecha-' + sport).val();
        let hora = $('#hora-' + sport).val();
        let jugadores = datosDeportes[sport].jugadores;

        // 1. Validar fecha y hora
        if (!fecha || !hora) {
            alert("❌ Por favor, seleccione la Fecha y la Hora para la reserva de " + sport.toUpperCase() + ".");
            return;
        }

        // 2. Validar que existan jugadores
        if (jugadores.length === 0) {
            alert("❌ No hay jugadores anotados en la lista para registrar la reserva.");
            return;
        }

        // 3. Validar que TODOS hayan pagado
        let todosPagados = jugadores.every(j => j.pagado);
        if (!todosPagados) {
            alert("⚠️ No se puede finalizar la reserva. Hay jugadores que todavía figuran como 'Debe' (no han pagado su cuota).");
            return;
        }

        // 4. Obtener detalles extra si es Wally
        let detalleCancha = "";
        if (sport === 'wally') {
            let canchaNombre = $('#lbl-cancha-wally').text();
            detalleCancha = ` (${canchaNombre})`;
        }

        let precioTotal = $('#input-precio-' + sport).val();

        // 5. Éxito y Registro de Reserva
        alert(`🏆 ¡RESERVA REGISTRADA CON ÉXITO!\n\nDeporte: ${sport.toUpperCase()}${detalleCancha}\nFecha: ${fecha}\nHora: ${hora}\nTotal Integrantes: ${jugadores.length}\nMonto Recaudado: ${precioTotal} Bs\nEstado: PAGADO Y CONFIRMADO ✅`);
    });
});