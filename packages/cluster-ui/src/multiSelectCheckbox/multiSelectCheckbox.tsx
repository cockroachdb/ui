import React from "react";
import Select, { components } from "react-select";
import styles from "./multiSelectCheckbox.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const defaultSelectProps = {
  searchable: false,
  clearable: false,
};

export interface SelectOption {
  label: string;
  value: string;
  isSelected: boolean;
}

export interface MultiSelectCheckboxProps {
  field: string;
  options: SelectOption[];
  parent: any;
  placeholder: string;
  value?: SelectOption[];
}

const CheckboxOption = (props: any) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        className={cx("checkbox__input")}
        checked={props.isSelected}
        onChange={() => null}
      />
      <label className={cx("checkbox__label")}>{props.label}</label>
    </components.Option>
  );
};

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    border: "none",
    height: "fit-content",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#DEEBFF" : provided.backgroundColor,
    color: "#394455",
  }),
  control: (provided: any) => ({
    ...provided,
    width: "100%",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#E7ECF3",
    borderRadius: "3px",
  }),
};

export const MultiSelectCheckbox = (props: MultiSelectCheckboxProps) => {
  const handleChange = (selectedOptions: any, field: string, parent: any) => {
    const selected = selectedOptions
      .map(function(option: SelectOption) {
        return option.label;
      })
      .toString();
    parent.setState({
      filters: {
        ...parent.state.filters,
        [field]: selected,
      },
    });
  };

  return (
    <Select
      isMulti
      options={props.options}
      placeholder={props.placeholder}
      value={props.value}
      onChange={selected => handleChange(selected, props.field, props.parent)}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      components={{ Option: CheckboxOption }}
      styles={customStyles}
      {...defaultSelectProps}
    />
  );
};
