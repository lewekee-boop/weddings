const invitation = {
  date: "15 августа 2026",
  time: "16:00",
  place: "Дворец бракосочетания, Тюмень, ул. Малыгина, 85",
  mapUrl: "https://maps.google.com/?q=Дворец+бракосочетания+Тюмень+улица+Малыгина+85",
};

const dateEl = document.querySelector("#event-date");
const timeEl = document.querySelector("#event-time");
const placeEl = document.querySelector("#event-place");
const mapLink = document.querySelector("#map-link");

dateEl.textContent = invitation.date;
timeEl.textContent = invitation.time;
placeEl.textContent = invitation.place;
mapLink.href = invitation.mapUrl;
