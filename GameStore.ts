import { create } from "zustand";
import { GameStore, Resources } from "./types";

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
  },

  addResource: (type, amount) => {
    console.log("BBB");
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
        updated[resource] -= cost[resource] ?? 0;
      }

      return { resources: updated };
    });

    return true;
  },

  build: (type, cost) => {

    console.log("AAAA")

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
}));