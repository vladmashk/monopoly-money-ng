// Communication types

export type Ack<E> =
    | { ok: true; }
    | { ok: false; error: E };

export type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E };

interface ClientToServerEvents {
    NEW_PLAYER: (name: string) => Ack<UsernameError>,
    GET_BALANCE: (name: string) => number,
    GET_PLAYERS: (payload: void) => Player[],
    GET_TRANSACTIONS: (payload: void) => Transaction[]
    ADD_TRANSACTION: (transaction: Transaction) => void,
}

export type ClientToServerEvent = keyof ClientToServerEvents;

export type ClientToServerPayload<E extends ClientToServerEvent> = Parameters<ClientToServerEvents[E]>[0];

export type ClientToServerResponse<E extends ClientToServerEvent> = ReturnType<ClientToServerEvents[E]>;


export interface ServerToClientEvents {
    NOTIFICATION: (notification: "TODO") => void // TODO
}

export type ServerToClientEvent = keyof ServerToClientEvents;

export type ServerToClientPayload<E extends ServerToClientEvent> = Parameters<ServerToClientEvents[E]>[0];

export type ServerToClientResponse<E extends ServerToClientEvent> = ReturnType<ServerToClientEvents[E]>;

// Core types

export interface Transaction {
    sender: string,
    recipient: string,
    amount: number,
    timestamp: number
}

export interface Player {
    name: string,
    balance: number
}

// Error types

export enum UsernameError {
    ALREADY_EXISTS = "There is already a player with this name",
    INVALID = "The name you have chosen is invalid",
    NOT_ALLOWED = "The name you have chosen is not allowed"
}
