// ==========================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ==========================================
const audio = document.getElementById('main-audio');
const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnShuffle = document.getElementById('btn-shuffle');
const btnRepeat = document.getElementById('btn-repeat');
const btnResetFilters = document.getElementById('btn-reset-filters');

// Elementos del Menú de Hamburguesa
const btnMenu = document.getElementById('btn-menu');
const sidebarMenu = document.getElementById('sidebar-menu');
const btnCloseMenu = document.getElementById('btn-close-menu');
const themeButtons = document.querySelectorAll('.theme-option-btn');
const btnResetTheme = document.getElementById('btn-reset-theme');

const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeTrack = document.getElementById('current-time');
const totalDurationTrack = document.getElementById('total-duration');

const currentCover = document.getElementById('current-cover');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');

const trackElements = document.querySelectorAll('.canciones');
const albumCards = document.querySelectorAll('.albunes'); 
const searchInput = document.querySelector('.search-input');
const songElements = document.querySelectorAll('.canciones');
const bgVideo = document.getElementById('bg-video');

// Elementos específicos de Playlists Personalizadas
const btnCrearPlaylist = document.getElementById('btn-crear-playlist');
const modalPlaylist = document.getElementById('modal-playlist');
const btnCancelarPlaylist = document.getElementById('btn-cancelar-playlist');
const btnGuardarPlaylist = document.getElementById('btn-guardar-playlist');
const inputNombrePlaylist = document.getElementById('input-nombre-playlist');
const contenedorPlaylists = document.getElementById('contenedor-playlists');

// Estados del reproductor (Se cargan desde localStorage si existen)
let isPlaying = false;
let isShuffleMode = false;
let repeatState = 0; 
let misPlaylists = JSON.parse(localStorage.getItem('misPlaylists')) || {};

