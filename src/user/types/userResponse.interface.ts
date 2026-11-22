// Response shape from the RealWorld spec: https://docs.realworld.show/specifications/backend/api-response-format/#users-for-authentication
export interface UserResponse {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}
