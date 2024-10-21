import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CompanyPage from "../page/company/companyPage";
import ContactPage from "../page/contact/contactPage";
import LeadsContactPage from "../page/settings/leadsCOntactPage/leadsContactPage";
import SettingsPage from "../page/settings/settingsPage";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { setApiMessage } from "../store/slices/apiMessage";
import DealsPipelinePage from "../page/settings/dealsPipelinePage/dealsPipelinePage";
import TeamsPage from "../page/settings/teamsPage/teamsPage";
import ContactMapingPage from "../page/settings/leadsCOntactPage/contactMapingPage";
import MailPage from "../page/Conversation/page";
import ImportDataPage from "../page/settings/importDataPage/importDatapage";
import ImportHistoryPage from "../components/form/settingForm/importHistoryPage";
import SalesSequences from "../page/Conversation/Sequences/Sequences";
import OtherMailForm from "../components/form/Email/otherMailForm";
import AddSignatureFrom from "../components/form/settingForm/addSignatureFrom";

const App = loadable(() => import("../container/App"));
const Dashboard = loadable(() => import("../page/dashboard/dashboard"));
const LoginPage = loadable(() => import("../page/LoginPage"));

const AdminLoggedIn = () => !!localStorage.getItem("cmsToken");

const ProtectedRoute = ({
    children,
    check,
    to = "/",
}: {
    children: JSX.Element;
    check?: boolean;
    to?: string;
}) => {
    if (check) return children;
    return <Navigate to={to} replace />;
};

const AppRoutes = () => {
    const dispatch = useAppDispatch();
    const apiMessage = useAppSelector((state) => state.apiMessage);
    const accessToken = useAppSelector((state) => state.authState.accessToken);

    useEffect(() => {}, [accessToken]);
    console.log(accessToken)
    useEffect(() => {
        if (apiMessage.message) {
            toast(apiMessage.message, {
                type: apiMessage.type === "Error" ? "error" : "success",
            });
        }

        const timeoutId = setTimeout(() => {
            dispatch(setApiMessage({ message: "", type: "" }));
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [dispatch, apiMessage]);
    return (
        <Routes>
            <Route index element={<Navigate to={AdminLoggedIn() ? "/dashboard" : "/login"} replace />} />
            <Route
                path="login"
                element={
                    <ProtectedRoute check={!AdminLoggedIn()} to="/dashboard">
                        <LoginPage />
                    </ProtectedRoute>
                }
            />
            <Route
                element={
                    <ProtectedRoute check={AdminLoggedIn()}>
                        <App />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route element={<SettingsPage />}>
                    <Route path="/leads-contact" element={<LeadsContactPage />} />
                    <Route path="/deals-pipelines" element={<DealsPipelinePage />} />
                    <Route path="/teams" element={<TeamsPage />} />
                    <Route path="/import-data" element={<ImportDataPage />} />
                    <Route path="/settings/signature" element={<AddSignatureFrom />} />
                </Route>
                <Route path="/import-history" element={<ImportHistoryPage />} />
                <Route path="/contact-map" element={<ContactMapingPage />} />
                <Route path="/conversation" element={<MailPage />} />
                <Route path="/connect-other" element={<OtherMailForm />} />
                <Route path="/sequences" element={<SalesSequences />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
