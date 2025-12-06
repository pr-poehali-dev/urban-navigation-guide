import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DictionaryDialogProps {
  selectedWord: string | null;
  dictionary: Record<string, { translation: string; pronunciation: string }>;
  setSelectedWord: (word: string | null) => void;
}

const DictionaryDialog = ({ selectedWord, dictionary, setSelectedWord }: DictionaryDialogProps) => {
  return (
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
  );
};

export default DictionaryDialog;
