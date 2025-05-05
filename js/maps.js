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
}).setView([-15.7801, -47.9292], 4); // Coordenadas centrais e zoom inicial

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    bounds: bounds, // Opcional: informa a camada de tiles sobre os limites
}).addTo(map);

// Define o ícone personalizado
var customMarkerIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background-color: orange; width: 20px; height: 20px; border: 2px solid darkorange; border-radius: 50%;"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
});

const markers = L.markerClusterGroup(); // Cria um grupo de marcadores para clustering
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

// Itera sobre o array de parceiros e adiciona cada marcador ao grupo
parceiros.forEach((parceiro) => {
    const marker = L.marker([parceiro.lat, parceiro.lng], { icon: customMarkerIcon }).bindPopup(
        `<b>${parceiro.nome}</b><br><img src="${parceiro.imagem}" alt="${parceiro.nome}" style="width:100px;height:auto;"><br><p>${parceiro.descricao}</p><a href="${parceiro.website}" target="_blank">Visitar Site</a>`
    );
    markers.addLayer(marker); // Adiciona o marcador ao grupo
});

map.addLayer(markers); // Adiciona o grupo de marcadores ao mapa

// Adicione este bloco de estilo no seu <head> ou em um arquivo CSS
const style = document.createElement('style');
style.textContent = `
    
`;
document.head.appendChild(style);