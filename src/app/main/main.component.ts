import { Component } from '@angular/core';
import {TransferToComponent} from "./transfer-to/transfer-to.component";
import {ReceiveFromComponent} from "./receive-from/receive-from.component";

@Component({
  selector: 'app-main',
    imports: [
        TransferToComponent,
        ReceiveFromComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  {

}
