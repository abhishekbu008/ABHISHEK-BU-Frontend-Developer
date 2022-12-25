import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";

import {
  StyledContainer,
  StyledFormContainer,
  StyledSearchContainer,
  StyledSearchInput,
} from "./Query.style";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  { text: "capsule_serial", search: true },
  { text: "capsule_id", search: true },
  { text: "status", search: true },
  { text: "original_launch", search: true },
  { text: "landings", search: true },
  { text: "type", search: true },
];

function Query({ selectOptions = options }) {
  const [selected, setSelected] = useState([]);
  const [searchValues, setSearchValues] = useState({});

  const searchableOptions = selectOptions
    .filter((opt) => opt.search)
    .map((opt) => opt.text);

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectValues = typeof value === "string" ? value.split(",") : value;
    const changedValues = {};
    for (let val of selectValues) {
      changedValues[val] = searchValues[val] ? searchValues[val] : "";
    }
    setSelected(selectValues);
    setSearchValues(changedValues);
  };

  const handleSearchChange = (event, select) => {
    const {
      target: { value },
    } = event;
    const clonedSearchValues = { ...searchValues };
    clonedSearchValues[select] = value;
    setSearchValues(clonedSearchValues);
  };

  return (
    <StyledContainer id="search">
      <Typography
        fontSize={40}
        textAlign={"center"}
        variant="h6"
        marginTop={3}
        marginBottom={6}
      >
        Rockets
      </Typography>

      <StyledFormContainer>
        <Box marginBottom={4}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Search By</InputLabel>
            <Select
              labelId="select-by-label"
              id="select-by"
              multiple
              value={selected}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Search By" />}
              renderValue={(selected) => selected.join(", ")}
              placeholder="Search By"
              MenuProps={MenuProps}
            >
              {searchableOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  <Checkbox checked={selected.indexOf(opt) > -1} />
                  <ListItemText primary={opt} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <StyledSearchContainer
          component="form"
          noValidate
          autoComplete="off"
          fontSize={4}
        >
          {selected.map((select) => (
            <StyledSearchInput
              key={select}
              id={select}
              label={select}
              variant="outlined"
              onChange={(e) => handleSearchChange(e, select)}
            />
          ))}
        </StyledSearchContainer>
      </StyledFormContainer>
    </StyledContainer>
  );
}

export default Query;
