// Q8 Node Uninvited

import http from 'http';
import fs from 'fs/promises';
import path from 'path';
const PORT = 5000;
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      const fileName = `${req.url.slice(1)}.json`;
      const filePath = path.join('guests', fileName);
      try {
        await fs.writeFile(filePath, body);
        res.statusCode = 201;
        res.end(body);
      } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'server failed' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'guest not found' }));
  }
});
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
