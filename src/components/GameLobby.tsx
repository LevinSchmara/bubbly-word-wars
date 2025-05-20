import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGameContext } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { T, useLanguage } from "@/contexts/LanguageContext";

const GameLobby: React.FC = () => {
  const { 
    playerName, 
    setPlayerName, 
    gameName, 
    setGameName,
    gameId,
    setGameId,
    createGame,
    joinGame,
    isLoading
  } = useGameContext();
  
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 card-gradient rounded-2xl border border-border glow-box"
    >
      <h2 className="text-2xl font-bold text-center mb-6 glow">
        <T k="gameLobby.title" />
      </h2>
      
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="create">
            <T k="gameLobby.createTab" />
          </TabsTrigger>
          <TabsTrigger value="join">
            <T k="gameLobby.joinTab" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <T k="gameLobby.yourName" />
            </label>
            <Input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t('gameLobby.namePlaceholder')}
              className="w-full bg-secondary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              <T k="gameLobby.gameName" />
            </label>
            <Input
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder={t('gameLobby.gameNamePlaceholder')}
              className="w-full bg-secondary"
            />
          </div>
          
          <Button 
            onClick={createGame} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 
              <T k="gameLobby.creating" /> : 
              <T k="gameLobby.createGame" />
            }
          </Button>
        </TabsContent>
        
        <TabsContent value="join" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <T k="gameLobby.yourName" />
            </label>
            <Input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t('gameLobby.namePlaceholder')}
              className="w-full bg-secondary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              <T k="gameLobby.gameId" />
            </label>
            <Input
              value={gameId}
              onChange={(e) => setGameId(e.target.value.toUpperCase())}
              placeholder={t('gameLobby.gameIdPlaceholder')}
              className="w-full bg-secondary"
            />
          </div>
          
          <Button 
            onClick={joinGame} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 
              <T k="gameLobby.joining" /> : 
              <T k="gameLobby.joinGame" />
            }
          </Button>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default GameLobby;
