import { UserApiResponse } from "@/api";
import api from "../api";

/**
 * Fetches a user by their ID. The ID will be inserted automatically from the JWT token.
 * @returns A promise that resolves to a UserApiResponse object
 */
export async function fetchUserById(): Promise<UserApiResponse> {
    const res = await api.post<UserApiResponse>('/auth/login');
    return res.data;
}

/**
 * Creates a new user in the backend.
 * A user will be created with id, name, email and picture from the JWT token.
 * @returns A promise that resolves to the created UserApiResponse object
 */
export async function createUser(): Promise<UserApiResponse> {
    const res = await api.post('/auth/signup');
    return res.data as UserApiResponse;
}