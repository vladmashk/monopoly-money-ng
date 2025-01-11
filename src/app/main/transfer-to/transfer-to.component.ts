import {Component, inject, Input, OnInit} from '@angular/core';
import {ChipSelectComponent} from "../../reusable/chip-select/chip-select.component";
import {MoneyInputComponent} from "../../reusable/money-input/money-input.component";
import {BANK_USERNAME} from "../../../constants";
import {ServerConnector} from "../../ServerConnector";
import {Player} from "../../../types";

type ChipDisplayPlayer = {text?: string, value: string};

@Component({
    selector: 'app-transfer-to',
    imports: [
        ChipSelectComponent,
        MoneyInputComponent
    ],
    templateUrl: './transfer-to.component.html',
    styleUrl: './transfer-to.component.css',
    host: {
        class: "card"
    }
})
export class TransferToComponent implements OnInit {

    private serverConnector = inject(ServerConnector);

    @Input({required: true}) username!: string;

    @Input({required: true}) userBalance!: number;

    players: ChipDisplayPlayer[] = [];

    selectedPlayer?: string;

    transferAmount = 0;

    errorMessage?: string;

    transfer() {
        if (!this.selectedPlayer || this.transferAmount === 0) return;
        this.errorMessage = undefined;
        if (!Number.isInteger(this.transferAmount)) {
            this.errorMessage = "Amount must be a whole number";
            return;
        }
        if (this.transferAmount > this.userBalance) {
            this.errorMessage = "You cannot afford this transfer";
            return;
        }

        void this.serverConnector.sendEvent("ADD_TRANSACTION", {
            sender: this.username,
            recipient: this.selectedPlayer,
            amount: this.transferAmount,
            timestamp: Date.now()
        });

        this.selectedPlayer = undefined;
    }

    private setPlayers(players: Player[]) {
        this.players = bankPlayer.concat(
            players.filter(p => p.name !== this.username)
                   .map(p => ({value: p.name}))
                   .sort((a, b) => a.value.localeCompare(b.value))
        );
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

const bankPlayer: ChipDisplayPlayer[] = [{text: "🏦 " + BANK_USERNAME, value: BANK_USERNAME}];
