import { Character, createCharacter } from "../../domain/Character";
import { Storage } from "../../domain/Storage";

interface Props {
  useStorage: () => Storage;
}

export function useBoard({ useStorage }: Props) {
  const character = createCharacter();
  const { setCharacters } = useStorage();

  const generateRandomCharachers = (number: number = 5) => {
    let characterGenerated: Character[] = [];
    for (let index = 0; index < number; index++) {
      const c = createCharacter();
      const keys = c.getKeys();
      const { name, race } = c;

      for (const key of keys) {
        c.setStat(key, Math.floor(Math.random() * 5) + 1);
      }
      c.setStat("name", `${name}-${index + 1}`);
      c.setStat("race", `${race}`);

      characterGenerated = [...characterGenerated, c];
      setCharacters(characterGenerated);
    }

    return characterGenerated;
  };

  const updateLocalCHaracters = (characters: Character[]) => {
    setCharacters(characters);
  };

  return {
    generateRandomCharachers,
    updateLocalCHaracters,
    keys: character.getKeys(),
  };
}
