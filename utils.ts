import { GameStateStorage } from "./types";

export function getInitialGameInfo(): GameStateStorage {
  return {
    resources: {
      food: 1000,
      gold: 1000,
      stone: 1000,
      wood: 1000,
    },
    buildings: {
      barracks: 0,
      farm: 0,
      goldMine: 0,
      lumberMill: 0,
      quarry: 0,
      siege: 0,
      stable: 0,
    },
    military: {
      archer: 0,
      catapult: 0,
      cavalry: 0,
      swordsman: 0,
    },
  };
}