import {Player, Transaction} from "../../src/types";
import {BANK_USERNAME} from "../../src/constants";
import {startingBalance} from "../../config.json";
import * as fs from "node:fs";
import * as fsp from "node:fs/promises";

const gameStateFilename = "gameState.json";

export default class GameState {

    private transactions: Transaction[] = []; // in chronological order

    private players: Map<string, Player> = new Map();

    constructor() {
        this.loadTransactions();
        for (const transaction of this.transactions) {
            this.updatePlayersUsingTransaction(transaction);
        }
    }

    playerExists(username: string) {
        return this.players.has(username) || this.transactions.some(t => t.sender === username || t.recipient === username);
    }

    addPlayer(name: string) {
        this.addTransaction({
            sender: BANK_USERNAME,
            recipient: name,
            amount: startingBalance,
            timestamp: Date.now()
        });
    }

    getBalanceOf(username: string): number {
        if (this.players.has(username)) {
            return this.players.get(username)!.balance;
        }

        let balance = 0;
        for (const transaction of this.transactions) {
            if (username === transaction.sender) {
                balance -= transaction.amount;
            } else if (username === transaction.recipient) {
                balance += transaction.amount;
            }
        }

        this.players.set(username, {name: username, balance});

        return balance;
    }

    canAddTransaction(transaction: Transaction) {
        if (transaction.sender === BANK_USERNAME) {
            return true;
        }
        return this.getBalanceOf(transaction.sender) >= transaction.amount;
    }

    addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);

        this.updatePlayersUsingTransaction(transaction);

        this.storeTransactions();

        this.transactionsUpdated(this.getTransactions(), this.getPlayers());

        if (transaction.sender === BANK_USERNAME) {
            this.receivedFromBank(transaction.recipient, transaction.amount);
        }
    }

    transactionsUpdated(transactions: Transaction[], players: Player[]) {}

    receivedFromBank(recipient: string, amount: number) {}

    getTransactions(): Transaction[] {
        return [...this.transactions];
    }

    getPlayers(): Player[] {
        return [...this.players.values()];
    }

    private updatePlayersUsingTransaction(transaction: Transaction) {
        if (transaction.sender !== BANK_USERNAME) {
            if (!this.players.has(transaction.sender)) {
                this.players.set(transaction.sender, {name: transaction.sender, balance: -transaction.amount});
            } else {
                this.players.get(transaction.sender)!.balance -= transaction.amount;
            }
        }
        if (transaction.recipient !== BANK_USERNAME) {
            if (!this.players.has(transaction.recipient)) {
                this.players.set(transaction.recipient, {name: transaction.recipient, balance: transaction.amount});
            } else {
                this.players.get(transaction.recipient)!.balance += transaction.amount;
            }
        }
    }

    private storeTransactions() {
        void fsp.writeFile(gameStateFilename, JSON.stringify(this.transactions, null, 2));
    }

    private loadTransactions() {
        if (fs.existsSync(gameStateFilename)) {
            this.transactions = JSON.parse(fs.readFileSync(gameStateFilename).toString());
        }
    }
}
