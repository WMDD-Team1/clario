import mongoose from 'mongoose';
import { Transaction } from '../../../src/models/index.js';
import * as TransactionService from '../../../src/services/transactions/TransactionsService.js';
import { clearDB, closeDB, connectDB } from '../setup/dbMock.js';

beforeAll(connectDB);
afterEach(clearDB);
afterAll(closeDB);

describe("Transaction Service Unit Test", () => {
    const userId = new mongoose.Types.ObjectId();

    beforeEach(async () => {
        const transactions = [
            {
                userId,
                type: "income",
                date: new Date(),
                amount: 500,
                origin: "INV-002"
            },
            {
                userId,
                type: "expense",
                date: new Date(),
                amount: -450,
                origin: "INV-003"
            }
        ];
        await Transaction.insertMany(transactions);
    });

    it("should return paginated transactions", async () => {
        const result = await TransactionService.findAll(userId, 1, 10);
        expect(result.data).toHaveLength(2);
        expect(result.meta.total).toBe(2);
        expect(result.meta.page).toBe(1);
        expect(result.meta.limit).toBe(10);
        expect(result.meta.totalPages).toBe(1);
    });

    it("should find one transaction by ID", async () => {
        const tx = await Transaction.findOne({ origin: "INV-003" });
        const result = await TransactionService.findOneById(tx.id, userId);
        expect(result.origin).toBe("INV-003");
    });

    it("should create a new transaction", async () => {
        const data = {
            type: "income",
            date: new Date(),
            amount: 300,
            origin: "INV-004"
        }

        const newTransaction =await TransactionService.create(data, userId);

        expect(newTransaction).toHaveProperty("id");
        expect(newTransaction.userId.toString()).toBe(userId.toString());
        expect(newTransaction.origin).toBe("INV-004");
    });

    it("should update transaction info", async () => {
        const tx = await Transaction.findOne({ origin: "INV-003" });
        const newOrigin = "OUT-001";
        
        const updated = await TransactionService.update(tx.id, userId, {
            origin: newOrigin
        });
        
        expect(updated.origin).toBe(newOrigin);
    });

    it("should archive a transaction", async () => {
        const tx = await Transaction.findOne({ origin: "INV-003" });
        expect(tx.isArchived).toBe(false);

        const archivedTransaction = await TransactionService.archive(tx.id, userId, true);

        expect(archivedTransaction.isArchived).toBe(true);
    })
});