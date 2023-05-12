import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  Fade,
  Modal,
  Box,
  Backdrop,
  TextField,
} from "@mui/material";

// import moviesData from "../utils/movies.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  minWidth: 220,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const MovieOverView = (props) => {
  const { newData, setShowMovie } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [form, setForm] = useState({
    showName: newData.show.name,
    tickets: 0,
  });

  const ticketBook = (event) => {
    event.preventDefault();
    sessionStorage.setItem(form.showName, form.tickets);
    setOpen(false);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      flexWrap="wrap"
      useFlexGap
    >
      <Stack direction="column" spacing={1}>
        <Stack width={100}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="contained"
            sx={{
              textTransform: "capitalize",
            }}
            onClick={() => {
              setShowMovie(false);
            }}
          >
            Back
          </Button>
        </Stack>
        <Card sx={{ width: "calc(100vw - 50px)" }}>
          <CardActionArea disableRipple disabled>
            <CardMedia
              component="img"
              height="450px"
              image={newData.show.image?.original}
              alt={newData.show.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {newData.show.name}
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
                  defaultValue={newData.show.rating.average / 2}
                  precision={0.5}
                  size="medium"
                  readOnly
                />
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: newData.show.summary }}
              />
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  children="Language:"
                  sx={{
                    fontWeight: "500",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    backgroundColor: "gray",
                    paddingY: 1,
                    paddingX: 1,
                    borderRadius: "5px",
                  }}
                  children={newData.show.language}
                />
              </Stack>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              children={newData.show.status}
              sx={{
                paddingInline: 1,
                paddingY: 0.5,
                borderRadius: "5px",
                backgroundColor:
                  newData.show.status === "Running"
                    ? "#4caf50"
                    : newData.show.status === "Ended"
                    ? "#ef5350"
                    : "#42a5f5",
                color: "white",
              }}
            />
            <Button
              size="large"
              color="primary"
              variant="outlined"
              sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              onClick={handleOpen}
              disabled={newData.show.status === "Running" ? false : true}
            >
              Book Now
            </Button>
          </CardActions>
        </Card>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <form onSubmit={ticketBook}>
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Book Your Tickets
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        id="outlined-required"
                        label="Movie Name"
                        value={newData.show.name}
                        readOnly
                      />
                      <TextField
                        id="outlined-disabled"
                        label="Number of Tickets"
                        onChange={(event) =>
                          setForm({
                            ...form,
                            tickets: parseInt(event.target.value),
                          })
                        }
                      />
                    </Stack>
                    <Button type="submit" variant="contained" size="large">
                      Pay Now
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Fade>
          </Modal>
        </div>
      </Stack>
    </Stack>
  );
};
