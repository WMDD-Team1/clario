export interface UserApiResponse {
    auth0Id: string;
    email: string;
    name: string;
    profileImage: string;
    currency: string;
    province: string;
    userType: "Freelancer" | "Contractor";
    onBoardingCompletedAt: string;
}