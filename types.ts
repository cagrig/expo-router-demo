export interface Resources {
    gold: number;
    stone: number;
    wood: number;
    food: number;
}

export interface Buildings {
    farm: number;
    lumberMill: number;
    quarry: number;
    goldMine: number;
}

export interface GameStore {
    resources: Resources;
    buildings: Buildings;

    addResource: (type: keyof Resources, amount: number) => void;
    // spendResource: (type: keyof Resources, amount: number) => boolean;
    spendResources: (cost: Partial<Resources>) => boolean;

    // addBuilding: (building: Buildings) => void;
    build: (type: keyof Buildings, cost: Partial<Resources>) => boolean;
}


// {wood: 200, gold: 1000} --> 