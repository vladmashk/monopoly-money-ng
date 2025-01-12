import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {SOCKET_SERVER_PORT} from "../constants";
import {environment} from "../environments/environment";

console.log("Mode:", environment.production ? "production" : "development");

const config: SocketIoConfig = {
    url: environment.production ? `https://${location.host}` : `http://${location.hostname}:${SOCKET_SERVER_PORT}`,
    options: {}
};

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      importProvidersFrom(SocketIoModule.forRoot(config))
  ]
};
