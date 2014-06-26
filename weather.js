// ****************************************************************************
//  weather.js                                                     Tao project
// ****************************************************************************
//
//   File Description:
//
//     Process weather information from openweathermap and converts it into
//     a CSV file more suitable for direct processing by Tao
//
//
//
//
//
//
//
// ****************************************************************************
//  (C) 2014 Christophe de Dinechin <christophe@taodyne.com>
//  (C) 2014 Taodyne SAS
// ****************************************************************************

var http = require('http');
var fs = require('fs');

var CITY = 'Paris';
var HOURS = /00|12/;
var MAX_COUNT = 15;

var stdinbuf ='';
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(line)
// ----------------------------------------------------------------------------
//   Read the standard input to get the city we will work with
// ----------------------------------------------------------------------------
{
    if (line == 'quit')
        process.exit(0);
    var args = line.split(':');
    CITY = args[0];
    HOURS = new RegExp(args[1]);
    MAX_COUNT = parseInt(args[2]);
    convertCityWeather();
});

// Convert city weather
convertCityWeather();


function convertCityWeather()
// ----------------------------------------------------------------------------
//   Fetch data for the given city and convert it from JSON to CSV
// ----------------------------------------------------------------------------
{
    var data = '';

    http.get("http://api.openweathermap.org/data/2.5/forecast?q=" + CITY + "&units=metric", function(res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function() {
            var object = JSON.parse(data);
            var index = 0;
            var csv = '';
            var list = object.list;
            for (var idx in list)
            {
                var forecast = list[idx];
                var weather = forecast.weather[0];
                var main = forecast.main;
                var dt = forecast.dt_txt;
                var dateRe = /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/;
                var year= dt.replace(dateRe, '$1');
                var month = dt.replace(dateRe, '$2');
                var day = dt.replace(dateRe, '$3');
                var hour = dt.replace(dateRe, '$4');
                var minute = dt.replace(dateRe, '$5');
                var second = dt.replace(dateRe, '$6');
                if (index < MAX_COUNT && hour.match(HOURS))
                {
                    csv += index + ',' + year + ',' + month + ',' + day
                        + ',' + hour + ',' + minute + ',' + second
                        + ',"' + weather.icon + '","' + weather.main + '",'
                        + main.temp + ',' + main.temp_min + ',' + main.temp_max
                        + ',' + main.pressure + ',' + main.humidity + '\n';
                    index++;
                }
            }
            var oldName = 'weather_forecast_' + CITY + '.csv';
            var newName = oldName + '.new';
            fs.writeFileSync(newName, csv);
            fs.renameSync(newName, oldName);
            setTimeout(convertCityWeather, 60 * 60 * 1000);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        setTimeout(convertCityWeather, 63 * 1000);
    });
}
