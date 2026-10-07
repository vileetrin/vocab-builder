export type OwnDictionaryWordResponse = {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner: string;
  progress: number;
};

export type GetOwnDictionaryResponse = {
  results: OwnDictionaryWordResponse[];
};

export type OwnDictionaryWord = {
  id: string;
  word: string;
  translation: string;
  category: string;
  progress: number;
};
