import { useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

function App() {
  const [dog, setDog] = useState("");
  const [nameDog, setNameDog] = useState("");
  const [listaAceptado, setListaAceptado] = useState([]);
  const [listaRechazado, setListaRechazado] = useState([]);
  const [dataDog, setDataDog] = useState([{ image: "", name: "" }]);
  const [spinner, setSpinner] = useState(true);

  function imagenesPerro() {
    setSpinner(true);
    axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
      setDog(response.data.message);
      setSpinner(false);
    });
  }
  useEffect(() => {
    imagenesPerro();
    nombrePerro();
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
    setDataDog({ image: dog, name: nameDog });
  }, [dog]);
  //console.log(dataDog);

  const aceptarPerro = (item) => {
    //console.log(item);
    setListaAceptado((listaAceptado) => [...listaAceptado, item]);
    imagenesPerro();
    nombrePerro();
    //console.log(listaAceptado);
  };

  const rechazarPerro = (item) => {
    setListaRechazado((listaRechazado) => [...listaRechazado, item]);
    imagenesPerro();
    nombrePerro();
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
      <Grid container spacing={8}>
        <Grid item md={4} xs={4}>
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
                    subtitle={"descripción"}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label="dele pah elante nomás"
                        onClick={() => sacarRechazado(item)}
                      >
                        <SportsKabaddiIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Card>
        </Grid>
        <Grid item md={4} xs={4}>
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
            <CardActions>
              <Button
                disabled={spinner}
                onClick={() => rechazarPerro(dataDog)}
                size="small"
              >
                Rechazar
              </Button>
              <Button
                disabled={spinner}
                onClick={() => aceptarPerro(dataDog)}
                size="small"
              >
                Aceptar
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} xs={4}>
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
                    subtitle={"descripción"}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label="no tú no"
                        onClick={() => sacarAceptado(item)}
                      >
                        <BackspaceIcon />
                      </IconButton>
                    }
                  />
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
