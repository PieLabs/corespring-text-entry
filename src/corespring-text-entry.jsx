import React from 'react';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green200, green500, amber300, amber500, amber600} from 'material-ui/styles/colors';

export default class CorespringTextEntry extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      value: props.session.value || ''
    };
  }

  _getMuiTheme(className) {
    if (className === 'white-on-black') {
      return getMuiTheme(darkBaseTheme, {
        correctColor: green200,
        incorrectColor: amber500,
        palette: {
          textColor: 'white'
        }
      });
    } else if (className === 'black-on-rose') {
      return getMuiTheme({
        correctColor: green500,
        incorrectColor: amber600
      });
    } else {
      return getMuiTheme({
        correctColor: green500,
        incorrectColor: amber600
      });
    }
  };

  _inputChange(event) {
    this.setState({value: event.target.value});
    this.props.session.value = event.target.value;
  }

  render() {
    const muiTheme = this._getMuiTheme(this.props.model.className);

    let className = "corespring-text-entry ";
    className += this.props.model.className || '';

    let responseLength = !this.props.model.disabled && this.props.session && this.props.session.value && this.props.session.value.length;
    let inputClassName = "text-entry-input" + (responseLength > 0 ? ' filled-in' : '') + (' ' + this.props.model.outcomes);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={className}>
          <input className={inputClassName} type="text" value={this.state.value} onChange={this._inputChange.bind(this)} disabled={this.props.model.disabled}></input>
        </div>
      </MuiThemeProvider>
    );
  }
}

CorespringTextEntry.propTypes = {
  model: React.PropTypes.object,
  session: React.PropTypes.object
};

CorespringTextEntry.defaultProps = {
  session: {
    value: ""
  }
};
