import React, { Component } from "react";
import RestaurantList from "./RestaurantList";
import "./RestaurantHeader.css";
import RestaurantData from "../data/restaurants.json";

class RestaurantHeaders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: RestaurantData,
      filteredData: [],
      searchInput: "",
      sortingInput: "rating",
      filteringInput: "",
    };
    this.setSortingInput = this.setSortingInput.bind(this);
    this.setSearchingInput = this.setSearchingInput.bind(this);
    this.setFilteringInput = this.setFilteringInput.bind(this);
  }

  componentDidMount() {
    this.filterData();
  }

  setSortingInput = (event) => {
    let value = event.target.value;
    this.setState(
      {
        sortingInput: value,
      },
      () => {
        this.filterData();
      }
    );
  };
  setSearchingInput = (event) => {
    let value = event.target.value;
    this.setState(
      {
        searchInput: value,
      },
      () => {
        this.filterData();
      }
    );
  };
  setFilteringInput = (event) => {
    let value = event.target.value;
    this.setState(
      {
        filteringInput: value,
      },
      () => {
        this.filterData();
      }
    );
  };

  sortData() {
    const stateObj = this.state;
    let sortedData = [];
    if (stateObj.sortingInput === "rating") {
      sortedData = stateObj.filteredData.sort((a, b) => {
        return b.aggregateRating - a.aggregateRating;
      });
    } else if (stateObj.sortingInput === "votes") {
      sortedData = stateObj.filteredData.sort((a, b) => {
        return b.votes - a.votes;
      });
    } else if (stateObj.sortingInput === "cost") {
      sortedData = stateObj.filteredData.sort((a, b) => {
        return a.averageCostForTwo - b.averageCostForTwo;
      });
    }
    this.setState({
      filteredData: sortedData,
    });
  }

  filterData() {
    const stateObj = this.state;
    let filteredData = [];
    console.log(stateObj.filteringInput);
    console.log(stateObj.searchInput);
    console.log(stateObj.sortingInput);
    if (stateObj.filteringInput && stateObj.searchInput) {
      filteredData = stateObj.restaurantData.filter((data) => {
        return (
          data.restaurantName
            .toLowerCase()
            .includes(stateObj.searchInput.toLowerCase()) &&
          data.cuisines
            .toLowerCase()
            .includes(stateObj.filteringInput.toLowerCase())
        );
      });
    }
    else if (stateObj.filteringInput) {
      filteredData = stateObj.restaurantData.filter((data) => {
        return data.cuisines
          .toLowerCase()
          .includes(stateObj.filteringInput.toLowerCase());
      });
    }
    else if (stateObj.searchInput) {
      filteredData = stateObj.restaurantData.filter((data) => {
        return data.restaurantName
          .toLowerCase()
          .includes(stateObj.searchInput.toLowerCase());
      });
    } else {
      filteredData = stateObj.restaurantData;
    }
    this.setState(
      {
        filteredData: filteredData,
      },
      () => this.sortData()
    );
  }

  render() {
    const cuisines = [];
    if (this.state.restaurantData) {
      this.state.restaurantData.forEach((item) => {
        item.cuisines.split(",").map((item) => {
          if (cuisines.indexOf(item.trim()) === -1 && item) {
            cuisines.push(item.trim());
          }
        });
      });
    }

    return (
      <React.Fragment>
        <nav className="navbar navbar-light navbar-expand-md justify-content-between sticky-top">
          <div className="input-group m-2">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="sortBy">
                Sort By
              </label>
            </div>
            <select
              className="custom-select"
              id="sortBy"
              onChange={this.setSortingInput}
            >
              <option value="rating" key="rating">
                Rating
              </option>
              <option value="votes" key="votes">
                Votes
              </option>
              <option value="cost" key="cost">
                Cost of Two
              </option>
            </select>
          </div>

          <input
            className="form-control m-2"
            type="text"
            placeholder="Search Restaurants By Name"
            onChange={this.setSearchingInput}
          />

          <div className="input-group m-2">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="filterBy">
                Filter Cuisine
              </label>
            </div>
            <select
              className="custom-select"
              id="filterBy"
              onChange={this.setFilteringInput}
            >
              <option value="">None...</option>
              {cuisines.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </nav>

        <RestaurantList RestaurantData={this.state.filteredData} />
      </React.Fragment>
    );
  }
}

export default RestaurantHeaders;
