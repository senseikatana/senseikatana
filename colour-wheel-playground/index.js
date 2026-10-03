    // Referencias DOM
    const wrapper = document.getElementById('dialWrapper');
    const pointer = document.getElementById('pointer');
    const angleDisplay = document.getElementById('angleDisplay');
    const hslRing = document.getElementById('hslRing');
    const oklchRing = document.getElementById('oklchRing');
    
    // Sliders HSL
    const hslHueSlider = document.getElementById('hslHueSlider');
    const hslSatSlider = document.getElementById('hslSatSlider');
    const hslLightSlider = document.getElementById('hslLightSlider');
    
    // Sliders OKLCH
    const oklchHueSlider = document.getElementById('oklchHueSlider');
    const oklchChromaSlider = document.getElementById('oklchChromaSlider');
    const oklchLightSlider = document.getElementById('oklchLightSlider');
    
    // Previews y Codes
    const hslPreview = document.getElementById('hslPreview');
    const hslCode = document.getElementById('hslCode');
    const oklchPreview = document.getElementById('oklchPreview');
    const oklchCode = document.getElementById('oklchCode');

    // Estado de sincronización (evita bucles infinitos entre sliders)
    let isSyncing = false;

    // 1. Función de mapeo matemático HSL -> OKLCH
    function mapHslToOklch(hslDeg) {
        const map = [ [0, 29], [60, 90], [120, 142], [180, 195], [240, 264], [300, 360] ];
        for (let i = 0; i < map.length - 1; i++) {
            if (hslDeg >= map[i][0] && hslDeg <= map[i+1][0]) {
                const pct = (hslDeg - map[i][0]) / (map[i+1][0] - map[i][0]);
                return Math.round(map[i][1] + pct * (map[i+1][1] - map[i][1]));
            }
        }
        if (hslDeg >= 300) {
            const pct = (hslDeg - 300) / 60;
            return Math.round(360 + pct * 29) % 360; 
        }
        return 29;
    }

    // 2. Función inversa aproximada OKLCH -> HSL (para el slider de OKLCH)
    function mapOklchToHsl(oklchDeg) {
        const map = [ [29, 0], [90, 60], [142, 120], [195, 180], [264, 240], [360, 300] ];
        for (let i = 0; i < map.length - 1; i++) {
            if (oklchDeg >= map[i][0] && oklchDeg <= map[i+1][0]) {
                const pct = (oklchDeg - map[i][0]) / (map[i+1][0] - map[i][0]);
                return Math.round(map[i][1] + pct * (map[i+1][1] - map[i][1]));
            }
        }
        if (oklchDeg < 29) {
            const pct = oklchDeg / 29;
            return Math.round(300 + pct * 60) % 360; 
        }
        return 0;
    }

    // 3. Actualizar Anillos del Dial (Visual)
    function updateDialRings() {
        const s = hslSatSlider.value;
        const l = hslLightSlider.value;
        const c = oklchChromaSlider.value;
        const ol = oklchLightSlider.value;
        
        hslRing.style.background = `conic-gradient(
            from 0deg,
            hsl(0, ${s}%, ${l}%) 0deg 60deg,
            hsl(60, ${s}%, ${l}%) 60deg 120deg,
            hsl(120, ${s}%, ${l}%) 120deg 180deg,
            hsl(180, ${s}%, ${l}%) 180deg 240deg,
            hsl(240, ${s}%, ${l}%) 240deg 300deg,
            hsl(300, ${s}%, ${l}%) 300deg 360deg
        )`;
        
        oklchRing.style.background = `conic-gradient(
            from 0deg,
            oklch(${ol}% ${c}% 29) 0deg 29deg,
            oklch(${ol}% ${c}% 90) 29deg 90deg,
            oklch(${ol}% ${c}% 142) 90deg 142deg,
            oklch(${ol}% ${c}% 195) 142deg 195deg,
            oklch(${ol}% ${c}% 264) 195deg 264deg,
            oklch(${ol}% ${c}% 360) 264deg 360deg
        )`;
    }

    // 4. Actualizar UI Principal
    function updateUI(source) {
        // Sincronizar sliders de Tono si el cambio viene de uno de ellos
        if (!isSyncing) {
            isSyncing = true;
            if (source === 'hslHue') {
                const oklchH = mapHslToOklch(parseInt(hslHueSlider.value));
                oklchHueSlider.value = oklchH;
                document.getElementById('oklchHueVal').innerText = `${oklchH}°`;
            } else if (source === 'oklchHue') {
                const hslH = mapOklchToHsl(parseInt(oklchHueSlider.value));
                hslHueSlider.value = hslH;
                document.getElementById('hslHueVal').innerText = `${hslH}°`;
            }
            isSyncing = false;
        }

        // Actualizar puntero y centro del dial
        const hslH = parseInt(hslHueSlider.value);
        pointer.style.transform = `translateX(-50%) rotate(${hslH}deg)`;
        angleDisplay.innerText = `${hslH}°`;

        // Actualizar textos de los sliders
        document.getElementById('hslHueVal').innerText = `${hslH}°`;
        document.getElementById('hslSatVal').innerText = `${hslSatSlider.value}%`;
        document.getElementById('hslLightVal').innerText = `${hslLightSlider.value}%`;
        document.getElementById('oklchHueVal').innerText = `${oklchHueSlider.value}°`;
        document.getElementById('oklchChromaVal').innerText = `${oklchChromaSlider.value}%`;
        document.getElementById('oklchLightVal').innerText = `${oklchLightSlider.value}%`;

        // Actualizar Anillos
        updateDialRings();

        // Actualizar Cajas Físicas y Código
        const hslColor = `hsl(${hslH}, ${hslSatSlider.value}%, ${hslLightSlider.value}%)`;
        const oklchColor = `oklch(${oklchLightSlider.value}% ${oklchChromaSlider.value}% ${oklchHueSlider.value})`;
        
        hslPreview.style.backgroundColor = hslColor;
        hslCode.innerText = hslColor;
        
        oklchPreview.style.backgroundColor = oklchColor;
        oklchCode.innerText = oklchColor;

        // Actualizar fondos de los sliders de Tono (gradientes)
        hslHueSlider.style.background = `linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))`;
        
        // Para el gradiente del slider OKLCH usamos los colores base del anillo
        oklchHueSlider.style.background = `linear-gradient(to right, 
            oklch(50% 50% 0), oklch(50% 50% 29), 
            oklch(50% 50% 90), oklch(50% 50% 142), 
            oklch(50% 50% 195), oklch(50% 50% 264), 
            oklch(50% 50% 360), oklch(50% 50% 360))`;
    }

    // 5. Lógica de arrastre del Dial
    function handleDrag(e) {
        e.preventDefault(); 
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        
        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
        
        hslHueSlider.value = Math.round(angle);
        updateUI('hslHue');
    }

    // Listeners Dial
    let isDragging = false;
    wrapper.addEventListener('mousedown', (e) => { isDragging = true; handleDrag(e); });
    document.addEventListener('mousemove', (e) => { if (isDragging) handleDrag(e); });
    document.addEventListener('mouseup', () => isDragging = false);
    wrapper.addEventListener('touchstart', (e) => { isDragging = true; handleDrag(e); }, { passive: false });
    document.addEventListener('touchmove', (e) => { if (isDragging) handleDrag(e); }, { passive: false });
    document.addEventListener('touchend', () => isDragging = false);

    // Listeners Sliders HSL
    hslHueSlider.addEventListener('input', () => updateUI('hslHue'));
    hslSatSlider.addEventListener('input', () => updateUI('hslSat'));
    hslLightSlider.addEventListener('input', () => updateUI('hslLight'));

    // Listeners Sliders OKLCH
    oklchHueSlider.addEventListener('input', () => updateUI('oklchHue'));
    oklchChromaSlider.addEventListener('input', () => updateUI('oklchChroma'));
    oklchLightSlider.addEventListener('input', () => updateUI('oklchLight'));

    // Inicializar
    updateUI('init');