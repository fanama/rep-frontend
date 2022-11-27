import { useEffect, useMemo, useState } from "react";
import { Character, createCharacter } from "../../domain/Character";
import { Button } from "../../kit/Button";
import { useLocalStorage } from "../../kit/hook/useLocalStorage";
import { Card } from "../Card";
import { Dice } from "../Dice";

import styles from "./style.module.scss";
import { useBoard } from "./useBoard";

export function Board() {
  const { getCharcters } = useLocalStorage();

  const [newCharacter, setNewCharacter] = useState<Character>(
    createCharacter()
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  const { keys, updateLocalCHaracters } = useBoard({
    useStorage: useLocalStorage,
  });

  useEffect(() => {
    const characters = getCharcters();
    setCharacters(characters);
  }, []);

  const setCharacter = (character: Character) => {
    const charactersCopy = [...characters];
    const newCharacters = charactersCopy.map((c) => {
      if (c.name == character.name) {
        return character;
      }
      return c;
    });
    setCharacters(newCharacters);
    updateLocalCHaracters(newCharacters);
  };

  const renderCharacter = useMemo(() => {
    return characters.map((character, index) => (
      <Card
        key={index}
        index={index}
        character={character}
        select={setSelectedCharacter}
        setCharacter={setCharacter}
      />
    ));
  }, [characters]);

  return (
    <div className={styles.board}>
      {renderCharacter}

      <Dice
        className={styles.dice}
        option={keys}
        character={selectedCharacter}
      />
      <div className={styles.right}>
        <Card
          character={newCharacter}
          setCharacter={setNewCharacter}
          setCharacters={setCharacters}
        />
        <Button
          className="w-full"
          onClick={() => {
            updateLocalCHaracters(characters);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
