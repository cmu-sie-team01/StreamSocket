import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import HomePage from './pages/home';
import BasicTabs from './pages/SignUpTabs';
import SignInTab from './pages/SignInTabs';
import UserProfile from './component/UserProfile';
import FollowPage from './pages/FollowPage';
import NewHome from './pages/NewHome';
import UploadCard from './component/UploadCard';
import awsconfig from './aws-exports';
import Test from './component/Test';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

// eslint-disable-next-line react/prop-types
function ChildComponent({ userName }) {
  return (
    <UserProfile
      userName={userName}
    />
  );
}

function App() {
  const theme = createTheme();
  const userName2 = localStorage.getItem('username');
  const [videos, setVideos] = React.useState([]);
  console.log(videos);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme} />
      <Routes>
        <Route path="/" element={<SignInTab />} />
        <Route path="/oldhome" element={<HomePage />} />
        <Route path="signup" element={<BasicTabs />} />
        <Route path="signin" element={<SignInTab />} />
        <Route path="userprofile" element={<ChildComponent userName={userName2} />} />
        <Route path="following" element={<FollowPage />} />
        <Route path="videoupload" element={<UploadCard setVideos={setVideos} />} />
        <Route path="/newhome" element={<NewHome videos={videos} />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
