# Express-Proxy-Pass-Server
This is an approach to workaround setting a custom domain for free tier plans of web builders that add some kind of element to the DOM and don't allow you to use a custom domain or custom favicon. It also helps Google get your SEO data, such as robots.txt and sitemap.xml.

The project uses:
 - [Express.js](https://github.com/expressjs/express): Web server to receive requests and return the
 - [nodemon](https://github.com/remy/nodemon): Monitor Express for crashes and code changes and restart it.
 - [JSDOM](https://github.com/jsdom/jsdom): To convert fetch results into DOM and manipulate it.

## Disclaimer:
This repo is created only for educational purposes and is not meant to harm or infringe any web builder policies. I don't take any responsibility for how this code is used or the intentions of those who use it. Use at your own risk and check that you are not breaking any law or policies.

## Setup
Go to the root of the project and install dependencies

    npm install

Copy .env.example to .env and replace it's env vars values.

    cp .env.example

.env file explanation

    PORT= #PORT for express server
    BASE_URL= #your website url without trailing slash (/) ex. https://mywebsite.subdomain.xyz
    NEW_URL= # The new URL that will replace the BASE_URL in sitemap.xml and robots.txt
    ELEMENT_ID_TO_REMOVE= # check the framer badge id with the web inspector and put the id value of the element you want to remove.

### Public Folder
Create a folder named 'public' in the root of the repository folder where you can add:
 - favicon.ico
 - favicon.png
 - site.webmanifest

To be replaced automatically when the call is made by browsers or search engines.

### Run
#### From CLI

    npm run start

#### Using docker compose

  Check port forwarding in docker-compose.yml

    ports:
      - 3000:3000

  Run

    docker compose up -d
    
