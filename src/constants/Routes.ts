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

  // Team routes paths
  GET_TEAM_INFO = "/team/info",
  CREATE_TEAM = "/team/create",
  UPDATE_TEAM = "/team/update",
  DELETE_TEAM = "/team/delete",
  GET_TEAM_BY_ID = "/team/:uuid",
  ADD_MEMBER = "/team/add-member",
  REMOVE_MEMBER = "/team/remove-member",
  LEAVE_TEAM = "/team/leave",
  JOIN_TEAM = "/team/join",
  TEAM_INVITE = "/team/invite",
  TEAM_ARCHIVE = "/team/archive",
  TEAM_LIST = "/team/list",
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
  PROJECTS = "/projects",
  TASKS = "/tasks",
  CALENDAR = "/calendar",
  CHATS = "/chats",
  MEMBERS = "/members",
  MEETINGS = "/meetings",
  DOCUMENTS = "/documents",
  CONTACTS = "/contacts",
  NOTIFICATIONS = "/notifications",
  DASHBOARD = "/dashboard",
  HELPS = "/help",
  FRIENDS = "/friends",
  CHAT_OVERVIEW = "/chat-overview/:uuid",

  // Teams
  TEAM_OVERVIEW = "/team-overview/:uuid",
}