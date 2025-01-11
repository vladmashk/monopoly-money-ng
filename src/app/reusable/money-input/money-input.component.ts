import {Component, computed, effect, EventEmitter, Input, Output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-money-input',
    imports: [
        FormsModule
    ],
    templateUrl: './money-input.component.html',
    styleUrl: './money-input.component.css'
})
export class MoneyInputComponent {

    // First, this was an @Input(), but chrome complained about the label for mismatching for some reason
    protected id = Math.random().toString();

    @Input() label = "Amount";

    @Input() amount = signal(0);

    @Output() amountChange = new EventEmitter<number>();

    protected formattedAmount = computed(
        () => this.amount() === 0 ? "" : new Intl.NumberFormat("fr-FR").format(this.amount()).replace(",", ".")
    );

    constructor() {
        effect(() => {
            this.amountChange.emit(this.amount());
        });
    }

    onChange(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        const match = /\d+[.,]?\d*/.exec(value.replaceAll(" ", "")); // fr-FR format uses NNBSPs for thousands separators
        if (!match) {
            this.amount.set(0);
            return;
        }
        this.amount.set(parseFloat(match[0].replace(",", ".")));
    }

    x1k() {
        this.amount.update(amount => amount * 1000);
    }

    x1M() {
        this.amount.update(amount => amount * 1000000);
    }
}
