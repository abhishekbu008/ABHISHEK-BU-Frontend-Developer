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

import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { axiosSpaceX as axios } from "../../lib";

import {
  StyledContainer,
  StyledFormContainer,
  StyledSearchContainer,
  StyledSearchInput,
} from "./Query.style";
import Result from "./Result/Result";
import { constants } from "../../constants";
import { buildQuery } from "../../helpers/helpers";
import { Pagination } from "../../components";

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

function Query({
  feature = "CAPSULES",
  searchableOptions = options,
  limit = 8,
  total = 18,
}) {
  const [selected, setSelected] = useState([]);
  const [searchValues, setSearchValues] = useState({});
  const [results, setResults] = useState([]);
  const [paginationProp, setPaginationProp] = useState({
    page: 1,
    offset: 0,
    count: 1,
    totalPages: Math.ceil(total / limit),
  });
  const [loading, setLoading] = useState(true);

  const { doRequest } = useAxios(axios, {
    url: constants.AXIOS_SPACEX[feature] + `?id=true`,
    method: "get",
  });

  useEffect(() => {
    setLoading(true);
    const queryObj = {
      ...searchValues,
      limit: limit,
      offset: paginationProp.offset,
      id: true,
    };
    const query = buildQuery(queryObj);
    doRequest({
      url: constants.AXIOS_SPACEX[feature] + `?${query}`,
    })
      .then((res) => {
        const modifiedRes = [];
        res.forEach((r) => {
          const modified = { ...r };
          modified.id = modified._id;
          delete modified._id;
          modifiedRes.push(modified);
        });
        setResults(modifiedRes);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [feature, searchValues, paginationProp]);

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
    setPaginationProp({
      ...paginationProp,
      page: 1,
      offset: 0,
      count: 1,
    });
  };
  const handlePageChange = (page) => {
    setPaginationProp({
      ...paginationProp,
      page: page,
      offset: limit * (page - 1),
    });
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

      {!loading && (
        <>
          <Result results={results} style={{ marginBottom: "2rem" }} />
          <Pagination
            page={paginationProp.page}
            onChange={handlePageChange}
            count={paginationProp.totalPages}
          />
        </>
      )}
    </StyledContainer>
  );
}

export default Query;
