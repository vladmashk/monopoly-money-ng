import {Component} from '@angular/core';
import {MoneyInputComponent} from "../../reusable/money-input/money-input.component";

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

    receiveAmount = 0;
}
