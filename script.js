/**
 * ===================================================================
 * PORTAFOLIO PERSONAL - JONA FRANCO
 * JavaScript de Interacciones Dinámicas del DOM
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ===============================================================
       1. MODO OSCURO / MODO CLARO DINÁMICO
       =============================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme-preference');
        if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
            if (themeIcon) themeIcon.className = 'bi bi-moon-stars-fill';
            if (themeText) themeText.textContent = 'Modo Oscuro';
        } else {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.className = 'bi bi-sun-fill text-warning';
            if (themeText) themeText.textContent = 'Modo Claro';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');

            if (themeIcon) {
                themeIcon.className = isDark ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill text-primary';
            }
            if (themeText) {
                themeText.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
            }
        });
    }


    /* ===============================================================
       2. MENÚ DESPLEGABLE HAMBURGUESA (UNIVERSAL: PC Y MÓVIL)
       =============================================================== */
    const hamburgerBtn = document.getElementById('hamburger-toggle-btn');
    const navMenuOverlay = document.getElementById('custom-nav-menu');
    const navLinks = document.querySelectorAll('.custom-nav-link');
    const closeNavBtn = document.getElementById('close-nav-btn');

    if (hamburgerBtn && navMenuOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            navMenuOverlay.classList.toggle('show');
            hamburgerBtn.classList.toggle('active');
        });

        if (closeNavBtn) {
            closeNavBtn.addEventListener('click', () => {
                navMenuOverlay.classList.remove('show');
                hamburgerBtn.classList.remove('active');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenuOverlay.classList.remove('show');
                hamburgerBtn.classList.remove('active');
            });
        });

        document.addEventListener('click', (event) => {
            if (!navMenuOverlay.contains(event.target) && 
                !hamburgerBtn.contains(event.target) && 
                navMenuOverlay.classList.contains('show')) {
                navMenuOverlay.classList.remove('show');
                hamburgerBtn.classList.remove('active');
            }
        });
    }


    /* ===============================================================
       3. FILTRADO DE VIDEOJUEGOS POR CATEGORÍA
       =============================================================== */
    const gameFilterButtons = document.querySelectorAll('.game-filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    const noGamesMsg = document.getElementById('no-games-found');

    gameFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            gameFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedFilter = button.getAttribute('data-filter');
            let visibleCount = 0;

            gameCards.forEach(card => {
                const cardCategory = card.dataset.categoria;
                if (selectedFilter === 'todos' || cardCategory === selectedFilter) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                }
            });

            if (noGamesMsg) {
                noGamesMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
            }
        });
    });


    /* ===============================================================
       4. SECCIÓN MÚSICA: FILTRADO POR GÉNERO Y TOP 10 DE CANCIONES
       =============================================================== */
    // Base de datos de artistas y su Top 10 oficial de canciones
    const catalogoMusica = {
        "jose-jose": {
            nombre: "José José",
            genero: "Balada Romántica & Bolero Clásico",
            foto: "joase.png",
            descripcion: "Conocido mundialmente como 'El Príncipe de la Canción', referente indiscutible de la balada en español durante los años 70s y 80s.",
            top10: [
                { rank: 1, titulo: "El Triste", album: "El Triste (1970)", tipo: "Clásico Inmortal" },
                { rank: 2, titulo: "Almohada", album: "Reencuentro (1978)", tipo: "Balada Oro" },
                { rank: 3, titulo: "Amar y Querer", album: "Reencuentro (1977)", tipo: "Romántica" },
                { rank: 4, titulo: "Gavilán o Paloma", album: "Reencuentro (1977)", tipo: "Éxito Radial" },
                { rank: 5, titulo: "Lo Pasado, Pasado", album: "Lo Pasado, Pasado (1978)", tipo: "Himno" },
                { rank: 6, titulo: "40 y 20", album: "40 y 20 (1992)", tipo: "Balada Pop" },
                { rank: 7, titulo: "La Nave del Olvido", album: "La Nave del Olvido (1970)", tipo: "Clásico" },
                { rank: 8, titulo: "Si Me Dejas Ahora", album: "Si Me Dejas Ahora (1979)", tipo: "Melancólico" },
                { rank: 9, titulo: "Buenos Días Amor", album: "Reencuentro (1977)", tipo: "Romance" },
                { rank: 10, titulo: "Desesperado", album: "Mi Vida (1982)", tipo: "Éxito 80s" }
            ]
        },
        "luis-miguel": {
            nombre: "Luis Miguel",
            genero: "Balada Romántica & Pop Latino",
            foto: "luis.jpg",
            descripcion: "'El Sol de México'. Virtuoso vocalista con una carrera repleta de discos de platino, boleros magistrales y pop bailable.",
            top10: [
                { rank: 1, titulo: "La Incondicional", album: "Busca una Mujer (1988)", tipo: "Himno Pop 80s" },
                { rank: 2, titulo: "Culpable o No", album: "Busca una Mujer (1988)", tipo: "Balada Emotiva" },
                { rank: 3, titulo: "Hasta Que Me Olvides", album: "Aries (1993)", tipo: "Balada Clásica" },
                { rank: 4, titulo: "Ahora Te Puedes Marchar", album: "Soy Como Quiero Ser (1987)", tipo: "Dance Pop 80s" },
                { rank: 5, titulo: "Tengo Todo Excepto a Ti", album: "20 Años (1990)", tipo: "Balada" },
                { rank: 6, titulo: "Sabor a Mí", album: "Romances (1997)", tipo: "Bolero Magistral" },
                { rank: 7, titulo: "Entrégate", album: "20 Años (1990)", tipo: "Pop Balada" },
                { rank: 8, titulo: "Suave", album: "Aries (1993)", tipo: "Funk Latino" },
                { rank: 9, titulo: "Por Debajo de la Mesa", album: "Romances (1997)", tipo: "Bolero" },
                { rank: 10, titulo: "Cuando Calienta el Sol", album: "Soy Como Quiero Ser (1987)", tipo: "Clásico Verano" }
            ]
        },
        "frank-sinatra": {
            nombre: "Frank Sinatra",
            genero: "Classic Jazz & Big Band",
            foto: "sinatra.jpg",
            descripcion: "'La Voz'. Leyenda universal de la música del siglo XX que definió la elegancia vocal, el swing y la era dorada de las orquestas.",
            top10: [
                { rank: 1, titulo: "My Way", album: "My Way (1969)", tipo: "Himno Legendario" },
                { rank: 2, titulo: "Fly Me to the Moon", album: "It Might as Well Be Swing (1964)", tipo: "Swing Clásico" },
                { rank: 3, titulo: "Theme from New York, New York", album: "Trilogy (1980)", tipo: "Big Band" },
                { rank: 4, titulo: "Strangers in the Night", album: "Strangers in the Night (1966)", tipo: "Balada Jazz" },
                { rank: 5, titulo: "That's Life", album: "That's Life (1966)", tipo: "Blues / Swing" },
                { rank: 6, titulo: "I've Got You Under My Skin", album: "Songs for Swingin' Lovers! (1956)", tipo: "Swing Masterpiece" },
                { rank: 7, titulo: "The Way You Look Tonight", album: "Sinatra Sings Days of Wine and Roses (1964)", tipo: "Romántico" },
                { rank: 8, titulo: "Come Fly with Me", album: "Come Fly with Me (1958)", tipo: "Jazz Estándar" },
                { rank: 9, titulo: "Summer Wind", album: "Strangers in the Night (1966)", tipo: "Vocal Jazz" },
                { rank: 10, titulo: "Night and Day", album: "A Swingin' Affair! (1957)", tipo: "Swing Orquestal" }
            ]
        },
        "bruno-mars": {
            nombre: "Bruno Mars",
            genero: "Pop / Funk / R&B",
            foto: "bruno.jpg",
            descripcion: "Productor y compositor contemporáneo reconocido por revitalizar el sonido funk retro de los 80s con una energía escénica descomunal.",
            top10: [
                { rank: 1, titulo: "24K Magic", album: "24K Magic (2016)", tipo: "Funk Neón" },
                { rank: 2, titulo: "Uptown Funk (ft. Mark Ronson)", album: "Uptown Special (2014)", tipo: "Mega Hit Mundial" },
                { rank: 3, titulo: "When I Was Your Man", album: "Unorthodox Jukebox (2012)", tipo: "Balada Piano" },
                { rank: 4, titulo: "Locked Out of Heaven", album: "Unorthodox Jukebox (2012)", tipo: "Pop Rock / New Wave" },
                { rank: 5, titulo: "Just the Way You Are", album: "Doo-Wops & Hooligans (2010)", tipo: "Romántico Pop" },
                { rank: 6, titulo: "That's What I Like", album: "24K Magic (2016)", tipo: "R&B / Groove" },
                { rank: 7, titulo: "Leave The Door Open (Silk Sonic)", album: "An Evening with Silk Sonic (2021)", tipo: "Soul 70s / R&B" },
                { rank: 8, titulo: "Treasure", album: "Unorthodox Jukebox (2012)", tipo: "Disco Funk" },
                { rank: 9, titulo: "Versace on the Floor", album: "24K Magic (2016)", tipo: "Balada Slow Jam 80s" },
                { rank: 10, titulo: "Grenade", album: "Doo-Wops & Hooligans (2010)", tipo: "Pop Dramático" }
            ]
        },
        "michael-jackson": {
            nombre: "Michael Jackson",
            genero: "Pop & Synthpop Ochentero",
            foto: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
            descripcion: "'El Rey del Pop'. El artista más influyente de la historia musical, ícono indiscutible de la década de los 80s con álbumes revolucionarios.",
            top10: [
                { rank: 1, titulo: "Billie Jean", album: "Thriller (1982)", tipo: "Obra Maestra 80s" },
                { rank: 2, titulo: "Thriller", album: "Thriller (1982)", tipo: "Videoclip Épico" },
                { rank: 3, titulo: "Beat It", album: "Thriller (1982)", tipo: "Hard Rock / Pop" },
                { rank: 4, titulo: "Smooth Criminal", album: "Bad (1987)", tipo: "Groove Rápido" },
                { rank: 5, titulo: "Man in the Mirror", album: "Bad (1987)", tipo: "Gospel Pop" },
                { rank: 6, titulo: "Bad", album: "Bad (1987)", tipo: "Funk Rock 80s" },
                { rank: 7, titulo: "Don't Stop 'Til You Get Enough", album: "Off the Wall (1979)", tipo: "Disco Funk" },
                { rank: 8, titulo: "Black or White", album: "Dangerous (1991)", tipo: "Rock Pop" },
                { rank: 9, titulo: "Rock with You", album: "Off the Wall (1979)", tipo: "R&B Clásico" },
                { rank: 10, titulo: "The Way You Make Me Feel", album: "Bad (1987)", tipo: "Rhythm Pop" }
            ]
        },
        "the-weeknd": {
            nombre: "The Weeknd",
            genero: "Synthwave & R&B Alternativo",
            foto: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
            descripcion: "Vocalista canadiense que ha fusionado la estética synthwave ochentera con el R&B moderno, batiendo récords globales.",
            top10: [
                { rank: 1, titulo: "Blinding Lights", album: "After Hours (2020)", tipo: "Synthwave Puro" },
                { rank: 2, titulo: "Starboy (ft. Daft Punk)", album: "Starboy (2016)", tipo: "Electro R&B" },
                { rank: 3, titulo: "Save Your Tears", album: "After Hours (2020)", tipo: "Pop Ochentero" },
                { rank: 4, titulo: "The Hills", album: "Beauty Behind the Madness (2015)", tipo: "Dark R&B" },
                { rank: 5, titulo: "Can't Feel My Face", album: "Beauty Behind the Madness (2015)", tipo: "Funk Pop" },
                { rank: 6, titulo: "I Feel It Coming", album: "Starboy (2016)", tipo: "Disco Soul" },
                { rank: 7, titulo: "Out of Time", album: "Dawn FM (2022)", tipo: "City Pop / R&B" },
                { rank: 8, titulo: "In Your Eyes", album: "After Hours (2020)", tipo: "Saxofón Synth" },
                { rank: 9, titulo: "Die for You", album: "Starboy (2016)", tipo: "Balada Emotiva" },
                { rank: 10, titulo: "Call Out My Name", album: "My Dear Melancholy (2018)", tipo: "Slow R&B" }
            ]
        },
        "mora": {
            nombre: "Mora",
            genero: "Urbano / Melodic Trap",
            foto: "mora.jpg",
            descripcion: "Productor y compositor puertorriqueño caracterizado por melodías profundas, baterías espaciadas y sintetizadores envolventes.",
            top10: [
                { rank: 1, titulo: "Memorias (con Jhayco)", album: "MicroDosis (2022)", tipo: "Éxito Urbano" },
                { rank: 2, titulo: "Volando (Remix con Bad Bunny & Sech)", album: "Primer Día de Clases (2021)", tipo: "Mega Hit" },
                { rank: 3, titulo: "LA INOCENTE (con Feid)", album: "MicroDosis (2022)", tipo: "Reggaetón Melódico" },
                { rank: 4, titulo: "Tuyo", album: "Primer Día de Clases (2021)", tipo: "Sentimental" },
                { rank: 5, titulo: "512 (con Jhayco)", album: "Primer Día de Clases (2021)", tipo: "Perreo Fino" },
                { rank: 6, titulo: "APARECISTE", album: "PARAÍSO (2022)", tipo: "Synth Urbano" },
                { rank: 7, titulo: "MODELITO (con YOVNGCHIMI)", album: "PARAÍSO (2022)", tipo: "Trap Rápido" },
                { rank: 8, titulo: "CASUALIDAD", album: "ESTRELLA (2023)", tipo: "Melódico" },
                { rank: 9, titulo: "REINA (con Saiko)", album: "ESTRELLA (2023)", tipo: "Urbano Chill" },
                { rank: 10, titulo: "QUE HABILIDAD", album: "Primer Día de Clases (2021)", tipo: "Flow Nocturno" }
            ]
        },
        "yan-block": {
            nombre: "Yan Block",
            genero: "Trap Latino / Underground",
            foto: "yan.jpg",
            descripcion: "Exponente boricua del trap melódico con rimas introspectivas, relatos crudos de superación y ritmos contundentes.",
            top10: [
                { rank: 1, titulo: "Estrellas y Satélites", album: "Sencillo (2022)", tipo: "Trap Lírico" },
                { rank: 2, titulo: "El Mismo de Antes", album: "Sencillo (2021)", tipo: "Introspectivo" },
                { rank: 3, titulo: "Freestyle Real", album: "Underground (2022)", tipo: "Barras Puras" },
                { rank: 4, titulo: "Noche Fría", album: "Sencillo (2020)", tipo: "Trap Melancólico" },
                { rank: 5, titulo: "Desvelo", album: "Sencillo (2021)", tipo: "Nocturno" },
                { rank: 6, titulo: "Código 10", album: "Sencillo (2022)", tipo: "Colaboración" },
                { rank: 7, titulo: "Luna Llena", album: "Sencillo (2023)", tipo: "Melódico" },
                { rank: 8, titulo: "Sentimientos", album: "Sencillo (2021)", tipo: "Sensible" },
                { rank: 9, titulo: "En la Mía", album: "Sencillo (2022)", tipo: "Flow Callejero" },
                { rank: 10, titulo: "Racks", album: "Sencillo (2023)", tipo: "Trap Pesado" }
            ]
        },
        "bad-bunny": {
            nombre: "Bad Bunny",
            genero: "Reggaetón & Urbano Global",
            foto: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
            descripcion: "Fenómeno global puertorriqueño, récord indiscutible de streaming en Spotify e impulsor de la cultura latina contemporánea.",
            top10: [
                { rank: 1, titulo: "Tití Me Preguntó", album: "Un Verano Sin Ti (2022)", tipo: "Dembow / Éxito Global" },
                { rank: 2, titulo: "Me Porto Bonito (con Chencho)", album: "Un Verano Sin Ti (2022)", tipo: "Reggaetón Pesado" },
                { rank: 3, titulo: "Ojitos Lindos (con Bomba Estéreo)", album: "Un Verano Sin Ti (2022)", tipo: "Indie Urbano" },
                { rank: 4, titulo: "Dákiti (con Jhayco)", album: "El Último Tour Del Mundo (2020)", tipo: "Afrobeat Pop" },
                { rank: 5, titulo: "Safaera", album: "YHLQMDLG (2020)", tipo: "Medley Clásico" },
                { rank: 6, titulo: "Yo Perreo Sola", album: "YHLQMDLG (2020)", tipo: "Himno Bailable" },
                { rank: 7, titulo: "Mónaco", album: "Nadie Sabe Lo Que Va A Pasar Mañana (2023)", tipo: "Trap Sinfónico" },
                { rank: 8, titulo: "La Canción (con J Balvin)", album: "OASIS (2019)", tipo: "Melancólico" },
                { rank: 9, titulo: "Callaíta", album: "Sencillo (2019)", tipo: "Verano Clásico" },
                { rank: 10, titulo: "Efecto", album: "Un Verano Sin Ti (2022)", tipo: "Reggaetón Cósmico" }
            ]
        },
        "josean-log": {
            nombre: "Josean Log",
            genero: "Indie Pop & Folk Acústico",
            foto: "josean.jpg",
            descripcion: "Cantautor mexicano que transmite serenidad, optimismo y calidez a través de armonías con ukelele y letras honestas.",
            top10: [
                { rank: 1, titulo: "Chapa de Bombón", album: "Háblame de Tú (2016)", tipo: "Ukelele Alegre" },
                { rank: 2, titulo: "Beso", album: "Háblame de Tú (2018)", tipo: "Romántico Acústico" },
                { rank: 3, titulo: "Tierra", album: "Háblame de Tú (2016)", tipo: "Folk Serena" },
                { rank: 4, titulo: "La Vida Es un Ratico", album: "El Futuro (2019)", tipo: "Filosofía Positiva" },
                { rank: 5, titulo: "Jacaranda", album: "Háblame de Tú (2016)", tipo: "Poesía Musical" },
                { rank: 6, titulo: "Combustión", album: "Háblame de Tú (2018)", tipo: "Calidez Acústica" },
                { rank: 7, titulo: "Alguien Como Tú", album: "El Futuro (2019)", tipo: "Sensible" },
                { rank: 8, titulo: "Doma", album: "Háblame de Tú (2018)", tipo: "Suave" },
                { rank: 9, titulo: "Canción sin Nombre", album: "Sencillo (2020)", tipo: "Reflexión" },
                { rank: 10, titulo: "Si Fuera Tú", album: "Sencillo (2021)", tipo: "Indie Acústico" }
            ]
        },
        "kevin-kaarl": {
            nombre: "Kevin Kaarl",
            genero: "Indie Folk & Balada Acústica",
            foto: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
            descripcion: "Voz profunda y melancólica desde Chihuahua, México. Sus composiciones acústicas tocan fibras profundas de nostalgia y amor.",
            top10: [
                { rank: 1, titulo: "San Lucas", album: "San Lucas (2019)", tipo: "Himno Indie Folk" },
                { rank: 2, titulo: "Vámonos a Marte", album: "Hasta el Fin del Mundo (2019)", tipo: "Balada Espacial" },
                { rank: 3, titulo: "Colapso", album: "San Lucas (2020)", tipo: "Nostalgia Pura" },
                { rank: 4, titulo: "Toda Esta Ciudad", album: "Sencillo (2021)", tipo: "Guitarra Solitaria" },
                { rank: 5, titulo: "Si Supieras", album: "Hasta el Fin del Mundo (2019)", tipo: "Romance Acústico" },
                { rank: 6, titulo: "Como Me Encanta", album: "París Texas (2022)", tipo: "Folk Alternativo" },
                { rank: 7, titulo: "Te Quiero Tanto", album: "París Texas (2022)", tipo: "Poesía Vocal" },
                { rank: 8, titulo: "Abrazado a Ti", album: "San Lucas (2020)", tipo: "Intimista" },
                { rank: 9, titulo: "Siente Más", album: "París Texas (2022)", tipo: "Indie Profundo" },
                { rank: 10, titulo: "Amor Viejo", album: "Hasta el Fin del Mundo (2018)", tipo: "Acústico" }
            ]
        },
        "ed-maverick": {
            nombre: "Ed Maverick",
            genero: "Folk Rock & Sad Boy Latino",
            foto: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
            descripcion: "Uno de los fenómenos más auténticos de la música indie hispana, conocido por sus letras directas y rasgueos viscerales.",
            top10: [
                { rank: 1, titulo: "Fuentes de Ortiz", album: "Mix Pa Llorar en Tu Cuarto (2018)", tipo: "Éxito Viral" },
                { rank: 2, titulo: "Acurrucar", album: "Mix Pa Llorar en Tu Cuarto (2018)", tipo: "Melancólico" },
                { rank: 3, titulo: "Ropa de Bazar", album: "Mix Pa Llorar en Tu Cuarto (2018)", tipo: "Acústico Sentido" },
                { rank: 4, titulo: "Quiero", album: "Mix Pa Llorar en Tu Cuarto (2018)", tipo: "Sinceridad Lírica" },
                { rank: 5, titulo: "Siempre Estoy Pa Ti", album: "Transiciones (2019)", tipo: "Folk Moderno" },
                { rank: 6, titulo: "Karpe Diem", album: "Mix Pa Llorar en Tu Cuarto (2018)", tipo: "Juventud" },
                { rank: 7, titulo: "tierrita mojada", album: "eduardo (2021)", tipo: "Folk Experimental" },
                { rank: 8, titulo: "niño", album: "eduardo (2021)", tipo: "Introspectivo" },
                { rank: 9, titulo: "nos queda mucho dolor por recorrer", album: "eduardo (2021)", tipo: "Guitarra Cruda" },
                { rank: 10, titulo: "gente", album: "eduardo (2021)", tipo: "Folk Rock" }
            ]
        },
        "queen": {
            nombre: "Queen",
            genero: "Rock Legendario & 80s Rock",
            foto: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
            descripcion: "Banda británica inmortal liderada por Freddie Mercury. Pioneros de los sintetizadores y estadios llenos en los 80s.",
            top10: [
                { rank: 1, titulo: "Bohemian Rhapsody", album: "A Night at the Opera (1975)", tipo: "Ópera Rock Suprema" },
                { rank: 2, titulo: "Don't Stop Me Now", album: "Jazz (1978)", tipo: "Energía Pura" },
                { rank: 3, titulo: "Another One Bites the Dust", album: "The Game (1980)", tipo: "Funk Rock 80s" },
                { rank: 4, titulo: "Radio Ga Ga", album: "The Works (1984)", tipo: "Synthpop / Live Aid" },
                { rank: 5, titulo: "Under Pressure (con David Bowie)", album: "Hot Space (1981)", tipo: "Colaboración Histórica" },
                { rank: 6, titulo: "I Want to Break Free", album: "The Works (1984)", tipo: "Sintetizadores 80s" },
                { rank: 7, titulo: "We Will Rock You", album: "News of the World (1977)", tipo: "Himno de Estadios" },
                { rank: 8, titulo: "We Are the Champions", album: "News of the World (1977)", tipo: "Himno de Victoria" },
                { rank: 9, titulo: "Somebody to Love", album: "A Day at the Races (1976)", tipo: "Gospel Rock" },
                { rank: 10, titulo: "The Show Must Go On", album: "Innuendo (1991)", tipo: "Fuerza y Emoción" }
            ]
        },
        "soda-stereo": {
            nombre: "Soda Stereo",
            genero: "Rock en Español / New Wave 80s",
            foto: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
            descripcion: "El trío argentino de Gustavo Cerati que revolucionó América Latina en los años 80 con sonido New Wave y post-punk elegante.",
            top10: [
                { rank: 1, titulo: "De Música Ligera", album: "Canción Animal (1990)", tipo: "Himno del Rock Latino" },
                { rank: 2, titulo: "Cuando Pase el Temblor", album: "Nada Personal (1985)", tipo: "Carnavalito New Wave" },
                { rank: 3, titulo: "Persiana Americana", album: "Signos (1986)", tipo: "Clásico Ochentero" },
                { rank: 4, titulo: "En la Ciudad de la Furia", album: "Doble Vida (1988)", tipo: "Atmósfera Oscura" },
                { rank: 5, titulo: "Nada Personal", album: "Nada Personal (1985)", tipo: "Pop Rock 80s" },
                { rank: 6, titulo: "Prófugos", album: "Signos (1986)", tipo: "Bajo Electrizante" },
                { rank: 7, titulo: "Trátame Suavemente", album: "Soda Stereo (1984)", tipo: "Balada Icónica" },
                { rank: 8, titulo: "Signos", album: "Signos (1986)", tipo: "Guitarras Limpias" },
                { rank: 9, titulo: "Sobredosis de TV", album: "Soda Stereo (1984)", tipo: "Ska New Wave" },
                { rank: 10, titulo: "Te Hacen Falta Vitaminas", album: "Soda Stereo (1984)", tipo: "Ritmo Rápido 80s" }
            ]
        },
        "aha-synthwave": {
            nombre: "A-ha & Depeche Mode",
            genero: "Synthpop Ochentero & Retro Wave",
            foto: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
            descripcion: "Pioneros absolutos del uso de sintetizadores y cajas de ritmo electrónicas que marcaron la identidad sonora de 1980 a 1990.",
            top10: [
                { rank: 1, titulo: "Take On Me (A-ha)", album: "Hunting High and Low (1985)", tipo: "Synthpop Inmortal" },
                { rank: 2, titulo: "Enjoy the Silence (Depeche Mode)", album: "Violator (1990)", tipo: "Dark Synth" },
                { rank: 3, titulo: "The Sun Always Shines on T.V. (A-ha)", album: "Hunting High and Low (1985)", tipo: "Épico Ochentero" },
                { rank: 4, titulo: "Personal Jesus (Depeche Mode)", album: "Violator (1989)", tipo: "Electro Blues" },
                { rank: 5, titulo: "Just Can't Get Enough (Depeche Mode)", album: "Speak & Spell (1981)", tipo: "Early Synth" },
                { rank: 6, titulo: "Hunting High and Low (A-ha)", album: "Hunting High and Low (1985)", tipo: "Balada Electrónica" },
                { rank: 7, titulo: "Never Let Me Down Again (Depeche Mode)", album: "Music for the Masses (1987)", tipo: "Himno Electro" },
                { rank: 8, titulo: "Strangelove (Depeche Mode)", album: "Music for the Masses (1987)", tipo: "Synth Dance" },
                { rank: 9, titulo: "Policy of Truth (Depeche Mode)", album: "Violator (1990)", tipo: "Groove Electrónico" },
                { rank: 10, titulo: "Crying in the Rain (A-ha)", album: "East of the Sun (1990)", tipo: "Melódico Synth" }
            ]
        }
    };

    // 4.1 Filtrado de Música por Género
    const musicFilterButtons = document.querySelectorAll('.music-filter-btn');
    const musicCards = document.querySelectorAll('.music-card-item');

    musicFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            musicFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedGenre = button.getAttribute('data-music-filter');

            musicCards.forEach(card => {
                const cardGenre = card.dataset.genero;
                if (selectedGenre === 'todos' || cardGenre === selectedGenre) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                }
            });
        });
    });

    // 4.2 Modal Dinámico de Top 10 Canciones (Inyección con innerHTML)
    const modalTopMusicaEl = document.getElementById('modalTopMusica');
    const modalTituloArtista = document.getElementById('modal-artista-titulo');
    const modalSubtituloArtista = document.getElementById('modal-artista-subtitulo');
    const modalFotoArtista = document.getElementById('modal-artista-foto');
    const modalDescripcionArtista = document.getElementById('modal-artista-desc');
    const modalListaTop10 = document.getElementById('modal-lista-top10');

    // Inicializar modal con Bootstrap si está disponible
    let bsModalMusica = null;
    if (modalTopMusicaEl && typeof bootstrap !== 'undefined') {
        bsModalMusica = new bootstrap.Modal(modalTopMusicaEl);
    }

    const artistClickableElements = document.querySelectorAll('.btn-ver-top10, .music-card-clickable');
    artistClickableElements.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const artistKey = item.getAttribute('data-artista-id');
            const dataArtista = catalogoMusica[artistKey];

            if (dataArtista && bsModalMusica) {
                // Inyectar datos dinámicos en el modal
                modalTituloArtista.textContent = dataArtista.nombre;
                modalSubtituloArtista.textContent = dataArtista.genero;
                modalFotoArtista.src = dataArtista.foto;
                modalFotoArtista.alt = dataArtista.nombre;
                modalDescripcionArtista.textContent = dataArtista.descripcion;

                // Generar tabla o lista Top 10 con innerHTML
                let htmlCanciones = '';
                dataArtista.top10.forEach(c => {
                    htmlCanciones += `
                        <div class="top-song-item d-flex align-items-center justify-content-between p-2 mb-2 rounded-3">
                            <div class="d-flex align-items-center gap-3">
                                <span class="badge-rank">${c.rank}</span>
                                <div>
                                    <h6 class="mb-0 fw-bold text-white">${c.titulo}</h6>
                                    <small class="text-white-50">${c.album}</small>
                                </div>
                            </div>
                            <span class="badge bg-purple-neon rounded-pill px-3 py-1 small">${c.tipo}</span>
                        </div>
                    `;
                });
                modalListaTop10.innerHTML = htmlCanciones;

                // Mostrar el modal
                bsModalMusica.show();
            }
        });
    });


    /* ===============================================================
       5. FORMULARIO COMPLETO: VALIDACIONES EN TIEMPO REAL & AUDITORÍA
       ---------------------------------------------------------------
       - Al hacer clic en un campo y salir sin escribir (blur), aparece
         inmediatamente la alerta individual de "campo vacío y obligatorio".
       - Al escribir (input), se retira automáticamente la alerta de error.
       - Al enviar (submit), se ejecuta e.preventDefault() y se realiza
         la validación global e inyección del resultado con innerHTML.
       =============================================================== */
    const contactForm = document.getElementById('contact-form');
    const formAlertBox = document.getElementById('form-alert-container');

    // Lista de campos auditados
    const camposAuditoria = [
        { id: 'campo-nombre', nombre: 'Nombre', minLen: 3, regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, errorFormato: 'El nombre debe contener solo letras y mínimo 3 caracteres.' },
        { id: 'campo-apellidos', nombre: 'Apellidos', minLen: 3, regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, errorFormato: 'Los apellidos deben contener solo letras y mínimo 3 caracteres.' },
        { id: 'campo-correo', nombre: 'Correo Electrónico', minLen: 5, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorFormato: 'Introduce un correo válido (ejemplo: usuario@correo.com).' },
        { id: 'campo-telefono', nombre: 'Teléfono / WhatsApp', minLen: 7, regex: /^[0-9+]+$/, errorFormato: 'El teléfono debe contener solo números y entre 7 a 12 dígitos.' },
        { id: 'campo-ciudad', nombre: 'Ciudad / País', minLen: 3, regex: null, errorFormato: null },
        { id: 'campo-motivo', nombre: 'Motivo de Contacto', minLen: 1, regex: null, errorFormato: null, esSelect: true },
        { id: 'campo-prioridad', nombre: 'Nivel de Prioridad', minLen: 1, regex: null, errorFormato: null, esSelect: true },
        { id: 'campo-asunto', nombre: 'Asunto', minLen: 4, regex: null, errorFormato: 'El asunto debe tener al menos 4 caracteres.' },
        { id: 'campo-mensaje', nombre: 'Mensaje Detallado', minLen: 10, regex: null, errorFormato: 'El mensaje debe contener al menos 10 caracteres explicativos.' }
    ];

    // Función auxiliar para mostrar error individual debajo del input
    function mostrarAlertaCampo(inputEl, mensaje) {
        let alertaEl = inputEl.parentNode.querySelector('.campo-alerta-dinamica');
        if (!alertaEl) {
            alertaEl = document.createElement('div');
            alertaEl.className = 'campo-alerta-dinamica text-danger small mt-1 fw-bold';
            inputEl.parentNode.appendChild(alertaEl);
        }
        alertaEl.innerHTML = `<i class="bi bi-exclamation-circle-fill me-1"></i> ${mensaje}`;
        inputEl.classList.add('is-invalid');
        inputEl.classList.remove('is-valid');
    }

    // Función auxiliar para limpiar error individual
    function limpiarAlertaCampo(inputEl) {
        const alertaEl = inputEl.parentNode.querySelector('.campo-alerta-dinamica');
        if (alertaEl) {
            alertaEl.remove();
        }
        inputEl.classList.remove('is-invalid');
        inputEl.classList.add('is-valid');
    }

    // Escuchar eventos 'blur' e 'input' en cada campo individual
    camposAuditoria.forEach(campoObj => {
        const inputEl = document.getElementById(campoObj.id);
        if (inputEl) {
            // Evento blur: cuando el usuario enfoca y sale del campo
            inputEl.addEventListener('blur', () => {
                const valor = inputEl.value.trim();
                if (valor === '') {
                    mostrarAlertaCampo(inputEl, `El campo ${campoObj.nombre} está vacío y es estrictamente obligatorio.`);
                } else if (campoObj.regex && !campoObj.regex.test(valor)) {
                    mostrarAlertaCampo(inputEl, campoObj.errorFormato || `Formato incorrecto en ${campoObj.nombre}.`);
                } else if (valor.length < campoObj.minLen) {
                    mostrarAlertaCampo(inputEl, `El campo ${campoObj.nombre} requiere al menos ${campoObj.minLen} caracteres.`);
                } else {
                    limpiarAlertaCampo(inputEl);
                }
            });

            // Evento input / change: mientras el usuario escribe o selecciona
            inputEl.addEventListener('input', () => {
                const valor = inputEl.value.trim();
                if (valor !== '') {
                    limpiarAlertaCampo(inputEl);
                }
            });

            if (campoObj.esSelect) {
                inputEl.addEventListener('change', () => {
                    const valor = inputEl.value.trim();
                    if (valor !== '') {
                        limpiarAlertaCampo(inputEl);
                    } else {
                        mostrarAlertaCampo(inputEl, `Debes seleccionar una opción en ${campoObj.nombre}.`);
                    }
                });
            }
        }
    });

    // Checkbox de términos
    const chkTerminos = document.getElementById('campo-terminos');
    if (chkTerminos) {
        chkTerminos.addEventListener('change', () => {
            if (!chkTerminos.checked) {
                mostrarAlertaCampo(chkTerminos, 'Debes marcar la casilla de aceptación para continuar.');
            } else {
                limpiarAlertaCampo(chkTerminos);
            }
        });
    }

    // Validación global al enviar el formulario (submit)
    if (contactForm && formAlertBox) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const errores = [];

            // Revisar cada campo obligatorio
            camposAuditoria.forEach(campoObj => {
                const inputEl = document.getElementById(campoObj.id);
                if (inputEl) {
                    const valor = inputEl.value.trim();
                    if (valor === '') {
                        const msg = `El campo <strong>${campoObj.nombre}</strong> está vacío y es obligatorio.`;
                        errores.push(msg);
                        mostrarAlertaCampo(inputEl, `El campo ${campoObj.nombre} está vacío y es obligatorio.`);
                    } else if (campoObj.regex && !campoObj.regex.test(valor)) {
                        const msg = `El campo <strong>${campoObj.nombre}</strong> no tiene un formato válido.`;
                        errores.push(msg);
                        mostrarAlertaCampo(inputEl, campoObj.errorFormato);
                    } else if (valor.length < campoObj.minLen) {
                        const msg = `El campo <strong>${campoObj.nombre}</strong> es demasiado corto.`;
                        errores.push(msg);
                        mostrarAlertaCampo(inputEl, `Mínimo ${campoObj.minLen} caracteres.`);
                    } else {
                        limpiarAlertaCampo(inputEl);
                    }
                }
            });

            // Verificar checkbox de consentimiento
            if (chkTerminos && !chkTerminos.checked) {
                errores.push('Debes confirmar y aceptar los <strong>términos de contacto</strong>.');
                mostrarAlertaCampo(chkTerminos, 'Debes aceptar los términos de contacto.');
            }

            // Inyección dinámica con innerHTML
            if (errores.length > 0) {
                let htmlErrores = `
                    <div class="alert-box-error p-3 rounded-4 mb-3">
                        <div class="d-flex align-items-center mb-2 text-danger fw-bold fs-6">
                            <i class="bi bi-exclamation-triangle-fill fs-4 me-2"></i>
                            <span>No se pudo procesar el envío: Se encontraron ${errores.length} campo(s) con observaciones:</span>
                        </div>
                        <ul class="mb-0 ps-3 text-white small">
                            ${errores.map(err => `<li class="my-1">${err}</li>`).join('')}
                        </ul>
                    </div>
                `;
                formAlertBox.innerHTML = htmlErrores;
                formAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                const nombreIngresado = document.getElementById('campo-nombre').value.trim();
                const motivoIngresado = document.getElementById('campo-motivo').value;

                formAlertBox.innerHTML = `
                    <div class="alert-box-success p-4 rounded-4 mb-3 text-center">
                        <div class="text-success fw-bold fs-4 mb-2">
                            <i class="bi bi-check-circle-fill fs-1 d-block mb-2"></i>
                            ¡Mensaje enviado satisfactoriamente!
                        </div>
                        <p class="text-white-50 mb-1">
                            Muchas gracias <strong>${nombreIngresado}</strong> por ponerte en contacto respecto a: <em>${motivoIngresado}</em>.
                        </p>
                        <p class="text-info small mb-0">
                            He recibido todos tus datos correctamente y te responderé lo más pronto posible.
                        </p>
                    </div>
                `;
                // Limpiar campos y clases de validación
                contactForm.reset();
                document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
                formAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

});
