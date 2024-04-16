import React, { Component } from "react";
import PokeSearchBar from "../../components/pokeSearchBar";
import PokeList from "../../components/pokeList";

// Props
interface Props {}

// State
interface S {
  pokeSearch: string;
}

export default class Home extends Component<Props, S> {

  constructor(props: Props) {
    super(props);

    this.state = {
      pokeSearch: "",
    }
  }

  setPokeSearch = (s: string) => {
    this.setState({pokeSearch: s})
  };

  render() {
    return (
      <div style={{display: "flex", flexDirection: "column", margin: "10px"}}>
        <PokeSearchBar setPokeSearch={this.setPokeSearch}/>
        <PokeList pokeSearch={this.state.pokeSearch}/>
      </div>
    );
  }
}
