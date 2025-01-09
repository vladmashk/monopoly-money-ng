import {Component} from '@angular/core';
import {ChipSelectComponent} from "../../reusable/chip-select/chip-select.component";
import {MoneyInputComponent} from "../../reusable/money-input/money-input.component";
import {BANK_USERNAME} from "../../../constants";

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
export class TransferToComponent {

    players = [
        {text: "🏦 " + BANK_USERNAME, value: BANK_USERNAME},
        {value: "alice"},
        {value: "bob"},
        {value: "charlie"}
    ];

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
        // TODO: check if you can afford this, and transfer

        this.selectedPlayer = undefined;
    }
}
