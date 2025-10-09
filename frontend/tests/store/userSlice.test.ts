import { describe, it, expect } from "vitest";
import userReducer, { login, logout } from "@/store/userSlice";

describe("userSlice", () => {
    it("should handle logout", () => {
        const state = {
            data: {
                "id": "68de0ecdadace54e49125790",
                "email": "clairo@gmail.com",
                "name": "clairo@gmail.com",
                "picture": "https://s.gravatar.com/l.png",
                "currency": "CAD",
                "userType": null,
                "province": "BC",
                "onBoardingCompletedAt": null,
                "createdAt": "2025-10-02T05:34:05.135Z",
                "updatedAt": "2025-10-02T05:34:05.135Z",
            }, loading: false, error: null, isAuthenticated: true
        };
        const result = userReducer(state, logout());
        expect(result.data).toBeNull();
        expect(result.isAuthenticated).toBe(false);
    });
});