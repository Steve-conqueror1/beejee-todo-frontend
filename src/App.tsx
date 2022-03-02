import React, { FC } from "react";
import { ButtonAppBar } from "./components/inputs/shared/navigation/AppBar";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Registration } from "./pages/registration/Registration";
import { EditTask } from "./pages/task/EditTask";
import { CreateTask } from "./pages/task/CreateTask";
import { AuthContext } from "./context/AuthContext";

const App: FC = () => {
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: false,
                userType: null,
                token: null,
                email: null,
                login: () => {},
                logout: () => {},
            }}
        >
            <Router>
                <ButtonAppBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/tasks/create" element={<CreateTask />} />
                    <Route path="/tasks/update" element={<EditTask />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
