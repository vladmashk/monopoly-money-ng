import {Component, Input, OnInit} from '@angular/core';
import {relativeTime} from "../../../../util";

@Component({
  selector: 'app-time-cell',
  imports: [],
  templateUrl: './time-cell.component.html',
  styleUrl: './time-cell.component.css'
})
export class TimeCellComponent implements OnInit {

    @Input({required: true}) timestamp!: number;

    relativeTimeString = "";

    ngOnInit() {
        this.relativeTimeString = relativeTime(this.timestamp);
        const interval = setInterval(() => {
            this.relativeTimeString = relativeTime(this.timestamp);
            if (Date.now() - this.timestamp > 60000) {
                clearInterval(interval);
                setInterval(() => {
                    this.relativeTimeString = relativeTime(this.timestamp);
                }, 60000);
            }
        }, 1000);
    }
}