// ==========================================
// MAPA DINÁMICO DE PALETAS (INCLUYE HOVERS Y ACTIVOS)
// ==========================================
const paletasColores = {
    silksong: {
        '--bg-top-bar': '#0b0d11',
        '--bg-player-bar': '#14181f',
        '--border-player': '#842629',
        '--bg-search': '#5a191b',
        '--border-search': '#842629',
        '--hover-search': '#6e2022',
        '--focus-search': '#441113',
        '--text-main': '#f1e9df', 
        '--text-muted': '#a4887b', 
        '--accent-color': '#b5383c',
        '--gold-glow': '#da9e45',
        '--hover-buttons': '#da9e45',  
        '--active-buttons': '#dfb653',
        '--active-shadow': 'rgba(223, 182, 83, 0.6)'
    },
    hollowKnight: {
        '--bg-top-bar': '#091115',
        '--bg-player-bar': '#0d161b', 
        '--border-player': '#325361', 
        '--bg-search': '#1a2b35',
        '--border-search': '#2a4350',
        '--hover-search': '#223743',
        '--focus-search': '#0f1b22',
        '--text-main': '#ffffff', 
        '--text-muted': '#a0c0d0', 
        '--accent-color': '#4fa0c5', 
        '--gold-glow': '#8cc6e0',
        '--hover-buttons': '#8cc6e0',  
        '--active-buttons': '#4fa0c5',
        '--active-shadow': 'rgba(79, 160, 197, 0.6)'
    },
    karmelita: {
        '--bg-top-bar': '#090506',
        '--bg-player-bar': '#110a0c',
        '--border-player': '#5c1319',
        '--bg-search': '#380a0e',
        '--border-search': '#5c1319',
        '--hover-search': '#4a0d12',
        '--focus-search': '#240406',
        '--text-main': '#fbeee6',
        '--text-muted': '#b38d91',
        '--accent-color': '#e51e2b',
        '--gold-glow': '#ff4d5a',
        '--hover-buttons': '#ff4d5a',
        '--active-buttons': '#ff808b',
        '--active-shadow': 'rgba(255, 77, 90, 0.6)'
    },
    granMadreSeda: {
        '--bg-top-bar': '#0c1116',
        '--bg-player-bar': '#121921',
        '--border-player': '#43586d',
        '--bg-search': '#1f2b38',
        '--border-search': '#43586d',
        '--hover-search': '#29394a',
        '--focus-search': '#141c24',
        '--text-main': '#eef5fa',
        '--text-muted': '#8ca3ba',
        '--accent-color': '#7fa8cc',
        '--gold-glow': '#d2e4f0',
        '--hover-buttons': '#a2c4e0',
        '--active-buttons': '#cbe0f0',
        '--active-shadow': 'rgba(203, 224, 240, 0.5)'
    },
    bandaGrimm: {
        '--bg-top-bar': '#050203',
        '--bg-player-bar': '#0b0406',
        '--border-player': '#7a1118',
        '--bg-search': '#3d080c',
        '--border-search': '#7a1118',
        '--hover-search': '#540c11',
        '--focus-search': '#240204',
        '--text-main': '#f6ebeb',
        '--text-muted': '#b88285',
        '--accent-color': '#e61c2b',
        '--gold-glow': '#ff4d4d',
        '--hover-buttons': '#ff3333',
        '--active-buttons': '#ff6666',
        '--active-shadow': 'rgba(230, 28, 43, 0.6)'
    },
    cumbreCristal: {
        '--bg-top-bar': '#160f22',
        '--bg-player-bar': '#1d142b',
        '--border-player': '#df7bf4',
        '--bg-search': '#35214c',
        '--border-search': '#8855a8',
        '--hover-search': '#4d306b',
        '--focus-search': '#231534',
        '--text-main': '#fdf8ff',
        '--text-muted': '#cbb6df',
        '--accent-color': '#df7bf4',
        '--gold-glow': '#7ce3ff',
        '--hover-buttons': '#7ce3ff',
        '--active-buttons': '#a6eeff',
        '--active-shadow': 'rgba(124, 227, 255, 0.6)'
    },
    recuerdo: {
        '--bg-top-bar': '#0a121a',
        '--bg-player-bar': '#0f1b26',
        '--border-player': '#23425e',
        '--bg-search': '#142534',
        '--border-search': '#2a4d6c',
        '--hover-search': '#1c364b',
        '--focus-search': '#0b1622',
        '--text-main': '#e2f1fc',
        '--text-muted': '#7fa2c1',
        '--accent-color': '#3a86c8',
        '--gold-glow': '#52a5ec',
        '--hover-buttons': '#52a5ec',
        '--active-buttons': '#7ec0f9',
        '--active-shadow': 'rgba(58, 134, 200, 0.6)'
    }
};

function aplicarPaleta(paleta) {
    Object.keys(paleta).forEach(propiedad => {
        document.documentElement.style.setProperty(propiedad, paleta[propiedad]);
    });
}

// ==========================================
// INTERACCIONES DEL MENÚ HAMBURGUESA
// ==========================================
btnMenu.addEventListener('click', () => {
    sidebarMenu.classList.add('open');
});

btnCloseMenu.addEventListener('click', () => {
    sidebarMenu.classList.remove('open');
});

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedTheme = btn.getAttribute('data-theme');
        
        if (selectedTheme === 'hollowKnight') {
            bgVideo.src = "mp4/Fondo_Hollow_Knight.mp4";
            bgVideo.load();
            aplicarPaleta(paletasColores.hollowKnight);
        } else if (selectedTheme === 'silksong') {
            bgVideo.src = "mp4/Fondo_Torre_coral.mp4";
            bgVideo.load();
            aplicarPaleta(paletasColores.silksong);
        } else if (selectedTheme === 'karmelita') {
            bgVideo.src = "mp4/Fondo_Karmelita.mp4";
            bgVideo.load();
            aplicarPaleta(paletasColores.karmelita);
        } else if (selectedTheme === 'granMadreSeda') {
            bgVideo.src = "mp4/Fondo_Gran_madre_seda.mp4";
            bgVideo.load();
            aplicarPaleta(paletasColores.granMadreSeda);
        } else if (selectedTheme === 'bandaGrimm') {
            bgVideo.src = "mp4/Fondo_Compañia_de_Grim.mp4"; 
            bgVideo.load();
            aplicarPaleta(paletasColores.bandaGrimm);
        } else if (selectedTheme === 'cumbreCristal') {
            bgVideo.src = "mp4/Fondo_Cumbre_de_Cristal.mp4";
            bgVideo.load();
            aplicarPaleta(paletasColores.cumbreCristal);
        } else if (selectedTheme === 'recuerdo') {
            bgVideo.src = "mp4/Fondo_Recuerdo_del_Hollow_Knight.mp4";
            bgVideo.load();
            aplicarPaleta(paletasColores.recuerdo);
        }

        // PERSISTENCIA DEL TEMA Y VIDEO seleccionado
        localStorage.setItem('temaGuardado', selectedTheme);
        localStorage.setItem('videoGuardado', bgVideo.src);

        sidebarMenu.classList.remove('open');
    });
});

