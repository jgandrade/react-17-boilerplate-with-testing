import React, { Component } from "react";
import { TextField } from '@material-ui/core'

// Props
interface Props {
  setPokeSearch: Function;
}

// State
interface S {
  pokeSearch: string;
}

export default class SearchBar extends Component<Props, S> {

  constructor(props: Props) {
    super(props);

    this.state = {
      pokeSearch: "",
    };
  }

  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <TextField
          variant="outlined"
          style={{width: "50vh", marginRight: "4px"}}
          size="small"
          value={this.state.pokeSearch}
          onChange={(e) => {
            this.setState({pokeSearch: e.target.value});
            this.props.setPokeSearch(e.target.value);
          }} 
          placeholder="Search your pokemon here">
        </TextField>
      </div>
    );
  }
}
