import { create } from "zustand";
import { GameStateStorage, GameStore, ProduceResult, Resources } from "./types";

export const useGameStore = create<GameStore>((set, get) => ({
  resources: {
    gold: 0,
    stone: 0,
    wood: 0,
    food: 0,
  },

  buildings: {
    farm: 0,
    lumberMill: 0,
    quarry: 0,
    goldMine: 0,
    barracks: 0,
    siege: 0,
    stable: 0
  },

  military: {
    swordsman: 0,
    archer: 0,
    cavalry: 0,
    catapult: 0
  },

  addResource: (type, amount) => {
    set((state) => ({
      resources: {
        ...state.resources,
        [type]: state.resources[type] + amount,
      },
    }))
  },

  spendResources: (cost) => {
    const { resources } = get();

    // {gold: 100} {stone: 100, gold: 200} {wood: 500, gold: 1000, stone: 10}

    // Check if affordable
    for (const key in cost) {
      const resource = key as keyof Resources;
      if (resources[resource] < (cost[resource] ?? 0)) {
        return false;
      }
    }

    // Spend
    set((state) => {
      const updated = { ...state.resources };

      for (const key in cost) {
        const resource = key as keyof Resources;
        // updated[resource] -= cost[resource] ?? 0;
        updated[resource] = updated[resource] - (cost[resource] ?? 0);
      }

      return { resources: updated };
    });

    return true;
  },

  build: (type, cost) => {
    const { spendResources } = get();
    if (!spendResources(cost)) {
      return false;
    }

    set((state) => ({
      buildings: {
        ...state.buildings,
        [type]: state.buildings[type] + 1,
      },
    }));

    return true;
  },

  produce: (type, cost, building) => {
    const { buildings, spendResources } = get();

    if (buildings[building] === 0) {
      // Alert.alert("Error", "Not enough building");
      return ProduceResult.BuildingError;
    }

    if (!spendResources(cost)) {
      // Alert.alert("Not enough resource");

      return ProduceResult.ResourceError;
    }

    set((state) => ({
      military: {
        ...state.military,
        [type]: state.military[type] + 10,
      },
    }));

    return ProduceResult.Ok;
  },

  setGame: (gameState: GameStateStorage) => {
    set((state) => ({ ...gameState }))
    // set((state) => {

    //   return {
    //     resources: gameState.resources,
    //     buildings: gameState.buildings,
    //     military: gameState.military
    //   };
    // })
  }
}));