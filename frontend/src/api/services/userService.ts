import { UserApiResponse } from "@/api";
import api from "../api";

export async function fetchUserById(auth0Id: string): Promise<UserApiResponse> {
    const res = await api.post<UserApiResponse>('/auth/login', { id: auth0Id });
    return res.data;
}

export async function createUser(data: {
    auth0Id: string;
    email: string;
    name: string;
    profileImage: string;
    currency: string;
    province: string;
    userType: "Freelancer" | "Contractor";
    onBoardingCompletedAt: string;
}): Promise<UserApiResponse> {
    const res = await api.post('/auth/signup', data);
    return res.data as UserApiResponse;
}