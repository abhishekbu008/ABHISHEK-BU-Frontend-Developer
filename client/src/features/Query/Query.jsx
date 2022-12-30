import React, { useEffect } from "react";

import Result from "./Result/Result";
import { buildQuery } from "../../helpers/helpers";
import { Input, Pagination, Spinner } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeature, searched, selected, pageChanged } from "./querySlice";
import { constants } from "../../constants";
import { Dropdown } from "../../components";

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

const customOptions = [
  { text: "capsule_serial", value: "capsule_serial", selected: false },
  { text: "capsule_id", value: "capsule_id", selected: false },
  { text: "status", value: "status", selected: false },
  { text: "original_launch", value: "original_launch", selected: false },
  { text: "mission", value: "mission", selected: false },
  { text: "landings", value: "landings", selected: false },
  { text: "type", value: "type", selected: false },
  { text: "reuse_count", value: "reuse_count", selected: false },
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

  const handleSelectChange = (selectedValues) => {
    const changedValues = {};
    selectedValues.forEach((select) => {
      changedValues[select.value] = searchValues[select.value]
        ? searchValues[select.val]
        : "";
    });
    dispatch(selected(selectedValues));
    dispatch(searched(changedValues));
  };

  const handleSearchChange = (value, select) => {
    const clonedSearchValues = { ...searchValues };
    clonedSearchValues[select.text] = value;
    dispatch(searched(clonedSearchValues));
  };

  const handlePageChange = (page) => {
    dispatch(pageChanged(page));
  };

  return (
    <div id="search" className="min-h-screen flex flex-col items-center m-10">
      <h6 className="text-center mt-8 mb-8 text-4xl">{feature}</h6>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="mb-4">
          <Dropdown
            options={customOptions}
            placeholder="Search By"
            onChange={handleSelectChange}
            selected={selectedOptions}
          />
        </div>

        <div className="flex justify-between">
          {selectedOptions.map((select) => (
            <Input
              key={select.value}
              placeholder={select.text}
              label={select.text.toUpperCase()}
              value={searchValues[select.text]}
              onChange={(value) => handleSearchChange(value, select)}
              className="mr-4"
            />
          ))}
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full">
          <Pagination
            page={pagination.page}
            onChange={handlePageChange}
            count={pagination.totalPages}
            className=""
          />
          <h5 className="text-center text-4xl">
            Results
          </h5>
          <Result results={results} style={{ marginBottom: "2rem" }} />
        </div>
      )}
    </div>
  );
}

export default Query;
