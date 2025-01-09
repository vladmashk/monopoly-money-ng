import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChipComponent} from "./chip/chip.component";

@Component({
  selector: 'app-chip-select',
    imports: [
        ChipComponent
    ],
  templateUrl: './chip-select.component.html',
  styleUrl: './chip-select.component.css'
})
export class ChipSelectComponent {

    @Input() options: {text?: string, value: string}[] = [];

    @Output() select = new EventEmitter<string | undefined>();

    protected selectedOption?: string;

    selectOption(option: string) {
        if (option === this.selectedOption) {
            this.selectedOption = undefined;
            this.select.emit(undefined);
        } else {
            this.selectedOption = option;
            this.select.emit(option);
        }
    }
}
