import React, { Component } from "react";
import "./RestaurantList.css";

class RestaurantList extends Component {
  state = {
    loading: true,
  };

  render() {
    const currency = [];
    if (this.props.RestaurantData) {
      this.props.RestaurantData.forEach((item) => {
        if (currency.indexOf(item.currency) === -1) {
          currency.push(item.currency);
        }
      });
    }
    return (
      <div className="row m-1">
        {this.props.RestaurantData ? (
          this.props.RestaurantData.map((item) => (
            <div
              className="card m-3"
              key={item.restaurantId}
              title={item.ratingText}
            >
              <div className="card-body">
                <h5 className="card-title">{item.restaurantName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {item.cuisines}
                </h6>
                <p className="card-text text-muted">
                  Average cost {item.averageCostForTwo}
                  {item.currency === "Dollar($)"
                    ? "$"
                    : item.currency === "Brazilian Real(R$)"
                    ? "BRL"
                    : "P"}{" "}
                  for two
                </p>
                <p className="card-text">
                  {item.hasTableBbooking === "Yes"
                    ? "Has table booking option"
                    : ""}
                  {item.hasOnlineDelivery === "Yes"
                    ? "Has online delivery option"
                    : ""}
                </p>
              </div>

              <div className="row ratings">
                <h4
                  className="card-title"
                  style={{
                    backgroundColor:
                      item.ratingColor === "Dark Green"
                        ? "green"
                        : item.ratingColor === "Green"
                        ? "#9ACD32"
                        : item.ratingColor,
                  }}
                >
                  {item.aggregateRating}
                </h4>
                <p className="card-text text-muted rating-text">
                  {item.ratingText}
                </p>
                <p className="card-text text-muted rating-text">
                  {item.votes} Votes
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="alert alert-danger m-5" role="alert">
              Something Went Wrong...!
            </div>
            <div className="no-data-found">
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RestaurantList;
