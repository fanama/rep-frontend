export interface Character {
  name: string;
  race: string;
  life: number;

  agility: number;
  fight: number;
  wisdom: number;

  charisma: number;
  strength: number;
  survival: number;

  getKeys: () => string[];

  getFight: (bonus?: number) => number;
  setStat: (
    key: string,
    stat: number | string,
    setCharacter?: (character: Character) => void
  ) => void;
}

export function formatCharacter({ ...character }: Character): Character {
  return {
    ...character,
    getFight: function (bonus: number = 0) {
      return this.fight + bonus;
    },

    setStat: function (
      key: string | keyof Character,
      stat: number | string,
      setCharacter?: (character: Character) => void
    ) {
      let key2: keyof Character;

      for (key2 in this) {
        if (key2 == key) {
          this[key2] = stat as never;
        }
      }

      setCharacter && setCharacter({ ...this });
      return this;
    },
    getKeys: function () {
      let keys: string[] = [];
      let key: keyof Character;

      for (key in this) {
        if (typeof this[key] == "number" || typeof this[key] == "string") {
          keys = [...keys, key];
        }
      }
      return keys;
    },
  } as Character;
}

export function createCharacter(
  name: string = "",
  race: string = ""
): Character {
  const character = {
    name,

    race,
    life: 5,

    agility: 2,
    fight: 2,
    wisdom: 2,

    charisma: 2,
    strength: 2,
    survival: 2,

    getFight: function (bonus: number = 0) {
      return this.fight + bonus;
    },

    setStat: function (
      key: string | keyof Character,
      stat: number | string,
      setCharacter?: (character: Character) => void
    ) {
      let key2: keyof Character;

      for (key2 in this) {
        if (key2 == key) {
          this[key2] = stat as never;
        }
      }

      setCharacter && setCharacter({ ...this });
      return this;
    },
    getKeys: function () {
      let keys: string[] = [];
      let key: keyof Character;

      for (key in this) {
        if (typeof this[key] == "number" || typeof this[key] == "string") {
          keys = [...keys, key];
        }
      }
      return keys;
    },
  } as Character;

  return character;
}
