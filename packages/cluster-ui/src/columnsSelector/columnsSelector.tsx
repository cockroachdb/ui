import Select, { components, OptionsType } from "react-select";
import React from "react";
import classNames from "classnames/bind";
import styles from "./columnsSelector.module.scss";
import { Button } from "../button";
import {
  dropdown,
  dropdownContentWrapper,
  hidden,
} from "../queryFilter/filterClasses";
import { List } from "@cockroachlabs/icons";

const cx = classNames.bind(styles);

export interface SelectOption {
  label: string;
  value: string;
  isSelected: boolean;
}

export interface ColumnsSelectorProps {
  options: SelectOption[];
  selected: string;
  onSubmitColumns: (selected: string) => void;
}

export interface ColumnsSelectorState {
  hide: boolean;
  value: string;
}

/**
 * Create all options items using the values from options
 * on ColumnsSelector()
 * The options must have the parameters label and isSelected
 * @param props
 * @constructor
 */
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

// customStyles uses the default styles provided from the
// react-select component and add changes
const customStyles = {
  container: (provided: any) => ({
    ...provided,
    border: "none",
    height: "fit-content",
  }),
  control: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    position: "relative",
    boxShadow: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "white",
    color: "#394455",
    cursor: "pointer",
    padding: "4px 10px",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#E7ECF3",
    borderRadius: "3px",
  }),
};

/**
 * Creates the ColumnsSelector from the props
 * @param props:
 * options (SelectOption[]): a list of options. Each option object must contain a
 * label, value and isSelected parameters
 * selected (string): a list of the selected value. e.g. 'column1,column3,column4'
 * onSubmitColumns (callback function): receives the selected string
 * @constructor
 */
export default class ColumnsSelector extends React.Component<
  ColumnsSelectorProps,
  ColumnsSelectorState
> {
  constructor(props: ColumnsSelectorProps) {
    super(props);
    this.state = {
      hide: true,
      value: this.props.selected,
    };
  }
  dropdownRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    window.addEventListener("click", this.outsideClick, false);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.outsideClick, false);
  }

  toggleOpen = () => {
    this.setState({
      hide: !this.state.hide,
    });
  };
  outsideClick = () => {
    this.setState({ hide: true });
  };
  insideClick = (event: any) => {
    event.stopPropagation();
  };

  // Update the list of selected values.
  // If all values are selected, add all values to the list,
  // if the value "all" is selected, add all other items to the list and
  // if any other value was deselected, remove "all" from the list.
  handleChange = (
    selectedOptions: OptionsType<SelectOption>,
    allOptions: OptionsType<SelectOption>,
  ) => {
    let selected = selectedOptions
      .map(function(option: SelectOption) {
        return option.value;
      })
      .toString();

    if (this.selectAll(selected)) {
      selected = allOptions
        .map(function(option: SelectOption) {
          return option.value;
        })
        .toString();
    } else {
      selected = selected.replace("all,", "").replace(",all", "");
    }

    this.setState({
      value: selected,
    });
  };
  // Check if the value "all" was the selected option or
  // if the value "all" should be selected because all
  // other values were selected.
  selectAll = (newSelection: string): boolean => {
    return (
      (this.state.value != undefined &&
        this.state.value != "default" &&
        newSelection.includes("all") &&
        !this.state.value.includes("all")) ||
      this.isAllSelected(newSelection)
    );
  };
  handleSubmit = () => {
    this.props.onSubmitColumns(this.state.value);
    this.setState({ hide: true });
  };

  isAllSelected = (selected: string) => {
    if (selected == undefined) return false;
    // If the current selection includes "all" and the size of current list (excluding "all")
    // is the same as the total size of all options, then "all" should be selected.
    if (selected.includes("all"))
      return selected.split(",").length - 1 == this.props.options.length;

    // If the current list doesn't contain "all" but it's "default" or has the same size
    // as the total size of all options, "all" should be selected.
    return (
      selected == "default" ||
      selected.split(",").length == this.props.options.length
    );
  };

  render() {
    const { hide, value } = this.state;
    const { options } = this.props;
    const dropdownArea = hide ? hidden : dropdown;
    const optionsWithAll = [
      {
        label: "All",
        value: "all",
        isSelected: this.isAllSelected(this.state.value),
      },
    ].concat(options);
    const columnsSelected = optionsWithAll.filter(option => {
      if (option.value == "all") return this.isAllSelected(this.state.value);
      return (
        value == undefined ||
        value.length == 0 ||
        value == "default" ||
        value.split(",").includes(option.value)
      );
    });

    return (
      <div
        onClick={this.insideClick}
        ref={this.dropdownRef}
        className={cx("float")}
      >
        <Button type="secondary" size="small" onClick={this.toggleOpen}>
          <List />
        </Button>
        <div className={dropdownArea}>
          <div className={dropdownContentWrapper}>
            <div className={cx("label")}>Hide/show columns</div>
            <Select
              isMulti
              menuIsOpen={true}
              options={optionsWithAll}
              value={columnsSelected}
              onChange={selected => this.handleChange(selected, optionsWithAll)}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              components={{ Option: CheckboxOption }}
              styles={customStyles}
              controlShouldRenderValue={false}
            />
            <div className={cx("apply-btn__wrapper")}>
              <Button
                className={cx("apply-btn__btn")}
                textAlign="center"
                onClick={this.handleSubmit}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
