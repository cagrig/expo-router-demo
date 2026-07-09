import { useGameStore } from "./GameStore";
import { saveGame } from "./storage";

useGameStore.subscribe((state) => {
    const gameState = {
        resources: state.resources,
        buildings: state.buildings,
        military: state.military,
    };

    saveGame(gameState);
});