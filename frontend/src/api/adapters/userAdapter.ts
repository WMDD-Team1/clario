import { User } from "@/models";
import { UserApiResponse } from "@/api";

export function mapUser(apiUser: UserApiResponse): User {
    return {
        auth0Id: apiUser.auth0Id,
        email: apiUser.email,
        name: apiUser.name,
        profileImage: apiUser.profileImage,
        currency: apiUser.currency,
        province: apiUser.province,
        userType: apiUser.userType as "Freelancer" | "Contractor",
        onBoardingCompletedAt: new Date(apiUser.onBoardingCompletedAt),
    }
}