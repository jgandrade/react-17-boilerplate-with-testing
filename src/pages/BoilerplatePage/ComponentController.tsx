import { Component } from "react";

// Props
interface Props {}

// State
interface S {
  sampleStateNumber: number;
}

export default class ComponentController extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sampleStateNumber: 0,
    };
  }

  componentDidMount = async () => {
    console.log("Component Mount");
  };

  incrementStateNumber = () => {
    this.setState((prev) => {
      return {
        ...prev,
        sampleStateNumber: prev.sampleStateNumber + 1,
      };
    });
  };
}
