import HomePage from '../modules/home';
import { MainLayout } from '../modules/shared/layouts/main';

const Home = () => {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
};

export default Home;
