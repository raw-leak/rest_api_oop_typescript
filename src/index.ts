import cluster from 'cluster';
import os from 'os';

// db config
import './config/database';

// server config
import app from './api/server';

(async () => {
  if (false) {
    const cpuCount = os.cpus().length;

    console.log(`master with id: ${process.pid} is listening`);
    console.log(`"${Object.keys(cluster.workers).length}" workers available`);

    for (let j = 0; j < cpuCount; j++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.id} died'`);
      console.log(`Staring a new one...`);
      cluster.fork();
    });
  } else {
    await app.listen(app.get('port'));
    console.log(`Server running on port ${app.get('port')}`);
  }
})();
