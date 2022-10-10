# Dark Web Scraper + Analyzer

## About
Project with Rapid 7.

A dark-web (using tor) scraper that analize the scraped data.

The Application will scan the dark-web once every two minutes and will send the data to the server and the server will use ws to send the data to the user.
In the application you can search for a specific title of paste or set an alert that will show all the pastes that includes the term.

## Technologies
JavaScript | TypeScript | Python | MongoDB | Docker | React | Wss

## To Run Locally
You can use one of the following options


## Option 1:
Inside the root folder run `docker-compose up`

After that go to: http://localhost:3000/


## Option 2:
### Packages
#### client:
`npm i` to install

axios | react-chart.js-2 | socket.io-client | typescript | sass
#### server:
`npm i` to install

cors | express | mongoose | socket.io | nodemon
#### (dataFromWeb) scraper:
`pip install pysocks b4s textblob requests`

You also need to make sure that you have mongo installed on your machine and tor, for that you could use the tor docker image.

### Run
#### inside dataFromWeb:
`python ./index.py`
#### inside server:
`npm run dev` / `npm start`
#### inside client:
`npm start`

## Screenshots
![image](https://user-images.githubusercontent.com/97836572/194826687-cc9d8590-39bb-44d8-b58d-09924773e8ab.png)
![image](https://user-images.githubusercontent.com/97836572/194826764-bd193e23-9c17-4981-aad5-5eea7ec69c5e.png)
![image](https://user-images.githubusercontent.com/97836572/194826995-003f7cb5-cf54-4b25-9e87-636a76c0ef5c.png)
![image](https://user-images.githubusercontent.com/97836572/194827275-35a335e2-d92a-4941-853b-94e6f10ff9d7.png)


