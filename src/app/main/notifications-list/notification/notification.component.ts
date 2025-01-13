import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationWithId} from "../../../../types";
import {formatAmount} from "../../../../util";

@Component({
    selector: 'app-notification',
    imports: [],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.css',
    host: {
        "(click)": "this.closeNotification()"
    }
})
export class NotificationComponent implements OnInit {

    notificationElement: ElementRef<HTMLElement>;

    @Input() notification!: NotificationWithId;

    @Output() close = new EventEmitter<string>();

    protected readonly formatAmount = formatAmount;

    constructor(hostRef: ElementRef<HTMLElement>) {
        this.notificationElement = hostRef;
    }

    closeNotification() {
        this.notificationElement.nativeElement.classList.add("disappear");
        this.notificationElement.nativeElement.onanimationend = () => {
            this.close.emit(this.notification.id)
        }
    }

    ngOnInit() {
        setTimeout(() => this.closeNotification(), 5000);
    }
}
