import { useGameStore } from "./GameStore";
import { saveLocalGame } from "./storage";

useGameStore.subscribe((state) => {
    const gameState = {
        resources: state.resources,
        buildings: state.buildings,
        military: state.military,
    };

    saveLocalGame(gameState);

    // const user = auth.currentUser;

    // if (!user) {
    //     throw new Error("User not logged in");
    // }
    // saveAppStateToFb(user.uid, gameState);
});