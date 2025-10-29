import Image from 'next/image';
import { HomeContainer, HomeList } from './home.styled';

export function HomeView() {
  return (
    <HomeContainer>
      <Image
        src="/assets/img/main_frame_2.png"
        alt="background"
        width={960}
        height={400}
        style={{ objectFit: 'contain', padding: '3rem' }}
      />
      <HomeList>test</HomeList>
    </HomeContainer>
  );
}

export default HomeView;
