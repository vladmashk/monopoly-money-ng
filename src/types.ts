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
    GET_PLAYERS: () => Player[],
    GET_TRANSACTIONS: () => Transaction[]
    ADD_TRANSACTION: (transaction: Transaction) => void,
}

export type ClientToServerEvent = keyof ClientToServerEvents;

export type ClientToServerPayload<E extends ClientToServerEvent> = Parameters<ClientToServerEvents[E]>[0];

export type ClientToServerResponse<E extends ClientToServerEvent> = ReturnType<ClientToServerEvents[E]>;


export interface ServerToClientEvents {
    TRANSACTIONS_UPDATE: (payload: {transactions: Transaction[], players: Player[]}) => void,
    NOTIFICATION: (notification: Notification) => void
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

export type Notification = {
    type: "receive-from-bank",
    recipient: string,
    amount: number
}

export interface NotificationWithId extends Notification {
    id: string
}

// Error types

export enum UsernameError {
    INVALID = "The name you have chosen is invalid",
    NOT_ALLOWED = "The name you have chosen is not allowed"
}
