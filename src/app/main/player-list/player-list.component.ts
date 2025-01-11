import {Component, Input} from '@angular/core';
import {Player} from "../../../types";
import {formatAmount} from "../../../util";

@Component({
    selector: 'app-player-list',
    imports: [],
    templateUrl: './player-list.component.html',
    styleUrl: './player-list.component.css',
    host: {
        class: "card"
    }
})
export class PlayerListComponent { // TODO: highlight own player row

    @Input({required: true}) username!: string;

    players: Player[] = [
        {name: "alice", balance: 1200},
        {name: "bob", balance: 43800},
        {name: "charlie", balance: 350}
    ].sort((a, b) => b.balance - a.balance);

    protected readonly formatAmount = formatAmount;
}
