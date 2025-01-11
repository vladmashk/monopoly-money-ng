import {Component, inject, Input, signal} from '@angular/core';
import {MoneyInputComponent} from "../../reusable/money-input/money-input.component";
import {passGoReward} from "../../../../config.json";
import {formatAmount} from "../../../util";
import {ServerConnector} from "../../ServerConnector";
import {BANK_USERNAME} from "../../../constants";

@Component({
    selector: 'app-receive-from',
    imports: [
        MoneyInputComponent
    ],
    templateUrl: './receive-from.component.html',
    styleUrl: './receive-from.component.css',
    host: {
        class: "card"
    }
})
export class ReceiveFromComponent {

    private serverConnector = inject(ServerConnector);

    @Input({required: true}) username!: string;

    receiveAmount = signal(0);

    protected readonly passGoRewardString = formatAmount(passGoReward);

    receive() {
        this.sendTransaction(this.receiveAmount());
        this.receiveAmount.set(0);
    }

    passGo() {
        this.sendTransaction(passGoReward);
    }

    sendTransaction(receiveAmount: number) {
        void this.serverConnector.sendEvent("ADD_TRANSACTION", {
            sender: BANK_USERNAME,
            recipient: this.username,
            amount: receiveAmount,
            timestamp: Date.now()
        });
    }
}
