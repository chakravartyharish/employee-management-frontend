import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Log the current environment being used
console.log('Starting application with environment:', environment);
console.log('API URL:', environment.apiUrl);
console.log('Production mode:', environment.production);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));