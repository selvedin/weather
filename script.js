const app = new Vue({
  el: "#app",
  data: {
    cities: [
      "Vitez",
      "Sarajevo",
      "Paris",
      "London",
      "Jeddah",
      "New York",
      "Toronto",
      "Tokyo",
      "Moscow",
      "Beijing",
      "Dubai",
      "Istanbul",
      "Rio de Janeiro",
      "Hong Kong",
      "Minneapolis",
    ],
    city: "Vitez",
    API_KEY: "c676f200bf0b46e49de202539231504",
    data: {},
    icon: "files/icons/116.png",
    iconCode: "116",
    bgimage: "files/bg/images/",
    bgvideo: "files/bg/videos/",
    codes: [],
  },
  mounted() {
    const self = this;
    // document.getElementById("bgVideo").playbackRate = 0.5;
    self.getWeather();
    fetch(`https://www.weatherapi.com/docs/conditions.json`)
      .then(response => response.json())
      .then(jsonResponse => {
        jsonResponse.forEach(res =>
          self.codes.push({
            code: res.code,
            day: res.day,
            night: res.night,
            icon: res.icon,
          })
        );
      });
  },
  methods: {
    getWeather: function () {
      const self = this;
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=${self.API_KEY}&q=${self.city}&aqi=no`
      )
        .then(response => response.json())
        .then(jsonResponse => (self.data = jsonResponse));
    },
    exportToJson: function () {
      let a = document.createElement("a");
      let file = new Blob([JSON.stringify(this.codes)], {
        type: "text/plain",
      });
      a.href = URL.createObjectURL(file);
      a.download = "codes.json";
      a.click();
    },
  },
  watch: {
    data: function () {
      let icon = this.data.current.condition.icon;
      icon = icon.substr(icon.length - 7);
      this.iconCode = icon.substr(0, 3);
      if (["389"].includes(this.iconCode)) icon = "200.png";
      if (["389", "302", "266"].includes(this.iconCode)) this.iconCode = "266"; // rain codes
      this.icon = "files/icons/" + icon;
    },
    city: function () {
      this.getWeather();
    },
  },
});
