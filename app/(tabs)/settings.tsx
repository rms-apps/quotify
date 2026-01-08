import { Settings } from '@/components/settings';
import { Header } from '@/components/common/Header';

const SettingsScreen = () => {
  return (
    <>
      <Header title="Settings" icon={null} />
      <Settings />
    </>
  );
};

export default SettingsScreen;
