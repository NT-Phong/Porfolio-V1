import AppProviders from './app/providers/AppProviders';
import AppRoutes from './app/routes/AppRoutes';
import Dependency from './components/utilities/Dependency';
import HeaderV1 from './components/header/HeaderV1';
import SmoothScrollProvider from './components/utilities/SmoothScrollProvider';
import { LoadingProvider } from './hooks/useLoading';
import AppWrapper from './components/layout/AppWrapper';

export default function App() {
  return (
    <LoadingProvider>
      <SmoothScrollProvider>
        <AppWrapper>
          <Dependency />
          <HeaderV1 />
          <AppProviders>
            <AppRoutes />
          </AppProviders>
        </AppWrapper>
      </SmoothScrollProvider>
    </LoadingProvider>
  );
}