btnResetTheme.addEventListener('click', () => {
    bgVideo.src = "mp4/Fondo_Predeterminado.mp4";
    bgVideo.load();
    aplicarPaleta(paletasColores.silksong);

    // PERSISTENCIA AL RESETEAR
    localStorage.setItem('temaGuardado', 'default');
    localStorage.setItem('videoGuardado', bgVideo.src);

    sidebarMenu.classList.remove('open');
});

// ==========================================
// FUNCIONES DE CONTROL DE PISTAS Y FILTROS
// ==========================================
function getVisibleTracks() {
    return Array.from(trackElements).filter(track => {
        const isTrackHidden = window.getComputedStyle(track).display === 'none';
        const parentContainer = track.closest('div[class*="albun_"]:not(.albunes)');
        const isParentHidden = parentContainer ? window.getComputedStyle(parentContainer).display === 'none' : false;
        
        return !isTrackHidden && !isParentHidden;
    });
}

function loadSong(albumElement) {
    const audioSrc = albumElement.getAttribute('data-audio');
    const title = albumElement.querySelector('h4').innerText;
    const artist = albumElement.querySelector('p').innerText;
    const coverSrc = albumElement.querySelector('.Portada_lista').src;

    audio.src = audioSrc;
    currentTitle.innerText = title;
    currentArtist.innerText = artist;
    currentCover.src = coverSrc;

    playSong();
}

function changeTrack(direction, force = false) {
    const visibleTracks = getVisibleTracks();
    if (visibleTracks.length === 0) return; 

    if (direction === -1 && !force && audio.currentTime > 3) {
        audio.currentTime = 0;
        if (!isPlaying) playSong();
        return;
    }

    let currentTrackIndex = visibleTracks.findIndex(track => {
        return track.getAttribute('data-audio') === audio.getAttribute('src');
    });

    if (direction === 1 && isShuffleMode && visibleTracks.length > 1) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * visibleTracks.length);
        } while (randomIndex === currentTrackIndex);
        currentTrackIndex = randomIndex;
    } else {
        if (currentTrackIndex === -1) {
            currentTrackIndex = 0;
        } else {
            currentTrackIndex = (currentTrackIndex + direction + visibleTracks.length) % visibleTracks.length;
        }
    }

    loadSong(visibleTracks[currentTrackIndex]);
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Loop/Bucle modificado con estado transitorio simple antes del infinito
function playSong() {
    isPlaying = true;
    btnPlay.innerText = 'pause_circle';
    
    if (repeatState === 1) {
        repeatState = 0;
        btnRepeat.classList.remove('active', 'repeat-once');
        btnRepeat.innerText = 'repeat';
    }
    audio.play().catch(() => {});
}

function pauseSong() {
    isPlaying = false;
    btnPlay.innerText = 'play_circle';
    audio.pause();
}

// ==========================================
// BARRA DE PROGRESO Y CONFIGURACIONES
// ==========================================
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (!duration) return;
    
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;

    let currentMins = Math.floor(currentTime / 60);
    let currentSecs = Math.floor(currentTime % 60);
    if (currentSecs < 10) currentSecs = `0${currentSecs}`;
    currentTimeTrack.innerText = `${currentMins}:${currentSecs}`;

    let durationMins = Math.floor(duration / 60);
    let durationSecs = Math.floor(duration % 60);
    if (durationSecs < 10) durationSecs = `0${durationSecs}`;
    totalDurationTrack.innerText = `${durationMins}:${durationSecs}`;
}

