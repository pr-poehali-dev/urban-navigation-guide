import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Screen = 'main' | 'levels' | 'profile' | 'achievements' | 'settings' | 'help' | 'game';

type Character = {
  id: string;
  name: string;
  text: string;
  options?: string[];
};

interface GameScreenProps {
  currentChapter: number | null;
  score: number;
  dialogStep: number;
  setCurrentScreen: (screen: Screen) => void;
  handleWordClick: (word: string) => void;
  handleOptionSelect: (option: string) => void;
  setDialogStep: (step: number) => void;
}

const GameScreen = ({
  currentChapter,
  score,
  dialogStep,
  setCurrentScreen,
  handleWordClick,
  handleOptionSelect,
  setDialogStep,
}: GameScreenProps) => {
  const chapter1Dialogs: Character[] = [
    {
      id: 'oldman1',
      name: 'Старик',
      text: 'Hello, you look new here! Can I help you?',
      options: [
        'Yes, please. Where is the post office?',
        'How can I get to the supermarket?',
        "I'm looking for the library.",
      ],
    },
  ];

  if (currentChapter === 1) {
    const currentDialog = chapter1Dialogs[0];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('levels')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-600 text-white">XP: {score}</Badge>
              <Badge className="bg-orange-600 text-white">Глава 1</Badge>
            </div>
          </div>

          <Card className="shadow-lg mb-6 bg-gradient-to-br from-white to-purple-50">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-5xl animate-bounce-soft">
                  👴
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-3">{currentDialog.name}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {currentDialog.text.split(' ').map((word, idx) => (
                      <span
                        key={idx}
                        className="cursor-pointer hover:text-purple-600 hover:underline transition-colors"
                        onClick={() => handleWordClick(word)}
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </p>
                  
                  {dialogStep === 0 && currentDialog.options && (
                    <div className="mt-6 space-y-3">
                      <p className="font-semibold text-gray-700 mb-3">Твой ответ:</p>
                      {currentDialog.options.map((option, idx) => (
                        <Button
                          key={idx}
                          className="w-full justify-start text-left h-auto py-4 px-6 bg-white hover:bg-purple-50 text-gray-800 border-2 border-purple-200 hover:border-purple-400 transition-all"
                          variant="outline"
                          onClick={() => handleOptionSelect(option)}
                        >
                          <span className="mr-3 text-purple-600 font-bold">{idx + 1}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {dialogStep === 1 && (
                    <div className="mt-6 space-y-4 animate-fade-in">
                      <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4">
                        <p className="font-semibold text-green-800 mb-2">Старик:</p>
                        <p className="text-gray-700">"The post office is on Main Street. Go straight on this road, then turn right at the traffic lights. It's next to the bank."</p>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        onClick={() => {
                          setCurrentScreen('levels');
                          setDialogStep(0);
                        }}
                      >
                        Продолжить <Icon name="ArrowRight" size={20} className="ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Map" size={24} className="text-orange-600" />
                Карта района
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <div className="text-3xl mb-2">🏢</div>
                    <p className="text-sm font-semibold">Bank</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg">
                    <div className="text-3xl mb-2">📮</div>
                    <p className="text-sm font-semibold">Post Office</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <div className="text-3xl mb-2">🏪</div>
                    <p className="text-sm font-semibold">Shop</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <div className="text-3xl mb-2">🚦</div>
                    <p className="text-sm font-semibold">Traffic Lights</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <div className="text-3xl mb-2">📚</div>
                    <p className="text-sm font-semibold">Library</p>
                  </div>
                  <div className="bg-pink-100 p-4 rounded-lg">
                    <div className="text-3xl mb-2">🏬</div>
                    <p className="text-sm font-semibold">Supermarket</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default GameScreen;
