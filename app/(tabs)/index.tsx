import { Image } from 'react-native';
import { Home } from '@/components/home';
import AppIcon from '@/assets/images/png/app-icon.png';
import { Header } from '@/components/common/Header';

const HomeScreen = () => {
  return (
    <>
      <Header
        title="Quotify"
        icon={
          <Image
            source={AppIcon}
            resizeMode="contain"
            style={{ width: 32, height: 32 }}
          />
        }
      />
      <Home />
    </>
  );
};

export default HomeScreen;
