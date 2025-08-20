import app from './app';
import env from './config/env';

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}
  Environment: ${env.NODE_ENV}
  Visit http://localhost:${env.PORT}
               `);
});
  
