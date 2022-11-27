import { useEffect, useState } from "react";
import { Character, formatCharacter } from "../../domain/Character";
import { Storage } from "../../domain/Storage";

export function useLocalStorage(): Storage {
  const [characters, setCharactersData] = useState<Character[]>([]);

  useEffect(() => {
    const characters = localStorage.getItem("characters") || "[]";
    setCharactersData(JSON.parse(characters));
  }, []);

  const getCharcters = (): Character[] => {
    const charactersString = localStorage.getItem("characters") || "[]";
    const characters: Character[] = JSON.parse(charactersString);

    return characters.map((character) => formatCharacter(character));
  };

  const setCharacters = (characters: Character[]) => {
    setCharactersData(characters);
    localStorage.setItem("characters", JSON.stringify(characters));
  };

  return { characters, setCharacters, getCharcters };
}
