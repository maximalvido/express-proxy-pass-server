import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv'; 
import { fetchURL } from './utils';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;

const formatMapping = new Map<string, string>([
  ['xml', 'text/xml'],
  ['svg', 'image/svg+xml'],
  ['txt', 'text/plain'],
]);

app.get('/site.webmanifest', (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, '../public', 'site.webmanifest'));
});

app.get('/favicon.ico', (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, '../public', 'favicon.ico'));
});

app.get('/favicon.png', (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, '../public', 'favicon.png'));
});

app.get('*', async (request: Request, response: Response) => { 
  try {
    const splittedUrl: string[] = request.url.split('.');
    const format:string|undefined = splittedUrl.length > 0 ? formatMapping.get(splittedUrl[splittedUrl.length-1]) : undefined;
    const result = await fetchURL(`${BASE_URL}${request.url}`, format);
    if (format) {
      response.set('Content-Type', format);
    }
    response.status(200).send(result);
  } catch (err) {
    console.log('Redirecting to 404');
    response.set('Content-Type', 'text/html');
    response.status(200).send(await fetchURL(`${BASE_URL}/404`));
  }
}); 

app.listen(PORT, () => { 
  console.log('Server running at PORT: ', PORT); 
  console.log('This server is only meant to reverse proxy requests to framer and remove the framer badge'); 
  console.log('This is only for Educational purposes.'); 

  if (!BASE_URL) {
    throw 'BASE_URL is not set. Without this value, the server can\'t return the proper website.'; 
  }

  if (!process.env.ELEMENT_ID_TO_REMOVE) {
    console.log('WARNING: ELEMENT_ID_TO_REMOVE is not set. This ID is needed to remove the HTML Element you want to get rid of, without it, you will still see the badge'); 
  }

}).on('error', (error: { message: string | undefined; }) => {
  throw new Error(error.message);
});
