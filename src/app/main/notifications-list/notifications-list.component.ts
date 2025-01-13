import {Component, inject, Input, OnInit} from '@angular/core';
import {NotificationWithId} from "../../../types";
import {ServerConnector} from "../../ServerConnector";
import {v4 as uuidV4} from 'uuid';
import {NotificationComponent} from "./notification/notification.component";

@Component({
    selector: 'app-notifications-list',
    imports: [
        NotificationComponent
    ],
    templateUrl: './notifications-list.component.html',
    styleUrl: './notifications-list.component.css'
})
export class NotificationsListComponent implements OnInit {

    private serverConnector = inject(ServerConnector);

    @Input({required: true}) username!: string;

    notifications: NotificationWithId[] = [];

    closeNotification(notificationId: string) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
    }

    ngOnInit() {
        this.serverConnector.addEventHandler("NOTIFICATION", (notification) => {
            if (notification.type === "receive-from-bank" && notification.recipient === this.username) return;
            this.notifications.unshift({...notification, id: uuidV4()});
        });
    }
}
