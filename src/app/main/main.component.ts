import {Component, inject, Input, OnInit} from '@angular/core';
import {TransferToComponent} from "./transfer-to/transfer-to.component";
import {ReceiveFromComponent} from "./receive-from/receive-from.component";
import {PlayerListComponent} from "./player-list/player-list.component";
import {TransactionsListComponent} from "./transactions-list/transactions-list.component";
import {ServerConnector} from "../ServerConnector";
import {formatAmount} from "../../util";

@Component({
  selector: 'app-main',
    imports: [
        TransferToComponent,
        ReceiveFromComponent,
        PlayerListComponent,
        TransactionsListComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

    private serverConnector = inject(ServerConnector);

    @Input({required: true}) username!: string;

    userBalance = 0;

    async ngOnInit() {
        this.userBalance = await this.serverConnector.sendEvent("GET_BALANCE", this.username);

        this.serverConnector.onConnect(async () => {
            this.userBalance = await this.serverConnector.sendEvent("GET_BALANCE", this.username);
        });

        this.serverConnector.addEventHandler("TRANSACTIONS_UPDATE", ({players}) => {
            const ownPlayer = players.find(p => p.name === this.username);
            if (!ownPlayer) {
                console.error("Own player not present in transactions update");
                return;
            }
            this.userBalance = ownPlayer.balance;
        });
    }

    protected readonly formatAmount = formatAmount;
}
