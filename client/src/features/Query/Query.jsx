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
import React, { useEffect } from "react";

import {
  StyledContainer,
  StyledFormContainer,
  StyledSearchContainer,
  StyledSearchInput,
} from "./Query.style";
import Result from "./Result/Result";
import { buildQuery } from "../../helpers/helpers";
import { Pagination, Spinner } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeature, searched, selected, pageChanged } from "./querySlice";
import { constants } from "../../constants";

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
  "capsule_serial",
  "capsule_id",
  "status",
  "original_launch",
  "mission",
  "landings",
  "type",
  "reuse_count",
];

function Query({ feature = "CAPSULES", searchableOptions = options }) {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.query.results);
  const loading = useSelector((state) => state.query.loading);
  const selectedOptions = useSelector((state) => state.query.selectedOptions);
  const searchValues = useSelector((state) => state.query.searchValues);
  const pagination = useSelector((state) => state.query.pagination);

  useEffect(() => {
    const queryObj = {
      ...searchValues,
      limit: constants.CAPSULES.LIMIT,
      offset: pagination.offset,
      id: true,
    };
    const query = buildQuery(queryObj);
    dispatch(fetchFeature({ feature, query }));
  }, [searchValues, selectedOptions, pagination.offset, dispatch, feature]);

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectValues = typeof value === "string" ? value.split(",") : value;
    const changedValues = {};
    for (let val of selectValues) {
      changedValues[val] = searchValues[val] ? searchValues[val] : "";
    }
    dispatch(selected(selectValues));
    dispatch(searched(changedValues));
  };

  const handleSearchChange = (event, select) => {
    const {
      target: { value },
    } = event;
    const clonedSearchValues = { ...searchValues };
    clonedSearchValues[select] = value;
    dispatch(searched(clonedSearchValues));
  };

  const handlePageChange = (page) => {
    dispatch(pageChanged(page));
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
        {feature}
      </Typography>

      <StyledFormContainer>
        <Box marginBottom={4}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Search By</InputLabel>
            <Select
              labelId="select-by-label"
              id="select-by"
              multiple
              value={selectedOptions}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Search By" />}
              renderValue={(selected) => selected.join(", ")}
              placeholder="Search By"
              MenuProps={MenuProps}
            >
              {searchableOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  <Checkbox checked={selectedOptions.indexOf(opt) > -1} />
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
          {selectedOptions.map((select) => (
            <StyledSearchInput
              key={select}
              id={select}
              label={select}
              variant="outlined"
              value={searchValues[select]}
              onChange={(e) => handleSearchChange(e, select)}
            />
          ))}
        </StyledSearchContainer>
      </StyledFormContainer>

      {loading ? (
        <Spinner />
      ) : (
        <Result results={results} style={{ marginBottom: "2rem" }} />
      )}
      <Pagination
        page={pagination.page}
        onChange={handlePageChange}
        count={pagination.totalPages}
      />
    </StyledContainer>
  );
}

export default Query;
