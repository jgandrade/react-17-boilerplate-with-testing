import React, { Component } from "react";
import { Modal, Card, Typography, CardContent, CardMedia, CardHeader, List, ListItem } from '@material-ui/core';
import { getPokeDetails } from "../services/pokeApi"

interface newPokeStatName {
  name: string;
}

interface newPokeStat {
  base_stat: string;
  stat: newPokeStatName
}

interface newPokeSprites {
  front_default: string;
}

interface newPokeObject {
  name: string;
  id: string;
  sprites: newPokeSprites;
  stats: Array<newPokeStat>;
}

// Props
interface Props {
  pokeUrl: string;
  pokeModal: boolean;
  isOpenPokeModal: Function;
}

// State
interface S {
  pokeObject: newPokeObject;
}

export default class SearchBar extends Component<Props, S> {

  constructor(props: Props) {
    super(props);

    this.state = {
      pokeObject: {
        name: "",
        id: "",
        sprites: {
          front_default: ""
        },
        stats: []
      },
    }
  }

  componentDidUpdate = () => {
    getPokeDetails(this.props.pokeUrl)
    .then((res: any) => this.setState({pokeObject: res}))
    .catch(err => err);
  }

  render() {
    return (
      <Modal
        open={this.props.pokeModal}
        onClose={() => this.props.isOpenPokeModal("", false)}>
        <Card style={{position: "absolute", overflowY: "auto", width: "70vw", height: "90vh", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white"}}>
          <CardContent>
            <CardHeader
              style={{width: "inherit"}}
              title={String(this.state.pokeObject.name).toUpperCase()}
              subheader={`#${String(this.state.pokeObject.id).padStart(5, "0")}`}/>
            <CardMedia
              style={{objectFit: "contain"}} 
              component="img"
              height="400"
              image={this.state.pokeObject.sprites.front_default}
              alt=""/>
            <div style={{display: "flex", flexDirection: "column"}}>
              <List style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px"}}>
                {this.state.pokeObject.stats.map((pokemon: newPokeStat, index: number) => (
                  <ListItem key={index}>
                    <Typography variant="body2">{pokemon.stat.name}: {pokemon.base_stat}</Typography>
                  </ListItem>
                ))}
              </List>
            </div>
          </CardContent>
        </Card>
      </Modal>
    );
  }
}
