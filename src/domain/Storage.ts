import { Character } from "./Character";

export interface Storage {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  getCharcters: () => Character[];
}
