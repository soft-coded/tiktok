import { apiClient } from ".";
import { LoginData, SignupData } from "../types";

const authRoute = "/auth";

export const login = (payload: LoginData) =>
	apiClient.post(authRoute + "/login", payload);

export const signup = (payload: SignupData) =>
	apiClient.post(authRoute + "/signup", payload);
