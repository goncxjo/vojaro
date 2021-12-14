using System;

namespace vojaro.api.Models.WeatherForescast
{
    public class WeatherForecastListModel
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
}
