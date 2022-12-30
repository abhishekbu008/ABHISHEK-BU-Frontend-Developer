import React, { useEffect } from "react";

import Result from "./Result/Result";
import { buildQuery } from "../../helpers/helpers";
import { Error, Input, Pagination, Spinner } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeature, searched, selected, pageChanged } from "./querySlice";
import { constants } from "../../constants";
import { Dropdown } from "../../components";

function Query({ feature, searchableOptions }) {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.query.results);
  const loading = useSelector((state) => state.query.loading);
  const selectedOptions = useSelector((state) => state.query.selectedOptions);
  const searchValues = useSelector((state) => state.query.searchValues);
  const pagination = useSelector((state) => state.query.pagination);
  const error = useSelector((state) => state.query.error);

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
        ? searchValues[select.value]
        : "";
    });
    dispatch(selected(selectedValues));
    dispatch(searched(changedValues));
  };

  const handleSearchChange = (value, select) => {
    const clonedSearchValues = { ...searchValues };
    clonedSearchValues[select.value] = value;
    dispatch(searched(clonedSearchValues));
  };

  const handlePageChange = (page) => {
    dispatch(pageChanged(page));
  };

  if (error.length > 0) return <Error />;

  return (
    <div
      id="search"
      className="min-h-screen flex flex-col items-center m-4 md:m-10"
    >
      <h6 className="text-center mt-8 mb-8 text-4xl">{feature}</h6>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="mb-4 w-full md:w-11/12">
          <Dropdown
            options={searchableOptions}
            placeholder="Search By"
            onChange={handleSelectChange}
            selected={selectedOptions}
          />
        </div>

        <div className="flex justify-between flex-wrap">
          {selectedOptions.map((select) => (
            <Input
              key={select.value}
              placeholder={select.text}
              label={select.text.toUpperCase()}
              value={searchValues[select.text]}
              onChange={(value) => handleSearchChange(value, select)}
              className="mr-4 mb-4"
            />
          ))}
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full">
          <div className="flex justify-center mb-8 mt-8">
            <Pagination
              page={pagination.page}
              onChange={handlePageChange}
              count={pagination.totalPages}
            />
          </div>
          <h5 className="text-center text-4xl mb-8">Results</h5>
          <Result results={results} style={{ marginBottom: "2rem" }} />
        </div>
      )}
    </div>
  );
}

export default Query;
