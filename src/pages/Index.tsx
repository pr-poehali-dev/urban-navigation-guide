import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Screen = 'main' | 'levels' | 'profile' | 'achievements' | 'settings' | 'help' | 'game';

type Character = {
  id: string;
  name: string;
  text: string;
  options?: string[];
};

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [dialogStep, setDialogStep] = useState(0);
  const [score, setScore] = useState(0);

  const dictionary: Record<string, { translation: string; pronunciation: string }> = {
    'post office': { translation: 'почта', pronunciation: '[poʊst ˈɔfɪs]' },
    'supermarket': { translation: 'супермаркет', pronunciation: '[ˈsuːpərˌmɑːrkɪt]' },
    'library': { translation: 'библиотека', pronunciation: '[ˈlaɪbrəri]' },
    'straight': { translation: 'прямо', pronunciation: '[streɪt]' },
    'turn right': { translation: 'поверните направо', pronunciation: '[tɜːrn raɪt]' },
    'turn left': { translation: 'поверните налево', pronunciation: '[tɜːrn left]' },
    'traffic lights': { translation: 'светофор', pronunciation: '[ˈtræfɪk laɪts]' },
    'next to': { translation: 'рядом с', pronunciation: '[nekst tuː]' },
    'opposite': { translation: 'напротив', pronunciation: '[ˈɒpəzɪt]' },
    'between': { translation: 'между', pronunciation: '[bɪˈtwiːn]' },
    'hello': { translation: 'привет', pronunciation: '[həˈloʊ]' },
    'help': { translation: 'помочь', pronunciation: '[help]' },
    'please': { translation: 'пожалуйста', pronunciation: '[pliːz]' },
    'where': { translation: 'где', pronunciation: '[wer]' },
  };

  const chapters = [
    {
      id: 1,
      title: 'Глава 1: Первое задание',
      description: 'Спроси дорогу у старика',
      difficulty: 'easy',
      stars: 3,
      locked: false,
    },
    {
      id: 2,
      title: 'Глава 2: Развитие',
      description: 'Найди автостанцию и кинотеатр',
      difficulty: 'medium',
      stars: 0,
      locked: score < 100,
    },
    {
      id: 3,
      title: 'Глава 3: Потерянный телефон',
      description: 'Обратись в полицию',
      difficulty: 'hard',
      stars: 0,
      locked: score < 200,
    },
  ];

  const achievements = [
    { id: 1, name: 'Первый диалог', icon: 'MessageCircle', unlocked: score >= 50 },
    { id: 2, name: 'Знаток слов', icon: 'Book', unlocked: score >= 100 },
    { id: 3, name: 'Мастер навигации', icon: 'Map', unlocked: score >= 200 },
    { id: 4, name: 'Завершил всё!', icon: 'Trophy', unlocked: score >= 300 },
  ];

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

  const handleWordClick = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[.,!?]/g, '');
    if (dictionary[cleanWord]) {
      setSelectedWord(cleanWord);
    }
  };

  const handleOptionSelect = (option: string) => {
    setScore(score + 50);
    setDialogStep(1);
  };

  const renderMainScreen = () => (
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

  const renderLevelsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('main')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-3xl font-bold text-purple-600 ml-4">Выбери уровень</h2>
        </div>

        <div className="space-y-4">
          {chapters.map((chapter, idx) => (
            <Card 
              key={chapter.id}
              className={`${chapter.locked ? 'opacity-50' : 'hover:scale-102 cursor-pointer'} transition-all shadow-lg animate-fade-in`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => {
                if (!chapter.locked) {
                  setCurrentChapter(chapter.id);
                  setCurrentScreen('game');
                  setDialogStep(0);
                }
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        chapter.locked ? 'bg-gray-300' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        <span className="text-2xl">
                          {chapter.locked ? '🔒' : chapter.id === 1 ? '👴' : chapter.id === 2 ? '🚌' : '📱'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{chapter.title}</h3>
                        <p className="text-gray-600">{chapter.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant={chapter.difficulty === 'easy' ? 'default' : chapter.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                        {chapter.difficulty === 'easy' ? 'Легко' : chapter.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                      </Badge>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <span key={i} className="text-lg">
                            {i < chapter.stars ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfileScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('main')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-3xl font-bold text-purple-600 ml-4">Твой профиль</h2>
        </div>

        <Card className="shadow-lg mb-6">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                🧑
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Путешественник</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Прогресс</span>
                      <span>{score} / 300 XP</span>
                    </div>
                    <Progress value={(score / 300) * 100} className="h-3" />
                  </div>
                  <div className="flex gap-4 text-center mt-4">
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-purple-600">{chapters.filter(c => c.stars > 0).length}</p>
                      <p className="text-sm text-gray-600">Завершено</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-orange-600">{achievements.filter(a => a.unlocked).length}</p>
                      <p className="text-sm text-gray-600">Достижений</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-blue-600">{Object.keys(dictionary).length}</p>
                      <p className="text-sm text-gray-600">Слов в словаре</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Статистика</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Всего диалогов:</span>
                <span className="font-bold text-lg">{Math.floor(score / 50)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Изучено слов:</span>
                <span className="font-bold text-lg">{Math.min(Object.keys(dictionary).length, Math.floor(score / 25))}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Точность:</span>
                <span className="font-bold text-lg text-green-600">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAchievementsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('main')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-3xl font-bold text-purple-600 ml-4">Достижения</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, idx) => (
            <Card 
              key={achievement.id}
              className={`${achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'opacity-50'} shadow-lg animate-fade-in`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' : 'bg-gray-300'
                  }`}>
                    <Icon name={achievement.icon as any} size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">
                      {achievement.unlocked ? '✅ Разблокировано' : '🔒 Заблокировано'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('main')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-3xl font-bold text-purple-600 ml-4">Параметры</h2>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">Звук</h3>
                <p className="text-sm text-gray-600">Включить озвучку диалогов</p>
              </div>
              <Button variant="outline">Вкл</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">Субтитры</h3>
                <p className="text-sm text-gray-600">Показывать перевод</p>
              </div>
              <Button variant="outline">Вкл</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">Сложность</h3>
                <p className="text-sm text-gray-600">Уровень сложности диалогов</p>
              </div>
              <Button variant="outline">Средний</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHelpScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('main')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-3xl font-bold text-purple-600 ml-4">Справка</h2>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-purple-600">Как играть?</h3>
              <p className="text-gray-700">Проходи уровни, общайся с персонажами на английском языке и выбирай правильные ответы. За каждый диалог ты получаешь опыт!</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-purple-600">Словарь</h3>
              <p className="text-gray-700">Нажимай на незнакомые слова в диалогах, чтобы увидеть перевод и произношение.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-purple-600">Достижения</h3>
              <p className="text-gray-700">Набирай опыт и открывай новые достижения. Чем больше проходишь уровней, тем больше наград!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGameScreen = () => {
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

  return (
    <>
      {currentScreen === 'main' && renderMainScreen()}
      {currentScreen === 'levels' && renderLevelsScreen()}
      {currentScreen === 'profile' && renderProfileScreen()}
      {currentScreen === 'achievements' && renderAchievementsScreen()}
      {currentScreen === 'settings' && renderSettingsScreen()}
      {currentScreen === 'help' && renderHelpScreen()}
      {currentScreen === 'game' && renderGameScreen()}

      <Dialog open={selectedWord !== null} onOpenChange={() => setSelectedWord(null)}>
        <DialogContent className="bg-gradient-to-br from-purple-50 to-pink-50">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-600">📖 Словарь</DialogTitle>
          </DialogHeader>
          {selectedWord && dictionary[selectedWord] && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Слово:</p>
                <p className="text-2xl font-bold text-gray-800">{selectedWord}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Произношение:</p>
                <p className="text-lg text-purple-600 font-mono">{dictionary[selectedWord].pronunciation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Перевод:</p>
                <p className="text-xl font-semibold text-gray-800">{dictionary[selectedWord].translation}</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Icon name="Volume2" size={20} className="mr-2" />
                Прослушать
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
