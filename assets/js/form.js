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