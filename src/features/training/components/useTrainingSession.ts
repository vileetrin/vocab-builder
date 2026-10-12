import { useState, type ChangeEvent } from "react";
import type { TrainingAnswerPayload, TrainingTask } from "@/features/training/api";

const TRAINING_ANSWERS_STORAGE_KEY = "vocab-builder:training-answers";

type TrainingLocale = TrainingTask["translateToLocale"];

type StoredTrainingAnswer = TrainingAnswerPayload;

const ENGLISH_ANSWER_PATTERN = /[^A-Za-z\s'-]/g;
const UKRAINIAN_ANSWER_PATTERN = /[^А-ЩЬЮЯЄІЇҐа-щьюяєіїґ\s'’-]/g;

function getTaskAnswerKey(task: TrainingTask) {
    return `${task.id}:${task.translateToLocale}`;
}

function readStoredAnswers() {
    const savedAnswers = window.localStorage.getItem(TRAINING_ANSWERS_STORAGE_KEY);

    if (!savedAnswers) {
        return {};
    }

    try {
        return JSON.parse(savedAnswers) as Record<string, StoredTrainingAnswer>;
    } catch {
        return {};
    }
}

function createAnswerPayload(task: TrainingTask, answer: string): TrainingAnswerPayload {
    return {
        _id: task.id,
        en: task.translateToLocale === "en" ? answer : task.word,
        ua: task.translateToLocale === "ua" ? answer : task.word,
        task: task.translateToLocale
    };
}

function saveTrainingAnswer(task: TrainingTask, answer: string, currentAnswers: Record<string, TrainingAnswerPayload>) {
    const answers = readStoredAnswers();
    const answerPayload = createAnswerPayload(task, answer);

    answers[getTaskAnswerKey(task)] = answerPayload;

    window.localStorage.setItem(TRAINING_ANSWERS_STORAGE_KEY, JSON.stringify(answers));

    return {
        ...currentAnswers,
        [getTaskAnswerKey(task)]: answerPayload
    };
}

function sanitizeAnswer(value: string, locale: TrainingLocale) {
    return value.replace(locale === "en" ? ENGLISH_ANSWER_PATTERN : UKRAINIAN_ANSWER_PATTERN, "");
}

export function useTrainingSession(tasks: TrainingTask[]) {
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState<Record<string, TrainingAnswerPayload>>({});
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [inputLanguageError, setInputLanguageError] = useState<TrainingLocale>();
    const currentTask = tasks[currentTaskIndex];
    const currentTaskKey = getTaskAnswerKey(currentTask);
    const isLastTask = currentTaskIndex === tasks.length - 1;
    const remainingTaskCount = tasks.length - currentTaskIndex;
    const progressValue = Math.round((remainingTaskCount / tasks.length) * 100);

    const handleAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const nextAnswer = sanitizeAnswer(event.target.value, currentTask.translateToLocale);

        setInputLanguageError(nextAnswer === event.target.value ? undefined : currentTask.translateToLocale);
        setAnswer(nextAnswer);
        setAnswers((currentAnswers) => saveTrainingAnswer(currentTask, nextAnswer, currentAnswers));
    };

    const goToNextTask = () => {
        if (isLastTask) {
            return;
        }

        setAnswer("");
        setInputLanguageError(undefined);
        setCurrentTaskIndex((index) => index + 1);
    };

    const resetTrainingSession = () => {
        window.localStorage.removeItem(TRAINING_ANSWERS_STORAGE_KEY);
        setAnswer("");
        setAnswers({});
        setInputLanguageError(undefined);
        setCurrentTaskIndex(0);
    };

    const getFieldProps = (locale: TrainingLocale) => {
        const isActive = currentTask.translateToLocale === locale;

        return {
            autoFocus: isActive,
            onChange: isActive ? handleAnswerChange : undefined,
            readOnly: !isActive,
            value: isActive ? answer : currentTask.word
        };
    };

    return {
        answerPayloads: Object.values(answers).filter((item) => item.en.trim() && item.ua.trim()),
        currentTaskKey,
        getFieldProps,
        goToNextTask,
        inputLanguageError,
        isLastTask,
        progressValue,
        remainingTaskCount,
        resetTrainingSession
    };
}
