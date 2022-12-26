import { Stack, Pagination as MuiPagination } from "@mui/material";

function Pagination({ page = 1, count = 5, onChange = () => {} }) {
  const handleChange = (e, pageNum) => {
    onChange(pageNum);
  };

  return (
    <Stack spacing={1}>
      <Stack spacing={2}>
        <MuiPagination
          page={page}
          count={count}
          size="large"
          onChange={handleChange}
        />
      </Stack>
    </Stack>
  );
}

export default Pagination;
