import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./style.css";

class App extends Component {
  state = {
    search: ""
  };

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
        <form>
          <fieldset>
            <legend>Search</legend>
            <p>
              <input type="text" aria-label="Search" onChange={this._handleChange} />
              <input type="submit" value={this.state.search} />
            </p>
          </fieldset>
        </form>

        {this._renderInputs()}
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
                <th>ISO CODE</th>
              </tr>
            </thead>
            <tbody>{this._renderCountries()}</tbody>
          </table>
        )}
      </div>
    );
  }

  _renderSearch = () => {
    return
  }

  _renderInputs = () => {
    return (
      <form>
        <fieldset>
          <legend>Add country information</legend>
          <p>
            <label htmlFor="callingCodes">
              <input
                type="text"
                placeholder="Country Code"
                name="callingCodes"
                onChange={this._handleChange}
              />
            </label>
          </p>
          <p>
            <label htmlFor="name">
              <input
                type="text"
                placeholder="Country"
                name="name"
                onChange={this._handleChange}
              />
              <strong>
                <abbr title="required">*</abbr>
              </strong>
            </label>
          </p>
          <p>
            <label htmlFor="capital">
              <input
                type="text"
                placeholder="Capital"
                name="capital"
                onChange={this._handleChange}
              />
            </label>
          </p>
          <p>
            <label htmlFor="region">
              <input
                type="text"
                placeholder="Region"
                name="region"
                onChange={this._handleChange}
              />
            </label>
          </p>
          <p>
            <label htmlFor="alpha2">
              <input
                type="text"
                placeholder="ISO Code"
                name="alpha2"
                onChange={this._handleChange}
              />
            </label>
          </p>
          <input type="submit" value={this.state.search} />
        </fieldset>
      </form>
    );
  };

  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _checkInputChar = e => {
    const inputChar = this.state.search;
    console.log(inputChar);
  };

  _renderCountries = () => {
    const countries = this.state.countries.map(country => {
      return (
        <CountryRow
          key={country.alpha2Code}
          code={country.callingCodes.join(", ")}
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
