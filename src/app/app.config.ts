import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {SOCKET_SERVER_PORT} from "../constants";

const config: SocketIoConfig = {
    url: `http://${location.hostname}:${SOCKET_SERVER_PORT}`,
    options: {}
};

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      importProvidersFrom(SocketIoModule.forRoot(config))
  ]
};
