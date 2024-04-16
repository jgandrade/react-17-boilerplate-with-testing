import React, { Component } from "react";
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';
import { getPokeDetails } from "../services/pokeApi"

interface newPokeSprites {
  front_default: string;
}

interface newPokeObject {
  name: string;
  id: string;
  sprites: newPokeSprites;
}

// Props
interface Props {
  pokeUrl: string;
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
        }
      },
    }
  }

  componentDidMount = () => {
    getPokeDetails(this.props.pokeUrl)
    .then((res: any) => this.setState({pokeObject: res}))
    .catch(err => err);
  }

  componentDidUpdate = () => {
    getPokeDetails(this.props.pokeUrl)
    .then((res: any) => this.setState({pokeObject: res}))
    .catch(err => err);
  }

  render() {
    return (
      <Card style={{display: "flex", width: "inherit", justifyContent: "center", textAlign: "center"}}>
        <CardContent>
          <CardHeader
            style={{width: "inherit"}}
            subheader={`#${String(this.state.pokeObject.id).padStart(5, "0")}`}/>
          <CardMedia
            style={{objectFit: "contain"}} 
            component="img"
            height="100"
            image={this.state.pokeObject.sprites.front_default}
            alt=""/>
          <Typography variant="body2">{String(this.state.pokeObject.name).toUpperCase()}</Typography>
        </CardContent>
      </Card>
    );
  }
}
