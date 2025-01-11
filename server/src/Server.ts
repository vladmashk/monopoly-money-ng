import ClientConnector from "./ClientConnector";
import GameState from "./GameState";
import {UsernameError} from "../../src/types";
import {BANK_USERNAME} from "../../src/constants";

class Server {

    private clientConnector = new ClientConnector();

    private gameState = new GameState();

    constructor() {
        this.clientConnector.addEventHandler(
            "NEW_PLAYER",
            async (name) => {
                if (name === "") {
                    return {ok: false, error: UsernameError.INVALID};
                }
                if (name === BANK_USERNAME) {
                    return {ok: false, error: UsernameError.NOT_ALLOWED};
                }
                if (this.gameState.playerExists(name)) {
                    return {ok: true};
                }
                this.gameState.addPlayer(name);
                return {ok: true};
            }
        ).addEventHandler(
            "GET_BALANCE",
            async (name) => {
                if (!this.gameState.playerExists(name)) {
                    error(`Getting balance of non-existent player: ${name}`);
                }
                return this.gameState.getBalanceOf(name);
            }
        ).addEventHandler(
            "GET_PLAYERS",
            async () => {
                return this.gameState.getPlayers();
            }
        ).addEventHandler(
            "GET_TRANSACTIONS",
            async () => {
                return this.gameState.getTransactions();
            }
        ).addEventHandler(
            "ADD_TRANSACTION",
            async (transaction) => {
                if (this.gameState.canAddTransaction(transaction)) {
                    this.gameState.addTransaction(transaction);
                } else {
                    error(`Attempt to add invalid transaction: ${JSON.stringify(transaction)}`);
                }
            }
        );

        this.gameState.transactionsUpdated = (transactions, players) => {
            this.clientConnector.sendEventToAll("TRANSACTIONS_UPDATE", {transactions, players});
        }

        this.clientConnector.startListening();
        console.log("Server started");
    }
}

function error(msg?: string) {
    throw new Error(msg); // TODO: change to console.error when finished
}

new Server();
