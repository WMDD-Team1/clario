export interface UserApiResponse {
    id: string;
    email: string;
    name: string;
    picture: string;
    currency: string;
    province: string;
    userType: "Freelancer" | "Contractor" | null;
    onBoardingCompletedAt: string;
    createdAt: string;
    updatedAt: string;
}