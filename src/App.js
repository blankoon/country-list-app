import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./style.css";

class App extends Component {
  state = {};

  componentDidMount() {
    this._getCountries();
  }

  _getCountries = async () => {
    const countries = await this._callApi();
    this.setState({
      countries
    });
  };

  _callApi = () => {
    return fetch(
      "https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes"
    )
      .then(res => res.json())
      .then(json => json)
      .catch(err => console.log(err));
  };

  render() {
    const { countries } = this.state;

    return (
      <div className={countries ? "App" : "App__loading"}>
        {!countries ? (
          "Loading"
        ) : (
          <table>
            <thead>
              <tr>
                <th>COUNTRY CODE</th>
                <th>COUNTRY</th>
                <th>CAPITAL</th>
                <th>REGION</th>
                <th>ISO CODES</th>
              </tr>
            </thead>
            <tbody>{this._renderCountries()}</tbody>
          </table>
        )}
      </div>
    );
  }

  _renderCountries = () => {
    const countries = this.state.countries.map(country => {
      return (
        <CountryRow
          key={country.alpha2Code}
          code={country.callingCodes[0]}
          name={country.name}
          capital={country.capital}
          region={country.region}
          alpha2={country.alpha2Code}
        />
      );
    });

    return countries;
  };
}

const CountryRow = ({ code, name, capital, region, alpha2 }) => {
  return (
    <tr>
      <td>{code}</td>
      <td>{name}</td>
      <td>{capital}</td>
      <td>{region}</td>
      <td>{alpha2}</td>
    </tr>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
