import './config/database';
import app from './config/app';

(async () => {
    await app.listen(app.get('port'));
    console.log(`app running on port ${app.get('port')}`)
})();

