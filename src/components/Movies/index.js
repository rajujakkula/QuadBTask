import React from "react";
import {
  Stack,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Rating,
} from "@mui/material";

export const Movies = (props) => {
  const { upDateData, data } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      flexWrap="wrap"
      useFlexGap
      padding={4}
    >
      {data.map((item) => (
        <Stack direction="column" key={item.show.id}>
          <Card sx={{ width: 310 }}>
            <CardActionArea disableRipple disabled>
              <CardMedia
                component="img"
                height="140"
                image={item.show.image?.medium}
                alt={item.show.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.show.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography
                    variant="body1"
                    children="Rating"
                    color="text.secondary"
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      paddingInline: 1,
                      paddingY: 0.5,
                      borderRadius: "10px",
                    }}
                  />
                  <Rating
                    name="half-rating-read"
                    defaultValue={item.show.rating.average / 2}
                    precision={0.5}
                    size="medium"
                    readOnly
                  />
                </Stack>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: "space-between" }}>
              <Typography
                variant="body1"
                children={item.show.status}
                sx={{
                  paddingInline: 1,
                  paddingY: 0.5,
                  borderRadius: "5px",
                  backgroundColor:
                    item.show.status === "Running"
                      ? "#4caf50"
                      : item.show.status === "Ended"
                      ? "#ef5350"
                      : "#42a5f5",
                  color: "white",
                }}
              />
              <Button
                size="medium"
                color="primary"
                variant="outlined"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                onClick={() => upDateData(item)}
              >
                View More
              </Button>
            </CardActions>
          </Card>
        </Stack>
      ))}
    </Stack>
  );
};
