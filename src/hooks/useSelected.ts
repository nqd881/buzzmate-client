import {useCallback, useState} from "react";
import {toArray} from "@utils";

export const useSelected = <S>(
  initialState: S[] = [],
  indentifyFn: (value: S) => any = (S) => S
) => {
  const [selected, setSelected] = useState<S[]>(initialState);

  const isIncluded = useCallback(
    (input: S, source: S[]) =>
      source.map(indentifyFn).includes(indentifyFn(input)),
    [indentifyFn]
  );

  const select = useCallback(
    (input: S | S[]) => {
      const inputArr = toArray(input);
      setSelected((prev) =>
        prev.filter((value) => !isIncluded(value, inputArr)).concat(input)
      );
    },
    [isIncluded]
  );

  const unSelect = useCallback(
    (input: S | S[]) => {
      const inputArr = toArray(input);
      setSelected((prev) =>
        prev.filter((value) => !isIncluded(value, inputArr))
      );
    },
    [isIncluded]
  );

  const isSelected = useCallback(
    (input: S) => isIncluded(input, selected),
    [selected, isIncluded]
  );

  const toggleSelect = useCallback(
    (input: S) => {
      if (isSelected(input)) unSelect(input);
      else select(input);
    },
    [isSelected, select, unSelect]
  );

  const clear = useCallback(() => setSelected([]), []);

  const reset = useCallback(() => setSelected(initialState), [initialState]);

  const selectedCount = selected.length;

  return {
    selected,
    selectedCount,
    select,
    unSelect,
    isSelected,
    toggleSelect,
    clear,
    reset,
  };
};
