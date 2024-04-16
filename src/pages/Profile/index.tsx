import { Box, Button, Card, CardContent, CardMedia, Chip } from "@material-ui/core";
import { purple, blue, red, green, grey, yellow, brown  } from "@material-ui/core/colors";
import { Pagination } from "@mui/material";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { getPokemon } from "../../components";

// Props
interface Props {
  id?:string
}

// State
interface S {
  sampleStateNumber: number;
  pokemonDetails: PokemonDetailsI
  page: number
}
interface PokemonInfoI {
  color: string
  textEntry: string
  generation: string
  growthRate: string
  habitat: string
}
export interface PokemonDetailsI {
  name: string
  id: string
  species: PokemonInfoI
  height: string
  weight: string
  types: string[]
  image: string
}
export default class Profile extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sampleStateNumber: 0,
      page: 1,
      pokemonDetails: {
        species: {
          color: "",
          generation: "",
          growthRate: "",
          habitat: "",
          textEntry: "",
        },
        height: "",
        id: "",
        name: "",
        types: [],
        weight: "",
        image: ""
      }
    };
  }

  fetchPokemonInfo = async (value: string) => {
    try {

      const pokemonDetails = await getPokemon(value)
      this.setState( {
        pokemonDetails: pokemonDetails || {
        species: {
          color: "",
          generation: "",
          growthRate: "",
          habitat: "",
          textEntry: "",
        },
        height: "",
        id: "",
        name: "",
        types: [],
        weight: "",
        image: ""
      }
      } )
    } catch(err){
      
    }
  }
  async componentDidMount() {
    
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/');
    const pokemonId = pathParts[2] || this.props.id || ""
    const pokemonDetails = await getPokemon(pokemonId)//
      this.setState( {
        pokemonDetails: pokemonDetails || {
        species: {
          color: "",
          generation: "",
          growthRate: "",
          habitat: "",
          textEntry: "",
        },
        height: "",
        id: "",
        name: "",
        types: [],
        weight: "",
        image: ""
      }
      } )
  }
  
  handleChangePokemon = (value: number) => {
    this.setState(prevData => ({
      ...prevData,
      page: value,
    }))
    this.fetchPokemonInfo(`${value}`)
  }
  getColor = (color: string) => {
    switch (color) {
      case "green":
        return green[500]
      case "purple":
        return purple[500]
      case "red":
        return red[500]
      case "blue":
        return blue[500]
      case "yellow":
        return yellow[300]
      case "brown":
        return brown[500]
      default:
        return grey[500]
    }
  }
  render() {
    const { name, species, height, weight, image, id } = this.state.pokemonDetails
    const idInt:number = parseInt(id, 10)
    return (
      <>
      <Card style={{ backgroundColor: this.getColor(species?.color || ""), display: "flex"}}>
        <Box style={{ display: "flex", flexDirection: "column"}} >
          <CardContent style={{ flex:"1 0 auto", color:"white" }}>
            <h2>Characteristic</h2>
            <div style={{ fontSize: 12, marginTop: 10}}>
              <span style={{ marginRight: 5 }}>Height: { height } </span>
              <span>Weight: { weight }</span>
            </div>
            <div>Growth Rate: { species.growthRate }</div>
            <div>Generation: { species.generation }</div>
            <div>Habitat: { species.habitat }</div>
          </CardContent>
        </Box>  
        <CardContent style={{ width:200, fontSize: 13 }}>
          <CardMedia 
            component="img"
            style={{ width:200, height:200, objectFit:"contain" }}
            image={image}
            alt={name}
          />
          <h2 className="pokemon-name" style={{ color:"white" }}>{ name }</h2>
          <span>
            { species.textEntry }
          </span>
        </CardContent>
      </Card>
      
      <div style={{ width: 200, margin: 15, justifyContent:"space-between"}}>
        {
          (
            idInt > 1 && (
              <Button color="primary" data-testid="pagination-prev-button" variant="contained" onClick={() => this.handleChangePokemon(idInt-1)}>Prev</Button>
            ) 
          )
        }
        <Chip label={id} />
        <Button color="primary" data-testid="pagination-next-button" variant="contained" onClick={() => this.handleChangePokemon(idInt+1)}> Next</Button>
      </div>
      </>
      );
  }
}
