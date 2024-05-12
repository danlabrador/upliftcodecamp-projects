import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/private/DashboardPage';
import Login from './pages/public/Login';
import PrivateLayout from './pages/private/PrivateLayout';
import PublicLayout from './pages/public/PublicLayout';
import CoursePage from './pages/private/CoursePage';
import CoursesPage from './pages/private/CoursesPage';
import { useLoadUser } from './hooks/useLoadUser';
import PortalContainer from './components/PortalContainer';
import { PortalContentWithAside } from './components/PortalContentWithAside';

const NotFoundPage = () => {
  const breadcrumbs = [{ text: 'Dashboard', to: '/dashboard' }, { text: '404 Not Found' }];
  return (
    <PortalContainer breadcrumbs={breadcrumbs}>
      <PortalContentWithAside>
        <div className='space-y-4'>
          <h1 className='text-5xl font-bold'>Uh-Ohhh...</h1>
          <p className='text-lg'>The page you are looking for may have been moved, deleted, or possibly never existed.</p>
        </div>
      </PortalContentWithAside>
    </PortalContainer>
  );
};

function App() {
  const { user, isLoading } = useLoadUser();

  if (isLoading) {
    return <div></div>;
  }

  const layout = user.data === null ? (
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Route>
  ) : (
    <Route element={<PrivateLayout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:courseId" element={<CoursePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  );

  return <Routes>{layout}</Routes>;
}

export default App;
