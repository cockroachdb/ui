import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  FunctionComponent,
} from "react";
import {isEqual} from "lodash";
import classNames from "classnames";

import "./selectInput.scss";


// Type guard to determine if options passed to SelectionsMenu are Option[] or OptGroup[]
export function isOptGroupArray<T>(
  options: Array<Option<T>> | Array<OptGroup<T>>,
): options is Array<OptGroup<T>> {
  if (options && (options as Array<OptGroup<T>>)[0].label) {
    return true;
  }
  return false;
}

// Detect click that occurs outside element
export function isClickOutsideElement(
  e: Event,
  ref: HTMLElement | null,
): boolean {
  if (ref !== null && ref.contains(e.target as Node)) return false;
  return true;
}

// Find initial option given the `value` prop passed to SelectInput
export function getInitialOption<T>(
  value: T,
  options: Array<Option<T>> | Array<OptGroup<T>>,
): Option<T> {
  let found;

  if (isOptGroupArray(options)) {
    // stop iterating option groups when option === value
    options.some(og => {
      found = og.options.find(o => isEqual(o.value, value));
      return !!found;
    });

    if (!found) found = options[0].options[0];
  } else {
    found = options.find(o => isEqual(o.value, value));

    if (!found) found = options[0];
  }

  return found;
}

export interface OptGroup<T> {
  label: string;
  options: Array<Option<T>>;
}

export interface Option<T> {
  key: string | number;
  value: T;
}

export interface SelectInputProps<T> {
  className?: string;
  value: T;
  options: Array<Option<T>> | Array<OptGroup<T>>;
  onChange: (option: Option<T>) => void;
  optionTemplate: FunctionComponent<Option<T>>;
  selectionsMenuFilter?: SelectionsMenuFilter<T>;
  width?: number;
  disabled?: boolean;
  dataTestId?: string;
  icon?: JSX.Element;
}

interface SelectionsMenuProps<T> {
  options: Array<Option<T>> | Array<OptGroup<T>>;
  onChange: (option: Option<T>) => void;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<Option<T>>>;
  optionTemplate: FunctionComponent<Option<T>>;
  selectionsMenuFilter: SelectionsMenuFilter<T>;
  width?: number;
  dataTestId?: string;
}

interface OptGroupMenuProps<T> extends OptGroupAndOptionMenuProps<T> {
  optGroups: Array<OptGroup<T>>;
}
interface OptionMenuProps<T> extends OptGroupAndOptionMenuProps<T> {
  options: Array<Option<T>>;
}

interface OptGroupAndOptionMenuProps<T> {
  onChange: (option: Option<T>) => void;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<Option<T>>>;
  optionTemplate: FunctionComponent<Option<T>>;
  selectionsMenuFilter: SelectionsMenuFilter<T>;
  dataTestId?: string;
}

// Render menu selections conditional on some prop,
// for example: remove selection from list once selected.
type SelectionsMenuFilter<T> = (
  selection: Option<T>,
  index: number,
  array: Array<Option<T>>,
) => boolean;

