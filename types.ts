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
    barracks: number;
    siege: number;
    stable: number;
}

export interface Military {
    swordsman: number;
    archer: number;
    catapult: number;
    cavalry: number;
}

export interface GameStateStorage {
    resources: Resources;
    buildings: Buildings;
    military: Military;
}

export interface AppStateStorage extends GameStateStorage {
    lastUpdated: number;
}

export interface GameStore {
    resources: Resources;
    buildings: Buildings;
    military: Military;

    cityName: string;

    addResource: (type: keyof Resources, amount: number) => void;
    spendResources: (cost: Partial<Resources>) => boolean;

    build: (type: keyof Buildings, cost: Partial<Resources>) => BuildResult;

    produce: (type: keyof Military, cost: Partial<Resources>, building: keyof Buildings) => ProduceResult;

    setGame: (gameState: GameStateStorage) => void;

    setCityName: (name: string) => void;
}

export enum ProduceResult {
    Ok,
    BuildingError,
    ResourceError
}

export enum BuildResult {
    Ok,
    ResourceError
}

export interface UserInfo {
    id: string;
    cityName: string
}