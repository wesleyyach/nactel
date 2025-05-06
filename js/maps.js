// Ajustando as coordenadas para cobrir apenas o Brasil
const southWest = L.latLng(-33.75, -74.0); // Ponto mais ao sul e oeste do Brasil
const northEast = L.latLng(5.27, -34.0);   // Ponto mais ao norte e leste do Brasil
const bounds = L.latLngBounds(southWest, northEast);

// Configuração do mapa com foco no Brasil
var map = L.map("map", {
    scrollWheelZoom: true,
    doubleClickZoom: true,
    touchZoom: true,
    boxZoom: true,
    minZoom: 4,
    maxZoom: 8,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
    zoomControl: false,
    attributionControl: true
}).setView([-15.7801, -47.9292], 4);

// Adiciona controle de zoom personalizado
L.control.zoom({
    position: 'bottomright',
    zoomInText: '+',
    zoomOutText: '-'
}).addTo(map);

// Adiciona diferentes camadas de mapa
const baseMaps = {
    "Claro": L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        bounds: bounds,
        subdomains: 'abcd',
        maxZoom: 19
    }),
    "Satélite": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        bounds: bounds,
        maxZoom: 19
    }),
    "Terreno": L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
        bounds: bounds,
        maxZoom: 17
    })
};

// Adiciona a camada padrão
baseMaps["Claro"].addTo(map);

// Adiciona controle de camadas
L.control.layers(baseMaps, null, {
    position: 'bottomright',
    collapsed: false
}).addTo(map);

