import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export default function LoadingArticles() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <StyledCard key={index}>
          <CardActionArea>
            <CardContent>
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={20} />
            </CardContent>
          </CardActionArea>
          <Box p={2}>
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="30%" />
          </Box>
        </StyledCard>
      ))}
    </>
  );
}
