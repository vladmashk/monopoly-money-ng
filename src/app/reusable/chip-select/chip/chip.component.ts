import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-chip',
    imports: [],
    templateUrl: './chip.component.html',
    styleUrl: './chip.component.css',
    host: {
        "[class.selected]": "selected"
    }
})
export class ChipComponent {
    @Input() text?: string;

    @Input({required: true}) value!: string;

    @Input() selected = false;
}
