import app from './app';
import {getEnviromentVariables} from './core/enviroment-variables';

console.log('Server is listening in: ' + getEnviromentVariables().apiPort);
app.listen(getEnviromentVariables().apiPort);