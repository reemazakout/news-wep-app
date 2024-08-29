import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export default function NewsArticle(props) {
  const { title, description, author, publishedAt, image, url } = props;

  return (
    <>
      <div>
        <StyledCard>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <CardActionArea>
              {image && (
                <CardMedia
                  component="img"
                  style={{ height: "300px", objectFit: "cover", width: "100%" }}
                  image={image}
                  alt="Sample article"
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </a>

          <Box p={2}>
            <Typography variant="caption" color="textSecondary" display="block">
              {author}
            </Typography>
            {publishedAt && (
              <Typography variant="caption" color="textSecondary">
                {new Date(publishedAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </StyledCard>
      </div>
    </>
  );
}
