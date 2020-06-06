import Agent from 'agentkeepalive';
import axios from 'axios';

const keepAliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

export = axios.create({
  //60 sec timeout
  timeout: 60000,

  //keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: keepAliveAgent,
  // httpsAgent: new https.Agent({ keepAlive: true }),

  //follow up to 10 HTTP 3xx redirects
  maxRedirects: 10,

  //cap the maximum content length we'll accept to 50MBs, just in case
  maxContentLength: 50 * 1000 * 1000,
});
