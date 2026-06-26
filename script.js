const invitation = {
  date: "5 сентября 2026",
  time: "15:00",
  place: "Дворец бракосочетания, Тюмень, ул. Малыгина, 85",
  mapUrl: "https://yandex.ru/maps/?text=Дворец%20бракосочетания%20Тюмень%20улица%20Малыгина%2085",
  coordinates: [57.143036, 65.554741],
};

function initYandexMap() {
  const mapContainer = document.querySelector("#yandex-map");

  if (!mapContainer || !window.ymaps) {
    return;
  }

  ymaps.ready(() => {
    const map = new ymaps.Map(mapContainer, {
      center: invitation.coordinates,
      zoom: 16,
      controls: ["zoomControl", "fullscreenControl"],
    });

    const placemark = new ymaps.Placemark(
      invitation.coordinates,
      {
        balloonContentHeader: "Дворец бракосочетания",
        balloonContentBody: invitation.place,
        hintContent: "Дворец бракосочетания",
      },
      {
        preset: "islands#blackStretchyIcon",
        iconColor: "#161412",
      },
    );

    map.geoObjects.add(placemark);
    map.behaviors.disable("scrollZoom");
    mapContainer.classList.add("map-ready");
  });
}

initYandexMap();
