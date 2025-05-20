
import React from "react";
import { GameProvider, useGameContext } from "@/contexts/GameContext";
import GameLobby from "@/components/GameLobby";
import Game from "@/components/Game";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const GameContainer: React.FC = () => {
  const { gameState } = useGameContext();
  
  return (
    <div className="w-full h-full">
      {!gameState ? <GameLobby /> : <Game />}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-3">
      <div className="container max-w-6xl h-[calc(100vh-24px)] relative">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <GameProvider>
          <GameContainer />
        </GameProvider>
      </div>
    </div>
  );
};

export default Index;
