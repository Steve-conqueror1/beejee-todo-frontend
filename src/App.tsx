import React, { FC } from "react";
import { ButtonAppBar } from "./components/navigation/AppBar";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/security/Login";
import { Registration } from "./pages/registration/Registration";
import { CreateTask } from "./pages/task/CreateTask";
import { SessionProvider } from "./context/session.context";
import {EditTask} from "./pages/task/EditTask";

const App: FC = () => {
    return (
        <SessionProvider>
            <Router>
                <ButtonAppBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/tasks/create" element={<CreateTask />} />
                    <Route path="/tasks/update/:id" element={<EditTask />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </SessionProvider>
    );
};

export default App;
