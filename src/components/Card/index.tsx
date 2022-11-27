import classnames from "classnames";
import React, { useMemo, useState } from "react";
import { Character, createCharacter } from "../../domain/Character";
import { Button } from "../../kit/Button";
import style from "./style.module.scss";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  index?: number;
  character: Character;
  setCharacter: (character: Character) => void;
  setCharacters?: React.Dispatch<React.SetStateAction<Character[]>>;
  select?: (character: Character) => void;
}

export function Card({
  character,
  select = (character: Character) => {},
  setCharacter,
  setCharacters,
  className,
}: Props) {
  const [mode, setMode] = useState<boolean>(true);
  const [selected, setSelected] = useState<boolean>(false);

  const keys = useMemo(() => {
    return character.getKeys();
  }, [character]);

  const updateCharacter = (e: React.ChangeEvent<HTMLInputElement>, k: never) =>
    character.setStat(k, e.target.value, setCharacter);

  const addCharater = () => {
    if (!character.name) {
      alert("please fill a name");
      return;
    }

    setCharacters && setCharacters((characters) => [...characters, character]);
  };

  return (
    <div className={classnames(style.Card, className)}>
      {keys.map((k) => (
        <React.Fragment key={k}>
          <div>{k}</div>
          {mode && !setCharacters ? (
            <div>{character[k as never]}</div>
          ) : (
            <input
              value={character[k as never]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCharacter(e, k as never)
              }
            />
          )}
        </React.Fragment>
      ))}
      {!setCharacters && (
        <Button
          className={classnames(style.button, selected && style.selected)}
          onClick={() => {
            // setSelected(!selected);
            // select(character);
            if (selected) {
              select({} as Character);
              setSelected(false);
              return;
            }
            setSelected(true);
            select(character);
          }}
        >
          {" "}
          select{" "}
        </Button>
      )}
      <Button
        className={classnames(style.button, !mode && style.validtate)}
        onClick={() => {
          setMode(!mode);
          setCharacters && addCharater();
          setCharacters && setCharacter(createCharacter());
        }}
      >
        {mode && !setCharacters ? "edit" : "validate"}
      </Button>
    </div>
  );
}
