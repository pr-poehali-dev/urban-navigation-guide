import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

type Screen = 'main' | 'levels' | 'profile' | 'achievements' | 'settings' | 'help' | 'game';

interface MainMenuProps {
  setCurrentScreen: (screen: Screen) => void;
}

const MainMenu = ({ setCurrentScreen }: MainMenuProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold text-purple-600 mb-4">
            🌍 English Quest
          </h1>
          <p className="text-xl text-gray-700">Учи английский через приключения!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card 
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg"
            onClick={() => setCurrentScreen('levels')}
          >
            <CardContent className="p-8 text-center">
              <Icon name="Map" size={48} className="mx-auto mb-3" />
              <p className="text-lg font-semibold">Уровни</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg"
            onClick={() => setCurrentScreen('profile')}
          >
            <CardContent className="p-8 text-center">
              <Icon name="User" size={48} className="mx-auto mb-3" />
              <p className="text-lg font-semibold">Профиль</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg"
            onClick={() => setCurrentScreen('achievements')}
          >
            <CardContent className="p-8 text-center">
              <Icon name="Award" size={48} className="mx-auto mb-3" />
              <p className="text-lg font-semibold">Достижения</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg"
            onClick={() => setCurrentScreen('settings')}
          >
            <CardContent className="p-8 text-center">
              <Icon name="Settings" size={48} className="mx-auto mb-3" />
              <p className="text-lg font-semibold">Параметры</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg"
            onClick={() => setCurrentScreen('help')}
          >
            <CardContent className="p-8 text-center">
              <Icon name="HelpCircle" size={48} className="mx-auto mb-3" />
              <p className="text-lg font-semibold">Справка</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg"
          >
            <CardContent className="p-8 text-center">
              <Icon name="Book" size={48} className="mx-auto mb-3" />
              <p className="text-lg font-semibold">Словарь</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
