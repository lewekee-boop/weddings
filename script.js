const invitation = {
  date: "5 сентября 2026",
  time: "15:00",
  place: "Дворец бракосочетания, Тюмень, ул. Малыгина, 85",
  mapUrl: "https://maps.google.com/?q=Дворец+бракосочетания+Тюмень+улица+Малыгина+85",
};

const mapLink = document.querySelector("#map-link");

mapLink.href = invitation.mapUrl;
