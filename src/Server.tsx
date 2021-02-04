import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { serve } from 'serve';
import App from './app.tsx';

// remove 'any' below after fix with: https://github.com/skypackjs/skypack-cdn/issues/120
const appStr = (ReactDOMServer as any).renderToString(<App />);

const s = serve(":8080");

for await (const req of s) {
  console.log('REQUEST MADE');
  req.respond({
    body: `
    
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Deno + React application</title>
        </head>
        <body>
          <div id="root">
            ${appStr}
          </div>
        </body>
      </html>

    `
  });
}; 
