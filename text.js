let citys = [
    {
        arabicName: 'القاهره',
        name: 'cairo'
    }
]
for (let city of citys) {
    const content = `
    <option>${city.arabicName}</option>
    `;
    document.getElementById('cities-select').innerHTML += content;
}
document.getElementById('cities-select').addEventListener('change', () => {
    let cityName = "";
    for (let city of citys) {
        if (city.arabicName == this.value) {
            cityName = city.name;
        }
        getPrayersTimingsOfCity(cityName);
    }
})
function getPrayersTimingsOfCity(cityName) {
    let params = {
        city: cityName,
        country : 'SA',
        method : 5
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
    .then((response) => {
        const timings = response.data.data.timings;
        fillTimeForPrayer('fajr-time', timings.Fajr);
        fillTimeForPrayer('dhuhr-time', timings.Dhuhr);
        fillTimeForPrayer('asr-time', timings.Asr);
        fillTimeForPrayer('maghrib-time', timings.Maghrib);
        fillTimeForPrayer('isha-time', timings.Isha);

        const readableDate = response.data.data.date.readable;
        const weekDay = response.data.data.date.hijri.weekday.ar;
        const date = weekDay +  " " + readableDate;
        document.getElementById('date').innerHTML = date;
        console.log(weekDay);

    })
    .catch((error) => {
        console.log(error);
    })
    .then(() => {

    });
}
getPrayersTimingsOfCity('القاهره');

function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time;
}