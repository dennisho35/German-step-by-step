/**
 * 翻譯資源的型別定義。
 * 所有 16 個 locale 的 JSON 都必須符合此結構，並由 TypeScript 在編譯期驗證完整性。
 */
export interface Messages {
  nav: {
    appName: string;
    home: string;
    alphabet: string;
    words: string;
    grammar: string;
    dialogues: string;
    numbers: string;
    quiz: string;
    canvas: string;
    settings: string;
    back: string;
    language: string;
    menu: string;
    closeMenu: string;
  };
  common: {
    next: string;
    previous: string;
    submit: string;
    cancel: string;
    confirm: string;
    loading: string;
    error: string;
    retry: string;
    correct: string;
    incorrect: string;
    viewAnswer: string;
    correctAnswer: string;
    tryAgain: string;
    start: string;
    continue: string;
    backHome: string;
    yes: string;
    no: string;
    save: string;
    clear: string;
    reset: string;
    play: string;
    pause: string;
    replay: string;
    speed: string;
    close: string;
    search: string;
    filter: string;
    sort: string;
    results: string;
    required: string;
    done: string;
    skip: string;
  };
  home: {
    title: string;
    subtitle: string;
    continueLearning: string;
    dailyGoal: string;
    streak: string;
    totalLearned: string;
    today: string;
    sections: string;
    pickSection: string;
    newLesson: string;
    reviewDue: string;
    mastered: string;
    learning: string;
  };
  alphabet: {
    title: string;
    subtitle: string;
    letterName: string;
    ipa: string;
    pronunciation: string;
    example: string;
    vowel: string;
    consonant: string;
    longVowel: string;
    shortVowel: string;
    nextLetter: string;
    previousLetter: string;
    specialLetters: string;
    recognition: string;
    writing: string;
    listening: string;
    spelling: string;
    combinations: string;
    letterInWords: string;
    lettersLearned: string;
    tapToLearn: string;
  };
  words: {
    title: string;
    subtitle: string;
    article: string;
    gender: string;
    plural: string;
    meaning: string;
    search: string;
    noResults: string;
    categories: string;
    wordOfDay: string;
    addToReview: string;
    categoryNames: {
      food: string;
      family: string;
      travel: string;
      daily: string;
      nature: string;
      people: string;
      home: string;
      time: string;
    };
  };
  numbers: {
    title: string;
    subtitle: string;
    cardinal: string;
    ordinal: string;
    date: string;
    time: string;
    quantity: string;
    pronunciation: string;
  };
  grammar: {
    title: string;
    subtitle: string;
    nounGender: string;
    nominative: string;
    accusative: string;
    dative: string;
    genitive: string;
    verbConjugation: string;
    wordOrder: string;
    negation: string;
    questions: string;
    prepositions: string;
    conjunctions: string;
    explanation: string;
    examples: string;
  };
  dialogues: {
    title: string;
    subtitle: string;
    speaker: string;
    speakerA: string;
    speakerB: string;
    topic: string;
    listen: string;
    translate: string;
    hideTranslation: string;
    roleSwitch: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    question: string;
    correct: string;
    incorrect: string;
    score: string;
    result: string;
    nextQuestion: string;
    finish: string;
    explanation: string;
    answered: string;
    remaining: string;
    chooseAnswer: string;
    completed: string;
    mistakes: string;
  };
  canvas: {
    title: string;
    subtitle: string;
    clear: string;
    undo: string;
    redo: string;
    reset: string;
    showReference: string;
    hideReference: string;
    hint: string;
    save: string;
    writeHere: string;
    practice: string;
    saved: string;
    strokeHint: string;
  };
  settings: {
    title: string;
    subtitle: string;
    language: string;
    progress: string;
    srs: string;
    pronunciation: string;
    speechRate: string;
    about: string;
    resetProgress: string;
    confirmReset: string;
    statistics: string;
    achievements: string;
    version: string;
    dataStored: string;
    deviceLanguage: string;
    appName: string;
  };
  srs: {
    notStarted: string;
    learning: string;
    learned: string;
    reviewDue: string;
    mastered: string;
    dueReview: string;
    newCards: string;
    dueCards: string;
    masteredCards: string;
    nextReview: string;
  };
  errors: {
    generic: string;
    network: string;
    permission: string;
    unsupported: string;
    missingTranslation: string;
    audioError: string;
    voiceUnsupported: string;
    storageError: string;
  };
  messages: {
    welcome: string;
    goodbye: string;
    progressSaved: string;
    languageChanged: string;
    loadingProgress: string;
    confirmResetBody: string;
    noSavedProgress: string;
    congratulation: string;
    keepGoing: string;
  };
}

/** 翻譯 key 的扁平化路徑型別，例如 "nav.home" / "common.next" */
export type TranslationKey = {
  [K in keyof Messages]: { [P in keyof Messages[K] & string]: `${K}.${P}` }[keyof Messages[K] & string]
}[keyof Messages];

/** 開發期缺漏記錄 */
export interface MissingKeyRecord {
  locale: string;
  key: string;
  fallback: 'en-GB' | 'none';
  timestamp: number;
}
