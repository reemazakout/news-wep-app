import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      </div>
    </>
  );
};
export default Loading;
