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
import SelectPlainQuestion from "./pages/Questions/SelectPlainQuestion";
import SelectCourse from "./pages/Questions/selectCourse";
import SelectGroupedQuestion from "./pages/Questions/selectGroupedQuestion";
import ChallengeForm from "./pages/Challenges/challenge";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route index element={<><PageTitle title="Exam Portal" /><AdminDashboard /></>} />
        <Route path="/profile" element={<><PageTitle title="Profile" /><Profile /></>} />
        <Route path="/forms/form-elements" element={<><PageTitle title="Form Elements" /><FormElements /></>} />
        <Route path="/forms/form-layout" element={<><PageTitle title="Form Layout" /><FormLayout /></>} />
        <Route path="/settings" element={<><PageTitle title="Settings" /><Settings /></>} />
        <Route path="/chart" element={<><PageTitle title="Basic Chart" /><Chart /></>} />
        <Route path="/welcome" element={<><PageTitle title="DataHubApp" /><DataHubApp /></>} />
        <Route path="/auth/signin" element={<><PageTitle title="Sign In" /><SignIn /></>} />
        <Route path="/auth/signup" element={<><PageTitle title="Sign Up" /><SignUp /></>} />
       
       
        <Route path="/selectplainquestion" element={<><PageTitle title="Categories" /><SelectPlainQuestion /></>} />
        <Route path="/selectcourse" element={<><PageTitle title="Categories" /><SelectCourse /></>} />
        <Route path="/category" element={<><PageTitle title="Categories" /><Category /></>} />
        <Route path="/viewplainquestions" element={<><PageTitle title="Categories" /><ViewPlainQuestion /></>} />
        <Route path="/SelectGroupedQuestion" element={<><PageTitle title="Categories" /><SelectGroupedQuestion /></>} />
        <Route path="/challenges" element={<><PageTitle title="Categories" /><ChallengeForm /></>} />

        

        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;