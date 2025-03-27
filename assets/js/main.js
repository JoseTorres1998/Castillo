/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},

		};

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 350,
			noOpenerFade: true,
			alignment: 'center'
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Nav.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Carousels.
		$('.carousel').each(function() {

			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

			// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {

							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								xf.removeClass('loading');

							}, settings.carousels.fadeDelay);

						}
					});

				}

			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;

							if (pos >= leftLimit) {

								window.clearInterval(timerId);
								pos = leftLimit;

							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Init.
				$window.on('load', function() {

					reelWidth = $reel[0].scrollWidth;

					if (browser.mobile) {

						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();

					}
					else {

						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();

					}

					$t._update();

					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});

		});

})(jQuery);
 // comparación antes y ahora
 const container = document.querySelector(".comparison-container");
 const after = document.querySelector(".after");
 const sliderLine = document.querySelector(".slider-line");

 let isDragging = false;

 container.addEventListener("mousedown", (e) => {
	 isDragging = true;
	 moveSlider(e);
 });

 window.addEventListener("mousemove", (e) => {
	 if (!isDragging) return;
	 moveSlider(e);
 });

 window.addEventListener("mouseup", () => {
	 isDragging = false;
 });

 function moveSlider(e) {
	 let rect = container.getBoundingClientRect();
	 let offsetX = e.clientX - rect.left;
	 let percentage = (offsetX / rect.width) * 100;

	 if (percentage < 0) percentage = 0;
	 if (percentage > 100) percentage = 100;

	 after.style.width = `${percentage}%`;
	 sliderLine.style.left = `${percentage}%`;
 }

// Audio-Guía
document.addEventListener("DOMContentLoaded", function () {
    const audios = document.querySelectorAll(".audio-player");
    const audioSection = document.querySelector(".backgroundaudios");
    const openBtn = document.createElement("button");
    const closeBtn = document.createElement("button");

    // Configurar botones
    openBtn.textContent = "Abrir Audioguía";
    closeBtn.textContent = "Ocultar Audioguía";

    // Añadir clases para los estilos
    openBtn.classList.add("audio-toggle-btn");
    closeBtn.classList.add("audio-toggle-btn");

    // Insertar botones antes de la audioguía
    audioSection.parentNode.insertBefore(openBtn, audioSection);
    audioSection.parentNode.insertBefore(closeBtn, audioSection);

    // Inicialmente ocultar el botón de cerrar
    closeBtn.style.display = "none";

    // Función para mostrar la audioguía
    openBtn.addEventListener("click", function () {
        audioSection.style.display = "block";
        openBtn.style.display = "none";
        closeBtn.style.display = "block";
    });

    // Función para ocultar la audioguía
    closeBtn.addEventListener("click", function () {
        audioSection.style.display = "none";
        closeBtn.style.display = "none";
        openBtn.style.display = "block";
    });

    // Asegurar que solo un audio se reproduzca a la vez
    audios.forEach(audio => {
        audio.addEventListener("play", function () {
            audios.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                }
            });
        });
    });

    // Ocultar la sección de audioguía al cargar la página
    audioSection.style.display = "none";
});

// Video
document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const muteBtn = document.getElementById("muteBtn");
    const progressBar = document.getElementById("progressBar");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");

    // Esperar a que el video esté listo para obtener su duración
    video.addEventListener("canplay", function () {
        progressBar.max = video.duration;
        durationDisplay.textContent = formatTime(video.duration);
    });

    // Play / Pause
    playPauseBtn.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Mute / Unmute
    muteBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    // Actualizar barra de progreso y tiempo actual mientras el video avanza
    video.addEventListener("timeupdate", function () {
        progressBar.value = video.currentTime;
        currentTimeDisplay.textContent = formatTime(video.currentTime);
    });

    // Permitir adelantar / retroceder el video con la barra
    progressBar.addEventListener("change", function () {
        video.currentTime = progressBar.value;
    });

    // Reproducir automáticamente al finalizar
    video.addEventListener("ended", function () {
        video.play();
    });

    // Función para formatear el tiempo en minutos y segundos
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
});

 // Comprobamos si el usuario ya ha aceptado las cookies
                if (localStorage.getItem('cookies-accepted') !== 'true') {
                    // Mostrar el banner
                    document.getElementById('cookie-banner').style.display = 'block';

                    // Establecer un temporizador para ocultar el banner después de 8 segundos
                    setTimeout(function() {
                        // Verificar si no se ha aceptado todavía las cookies
                        if (localStorage.getItem('cookies-accepted') !== 'true') {
                            document.getElementById('cookie-banner').style.display = 'none';
                        }
                    }, 8000); // El banner desaparecerá después de 8 segundos
                }

                // Event listener para el botón de "Aceptar"
                document.getElementById('accept-cookies').addEventListener('click', function() {
                    // Almacenamos que el usuario ha aceptado las cookies
                    localStorage.setItem('cookies-accepted', 'true');
                    // Ocultamos el banner inmediatamente
                    document.getElementById('cookie-banner').style.display = 'none';
                });

