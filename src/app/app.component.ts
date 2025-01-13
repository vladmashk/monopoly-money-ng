import {Component, inject} from '@angular/core';
import {EntryComponent} from "./entry/entry.component";
import {MainComponent} from "./main/main.component";
import {ServerConnector} from "./ServerConnector";
import {NgClass} from "@angular/common";
import {USERNAME_KEY} from "../constants";

@Component({
    selector: 'app-root',
    imports: [EntryComponent, MainComponent, NgClass],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    private serverConnector = inject(ServerConnector);

    username?: string = localStorage.getItem(USERNAME_KEY) ?? undefined;

    get connected(): boolean {
        return this.serverConnector.connected;
    }

    logOut() {
        localStorage.removeItem(USERNAME_KEY);
        this.username = undefined;
    }
}
