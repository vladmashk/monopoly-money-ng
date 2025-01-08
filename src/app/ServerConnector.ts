import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {
    ClientToServerEvent,
    ClientToServerPayload,
    ClientToServerResponse,
    ServerToClientEvent,
    ServerToClientPayload, ServerToClientResponse
} from "../types";

@Injectable({providedIn: "root"})
export class ServerConnector {

    private socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    get connected() {
        return this.socket.connected;
    }

    async sendEvent<E extends ClientToServerEvent>(event: E, payload: ClientToServerPayload<E>): Promise<ClientToServerResponse<E>> {
        return this.socket.emitWithAck(event, payload);
    }

    addEventHandler<E extends ServerToClientEvent>(event: E, eventHandler: (payload: ServerToClientPayload<E>) => ServerToClientResponse<E>) {
        this.socket.on(event, (payload: ServerToClientPayload<E>, reply: (...args: unknown[]) => void) => {
            const response = eventHandler(payload);
            reply(response);
        });
    }
}
