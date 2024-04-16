import React, { Component } from "react";
import { List, ListItem, Button } from '@material-ui/core';
import { Pagination, } from '@material-ui/lab';
import PokeCard from "./pokeCard";
import PokeModal from "./PokeModal";
import { getPokeList } from "../services/pokeApi"

interface newPokeObject {
  name: string;
  url: string;
}

// Props
interface Props {
  pokeSearch: string;
}

// State
interface S {
  pokeList: Array<newPokeObject>;
  pokeListPage: number;
  pokeModal: boolean;
  pokeUrl: string;
}

export default class SearchBar extends Component<Props, S> {

  constructor(props: Props) {
    super(props);

    this.state = {
      pokeList: [],
      pokeListPage: 1,
      pokeModal: false,
      pokeUrl: "",
    };
  }

  componentDidMount = () => {
    getPokeList()
    .then((res: any) => this.setState({pokeList: res.results}))
    .catch(err => err);
  }

  isOpenPokeModal = (s: string, b: boolean) => {
    this.setState({
      pokeModal: b,
      pokeUrl: s,
    });
  }

  render() {
    return (
      <div style={{display: "flex", flexDirection: "column", marginBlock: "10px"}}>
        <Pagination 
          style={{alignSelf: "center"}}
          count={10} 
          page={this.state.pokeListPage} 
          onChange={(e, p) => this.setState({pokeListPage: p})}/>
        <List style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px"}}>
          {this.state.pokeList
            .filter((pokemon: newPokeObject) => String(pokemon.name).includes(this.props.pokeSearch))
            .slice((30 * (this.state.pokeListPage - 1)), (30 * this.state.pokeListPage))
            .map((pokemon: newPokeObject, index: number) => (
              <ListItem key={index}>
                <Button style={{width: "inherit"}} onClick={() => this.isOpenPokeModal(pokemon.url, true)}>
                  <PokeCard pokeUrl={pokemon.url}/>
                </Button>
              </ListItem>
          ))}
        </List>
        <PokeModal pokeUrl={this.state.pokeUrl} pokeModal={this.state.pokeModal} isOpenPokeModal={this.isOpenPokeModal}/>
      </div>
    );
  }
}
