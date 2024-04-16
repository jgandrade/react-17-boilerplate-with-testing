import { Badge, Button, Chip, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from "@material-ui/core";
import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { StringSchemaConstructor } from "yup";
import InfoIcon from '@mui/icons-material/Info';
import { Pagination, PaginationItem } from "@mui/material";
import { getPokemons } from "../../components";
// Props
interface Props {}

// State
export interface PokemonI {
  name: string
  url: string
}
export interface PokemonInfoI {
  id: number
  name: string
  url: string
  image: string
  types: string[]
}
export interface PokemonTypesI {
  slot: number
  type: PokemonI
}
interface S {
  sampleStateNumber: number;
  pokemonData: PokemonInfoI[]
  pokemonCount: number
  pokemonNextPage: string
  page: number
}

export default class Home extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sampleStateNumber: 0,
      pokemonData: [],
      pokemonCount: 0,
      pokemonNextPage: "",
      page: 1,
    };

  }
  fetchAllPokemon = async (page: number) => {
    const pokemonList = await getPokemons(page)
    this.setState( {
      pokemonCount: pokemonList?.pokemonCount || "",
        pokemonData: pokemonList?.pokemonData ||[],
        pokemonNextPage: pokemonList?.pokemonNextPage || "",
    });
    // this.setState({
    //   pokemonCount: results?.pokemonCount || "",
    //   pokemonData: results?.pokemonData ||[],
    //   pokemonNextPage: results?.pokemonNextPage || "",
    // });
  };
  componentDidMount(){
    const query = new URLSearchParams(window.location.search)
    const page = parseInt(query.get("page") || '1', 10);
    this.setState(prevData => ({
      ...prevData,
      page: page,
    }))
      
    this.fetchAllPokemon(page).then((results) => {
      
    }) 
  }
  handleChangePage = (value: string) => {
    const valueNum = parseInt(value, 10)
    this.setState(prevData => ({
      ...prevData,
      page: valueNum,
    }))
    this.fetchAllPokemon(valueNum)
  }

  paginationComponent() {
    return (
      <div style={{ width: "100%", margin: 15}}>
      <Pagination variant="outlined" color="primary" count={Math.round(this.state.pokemonCount/50)} page={this.state.page} onChange={(e) => this.handleChangePage((e.target as HTMLInputElement).value)} />
    </div>
    )
  }
  render() {
    return (
      <>
        <div>
          <h1 className="pokemonTitle">Pokedex</h1>
          {
            this.paginationComponent()
          }
          <ImageList data-testid="pokemon-list" style={{ width: 1200, }} cols={5}>
            
            {
              this.state.pokemonData.map((pokemon:PokemonInfoI) => {
                const { name, image, types, id, url} = pokemon

                return (
                <ImageListItem key={id} >
                  <img src={image} style={{ objectFit: "contain", width:"90%", height:100 }} alt={name} loading="lazy" />
                  <ImageListItemBar 
                  style={{width:"auto"}}
                    title={name}
                    subtitle={
                        pokemon.types.map((type: string,idx:number) => (
                        <Chip  key={idx} label={type} />
                        ))
                    }
                    
                    actionIcon={
                      <Link to={`/profile/${id}`}>
                        <IconButton
                          style={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${name}`}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Link>
                    }
                  ></ImageListItemBar>
                </ImageListItem> 
              )})
            }
          </ImageList>
          {
            this.paginationComponent()
          }
        </div>
      </>
    );
  }
}
