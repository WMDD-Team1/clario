import { User } from "@/models";
import { UserApiResponse } from "@/api";

export function mapUser(apiUser: UserApiResponse): User {
    return {
        id: apiUser.id,
        email: apiUser.email,
        name: apiUser.name,
        picture: apiUser.picture,
        currency: apiUser.currency,
        province: apiUser.province,
        userType: apiUser.userType as "Freelancer" | "Contractor" | null,
        onBoardingCompletedAt: apiUser.onBoardingCompletedAt,
        createdAt: apiUser.createdAt,
        updatedAt: apiUser.updatedAt,
    }
}