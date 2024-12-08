import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Chart from "./pages/Chart";
import AdminDashboard from "./pages/Dashboard/ExamPortal";
import FormElements from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";
import Profile from "./pages/Profile";
import DataHubApp from "./pages/Welcome";
import Settings from "./pages/Settings";
import DefaultLayout from "./layout/DefaultLayout";
import Category from "./pages/Questions/categoryselector";
import ViewPlainQuestion from "./pages/Questions/viewPlainQuestion";
import SelectCourse from "./pages/Questions/selectCourse";
import SelectGroupedQuestion from "./pages/Questions/selectGroupedQuestion";
import ChallengeForm from "./pages/Challenges/challenge";
import ViewExerciseQuestionPage from "./pages/ViewGeneralQuestionPage/viewGeneralQuestionPage";
import ViewPlainQuestionsPage from "./pages/ViewQuestionsPage/ViewPlainQuestionsPage";
import ViewDirectionsPage from "./pages/viewDirectionsPage/ViewDirectionsPage";
import { ViewGroupedQuestionsPage } from "./pages/viewGroupedQuestionPage/ViewGroupedQuestionPage";
import ViewMaterialResourcePage from "./pages/ViewMaterialResourcePage/ViewMaterialResourcePage";
import ViewExamCategory from "./pages/ViewExamCategory/ViewExamCategory";
import AdminNotification from "./components/AdminNotification";


import AdminPublicLogin from "../src/pages/publicLogin/AdminPublicLogin";
import ClerkAuthPage from "../src/pages/ClerkAuthPage/ClerkAuthPage";
import AdminLogin from "../src/pages/AdminLogin/AdminLogin";
import AdminUserDataView from "../src/pages/Admin/AdminUserDataView";
import {SystemAdminRouteGuard} from "../src/components/SystemAdminGuard";
import AddNewQuestion from "./pages/Questions/SelectPlainQuestion";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); 
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>

        <Route path="/" element={<><PageTitle title="Categories" /><AdminPublicLogin /></>} />
        <Route path="data" element={<><PageTitle title="Categories" /><DataHubApp /></>} />
        <Route path="clerk-auth" element={<><PageTitle title="Clerk Auth" /><ClerkAuthPage /></>} />
        <Route path="admin-login" element={<><PageTitle title="Admin Login" /><AdminLogin /></>} />

        <Route
  path="admin"
  element={
    <SystemAdminRouteGuard>
      <>
        <PageTitle title="Admin Dashboard" />
        <AdminUserDataView />
      </>
    </SystemAdminRouteGuard>
  }
>
  <Route index element={<AdminDashboard />} />
</Route>


        <Route path="/profile" element={<><PageTitle title="Profile" /><Profile /></>} />
        <Route path="/forms/form-elements" element={<><PageTitle title="Form Elements" /><FormElements /></>} />
        <Route path="/forms/form-layout" element={<><PageTitle title="Form Layout" /><FormLayout /></>} />
        <Route path="/settings" element={<><PageTitle title="Settings" /><Settings /></>} />
        <Route path="/chart" element={<><PageTitle title="Basic Chart" /><Chart /></>} />
        <Route path="/welcome" element={<><PageTitle title="Welcome" /><DataHubApp /></>} />
        <Route path="/auth/signin" element={<><PageTitle title="Sign In" /><SignIn /></>} />
        <Route path="/auth/signup" element={<><PageTitle title="Sign Up" /><SignUp /></>} />

        <Route path="/add-new-question" element={<><PageTitle title="Add New Question" /><AddNewQuestion /></>} />
        <Route path="/selectcourse" element={<><PageTitle title="Select Course" /><SelectCourse /></>} />
        <Route path="/category" element={<><PageTitle title="Category Selector" /><Category /></>} />
        <Route path="/viewplainquestions" element={<><PageTitle title="View Plain Questions" /><ViewPlainQuestion /></>} />
        <Route path="/selectgroupedquestion" element={<><PageTitle title="Select Grouped Questions" /><SelectGroupedQuestion /></>} />
        <Route path="/challenges" element={<><PageTitle title="Challenges" /><ChallengeForm /></>} />
        <Route path="/view-plain-questions" element={<><PageTitle title="Plain Questions" /><ViewPlainQuestionsPage /></>} />
        <Route path="/view-directions" element={<><PageTitle title="Directions" /><ViewDirectionsPage /></>} />
        <Route path="/view-grouped-questions" element={<><PageTitle title="Grouped Questions" /><ViewGroupedQuestionsPage /></>} />
        <Route path="/view-general-question" element={<><PageTitle title="General Question" /><ViewExerciseQuestionPage /></>} />
        <Route path="/view-exercise-questions" element={<><PageTitle title="Exercise Questions" /><ViewExerciseQuestionPage /></>} />
        <Route path="/view-material-resource" element={<><PageTitle title="Material Resource" /><ViewMaterialResourcePage /></>} />
        <Route path="/view-exam-categories" element={<><PageTitle title="Exam Categories" /><ViewExamCategory /></>} />
        <Route path="/admin-notification" element={<><PageTitle title="Admin Notification" /><AdminNotification /></>} />


        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
