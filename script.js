const invitation = {
  date: "5 сентября 2026",
  time: "14:30",
  celebrationStartsAt: "2026-09-05T14:30:00+05:00",
  place: "Ресторан «Бархат», Тюмень, 6-й км Салаирского тракта, 19",
  mapUrl: "https://yandex.ru/maps/?text=Ресторан%20Бархат%20Тюмень%206-й%20км%20Салаирского%20тракта%2019",
  coordinates: [57.216816, 65.482736],
};

function pluralize(value, forms) {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return forms[0];
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return forms[1];
  }

  return forms[2];
}

function initCountdown() {
  const countdown = document.querySelector("[data-countdown]");

  if (!countdown) {
    return;
  }

  const title = document.querySelector("#countdown-title");
  const daysNode = countdown.querySelector("[data-countdown-days]");
  const hoursNode = countdown.querySelector("[data-countdown-hours]");
  const minutesNode = countdown.querySelector("[data-countdown-minutes]");
  const target = new Date(invitation.celebrationStartsAt).getTime();

  const update = () => {
    const diff = Math.max(0, target - Date.now());
    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes - days * 60 * 24) / 60);
    const minutes = totalMinutes % 60;

    daysNode.textContent = days;
    hoursNode.textContent = hours;
    minutesNode.textContent = minutes;

    daysNode.nextElementSibling.textContent = pluralize(days, ["день", "дня", "дней"]);
    hoursNode.nextElementSibling.textContent = pluralize(hours, ["час", "часа", "часов"]);
    minutesNode.nextElementSibling.textContent = pluralize(minutes, ["минута", "минуты", "минут"]);

    if (diff === 0 && title) {
      title.textContent = "Этот день настал";
    }
  };

  update();
  window.setInterval(update, 60000);
}

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
        balloonContentHeader: "Ресторан «Бархат»",
        balloonContentBody: invitation.place,
        hintContent: "Ресторан «Бархат»",
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
initCountdown();
