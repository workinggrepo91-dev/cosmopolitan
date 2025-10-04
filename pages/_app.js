import '../styles/globals.css';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;

  // Define which routes should use the shared layout
  const dashboardRoutes = ['/dashboard', '/profile'];

  if (dashboardRoutes.includes(pathname)) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }

  // For other pages like login, register, etc., render them without the layout
  return <Component {...pageProps} />;
}

export default MyApp;