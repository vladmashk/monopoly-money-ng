import {Component, inject, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../types";
import {formatAmount, relativeTime} from "../../../util";
import {ServerConnector} from "../../ServerConnector";

@Component({
    selector: 'app-transactions-list',
    imports: [],
    templateUrl: './transactions-list.component.html',
    styleUrl: './transactions-list.component.css',
    host: {
        class: "card"
    }
})
export class TransactionsListComponent implements OnInit {

    private serverConnector = inject(ServerConnector);

    @Input({required: true}) username!: string;

    transactions: Transaction[] = [];

    protected readonly formatAmount = formatAmount;
    protected readonly relativeTime = relativeTime;

    setTransactions(transactions: Transaction[]) {
        this.transactions = transactions.sort((a, b) => b.timestamp - a.timestamp);
    }

    async ngOnInit() {
        this.setTransactions(await this.serverConnector.sendEvent("GET_TRANSACTIONS"));

        this.serverConnector.onConnect(async () => {
            this.setTransactions(await this.serverConnector.sendEvent("GET_TRANSACTIONS"));
        });

        this.serverConnector.addEventHandler("TRANSACTIONS_UPDATE", ({transactions}) => {
            this.setTransactions(transactions);
        });
    }
}
