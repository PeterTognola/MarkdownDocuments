var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import 'isomorphic-fetch';
var FetchData = (function (_super) {
    __extends(FetchData, _super);
    function FetchData() {
        var _this = _super.call(this) || this;
        _this.state = { forecasts: [], loading: true };
        fetch('http://localhost:5001/api/documents/')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ forecasts: data, loading: false });
        });
        return _this;
    }
    FetchData.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : FetchData.renderForecastsTable(this.state.forecasts);
        return React.createElement("div", null,
            React.createElement("h1", null, "Weather forecast"),
            React.createElement("p", null, "This component demonstrates fetching data from the server."),
            contents);
    };
    FetchData.renderForecastsTable = function (forecasts) {
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "1"),
                    React.createElement("th", null, "2"),
                    React.createElement("th", null, "3"))),
            React.createElement("tbody", null, forecasts.map(function (forecast) {
                return React.createElement("tr", { key: forecast.id },
                    React.createElement("td", null, forecast.title),
                    React.createElement("td", null, forecast.body),
                    React.createElement("td", null, forecast.creationDate));
            })));
    };
    return FetchData;
}(React.Component));
export { FetchData };
//# sourceMappingURL=FetchData.js.map