function setProgress() {
    if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
}

function changeVolume() {
    audio.volume = volumeBar.value / 100;
}

function filterSongs() {
    const filterValue = searchInput.value.toLowerCase();
    songElements.forEach(song => {
        const title = song.querySelector('h4').innerText.toLowerCase();
        const artist = song.querySelector('p').innerText.toLowerCase();
        song.style.display = (title.includes(filterValue) || artist.includes(filterValue)) ? 'flex' : 'none';
    });
}

function resetFilters() {
    searchInput.value = '';
    songElements.forEach(song => song.style.display = 'flex');
    
    const songContainers = document.querySelectorAll('div[class*="albun_"]:not(.albunes)');
    songContainers.forEach(container => container.style.display = '');
    inicializarBotonesDeAgregar();
}

// Clic directo en canciones
trackElements.forEach(element => {
    element.addEventListener('click', () => loadSong(element));
});

// Clic en tarjetas de álbumes por defecto (Funciona como filtro)
albumCards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('playlist-personalizada')) return; 
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
        btnPlay.innerText = 'play_circle';

        const albumClass = Array.from(card.classList).find(cls => cls.startsWith('albun_'));
        if (albumClass) {
            const songContainers = document.querySelectorAll('div[class*="albun_"]:not(.albunes)');
            songContainers.forEach(container => {
                container.style.display = container.classList.contains(albumClass) ? '' : 'none';
            });

            setTimeout(() => {
                const visibleTracks = getVisibleTracks();
                if (visibleTracks.length > 0) {
                    loadSong(visibleTracks[0]);
                } else {
                    currentTitle.innerText = "Selecciona una canción";
                    currentArtist.innerText = "-";
                }
            }, 50);
        }
    });
});

// ==========================================
// SISTEMA DE PLAYLISTS MULTIPROPÓSITO (PERSISTENTE)
// ==========================================
let cancionSeleccionadaParaAgregar = null; 
let modoModal = 'crear'; 

// Elementos inyectados dinámicamente en el modal
const modalTitulo = document.getElementById('modal-titulo');
const vistaCrearPlaylist = document.getElementById('vista-crear-playlist');
const vistaAgregarCancion = document.getElementById('vista-agregar-cancion');
const listaSeleccionablePlaylists = document.getElementById('lista-seleccionable-playlists');
const btnIrACrear = document.getElementById('btn-ir-a-crear');

function inicializarBotonesDeAgregar() {
    const todasLasCanciones = document.querySelectorAll('.canciones');
    todasLasCanciones.forEach(cancion => {
        if (!cancion.querySelector('.btn-add-to-playlist')) {
            const btnAdd = document.createElement('button');
            btnAdd.className = 'material-symbols-outlined btn-add-to-playlist';
            btnAdd.innerText = 'playlist_add';
            btnAdd.title = 'Añadir a una lista';
            
            btnAdd.addEventListener('click', (e) => {
                e.stopPropagation(); 
                cancionSeleccionadaParaAgregar = cancion.getAttribute('data-audio');
                abrirModalEnModoAgregar();
            });
            cancion.appendChild(btnAdd);
        }
    });
}

btnCrearPlaylist.addEventListener('click', () => {
    cancionSeleccionadaParaAgregar = null; 
    abrirModalEnModoCrear();
});

function abrirModalEnModoCrear() {
    modoModal = 'crear';
    modalTitulo.innerText = "Nueva Lista";
    vistaCrearPlaylist.style.display = 'block';
    vistaAgregarCancion.style.display = 'none';
    btnGuardarPlaylist.style.display = 'block'; 
    
    modalPlaylist.style.display = 'flex';
    inputNombrePlaylist.value = '';
    inputNombrePlaylist.focus();
}

