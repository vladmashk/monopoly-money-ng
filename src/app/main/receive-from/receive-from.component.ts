import {Component, signal} from '@angular/core';
import {MoneyInputComponent} from "../../reusable/money-input/money-input.component";
import {passGoReward} from "../../../../config.json";
import {formatAmount} from "../../../util";

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
        // TODO
        console.log("sending", receiveAmount)
    }
}
