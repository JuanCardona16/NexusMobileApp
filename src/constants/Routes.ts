export enum ConsultationsPaths {
	// Auth routes paths
	LOGIN = "/auth/login",
	REGISTER = "/auth/register",
	FORGOT_PASSWORD = "/auth/forgot-password",
	VERIFY_CODE = "/auth/verify-code",
	RESET_PASSWORD = "/auth/change-password",
	GOOGLE_LOGIN = "/auth/google",
	REFESCH_TOKEN = "/auth/refresh-token",

	// User routes paths
	GET_USER_PROFILE = "/user/profile",
	FIND_USERS_BY_USERNAME = "/user/users?search=:username",

	// Global routes paths
	GET_ALL_SUBJECTS = "/subjects",
	GET_SUBJECTS_STUDENT = "/subjects/:userId",
}

export enum PublicRoutes {
	LOGIN = "/login",
	REGISTER = "/register",
	FORGOT_PASSWORD = "/forgot-password",
	VERIFY_CODE = "/verify-code",
	RESET_PASSWORD = "/change-password",
}

export enum PrivateRoutes {
	MAIN = "/",
	PROFILE = "/profile",
	SETTINGS = "/settings",
	CALENDAR = "/calendar",
	NOTIFICATIONS = "/notifications",
}
