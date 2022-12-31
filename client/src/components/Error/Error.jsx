import { Component } from "react";
import { constants } from "../../constants";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }
      return (
        <div class="flex items-center justify-center w-screen h-screen bg-indigo-600 text-center">
          <p class="text-5xl text-white md:text-7xl lg:text-9xl">
            {constants.ERRORS.GENERIC}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default Error;
