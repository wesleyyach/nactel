const southWest = L.latLng(-56, -96); // Coordenada mais ao sul e oeste
const northEast = L.latLng(24, -30); // Coordenada mais ao norte e leste
const bounds = L.latLngBounds(southWest, northEast);
// Certifique-se de que este script seja carregado APÓS o Leaflet no HTML
var map = L.map("map", {
    scrollWheelZoom: false, // Desabilita o zoom com a roda do mouse
    doubleClickZoom: false, // Desabilita o zoom com duplo clique
    touchZoom: false, // Desabilita o zoom com toque em dispositivos móveis
    boxZoom: false, // Desabilita o zoom com caixa (arrastar segurando shift)
    minZoom: 3, // Nível de zoom mínimo permitido (mais afastado)
    maxZoom: 6, // Nível de zoom máximo permitido (mais próximo)
    maxBounds: bounds, // Define os limites máximos do mapa
    maxBoundsViscosity: 1.0, // Impede o usuário de arrastar completamente para fora dos limites
    zoomControl: true,
    attributionControl: true
}).setView([-15.7801, -47.9292], 4); // Coordenadas centrais e zoom inicial

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    bounds: bounds, // Opcional: informa a camada de tiles sobre os limites
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Enhanced custom marker icon
var customMarkerIcon = L.divIcon({
    className: 'custom-marker',
    html: `
        <div class="marker-pin">
            <div class="marker-pulse"></div>
            <div class="marker-content">
                <i class="fas fa-map-marker-alt"></i>
            </div>
        </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
});

// Configure marker cluster group with custom styling
const markers = L.markerClusterGroup({
    maxClusterRadius: 80,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 6,
    iconCreateFunction: function(cluster) {
        const count = cluster.getChildCount();
        let size = 'small';
        if (count > 10) size = 'medium';
        if (count > 30) size = 'large';
        
        return L.divIcon({
            html: `<div class="cluster-marker ${size}">${count}</div>`,
            className: 'custom-cluster',
            iconSize: L.point(40, 40)
        });
    }
});

// Array com os dados dos seus parceiros (substitua pelos seus dados reais)
const parceiros = [
    {
        nome: "Petrobras",
        lat: -8.40583,
        lng: -35.06889,
        website: "https://petrobras.com.br/",
        descricao:
            "Uma breve descrição sobre o Parceiro A e sua colaboração conosco.",
        imagem: "img/petrobras.png", // Caminho para a imagem do parceiro A
    },
    {
        nome: "Concessionária Rota do Atlântico",
        lat: -8.40583,
        lng: -35.06889,
        website: "https://parceirob.com.br",
        descricao: "Detalhes sobre a parceria com o Parceiro B e seus serviços.",
        imagem: "img/LogoRotadoatlantico.png", // Caminho para a imagem do parceiro B
    },
    {
        nome: "Esse",
        lat: -8.05206,
        lng: -34.92878,
        website: "https://www.esseeng.com.br/",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoEsse.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "Jole",
        lat: -8.05206,
        lng: -34.92878,
        website: "https://parceiroc.com.br",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoJole.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "A.B Corte Real",
        lat: -8.05206,
        lng: -34.92878,
        website: "https://abcortereal.com.br/",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoAbcorteral.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "Cosampa",
        lat: -3.71722,
        lng: -38.54306,
        website: "https://parceiroc.com.br",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoCosampa.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "Insttale",
        lat: -3.71722,
        lng: -38.54306,
        website: "https://www.cosampa.com.br/",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoInsttale.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "Cortez",
        lat: -3.71722,
        lng: -38.54306,
        website: "https://cortezengenharia.com.br/",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoCortez.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "Tcpav",
        lat: -5.795,
        lng: -35.20944,
        website: "https://parceiroc.com.br",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoTcpav.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "Dois A",
        lat: -5.795,
        lng: -35.20944,
        website: "https://www.doisa.com/",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoDoisa.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "SVC",
        lat: -12.97167,
        lng:  -38.50167,
        website: "https://www.svcconstrucoes.com.br/",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoSvc.png", // Caminho para a imagem do parceiro C
    },
    {
        nome: "Construtora Castilho",
        lat: -25.42972,
        lng: -49.27194,
        website: "https://www.castilho.com.br/",
        descricao:
            "Informações importantes sobre nossa colaboração com o Parceiro C.",
        imagem: "img/logoCastilho.webp", // Caminho para a imagem do parceiro C
    }
];

// Enhanced popup content
parceiros.forEach((parceiro) => {
    const marker = L.marker([parceiro.lat, parceiro.lng], { icon: customMarkerIcon }).bindPopup(
        `<div class="custom-popup">
            <div class="popup-header">
                <img src="${parceiro.imagem}" alt="${parceiro.nome}" class="popup-logo">
                <h3>${parceiro.nome}</h3>
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

map.addLayer(markers); // Adiciona o grupo de marcadores ao mapa

// Add custom styles
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
        background: #FF4500; /* Orange */
        transform: rotate(-45deg);
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    }

    .marker-pin:hover {
        transform: rotate(-45deg) scale(1.2);
    }

    .marker-pulse {
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 69, 0, 0.3); /* Orange with opacity */
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

    .custom-cluster {
        background: transparent;
    }

    .cluster-marker {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #FF4500; /* Orange */
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    }

    .cluster-marker.small {
        background: #FFD700; /* Yellow */
    }

    .cluster-marker.medium {
        background: #FF4500; /* Orange */
    }

    .cluster-marker.large {
        background: #FF0000; /* Red */
    }

    .custom-popup-container .leaflet-popup-content-wrapper {
        border-radius: 8px;
        padding: 0;
        overflow: hidden;
    }

    .custom-popup {
        padding: 0;
    }

    .popup-header {
        background: #f8f9fa;
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }

    .popup-logo {
        max-width: 120px;
        height: auto;
        margin-bottom: 10px;
    }

    .popup-header h3 {
        margin: 0;
        color: #333;
        font-size: 1.2em;
    }

    .popup-content {
        padding: 15px;
    }

    .popup-content p {
        margin: 0 0 15px 0;
        color: #666;
        font-size: 0.9em;
        line-height: 1.4;
    }

    .popup-link {
        display: inline-block;
        padding: 8px 15px;
        background: #1E90FF; /* Blue */
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background 0.3s ease;
    }

    .popup-link:hover {
        background: #4169E1; /* Darker blue on hover */
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
`;
document.head.appendChild(style);