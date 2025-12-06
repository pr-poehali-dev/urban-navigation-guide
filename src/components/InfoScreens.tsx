import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type Screen = 'main' | 'levels' | 'profile' | 'achievements' | 'settings' | 'help' | 'game';

interface InfoScreensProps {
  screen: Screen;
  score: number;
  chapters: Array<{
    id: number;
    title: string;
    description: string;
    difficulty: string;
    stars: number;
    locked: boolean;
  }>;
  achievements: Array<{
    id: number;
    name: string;
    icon: string;
    unlocked: boolean;
  }>;
  dictionary: Record<string, { translation: string; pronunciation: string }>;
  setCurrentScreen: (screen: Screen) => void;
  setCurrentChapter: (chapter: number | null) => void;
  setDialogStep: (step: number) => void;
}

const InfoScreens = ({
  screen,
  score,
  chapters,
  achievements,
  dictionary,
  setCurrentScreen,
  setCurrentChapter,
  setDialogStep,
}: InfoScreensProps) => {
  if (screen === 'levels') {
    return (
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
  }

  if (screen === 'profile') {
    return (
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
  }

  if (screen === 'achievements') {
    return (
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
  }

  if (screen === 'settings') {
    return (
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
  }

  if (screen === 'help') {
    return (
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
  }

  return null;
};

export default InfoScreens;
