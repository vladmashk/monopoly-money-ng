import {ServerToClientEvent, ServerToClientPayload, ServerToClientResponse} from "../../src/types";
import {Socket} from "socket.io";

export default class ClientConnection {

    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    async sendEvent<E extends ServerToClientEvent>(event: E, payload: ServerToClientPayload<E>): Promise<ServerToClientResponse<E>> {
        return await this.socket.emitWithAck(event, payload);
    }
}
