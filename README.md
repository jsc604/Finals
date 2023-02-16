# MoonShot
MoonShot is a full-stack web application that allows users to track stocks, cryptocurrencies, and NFTs all in one place. The app provides users with the ability to add assets to their watchlist and switch between them. All the information displayed in the app is live data pulled from the CoinGecko and Yahoo Finance APIs. The charts in the app were made using Apex Charts.

# Features
* User authentication provided by Auth0
* User watchlist with the ability to add and remove assets
* Switch between different assets on the watchlist
* Live data for stocks, cryptocurrencies, and NFTs
* Charts displaying historical data for each asset
* The option to dropdown and view multiple assets charts at the same time

# Tech Stack
MoonShot was built using the following technologies:
* React
* React Router
* Node.js
* Express
* PostgreSQL
* Auth0
* Axios
* Bootstrap
* Sass

# Screenshots and Demo
!["homepage"](https://github.com/jsc604/MoonShot/blob/main/docs/Screenshot%202023-02-16%20at%201.22.01%20PM.png?raw=true)

General Functionality:

![GIF Genral function](https://github.com/jsc604/MoonShot/blob/main/docs/general.gif?raw=true)

Sign up and Login:

![GIF Login](https://github.com/jsc604/MoonShot/blob/main/docs/login.gif?raw=true)

Adding to Watchlist:

![GIF favoriting](https://github.com/jsc604/MoonShot/blob/main/docs/Favoriting.gif?raw=true)

!["homepage"](https://github.com/jsc604/MoonShot/blob/main/docs/Screenshot%202023-02-16%20at%201.37.11%20PM.png?raw=true)

!["homepage"](https://github.com/jsc604/MoonShot/blob/main/docs/Screenshot%202023-02-16%20at%201.27.28%20PM.png?raw=true)

!["homepage"](https://github.com/jsc604/MoonShot/blob/main/docs/Screenshot%202023-02-16%20at%201.28.50%20PM.png?raw=true)

# Installation
1. Clone the repository: `git clone git@github.com:jsc604/MoonShot.git`
2. Install dependencies: `npm install`
3. Create a PostgreSQL database
4. Start the app on both the front-end and back-end: `npm start`