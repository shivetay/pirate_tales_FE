import '@/app/[lang]/styles/home.css';
import { AuthNavigation, LogoButton } from '@/components';
import { HomeView } from '@/views';
import './styles/home.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="header-container">
        <LogoButton />
        <AuthNavigation />
      </header>

      <div className="background-image blur-sm"></div>
      <HomeView />
    </div>
  );
}