function abrirModalEnModoAgregar() {
    modoModal = 'agregar';
    modalTitulo.innerText = "Añadir a Lista";
    vistaCrearPlaylist.style.display = 'none';
    vistaAgregarCancion.style.display = 'block';
    btnGuardarPlaylist.style.display = 'none'; 

    listaSeleccionablePlaylists.innerHTML = '';
    const listadoListas = Object.keys(misPlaylists);

    if (listadoListas.length === 0) {
        abrirModalEnModoCrear();
        modalTitulo.innerText = "Crear lista con canción";
        return;
    }

    listadoListas.forEach(nombreLista => {
        const itemLista = document.createElement('div');
        itemLista.className = 'item-lista-seleccionable';
        itemLista.innerText = nombreLista;
        
        itemLista.addEventListener('click', () => {
            if (!misPlaylists[nombreLista].includes(cancionSeleccionadaParaAgregar)) {
                misPlaylists[nombreLista].push(cancionSeleccionadaParaAgregar);
                
                // SALVAR CAMBIOS EN PLAYLIST EXISTENTE
                localStorage.setItem('misPlaylists', JSON.stringify(misPlaylists));
                
                modalPlaylist.style.display = 'none';
                actualizarTarjetasPlaylists();
            } else {
                alert('Esta canción ya está en la lista.');
            }
        });
        listaSeleccionablePlaylists.appendChild(itemLista);
    });

    modalPlaylist.style.display = 'flex';
}

btnIrACrear.addEventListener('click', () => {
    abrirModalEnModoCrear();
    modalTitulo.innerText = "Crear lista con canción";
});

btnCancelarPlaylist.addEventListener('click', () => {
    modalPlaylist.style.display = 'none';
});

btnGuardarPlaylist.addEventListener('click', ejecutarCreacionPlaylist);
inputNombrePlaylist.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') ejecutarCreacionPlaylist();
});

function ejecutarCreacionPlaylist() {
    const nombre = inputNombrePlaylist.value.trim();
    if (!nombre) {
        alert('Por favor ingresa un nombre válido.');
        return;
    }
    if (misPlaylists[nombre]) {
        alert('Ya tienes una lista de reproducción con ese nombre.');
        return;
    }
    
    if (cancionSeleccionadaParaAgregar) {
        misPlaylists[nombre] = [cancionSeleccionadaParaAgregar];
    } else {
        misPlaylists[nombre] = [];
    }
    
    // SALVAR NUEVA PLAYLIST EN LOCALSTORAGE
    localStorage.setItem('misPlaylists', JSON.stringify(misPlaylists));
    
    modalPlaylist.style.display = 'none';
    actualizarTarjetasPlaylists();
}

function actualizarTarjetasPlaylists() {
    const previas = document.querySelectorAll('.playlist-personalizada');
    previas.forEach(p => p.remove());
    
    Object.keys(misPlaylists).forEach(nombre => {
        const cancionesEnLista = misPlaylists[nombre];
        let portadasUnicas = [];
        
        cancionesEnLista.forEach(audioSrc => {
            const cancionDOM = document.querySelector(`.canciones[data-audio="${audioSrc}"]`);
            if (cancionDOM) {
                const imgDOM = cancionDOM.querySelector('.Portada_lista');
                if (imgDOM && !portadasUnicas.includes(imgDOM.src)) {
                    portadasUnicas.push(imgDOM.src);
                }
            }
        });
        
        let htmlPortada = '';
        if (portadasUnicas.length === 0) {
            htmlPortada = `<div class="portada-mosaico una-sola-imagen"><img src="https://f4.bcbits.com/img/a0907743342_10.jpg"></div>`;
        } else if (portadasUnicas.length < 4) {
            htmlPortada = `<div class="portada-mosaico una-sola-imagen"><img src="${portadasUnicas[0]}"></div>`;
        } else {
            htmlPortada = `
                <div class="portada-mosaico">
                    <img src="${portadasUnicas[0]}">
                    <img src="${portadasUnicas[1]}">
                    <img src="${portadasUnicas[2]}">
                    <img src="${portadasUnicas[3]}">
                </div>
            `;
        }
        
        const tarjetaPlaylist = document.createElement('div');
        tarjetaPlaylist.className = 'albunes efectoHover playlist-personalizada';
        tarjetaPlaylist.setAttribute('data-playlist-name', nombre);
        
        tarjetaPlaylist.innerHTML = `
            ${htmlPortada}
            <h4 class="text_Albunes text" style="color: var(--accent-color);">${nombre}</h4>
            <p class="text_Albunes text">Lista Personalizada</p>
        `;
        
        tarjetaPlaylist.addEventListener('click', () => {
            const cancionesFiltradas = misPlaylists[nombre];
            const todosLosBloques = document.querySelectorAll('div[class^="albun_"]');
            todosLosBloques.forEach(bloque => bloque.style.display = 'none');
            
            const todasLasCanciones = document.querySelectorAll('.canciones');
            todasLasCanciones.forEach(cancion => {
                const src = cancion.getAttribute('data-audio');
                if (cancionesFiltradas.includes(src)) {
                    cancion.style.display = 'flex';
                    cancion.parentElement.style.display = 'block';
                } else {
                    cancion.style.display = 'none';
                }
            });
        });
        
        contenedorPlaylists.appendChild(tarjetaPlaylist);
    });
}