function SelectInput<T>(props: SelectInputProps<T>) {
  const {
    className,
    value,
    options,
    onChange,
    selectionsMenuFilter = (v: Option<T>, i: number, arr: Array<Option<T>>) =>
      true,
    optionTemplate,
    width,
    disabled,
    dataTestId,
    icon,
  } = props;
  const [selectedOption, setSelectedOption] = useState<Option<T>>(
    getInitialOption(value, options),
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuWidth, setMenuWidth] = useState<number | undefined>(width);
  const containerRef = useRef(null);

  // set SelectionsMenu width to that of SelectInput itself
  const inputRef = useCallback((ref: HTMLDivElement) => {
    if (ref !== null) setMenuWidth(ref.getBoundingClientRect().width);
  }, []);

  // Detect and handle clicks outside SelectInput or SelectionsMenu
  useEffect(() => {
    function handleClick(e: Event) {
      if (isClickOutsideElement(e, containerRef.current)) setShowMenu(false);
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showMenu]);

  return (
    <div className="crl-select-input__selection__container" ref={containerRef}>
      <div
        className={classNames("crl-select-input__selection", className, {
          "crl-select-input__selection--active": showMenu,
          "crl-select-input__selection--disabled": disabled,
        })}
        data-testid={dataTestId ? `${dataTestId} selection` : ""}
        onClick={_ => {
          if (!disabled) setShowMenu(!showMenu);
        }}
        style={{ width }}
        ref={inputRef}
      >
        {optionTemplate(selectedOption)}
        {!disabled && icon
        }
      </div>
      {showMenu && !disabled && (
        <SelectionsMenu
          width={menuWidth}
          options={options}
          onChange={onChange}
          setShowMenu={setShowMenu}
          setSelectedOption={setSelectedOption}
          selectionsMenuFilter={selectionsMenuFilter}
          optionTemplate={optionTemplate}
          dataTestId={dataTestId}
        />
      )}
    </div>
  );
}

function SelectionsMenu<T>(props: SelectionsMenuProps<T>) {
  const {
    width,
    options,
    onChange,
    setShowMenu,
    setSelectedOption,
    selectionsMenuFilter,
    optionTemplate,
    dataTestId,
  } = props;
  return (
    <ul
      className="crl-select-input__selections-menu"
      data-testid={dataTestId ? `${dataTestId} selections-menu` : ""}
      style={{ width }}
    >
      {isOptGroupArray(options) ? (
        <OptGroups
          optGroups={options}
          onChange={onChange}
          optionTemplate={optionTemplate}
          setShowMenu={setShowMenu}
          setSelectedOption={setSelectedOption}
          selectionsMenuFilter={selectionsMenuFilter}
          dataTestId={dataTestId}
        />
      ) : (
        <Options
          options={options}
          onChange={onChange}
          optionTemplate={optionTemplate}
          setShowMenu={setShowMenu}
          setSelectedOption={setSelectedOption}
          selectionsMenuFilter={selectionsMenuFilter}
          dataTestId={dataTestId}
        />
      )}
    </ul>
  );
}

function OptGroups<T>(props: OptGroupMenuProps<T>) {
  const {
    optGroups,
    onChange,
    setShowMenu,
    setSelectedOption,
    selectionsMenuFilter,
    optionTemplate,
    dataTestId,
  } = props;

  return (
    <>
      {optGroups.map((og, i) => {
        const { label, options } = og;
        return (
          <ul
            key={i}
            className="crl-select-input__opt-group"
            data-testid={dataTestId ? `${dataTestId} opt-group-${i}` : ""}
          >
            <li className="crl-select-input__opt-group__container">
              <span
                className="crl-select-input__opt-group__string"
                data-testid={
                  dataTestId ? `${dataTestId} opt-group-${i} string` : ""
                }
              >
                {label}
              </span>
              <Options
                options={options}
                onChange={onChange}
                setShowMenu={setShowMenu}
                setSelectedOption={setSelectedOption}
                selectionsMenuFilter={selectionsMenuFilter}
                optionTemplate={optionTemplate}
                dataTestId={dataTestId}
              />
            </li>
          </ul>
        );
      })}
    </>
  );
}

function Options<T>(props: OptionMenuProps<T>) {
  const {
    options,
    onChange,
    setShowMenu,
    setSelectedOption,
    selectionsMenuFilter,
    optionTemplate,
    dataTestId,
  } = props;

  return (
    <ul className="crl-select-input__options-list">
      {options.filter(selectionsMenuFilter).map((o, i) => (
        <li
          key={i}
          className="crl-select-input__option"
          data-testid={dataTestId ? `${dataTestId} option-${i}` : ""}
          onClick={() => {
            onChange(o);
            setSelectedOption(o);
            setShowMenu(false);
          }}
        >
          {optionTemplate(o)}
        </li>
      ))}
    </ul>
  );
}

export default SelectInput;
