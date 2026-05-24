import { Navigate, Route, Routes } from 'react-router-dom';

import { PhoneFrame } from '@/components/PhoneFrame';
import { MainAppLayout } from '@/layouts/MainAppLayout';
import { AuthPage } from '@/pages/AuthPage';
import { DonePage } from '@/pages/DonePage';
import { HomeTabPage } from '@/pages/HomeTabPage';
import { MatchesTabPage } from '@/pages/MatchesTabPage';
import { ProfileTabPage } from '@/pages/ProfileTabPage';
import { ConfirmPasswordPage } from '@/pages/ConfirmPasswordPage';
import { CreatePasswordPage } from '@/pages/CreatePasswordPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { SignInPage } from '@/pages/SignInPage';
import { VerifyPage } from '@/pages/VerifyPage';
import { WelcomePage } from '@/pages/WelcomePage';
import { profileRoutes } from '@/routes/profileRoutes';

export default function App() {
  return (
    <PhoneFrame>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/create-password" element={<CreatePasswordPage />} />
        <Route path="/confirm-password" element={<ConfirmPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {profileRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route element={<MainAppLayout />}>
          <Route path="/home" element={<HomeTabPage />} />
          <Route path="/matches" element={<MatchesTabPage />} />
          <Route path="/profile" element={<ProfileTabPage />} />
        </Route>
        <Route path="/done" element={<DonePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PhoneFrame>
  );
}
