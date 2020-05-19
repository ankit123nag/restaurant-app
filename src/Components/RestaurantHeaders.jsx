import React, { Component } from "react";
import RestaurantList from "./RestaurantList";
import "./RestaurantHeader.css";
import RestaurantData from "../data/restaurants.json";

class RestaurantHeaders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: RestaurantData,
      searchInput: '',
      sortingInput: '',
      filteringInput: '',
    };
    this.setSortingInput = this.setSortingInput.bind(this);
    this.setSearchingInput = this.setSearchingInput.bind(this);
    this.setFilteringInput = this.setFilteringInput.bind(this);
  }

  filteredData = [];

  setSortingInput = (event) => {
    let value = event.target.value;
    this.setState({
      sortingInput: value
    });
    this.filterData();
  };
  setSearchingInput = (event) => {
    let value = event.target.value;
    this.setState({
      searchInput: value
    });
    this.filterData();
  };
  setFilteringInput = (event) => {
    let value = event.target.value;
    this.setState({
      filteringInput: value
    });
    this.filterData();
 
  };

  sortData() {
    const stateObj = this.state;
    if (stateObj.sortingInput === "rating") {
      this.filteredData.sort((a, b) => {
        return (a.aggregateRating - b.aggregateRating);
      });
    } else if (stateObj.sortingInput === "votes") {
      this.filteredData.sort((a, b) => {
        return (a.votes - b.votes);
      });
    } else if (stateObj.sortingInput === "cost") {
      this.filteredData.sort((a, b) => {
        return (a.averageCostForTwo - b.averageCostForTwo);
      });
    }
  }

  filterData() {
    const stateObj = this.state;
    if (stateObj.filteringInput && stateObj.searchInput) {
      this.filteredData = stateObj.restaurantData.filter((data) => {
        return (
          data.restaurantName
            .toLowerCase()
            .includes(stateObj.searchInput.toLowerCase()) &&
          data.cuisines
            .toLowerCase()
            .includes(stateObj.filteringInput.toLowerCase())
        );
      });
    } else if (stateObj.filteringInput) {
      this.filteredData = stateObj.restaurantData.filter((data) => {
        return data.cuisines
          .toLowerCase()
          .includes(stateObj.filteringInput.toLowerCase());
      });
    } else if (stateObj.searchInput) {
      this.filteredData = stateObj.restaurantData.filter((data) => {
        return data.cuisines
          .toLowerCase()
          .includes(stateObj.searchInput.toLowerCase());
      });
    } else {
      this.filteredData = stateObj.restaurantData;
    }
    this.sortData();
  }

  render() {
    const cuisines = [];
    if (this.state.restaurantData) {
      this.state.restaurantData.forEach((item) => {
        item.cuisines.split(",").map((item) => {
          if (cuisines.indexOf(item.trim()) === -1) {
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
              <option value="rating" key='rating'>Rating</option>
              <option value="votes" key='votes'>Votes</option>
              <option value="cost" key='cost'>Cost of Two</option>
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

        <RestaurantList RestaurantData={this.filteredData} />
      </React.Fragment>
    );
  }
}

export default RestaurantHeaders;
