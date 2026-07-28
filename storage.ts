import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getUserId } from "./auth";
import { db } from "./firebaseConfig";
import { AppStateStorage, GameStateStorage } from "./types";
import { getInitialGameInfo } from "./utils";

const LOCAL_KEY = "gameState";
const SERVER_DOC_KEY = "gameStates";

export async function loadLocalGame(): Promise<AppStateStorage | undefined> {
  const gameStateStorage = await AsyncStorage.getItem(LOCAL_KEY);

  let appState: AppStateStorage;
  try {
    appState = JSON.parse(gameStateStorage ?? "");
  } catch (_error) {
    return undefined;
  }

  return appState;
}

export async function saveLocalGame(gameState: GameStateStorage) {
  const data = {
    ...gameState,
    lastUpdated: Date.now()
  }
  await AsyncStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

export async function saveServerGame(gameState: GameStateStorage) {
  const userId = getUserId();

  const data = {
    userId,
    ...gameState,
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, SERVER_DOC_KEY, userId), data);
}

export async function loadServerGame() {
  const uid = getUserId();

  const docRef = doc(db, SERVER_DOC_KEY, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
}

export async function loadGame() {
  const serverGameInfo = await loadServerGame();
  const localGameInfo = await loadLocalGame();

  // Server has a game state for the auth user
  if (serverGameInfo) {
    const state: GameStateStorage = {
      buildings: serverGameInfo.buildings,
      military: serverGameInfo.military,
      resources: serverGameInfo.resources,
    };

    if (localGameInfo && (serverGameInfo.updatedAt.toDate() < localGameInfo.lastUpdated)) {
      saveServerGame(localGameInfo);
    } else {
      saveLocalGame(state);
    }

    return state;
  } else {
    // There is no server state. Create initial game information or get local game (if exists) and save it
    const data = localGameInfo ?? getInitialGameInfo();

    await saveLocalGame(data);
    await saveServerGame(data);

    return data;
  }

}