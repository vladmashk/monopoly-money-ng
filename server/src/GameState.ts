import {Player, Transaction} from "../../src/types";
import {BANK_USERNAME} from "../../src/constants";
import {startingBalance} from "../../config.json";

export default class GameState {

    private transactions: Transaction[] = []; // in chronological order

    // for quick retrieval; transactions is ground truth
    private players: Map<string, Player> = new Map();

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
    }

    getBalanceOf(username: string): number {
        if (this.players.has(username)) {
            return this.players.get(username)!.balance;
        }

        let money = 0;
        for (const transaction of this.transactions) {
            if (username === transaction.sender) {
                money -= transaction.amount;
            } else if (username === transaction.recipient) {
                money += transaction.amount;
            }
        }
        return money;
    }

    canAddTransaction(transaction: Transaction) {
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
    }

    getTransactions(): Transaction[] {
        return [...this.transactions];
    }

    getPlayers(): Player[] {
        return [...this.players.values()];
    }
}