// Marcador personalizado
var customMarkerIcon = L.divIcon({
    className: 'custom-marker',
    html: `
        <div class="marker-pin">
            <div class="marker-pulse"></div>
            <div class="marker-content">
                <i class="fas fa-building"></i>
            </div>
        </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
});

// Configuração do cluster
const markers = L.markerClusterGroup({
    maxClusterRadius: 80,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 6
});

// Array com os dados dos parceiros
const parceiros = [
    {
        nome: "Petrobras",
        lat: -8.40583,
        lng: -35.06889,
        estado: "Pernambuco",
        website: "https://petrobras.com.br/",
        descricao: "Uma breve descrição sobre o Parceiro A e sua colaboração conosco.",
        imagem: "img/petrobras.png",
    },
    {
        nome: "Concessionária Rota do Atlântico",
        lat: -8.40583,
        lng: -35.06889,
        estado: "Pernambuco",
        website: "https://parceirob.com.br",
        descricao: "Detalhes sobre a parceria com o Parceiro B e seus serviços.",
        imagem: "img/LogoRotadoatlantico.png",
    },
    {
        nome: "Esse",
        lat: -8.05206,
        lng: -34.92878,
        estado: "Pernambuco",
        website: "https://www.esseeng.com.br/",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoEsse.png",
    },
    {
        nome: "Jole",
        lat: -8.05206,
        lng: -34.92878,
        estado: "Pernambuco",
        website: "https://parceiroc.com.br",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoJole.png",
    },
    {
        nome: "A.B Corte Real",
        lat: -8.05206,
        lng: -34.92878,
        estado: "Pernambuco",
        website: "https://abcortereal.com.br/",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoAbcorteral.png",
    },
    {
        nome: "Cosampa",
        lat: -3.71722,
        lng: -38.54306,
        estado: "Ceará",
        website: "https://parceiroc.com.br",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoCosampa.png",
    },
    {
        nome: "Insttale",
        lat: -3.71722,
        lng: -38.54306,
        estado: "Ceará",
        website: "https://www.cosampa.com.br/",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoInsttale.png",
    },
    {
        nome: "Cortez",
        lat: -3.71722,
        lng: -38.54306,
        estado: "Ceará",
        website: "https://cortezengenharia.com.br/",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoCortez.png",
    },
    {
        nome: "Tcpav",
        lat: -5.795,
        lng: -35.20944,
        estado: "Rio Grande do Norte",
        website: "https://parceiroc.com.br",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoTcpav.png",
    },
    {
        nome: "Dois A",
        lat: -5.795,
        lng: -35.20944,
        estado: "Rio Grande do Norte",
        website: "https://www.doisa.com/",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoDoisa.png",
    },
    {
        nome: "SVC",
        lat: -12.97167,
        lng: -38.50167,
        estado: "Bahia",
        website: "https://www.svcconstrucoes.com.br/",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoSvc.png",
    },
    {
        nome: "Construtora Castilho",
        lat: -25.42972,
        lng: -49.27194,
        estado: "Paraná",
        website: "https://www.castilho.com.br/",
        descricao: "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoCastilho.webp",
    }
];

// Adiciona os marcadores ao mapa
parceiros.forEach((parceiro) => {
    const marker = L.marker([parceiro.lat, parceiro.lng], { icon: customMarkerIcon }).bindPopup(
        `<div class="custom-popup">
            <div class="popup-header">
                <img src="${parceiro.imagem}" alt="${parceiro.nome}" class="popup-logo">
                <div class="popup-title">
                    <h3>${parceiro.nome}</h3>
                    <span class="estado-badge">${parceiro.estado}</span>
                </div>
            </div>
            <div class="popup-content">
                <p>${parceiro.descricao}</p>
                <a href="${parceiro.website}" target="_blank" class="popup-link">
                    <i class="fas fa-external-link-alt"></i> Visitar Site
                </a>
            </div>
        </div>`,
        {
            maxWidth: 300,
            className: 'custom-popup-container'
        }
    );
    markers.addLayer(marker);
});

// Adiciona o grupo de marcadores ao mapa
map.addLayer(markers);

// Adiciona controle de filtro por estado
const estados = [...new Set(parceiros.map(p => p.estado))];
const filtroEstados = L.control({ position: 'topleft' });

filtroEstados.onAdd = function() {
    const div = L.DomUtil.create('div', 'filtro-estados');
    div.innerHTML = `
        <div class="filtro-header">
            <h4>Filtrar por Estado</h4>
            <button class="filtro-toggle">▼</button>
        </div>
        <div class="filtro-content">
            <div class="filtro-contador">
                <span>Total de Parceiros: ${parceiros.length}</span>
            </div>
            <div class="filtro-lista">
                ${estados.map(estado => {
                    const count = parceiros.filter(p => p.estado === estado).length;
                    return `
                        <label class="filtro-item">
                            <input type="checkbox" value="${estado}" checked>
                            <span>${estado} (${count})</span>
                        </label>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    return div;
};

filtroEstados.addTo(map);

// Adiciona legenda
const legenda = L.control({ position: 'bottomleft' });

legenda.onAdd = function() {
    const div = L.DomUtil.create('div', 'legenda');
    div.innerHTML = `
        <div class="legenda-header">
            <h4>Legenda</h4>
        </div>
        <div class="legenda-content">
            <div class="legenda-item">
                <div class="legenda-marker">
                    <i class="fas fa-building"></i>
                </div>
                <span>Parceiro</span>
            </div>
            <div class="legenda-item">
                <div class="legenda-cluster">
                    <span>3</span>
                </div>
                <span>Grupo de Parceiros</span>
            </div>
        </div>
    `;
    return div;
};

legenda.addTo(map);

// Estilos CSS
const style = document.createElement('style');
style.textContent = `
    .custom-marker {
        position: relative;
    }

    .marker-pin {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        background: #f57316;
        transform: rotate(-45deg);
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    }

    .marker-pin:hover {
        transform: rotate(-45deg) scale(1.2);
        background: #ff8c00;
    }

    .marker-pulse {
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(245, 115, 22, 0.3);
        animation: pulse 2s infinite;
    }

    .marker-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        color: white;
        font-size: 14px;
    }

    .custom-popup-container {
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .custom-popup {
        padding: 10px;
    }

    .popup-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    .popup-title {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .estado-badge {
        background: #f57316;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        display: inline-block;
    }

    .popup-logo {
        width: 40px;
        height: 40px;
        object-fit: contain;
        border-radius: 4px;
    }

    .popup-header h3 {
        margin: 0;
        color: #1a237e;
        font-size: 16px;
    }

    .popup-content {
        color: #333;
        font-size: 14px;
    }

    .popup-link {
        display: inline-block;
        margin-top: 10px;
        padding: 5px 10px;
        background: #f57316;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background 0.3s ease;
    }

    .popup-link:hover {
        background: #ff8c00;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    /* Estilos do Filtro */
    .filtro-estados {
        background: white;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        min-width: 200px;
    }

    .filtro-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .filtro-header h4 {
        margin: 0;
        color: #1a237e;
        font-size: 14px;
    }

    .filtro-toggle {
        background: none;
        border: none;
        color: #1a237e;
        cursor: pointer;
        font-size: 12px;
    }

    .filtro-contador {
        font-size: 12px;
        color: #666;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
    }

    .filtro-lista {
        max-height: 200px;
        overflow-y: auto;
    }

    .filtro-item {
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 5px 0;
        font-size: 12px;
        color: #333;
    }

    .filtro-item input[type="checkbox"] {
        margin: 0;
    }

    /* Estilos da Legenda */
    .legenda {
        background: white;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .legenda-header h4 {
        margin: 0 0 10px 0;
        color: #1a237e;
        font-size: 14px;
    }

    .legenda-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .legenda-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #333;
    }

    .legenda-marker {
        width: 20px;
        height: 20px;
        background: #f57316;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
    }

    .legenda-cluster {
        width: 20px;
        height: 20px;
        background: #f57316;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
    }

    /* Responsividade */
    @media (max-width: 768px) {
        .filtro-estados {
            position: fixed;
            top: 70px;
            left: 10px;
            right: 10px;
            z-index: 1000;
            max-width: none;
        }

        .filtro-content {
            max-height: 200px;
            overflow-y: auto;
        }

        .legenda {
            position: fixed;
            bottom: 70px;
            left: 10px;
            right: 10px;
            z-index: 1000;
            max-width: none;
        }

        .legenda-content {
            flex-direction: row;
            justify-content: space-around;
        }
    }
`;
document.head.appendChild(style);

// Adiciona funcionalidade de filtro
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.filtro-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const estado = this.value;
            const checked = this.checked;
            
            markers.clearLayers();
            
            parceiros.forEach((parceiro) => {
                if (checked || parceiro.estado !== estado) {
                    const marker = L.marker([parceiro.lat, parceiro.lng], { icon: customMarkerIcon }).bindPopup(
                        `<div class="custom-popup">
                            <div class="popup-header">
                                <img src="${parceiro.imagem}" alt="${parceiro.nome}" class="popup-logo">
                                <div class="popup-title">
                                    <h3>${parceiro.nome}</h3>
                                    <span class="estado-badge">${parceiro.estado}</span>
                                </div>
                            </div>
                            <div class="popup-content">
                                <p>${parceiro.descricao}</p>
                                <a href="${parceiro.website}" target="_blank" class="popup-link">
                                    <i class="fas fa-external-link-alt"></i> Visitar Site
                                </a>
                            </div>
                        </div>`,
                        {
                            maxWidth: 300,
                            className: 'custom-popup-container'
                        }
                    );
                    markers.addLayer(marker);
                }
            });
        });
    });
});