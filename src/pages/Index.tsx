import { useState, useEffect } from 'react';
import MainMenu from '@/components/MainMenu';
import GameScreen from '@/components/GameScreen';
import InfoScreens from '@/components/InfoScreens';
import DictionaryDialog from '@/components/DictionaryDialog';

type Screen = 'main' | 'levels' | 'profile' | 'achievements' | 'settings' | 'help' | 'game';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [dialogStep, setDialogStep] = useState(0);
  const [score, setScore] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('englishQuestProgress');
    if (savedProgress) {
      const { score: savedScore, completedChapters: savedCompleted } = JSON.parse(savedProgress);
      setScore(savedScore || 0);
      setCompletedChapters(savedCompleted || []);
    }
  }, []);

  useEffect(() => {
    const progress = {
      score,
      completedChapters,
    };
    localStorage.setItem('englishQuestProgress', JSON.stringify(progress));
  }, [score, completedChapters]);

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
    'bus station': { translation: 'автостанция', pronunciation: '[bʌs ˈsteɪʃən]' },
    'cinema': { translation: 'кинотеатр', pronunciation: '[ˈsɪnəmə]' },
    'ticket': { translation: 'билет', pronunciation: '[ˈtɪkɪt]' },
    'buy': { translation: 'купить', pronunciation: '[baɪ]' },
    'friend': { translation: 'друг', pronunciation: '[frend]' },
    'lost': { translation: 'потерял', pronunciation: '[lɔst]' },
    'phone': { translation: 'телефон', pronunciation: '[foʊn]' },
    'police': { translation: 'полиция', pronunciation: '[pəˈliːs]' },
    'station': { translation: 'станция', pronunciation: '[ˈsteɪʃən]' },
    'museum': { translation: 'музей', pronunciation: '[mjuˈziːəm]' },
    'park': { translation: 'парк', pronunciation: '[pɑːrk]' },
  };

  const chapters = [
    {
      id: 1,
      title: 'Глава 1: Первое задание',
      description: 'Спроси дорогу у старика',
      difficulty: 'easy',
      stars: completedChapters.includes(1) ? 3 : 0,
      locked: false,
    },
    {
      id: 2,
      title: 'Глава 2: Развитие',
      description: 'Найди автостанцию и кинотеатр',
      difficulty: 'medium',
      stars: completedChapters.includes(2) ? 3 : 0,
      locked: score < 50,
    },
    {
      id: 3,
      title: 'Глава 3: Потерянный телефон',
      description: 'Обратись в полицию',
      difficulty: 'hard',
      stars: completedChapters.includes(3) ? 3 : 0,
      locked: score < 150,
    },
  ];

  const achievements = [
    { id: 1, name: 'Первый диалог', icon: 'MessageCircle', unlocked: score >= 50 },
    { id: 2, name: 'Знаток слов', icon: 'Book', unlocked: score >= 100 },
    { id: 3, name: 'Мастер навигации', icon: 'Map', unlocked: score >= 200 },
    { id: 4, name: 'Завершил всё!', icon: 'Trophy', unlocked: score >= 300 },
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

  const handleCompleteChapter = (chapterId: number) => {
    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters([...completedChapters, chapterId]);
    }
    setCurrentScreen('levels');
    setDialogStep(0);
  };

  return (
    <>
      {currentScreen === 'main' && (
        <MainMenu setCurrentScreen={setCurrentScreen} />
      )}
      
      {(currentScreen === 'levels' || currentScreen === 'profile' || currentScreen === 'achievements' || currentScreen === 'settings' || currentScreen === 'help') && (
        <InfoScreens
          screen={currentScreen}
          score={score}
          chapters={chapters}
          achievements={achievements}
          dictionary={dictionary}
          setCurrentScreen={setCurrentScreen}
          setCurrentChapter={setCurrentChapter}
          setDialogStep={setDialogStep}
        />
      )}
      
      {currentScreen === 'game' && (
        <GameScreen
          currentChapter={currentChapter}
          score={score}
          dialogStep={dialogStep}
          setCurrentScreen={setCurrentScreen}
          handleWordClick={handleWordClick}
          handleOptionSelect={handleOptionSelect}
          setDialogStep={setDialogStep}
          handleCompleteChapter={handleCompleteChapter}
        />
      )}

      <DictionaryDialog
        selectedWord={selectedWord}
        dictionary={dictionary}
        setSelectedWord={setSelectedWord}
      />
    </>
  );
};

export default Index;