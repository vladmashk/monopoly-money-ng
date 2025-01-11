import {Component, Input} from '@angular/core';
import {TransferToComponent} from "./transfer-to/transfer-to.component";
import {ReceiveFromComponent} from "./receive-from/receive-from.component";
import {PlayerListComponent} from "./player-list/player-list.component";
import {TransactionsListComponent} from "./transactions-list/transactions-list.component";

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
export class MainComponent  {

    @Input({required: true}) username!: string;

}
