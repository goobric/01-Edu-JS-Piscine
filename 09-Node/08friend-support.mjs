// Q8 Node 08 Friend Support jbs

import http from 'http';
import { readFile } from 'fs';

const port = 5000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method !== 'GET') {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid request method' }));
    return;
  }

  const guestFile = `guests/${url}.json`;

  readFile(guestFile, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'guest not found' }));
      } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'server failed' }));
      }
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});