import React, { createContext, useContext, useState } from "react";

type GameState = {
  score: number;
  level: number;
};

type GameContextType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
};

// export default function App() {
//   return (
//     <GameProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Game" component={GameScreen} />
//           <Stack.Screen name="Shop" component={ShopScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </GameProvider>
//   );
// }
