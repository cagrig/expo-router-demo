import { useGameStore } from "./GameStore";
import { saveLocalGame } from "./storage";

useGameStore.subscribe((state) => {
    const gameState = {
        resources: state.resources,
        buildings: state.buildings,
        military: state.military,
    };

    saveLocalGame(gameState);
});