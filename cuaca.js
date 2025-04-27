const url = "https://api.open-meteo.com/v1/forecast?latitude=-7.973&longitude=112.6087&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FBangkok&forecast_days=3";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const time = data.daily.time;
    const tempMax = data.daily.temperature_2m_max;
    const tempMin = data.daily.temperature_2m_min;
    const rain = data.daily.precipitation_sum;
    
    //Tabel Cuaca 
      const tableBody = document.getElementById('cuaca-tabel');
      let rows = "";
      for (let i = 0; i < time.length; i++) {
        rows += `
          <tr>
            <td>${time[i]}</td>
            <td>${tempMax[i]}</td>
            <td>${tempMin[i]}</td>
            <td>${rain[i]}</td>
          </tr>
        `;
      }
      tableBody.innerHTML = rows;
    
    // Grafik Cuaca
    const ctx = document.getElementById("grafikCuaca").getContext("2d");

    const gradientMax = ctx.createLinearGradient(0, 0, 0, 400);
    gradientMax.addColorStop(0, "rgb(255, 0, 0)");
    gradientMax.addColorStop(1, "rgba(255, 99, 132, 0)");

    const gradientMin = ctx.createLinearGradient(0, 0, 0, 400);
    gradientMin.addColorStop(0, "rgb(238, 255, 0)");
    gradientMin.addColorStop(1, "rgba(54, 162, 235, 0)");

    const gradientRain = ctx.createLinearGradient(0, 0, 0, 400);
    gradientRain.addColorStop(0, "rgb(38, 131, 237)");
    gradientRain.addColorStop(1, "rgba(3, 41, 41, 0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Suhu Maks (°C)",
            data: tempMax,
            backgroundColor: gradientMax,
            borderColor: "rgb(255, 0, 0)",
            pointBackgroundColor: "white",
            borderWidth: 2,
            fill: true,
            tension: 0.3
          },
          {
            label: "Suhu Min (°C)",
            data: tempMin,
            backgroundColor: gradientMin,
            borderColor: "rgb(238, 255, 0)",
            pointBackgroundColor: "white",
            borderWidth: 2,
            fill: true,
            tension: 0.3
          },
          {
            label: "Curah Hujan (mm)",
            data: rain,
            backgroundColor: gradientRain,
            borderColor: "rgb(38, 131, 237)",
            pointBackgroundColor: "white",
            borderWidth: 2,
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Grafik Prakiraan Cuaca Kec. Klojen",
            font: {
              size: 20
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            position: "top"
          }
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nilai'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Tanggal'
            }
          }
        }
      }
    });
  });
