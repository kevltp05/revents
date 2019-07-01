import {Component} from 'react';
import { withRouter } from "react-router";

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0,0)
        }
    }

    // We put scroll to top in the index.js file and wrap it around
    // the App Component. Since we return this.props.children, we are
    // able to pass down this component to App and all its children

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)