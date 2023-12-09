import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';
import fs from 'fs';

const serverOptions = {
    https: {
      key: fs.readFileSync('ssl/key.pem'),
      cert: fs.readFileSync('ssl/cert.pem')
    }
  };
const app = Fastify(serverOptions);

app.register(cors);
app.register(appRoutes)


app.listen({
    port: 443
}).then(() => console.log('Server is running'))