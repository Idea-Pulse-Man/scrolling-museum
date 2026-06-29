"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { STORAGE_KEYS, readJSON, writeJSON } from "@/lib/storage";

/** User preferences captured by the "Personalize your museum" modal. */
export interface Preferences {
  artTypes: string[];
  periods: string[];
  empires: string[];
  artists: string[];
  /** Set once the user has answered (or dismissed) the modal. */
  completed: boolean;
}

const EMPTY_PREFS: Preferences = {
  artTypes: [],
  periods: [],
  empires: [],
  artists: [],
  completed: false,
};

interface AppStateValue {
  /** True after localStorage has hydrated — guard UI that depends on persisted state. */
  ready: boolean;

  saved: string[];
  liked: string[];
  following: string[];
  isSaved: (id: string) => boolean;
  isLiked: (id: string) => boolean;
  isFollowing: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  toggleLiked: (id: string) => void;
  toggleFollowing: (id: string) => void;

  preferences: Preferences;
  savePreferences: (prefs: Omit<Preferences, "completed">) => void;
  dismissPreferences: () => void;

  tutorialDone: boolean;
  completeTutorial: () => void;
  restartTutorial: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<Preferences>(EMPTY_PREFS);
  const [tutorialDone, setTutorialDone] = useState(false);

  // Hydrate from localStorage on mount (client only) to avoid SSR mismatch.
  useEffect(() => {
    setSaved(readJSON<string[]>(STORAGE_KEYS.saved, []));
    setLiked(readJSON<string[]>(STORAGE_KEYS.liked, []));
    setFollowing(readJSON<string[]>(STORAGE_KEYS.following, []));
    setPreferences(readJSON<Preferences>(STORAGE_KEYS.preferences, EMPTY_PREFS));
    setTutorialDone(readJSON<boolean>(STORAGE_KEYS.tutorialDone, false));
    setReady(true);
  }, []);

  const makeToggle = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      key: string
    ) =>
      (id: string) =>
        setter((prev) => {
          const next = prev.includes(id)
            ? prev.filter((x) => x !== id)
            : [...prev, id];
          writeJSON(key, next);
          return next;
        }),
    []
  );

  const toggleSaved = useMemo(
    () => makeToggle(setSaved, STORAGE_KEYS.saved),
    [makeToggle]
  );
  const toggleLiked = useMemo(
    () => makeToggle(setLiked, STORAGE_KEYS.liked),
    [makeToggle]
  );
  const toggleFollowing = useMemo(
    () => makeToggle(setFollowing, STORAGE_KEYS.following),
    [makeToggle]
  );

  const savePreferences = useCallback(
    (prefs: Omit<Preferences, "completed">) => {
      const next: Preferences = { ...prefs, completed: true };
      setPreferences(next);
      writeJSON(STORAGE_KEYS.preferences, next);
    },
    []
  );

  const dismissPreferences = useCallback(() => {
    setPreferences((prev) => {
      const next = { ...prev, completed: true };
      writeJSON(STORAGE_KEYS.preferences, next);
      return next;
    });
  }, []);

  const completeTutorial = useCallback(() => {
    setTutorialDone(true);
    writeJSON(STORAGE_KEYS.tutorialDone, true);
  }, []);

  const restartTutorial = useCallback(() => {
    setTutorialDone(false);
    writeJSON(STORAGE_KEYS.tutorialDone, false);
  }, []);

  const value: AppStateValue = {
    ready,
    saved,
    liked,
    following,
    isSaved: (id) => saved.includes(id),
    isLiked: (id) => liked.includes(id),
    isFollowing: (id) => following.includes(id),
    toggleSaved,
    toggleLiked,
    toggleFollowing,
    preferences,
    savePreferences,
    dismissPreferences,
    tutorialDone,
    completeTutorial,
    restartTutorial,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return ctx;
}
