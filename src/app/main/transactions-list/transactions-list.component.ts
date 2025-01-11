import {Component, Input} from '@angular/core';
import {Transaction} from "../../../types";
import {BANK_USERNAME} from "../../../constants";
import {formatAmount, relativeTime} from "../../../util";

@Component({
    selector: 'app-transactions-list',
    imports: [],
    templateUrl: './transactions-list.component.html',
    styleUrl: './transactions-list.component.css',
    host: {
        class: "card"
    }
})
export class TransactionsListComponent {

    @Input({required: true}) username!: string;

    transactions: Transaction[] = [
        {sender: "alice", recipient: "bob", amount: 130, timestamp: 1735608732058},
        {sender: "alice", recipient: "charlie", amount: 560856, timestamp: 1736598732058},
        {sender: "charlie", recipient: BANK_USERNAME, amount: 9530, timestamp: 1736607632058},
        {sender: "bob", recipient: "alice", amount: 5, timestamp: 1736608632058},
        {sender: BANK_USERNAME, recipient: "alice", amount: 20000000, timestamp: 1736608712058},
        {sender: "charlie", recipient: "bob", amount: 850, timestamp: 1736609297679},
    ].sort((a, b) => b.timestamp - a.timestamp);

    protected readonly formatAmount = formatAmount;
    protected readonly relativeTime = relativeTime;
}
