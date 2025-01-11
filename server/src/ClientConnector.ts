import {Server} from "socket.io";
import express from "express";
import {createServer} from "http";
import {
    ClientToServerEvent,
    ClientToServerPayload,
    ClientToServerResponse,
    ServerToClientEvent,
    ServerToClientPayload
} from "../../src/types";
import ClientConnection from "./ClientConnection";
import {SOCKET_SERVER_PORT} from "../../src/constants";

export default class ClientConnector {

    private io;

    private httpServer;

    // for specific types, see addEventHandler method
    private eventHandlers: Map<string, Function> = new Map();

    constructor() {
        const prod = process.env.NODE_ENV === "production";
        const app = express();
        this.httpServer = createServer(app);

        if (prod) {
            console.log("Server in production mode");
            app.use(express.static("dist/monopoly-money-ng/browser"));
        }

        this.io = new Server(this.httpServer, {
            cors: {origin: "*"}
        });

        this.io.on("connection", socket => {
            for (const [event, handler] of this.eventHandlers) {
                socket.on(event, async (payload: unknown, reply: (...args: unknown[]) => void) => {
                    const response = await handler(payload, new ClientConnection(socket));
                    reply(response);
                });
            }
        });
    }

    startListening() {
        this.httpServer.listen(SOCKET_SERVER_PORT);
    }

    sendEventToAll<E extends ServerToClientEvent>(event: E, payload: ServerToClientPayload<E>) {
        this.io.emit(event, payload);
    }

    addEventHandler<E extends ClientToServerEvent>(event: E, eventHandler: (payload: ClientToServerPayload<E>, connection: ClientConnection) => Promise<ClientToServerResponse<E>>) {
        this.eventHandlers.set(event, eventHandler);
        return this;
    }
}
