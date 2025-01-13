import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

let wakeLock: WakeLockSentinel;

if (navigator.wakeLock) {
    console.log("Requesting wake lock");
    navigator.wakeLock.request().then(result => {
        wakeLock = result;
        console.log("Received wake lock");
    }).catch(reason => {
        console.log("Denied wake lock:", reason);
    });
}

document.addEventListener("visibilitychange", async () => {
    if (wakeLock && document.visibilityState === "visible") {
        console.log("Reacquiring wake lock");
        navigator.wakeLock.request().then(result => {
            wakeLock = result;
            console.log("Received wake lock");
        }).catch(reason => {
            console.log("Denied wake lock:", reason);
        });
    }
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
