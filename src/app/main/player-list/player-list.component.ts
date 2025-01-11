import {Component, inject, Input, OnInit} from '@angular/core';
import {Player} from "../../../types";
import {formatAmount} from "../../../util";
import {ServerConnector} from "../../ServerConnector";

@Component({
    selector: 'app-player-list',
    imports: [],
    templateUrl: './player-list.component.html',
    styleUrl: './player-list.component.css',
    host: {
        class: "card"
    }
})
export class PlayerListComponent implements OnInit {

    private serverConnector = inject(ServerConnector);

    @Input({required: true}) username!: string;

    players: Player[] = [];

    protected readonly formatAmount = formatAmount;

    setPlayers(players: Player[]) {
        this.players = players.sort((a, b) => b.balance - a.balance);
    }

    async ngOnInit() {
        this.setPlayers(await this.serverConnector.sendEvent("GET_PLAYERS"));

        this.serverConnector.onConnect(async () => {
            this.setPlayers(await this.serverConnector.sendEvent("GET_PLAYERS"));
        });

        this.serverConnector.addEventHandler("TRANSACTIONS_UPDATE", ({players}) => {
            this.setPlayers(players);
        });
    }
}
