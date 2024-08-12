import { JSDOM } from 'jsdom';


async function fetchURL(url: string, format?: string) : Promise<string | Document>{
  const ELEMENT_ID_TO_REMOVE = process.env.ELEMENT_ID_TO_REMOVE;
  const BASE_URL = process.env.BASE_URL;
  const NEW_URL = process.env.NEW_URL;

  try {
    const framerContentResponse =  await fetch(url);
    if (framerContentResponse.status !== 200) {
      throw `Wrong Response for URL: ${url}, Status Code: ${framerContentResponse.status}`;
    } 
    let data = await framerContentResponse.text();
    
    if (format === 'text/xml' || format === 'image/svg+xml' || format === 'text/plain') {
      if ((url.includes('sitemap.xml') || url.includes('robots.txt')) && NEW_URL) {
        console.log('enter');
        console.log(url);
        data = data.split(BASE_URL!).join(NEW_URL);
      } else {
        console.log('Warning: skipping BASE_URL replacement for NEW_URL on sitemap.xml since NEW_URL is not defined.')
      }
      return data;
    }

    data = data.replace('https://framerusercontent.com/sites/icons/default-favicon.v3.png', 'favicon.png');

    const dom = new JSDOM(data);  

    if (ELEMENT_ID_TO_REMOVE) {
      const elementToRemove = dom.window.document.getElementById(ELEMENT_ID_TO_REMOVE);
      if (elementToRemove !== null && elementToRemove.parentNode) {
        elementToRemove.parentNode.removeChild(elementToRemove);
      } else {
        console.log('Non blocking error: Badge not found !!! Review ID');
      }
    } else {
      console.log('Error: FRAMER_BADGE_ID is not set.');
    }

    return dom.window.document.documentElement.innerHTML;
  } catch (err) {
    console.error('The URL could not be fetched. Check the error below: ');
    console.error(err);
    throw err;
  }
}

export { fetchURL };