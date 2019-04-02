import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import ThemeProvider from "/lib/component/base/ThemeProvider";

class AppThemeProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data, children } = this.props;
    return (
      <ThemeProvider theme={data.theme.theme} dark={data.theme.dark}>
        {children}
      </ThemeProvider>
    );
  }
}

export default graphql(gql`
  query ThemeProviderQuery {
    theme @client {
      dark
      theme
    }
  }
`)(AppThemeProvider);
