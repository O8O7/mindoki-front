import { FormControl, Select } from "@mui/material";
import { SelectProps } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { ListItem } from "@mui/material";
import { ClickAwayListener } from "@mui/material";
// import { FormHelperTextProps } from "@mui/material";
import { HighlightQuery as highlightQuery } from "@dccs/utils";
import { useState } from "react";

const SearchFieldWrapper = (props) => {
  const { searchFieldPlaceholder, setQuery } = props;

  return (
    <ClickAwayListener onClickAway={() => null}>
      <ListItem>
        <TextField
          fullWidth
          placeholder={searchFieldPlaceholder || "Search..."}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation;
          }}
        />
      </ListItem>
    </ClickAwayListener>
  );
};

export function SearchSelect(props) {
  const [query, setQuery] = useState("");

  const {
    label,
    error,
    searchFieldPlaceholder,
    removeSelectionText,
    value,
    onChange,
    helpText,
    options,
    formControlProps,
    formHelperTextProps,
    showAll,
    maxVisibleOptions,
    noRemoveSelectionOption,
    ...others
  } = props;

  let { keyPropFn, valuePropFn } = props;

  delete others.keyPropFn;
  delete others.valuePropFn;

  if (!keyPropFn && !valuePropFn) {
    keyPropFn = (option) => option.key;
    valuePropFn = (option) => option.value;
  }

  const defaultProps = {
    style: { width: "100%" },
  };

  function renderFilterOptions() {
    let filteredOptions =
      options &&
      options.filter &&
      options.filter((option) => {
        return (
          !valuePropFn(option) ||
          (valuePropFn(option) &&
            valuePropFn(option)
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) !== -1)
        );
      });
    if (!showAll) {
      filteredOptions = filteredOptions.slice(0, maxVisibleOptions || 20);

      const selectedOption = options.find(
        (option) => value === keyPropFn(option)
      );

      if (selectedOption) {
        if (filteredOptions.indexOf(selectedOption) === -1) {
          filteredOptions.push(selectedOption);
        }
      }
    }

    return filteredOptions.map((option) => {
      const searchVal = valuePropFn(option).toString();
      return (
        <MenuItem key={keyPropFn(option)} value={keyPropFn(option)}>
          {highlightQuery(searchVal, query)}
        </MenuItem>
      );
    });
  }

  return (
    <FormControl margin="normal" {...formControlProps}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        {...defaultProps}
        value={value || ""}
        onChange={onChange}
        error={error}
        MenuProps={{
          onEnter: () => {
            setQuery("");
          },
          onExit: () => {
            setQuery("");
          },
          disableAutoFocusItem: true,
          MenuListProps: {
            disableListWrap: true,
          },
        }}
        {...others}
      >
        <SearchFieldWrapper
          searchFieldPlaceholder={searchFieldPlaceholder}
          setQuery={setQuery}
        />
        {!noRemoveSelectionOption && (
          <MenuItem>{removeSelectionText || "キャンセル"}</MenuItem>
        )}
        {renderFilterOptions()}
      </Select>
      <FormHelperText error={error} {...formHelperTextProps}>
        {helpText}
      </FormHelperText>
    </FormControl>
  );
}
