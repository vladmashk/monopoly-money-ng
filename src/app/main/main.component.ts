import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {TransferToComponent} from "./transfer-to/transfer-to.component";
import {ReceiveFromComponent} from "./receive-from/receive-from.component";
import {PlayerListComponent} from "./player-list/player-list.component";
import {TransactionsListComponent} from "./transactions-list/transactions-list.component";
import {ServerConnector} from "../ServerConnector";
import {formatAmount} from "../../util";
import {NotificationsListComponent} from "./notifications-list/notifications-list.component";

let wakeLock: WakeLockSentinel;

@Component({
  selector: 'app-main',
    imports: [
        TransferToComponent,
        ReceiveFromComponent,
        PlayerListComponent,
        TransactionsListComponent,
        NotificationsListComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

    private serverConnector = inject(ServerConnector);

    @Input({required: true}) username!: string;

    userBalance = 0;

    protected readonly formatAmount = formatAmount;

    @Output() logOut = new EventEmitter();

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
    }
}
