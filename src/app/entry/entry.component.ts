import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ServerConnector} from "../ServerConnector";

@Component({
    selector: 'app-entry',
    imports: [
        FormsModule
    ],
    templateUrl: './entry.component.html',
    styleUrl: './entry.component.css',
    host: {
        class: "card"
    }
})
export class EntryComponent {

    private serverConnector = inject(ServerConnector);

    enteredName = "";

    @Output() nameEntered = new EventEmitter<string>();

    errorMessage?: string;

    async enter() {
        if (this.enteredName === "") return;
        this.errorMessage = undefined;
        const name = this.enteredName.trim();
        const ack = await this.serverConnector.sendEvent("NEW_PLAYER", name);
        if (ack.ok) {
            this.nameEntered.emit(name);
        } else {
            this.errorMessage = ack.error;
        }
    }
}
