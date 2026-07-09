import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameStateStorage } from "./types";

const KEY = "gameState";

export async function loadGame(): Promise<GameStateStorage> {
    const gameStateStorage = await AsyncStorage.getItem(KEY);

    let gameState: GameStateStorage;
    try {
        gameState = JSON.parse(gameStateStorage ?? "");
    } catch (error) {
        gameState = {
            resources: {
                food: 0,
                gold: 0,
                stone: 0,
                wood: 0
            },
            buildings: {
                barracks: 0,
                farm: 0,
                goldMine: 0,
                lumberMill: 0,
                quarry: 0,
                siege: 0,
                stable: 0
            },
            military: {
                archer: 0,
                catapult: 0,
                cavalry: 0,
                swordsman: 0
            }
        }
    }

    return gameState;
}

export async function saveGame(gameState: GameStateStorage) {
    await AsyncStorage.setItem(KEY, JSON.stringify(gameState));
}