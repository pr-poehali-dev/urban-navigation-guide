import { useState } from 'react';
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
