import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import { loremIpsum } from "lorem-ipsum";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function App() {
  const [dog, setDog] = useState("");
  const [nameDog, setNameDog] = useState("");
  const [descriptionDog, setDescriptionDog] = useState("");
  const [listaAceptado, setListaAceptado] = useState([]);
  const [listaRechazado, setListaRechazado] = useState([]);
  const [dataDog, setDataDog] = useState([{ image: "", name: "", desc: "" }]);
  const [spinner, setSpinner] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const generarLorem = () => {
    let lorem = "";
    lorem = loremIpsum({
      count: 1, // Number of "words", "sentences", or "paragraphs"
      format: "plain", // "plain" or "html"
      paragraphLowerBound: 3, // Min. number of sentences per paragraph.
      paragraphUpperBound: 7, // Max. number of sentences per paragarph.
      random: Math.random, // A PRNG function
      sentenceLowerBound: 5, // Min. number of words per sentence.
      sentenceUpperBound: 15, // Max. number of words per sentence.
      units: "sentences", // paragraph(s), "sentence(s)", or "word(s)"
    });
    setDescriptionDog(lorem);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const imagenesPerro = () => {
    setSpinner(true);
    axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
      setDog(response.data.message);
      setSpinner(false);
    });
  };
  useEffect(() => {
    imagenesPerro();
    nombrePerro();
    generarLorem();
  }, []);

  const nombrePerro = () => {
    const alphabet = "qwertyuiopasdfghjklñzxcvbnm";
    let randomName = "";
    let i = 0;
    for (i; i < 6; i++) {
      const randomIndex = alphabet.charAt(
        Math.floor(Math.random() * alphabet.length)
      );
      randomName += randomIndex;
    }
    setNameDog(randomName);
  };

  useEffect(() => {
    setDataDog({ image: dog, name: nameDog, desc: descriptionDog });
  }, [dog]);
  //console.log(dataDog);

  const aceptarPerro = (item) => {
    //console.log(item);
    setListaAceptado((listaAceptado) => [...listaAceptado, item]);
    imagenesPerro();
    nombrePerro();
    generarLorem();
    //console.log(listaAceptado);
  };

  const rechazarPerro = (item) => {
    setListaRechazado((listaRechazado) => [...listaRechazado, item]);
    imagenesPerro();
    nombrePerro();
    generarLorem();
  };
  //console.log(listaRechazado);

  const sacarRechazado = (item) => {
    let result = listaRechazado.filter((itemAux) => itemAux.name != item.name);
    setListaRechazado(result);
    setListaAceptado((listaAceptado) => [...listaAceptado, item]);
  };
  const sacarAceptado = (item) => {
    let result = listaAceptado.filter((itemAux) => itemAux.name != item.name);
    setListaAceptado(result);
    setListaRechazado((listaRechazado) => [...listaRechazado, item]);
  };

  return (
    <>
      <Dialog open={spinner}>
        <DialogTitle id="alert-dialog-title">{"Cargando perros"}</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <Typography gutterBottom variant="h5">
        Tinder de Perro
      </Typography>
      <hr />
      <Grid container spacing={2}>
        <Grid item md={4} sm={4} xs={12}>
          <Typography gutterBottom variant="h5" component="div">
            Candidato
          </Typography>
          <Card sx={{ maxWidth: 400, minWidth: 400 }}>
            <CardMedia
              sx={{ height: 400, width: 400 }}
              component="img"
              src={dog}
              title="Perro Random"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {nameDog}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Tooltip title="Rechazar" placement="bottom">
                <IconButton
                  disabled={spinner}
                  sx={{ color: "rgba(0, 131, 208, 0.54)" }}
                  aria-label="no tú no"
                  onClick={() => rechazarPerro(dataDog)}
                >
                  <HeartBrokenIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Aceptar" placement="bottom">
                <IconButton
                  disabled={spinner}
                  sx={{ color: "rgba(232, 18, 36, 0.54)" }}
                  aria-label="no tú no"
                  onClick={() => aceptarPerro(dataDog)}
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <Tooltip title="Descripción" placement="top">
                  <ExpandMoreIcon />
                </Tooltip>
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Descripción.</Typography>
                <Typography paragraph>{descriptionDog}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <Typography gutterBottom variant="h5" component="div">
            Aceptados
          </Typography>
          <Card sx={{ maxWidth: 400, minWidth: 400, minHeight: 500 }}>
            <ImageList
              sx={{ width: 400, height: 500 }}
              cols={3}
              rowHeight={164}
            >
              {listaAceptado.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={
                      <Tooltip title="Descripción" placement="top">
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-describedby={index}
                          aria-label="descripción"
                          onClick={handlePopper}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    }
                    actionIcon={
                      <>
                        <Tooltip title="no, mejor no" placement="top">
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label="no, tú no"
                            onClick={() => sacarAceptado(item)}
                          >
                            <BackspaceIcon />
                          </IconButton>
                        </Tooltip>
                        <Popper id={index} open={open} anchorEl={anchorEl}>
                          <Box
                            sx={{
                              border: 1,
                              p: 1,
                              bgcolor: "#1a1a1a",
                            }}
                          >
                            {item.desc}
                          </Box>
                        </Popper>
                      </>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Card>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <Typography gutterBottom variant="h5" component="div">
            Rechazados
          </Typography>
          <Card
            sx={{
              maxWidth: 400,
              minWidth: 400,
              minHeight: 500,
            }}
          >
            <ImageList
              sx={{ width: 400, height: 500 }}
              cols={3}
              rowHeight={164}
            >
              {listaRechazado.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={
                      <Tooltip title="Descripción" placement="top">
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-describedby={index}
                          aria-label="descripción"
                          onClick={handlePopper}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    }
                    actionIcon={
                      <>
                        <Tooltip
                          title="sí, la verdad es que sí"
                          placement="top"
                        >
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label="dele pah elante nomás"
                            onClick={() => sacarRechazado(item)}
                          >
                            <SportsKabaddiIcon />
                          </IconButton>
                        </Tooltip>
                        <Popper id={id} open={open} anchorEl={anchorEl}>
                          <Box
                            sx={{
                              border: 1,
                              p: 1,
                              bgcolor: "#1a1a1a",
                            }}
                          >
                            {item.desc}
                          </Box>
                        </Popper>
                      </>
                    }
                  ></ImageListItemBar>
                </ImageListItem>
              ))}
            </ImageList>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
