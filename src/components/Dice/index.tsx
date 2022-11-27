import React, { useMemo, useRef, useState } from "react";
import classnames from "classnames";
import { Button } from "../../kit/Button";
import styles from "./style.module.scss";
import { Character, createCharacter } from "../../domain/Character";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  option: string[];
  character?: Character;
}

interface Action {
  name: string;
  dice: number;
  typeOfAction: string;
}

export function Dice({
  option,
  character = createCharacter(),
  className,
}: Props) {
  const defaultCharacter = useMemo(() => {
    return createCharacter();
  }, [character]);
  const [dices, setDices] = useState<Action[]>([]);
  const [currentOption, setCurrentOption] = useState<string>(option[3]);
  const historyRef = useRef<HTMLDivElement>(null);

  const launchDice = () => {
    const random =
      Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2;
    const stat = parseInt(character[currentOption as never]) || 0;

    const dist = historyRef.current?.scrollHeight || 1;
    historyRef.current?.scrollTo(10, dist);

    setDices([
      ...dices,
      {
        name: character.name,
        dice: random + stat,
        typeOfAction: currentOption,
      },
    ]);
  };

  return (
    <div className={classnames(className, styles.Dice)}>
      <h1> {character.name}</h1>
      <div ref={historyRef} className={styles.history}>
        {dices.map(({ dice, typeOfAction, name }, index) => {
          const dynamicClass = {
            [styles.success]: dice >= 8,
            [styles.failure]: dice < 8,
          };

          return (
            <div
              key={index}
              className={classnames(styles.action, dynamicClass)}
            >
              <div>{name}</div>
              <div>{typeOfAction}</div>
              <div>{dice}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.bottom}>
        <Button onClick={launchDice}>launch</Button>
        <select
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
        >
          {option.map((o, i) => {
            return (
              <React.Fragment key={o}>
                {i > 2 && typeof defaultCharacter[o as never] == "number" && (
                  <option value={o}>{o}</option>
                )}
              </React.Fragment>
            );
          })}
        </select>
      </div>
    </div>
  );
}
