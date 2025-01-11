import {Player, Transaction} from "../../src/types";
import {BANK_USERNAME} from "../../src/constants";
import {startingBalance} from "../../config.json";

export default class GameState {

    private transactions: Transaction[] = []; // in chronological order

    private players: Map<string, Player> = new Map(); // TODO: construct players using transactions in constructor

    playerExists(username: string) {
        return this.players.has(username) || this.transactions.some(t => t.sender === username || t.recipient === username);
    }

    addPlayer(name: string) {
        const initialBalance = startingBalance;

        this.transactions.push({
            sender: BANK_USERNAME,
            recipient: name,
            amount: initialBalance,
            timestamp: Date.now()
        });

        this.players.set(name, {name, balance: initialBalance});
        this.transactionsUpdated(this.getTransactions(), this.getPlayers());
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

        if (transaction.sender !== BANK_USERNAME && this.players.has(transaction.sender)) {
            // case where sender not present in players is ignored on purpose
            this.players.get(transaction.sender)!.balance -= transaction.amount;
        }
        if (transaction.recipient !== BANK_USERNAME) {
            if (this.players.has(transaction.recipient)) {
                this.players.get(transaction.recipient)!.balance += transaction.amount;
            } else {
                this.players.set(transaction.recipient, {name: transaction.recipient, balance: transaction.amount});
            }
        }
        this.transactionsUpdated(this.getTransactions(), this.getPlayers());
    }

    transactionsUpdated(transactions: Transaction[], players: Player[]) {}

    getTransactions(): Transaction[] {
        return [...this.transactions];
    }

    getPlayers(): Player[] {
        return [...this.players.values()];
    }
}
