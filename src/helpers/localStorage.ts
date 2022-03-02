import { Session } from "./../context/session.context";

export function createValues(session: Session): void {
    const { userType, username, token } = session;
    localStorage.setItem("userType", userType);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("email", token);
}

export function retrieveValues(): Session {
    const userType = localStorage.getItem("userType") || "";
    const token = localStorage.getItem("token") || "";
    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";

    return {
        isAuthenticated: Boolean(token),
        username,
        userType,
        token,
        email
    };
}

export function deleteValues(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
}