// ==========================================
// ASIGNACIÓN DE OYENTES DE EVENTOS ASÍNCRONOS
// ==========================================
btnPlay.addEventListener('click', togglePlay);
btnPrev.addEventListener('click', () => changeTrack(-1, false));
btnNext.addEventListener('click', () => changeTrack(1, true));
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateProgress); 
progressBar.addEventListener('input', setProgress);
volumeBar.addEventListener('input', changeVolume);
searchInput.addEventListener('input', filterSongs);
btnResetFilters.addEventListener('click', resetFilters);

btnShuffle.addEventListener('click', () => {
    isShuffleMode = !isShuffleMode;
    btnShuffle.classList.toggle('active', isShuffleMode);
    if (isShuffleMode) {
        repeatState = 0;
        btnRepeat.classList.remove('active', 'repeat-once');
        btnRepeat.innerText = 'repeat';
    }
});

btnRepeat.addEventListener('click', () => {
    if (isShuffleMode) {
        isShuffleMode = false;
        btnShuffle.classList.remove('active');
    }
    repeatState = (repeatState + 1) % 3;

    if (repeatState === 0) {
        btnRepeat.classList.remove('active', 'repeat-once');
        btnRepeat.innerText = 'repeat';
    } else if (repeatState === 1) {
        btnRepeat.classList.add('active', 'repeat-once');
        btnRepeat.innerText = 'repeat_one'; 
    } else if (repeatState === 2) {
        btnRepeat.classList.remove('repeat-once');
        btnRepeat.classList.add('active');
        btnRepeat.innerText = 'repeat';
    }
});

audio.addEventListener('ended', () => {
    if (repeatState === 1 || repeatState === 2) {
        audio.currentTime = 0;
        playSong();
        if(repeatState === 1) {
            repeatState = 0;
            btnRepeat.classList.remove('active', 'repeat-once');
            btnRepeat.innerText = 'repeat';
        }
    } else {
        changeTrack(1, true);
    }
});

// ==========================================
// INICIALIZACIÓN COMPLETA AL CARGAR EL DOM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    inicializarBotonesDeAgregar();

    // 1. Recuperar y restablecer la paleta y video guardados
    const temaGuardado = localStorage.getItem('temaGuardado');
    const videoGuardado = localStorage.getItem('videoGuardado');
    
    if (temaGuardado && paletasColores[temaGuardado]) {
        aplicarPaleta(paletasColores[temaGuardado]);
    } else if (temaGuardado === 'default') {
        aplicarPaleta(paletasColores.silksong); 
    }
    
    if (videoGuardado) {
        bgVideo.src = videoGuardado;
        bgVideo.load();
    }

    // 2. Renderizar las tarjetas de las playlists cargadas desde memoria
    if (Object.keys(misPlaylists).length > 0) {
        actualizarTarjetasPlaylists();
    }
});