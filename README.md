
# TodoListWidget - Übersicht Widget
![Screenshot](/screenshot.png)<br>
![Screenshot](/screenshots/device.png)
![Screenshot](/screenshots/device2.png)
## **Includes:**

 - A **TodoList** based on Apple Reminders
 - **Weather** based on the city or geoposition specified in simple **config.json** file.
 - **Local Time**

## **Customizable:**

 - All backgrounds used for sunrise, sunset, night and day.
 - Colors for day period
 - Weather with get url property
 - Language

> All of that in the ./ressources/config.json file

## How to use
1.	If you want the weather information, you have to:
	 - [ ] [subscribe](https://home.openweathermap.org/users/sign_up) to the openweathermap API
	 - [ ] receive your API key by mail or on [api_key](https://home.openweathermap.org/api_keys)

2.	If you speak English or French, you can use the predefined **config.json** file that is made for you. Just make sure you rename one of the two you want to use for the config.json, you can delete the other. And all you have to do is follow the first 2 subsections and 5 of step 3 to complete your installation.
3.	If you don't speak English or French, or you want to customize your settings, follow this steps.
	 - [ ] Open ./ressources/config.json
	 - [ ] Add your key to **apis.OPEN_WEATHER.key**
	 - [ ] Change  **apis.OPEN_WEATHER.units** if you want
		- Fahrenheit use units: "imperial"
		- Celsius use units: "metric"
		- Kelvin use units: ""
	- [ ] Change  **apis.OPEN_WEATHER.lang** if you want
		- Français lang: "fr"
		- English lang: "en"
		- Spanish lang: "es"
	- [ ] Change  **apis.OPEN_WEATHER.city** if you want with the city name you want or change  **apis.OPEN_WEATHER.lat** and **apis.OPEN_WEATHER.long** if the city name doesn't work.
	- [ ] Replace  the **days** with yours in your language, from Sunday to Saturday.
	- [ ] Replace  the **months** with yours in your language, from January to December.
	- [ ] Replace  the **title** with yours in your language.
	- [ ] Replace  the **todo** with yours in your language, paying attention to the plural and singular.
		
## Credits
[Yegor Meteor](https://dribbble.com/YegorShustov) for the backgrounds<br>
[OpenWeatherMap](https://openweathermap.org) for the weather