// Comprobamos si el usuario ya ha aceptado o rechazado las cookies
if (localStorage.getItem('cookies-accepted') !== 'true' && localStorage.getItem('cookies-rejected') !== 'true') {
    // Mostrar el banner
    document.getElementById('cookie-banner').style.display = 'block';

    // Establecer un temporizador para ocultar el banner después de 8 segundos
    setTimeout(function() {
        // Verificar si no se ha aceptado ni rechazado todavía las cookies
        if (localStorage.getItem('cookies-accepted') !== 'true' && localStorage.getItem('cookies-rejected') !== 'true') {
            document.getElementById('cookie-banner').style.display = 'none';
        }
    }, 8000); // El banner desaparecerá después de 8 segundos
}

// Event listener para el botón de "Aceptar"
document.getElementById('accept-cookies').addEventListener('click', function() {
    // Almacenamos que el usuario ha aceptado las cookies
    localStorage.setItem('cookies-accepted', 'true');
    // Ocultamos el banner inmediatamente
    document.getElementById('cookie-banner').style.display = 'none';
    console.log('El usuario ha aceptado las cookies.');
});

// Event listener para el botón de "Rechazar"
document.getElementById('reject-cookies').addEventListener('click', function() {
    // Almacenamos que el usuario ha rechazado las cookies
    localStorage.setItem('cookies-rejected', 'true');
    // Ocultamos el banner inmediatamente
    document.getElementById('cookie-banner').style.display = 'none';
    console.log('El usuario ha rechazado las cookies.');
});

//Arreglos formulario

    const fechaDisplay = document.getElementById('fechaDisplay');
    const calendarioContainer = document.getElementById('calendarioContainer');
    const calendarioFechas = document.getElementById('calendarioFechas');
    const mesAnio = document.getElementById('mesAnio');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const horaSelect = document.getElementById('horaSelect');
    const confirmarFecha = document.getElementById('confirmarFecha');
    const form = document.getElementById('visitaForm');
    const fechaError = document.getElementById('fechaError');

    let currentDate = new Date();
    let selectedDate = null;

    // Mostrar el calendario al hacer clic en el input
    fechaDisplay.addEventListener('click', () => {
        calendarioContainer.style.display = 'block';
        mostrarCalendario(currentDate);
    });

    // Cambiar mes anterior
    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        mostrarCalendario(currentDate);
    });

    // Cambiar mes siguiente
    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        mostrarCalendario(currentDate);
    });

    // Confirmar selección de fecha y hora
    confirmarFecha.addEventListener('click', () => {
        if (selectedDate) {
            const hora = horaSelect.value;
            const fechaStr = selectedDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            fechaDisplay.value = `${fechaStr}, ${hora}`;
            calendarioContainer.style.display = 'none';
        }
    });

    // Mostrar el calendario
    function mostrarCalendario(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Ajustar el primer día (0 = Domingo, queremos Lunes = 0)
        const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;

        // Mostrar mes y año
        mesAnio.textContent = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

        // Generar los días
        let html = '';
        for (let i = 0; i < firstDayAdjusted; i++) {
            html += '<div></div>'; // Espacios vacíos
        }

        for (let day = 1; day <= lastDate; day++) {
            const tempDate = new Date(year, month, day);
            const dayOfWeek = tempDate.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Domingo o Sábado
            const isToday = tempDate.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && tempDate.toDateString() === selectedDate.toDateString();

            if (isWeekend) {
                html += `<div class="dia ${isToday ? 'hoy' : ''} ${isSelected ? 'seleccionado' : ''}" data-day="${day}">${day}</div>`;
            } else {
                html += `<div class="dia deshabilitado">${day}</div>`;
            }
        }

        calendarioFechas.innerHTML = html;

        // Agregar eventos a los días seleccionables
        document.querySelectorAll('.dia:not(.deshabilitado)').forEach(dia => {
            dia.addEventListener('click', () => {
                selectedDate = new Date(year, month, parseInt(dia.dataset.day));
                mostrarCalendario(currentDate); // Refrescar para mostrar selección
            });
        });
    }

    // Validar al enviar el formulario
    form.addEventListener('submit', (event) => {
        if (!fechaDisplay.value) {
            event.preventDefault();
            fechaError.textContent = 'Por favor, selecciona una fecha y hora.';
        } else {
            fechaError.textContent = '';
            console.log('Formulario enviado:', fechaDisplay.value);
        }
    });
