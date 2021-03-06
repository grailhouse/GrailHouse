import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

import { searchingShoes } from "../../../actions";

import "./SearchForm.css";
import { Icon } from "@iconify/react";
import magnifyIcon from "@iconify/icons-mdi/magnify";

function Search(props) {
    const [searchValue, setSearchValue] = useState("");

    let history = useHistory();

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    };

    const resetInputField = () => {
        setSearchValue("");
    };

    const callSearchFunction = () => {
        props.searchingShoes(searchValue);
        history.push(`/search/${searchValue}`);
        resetInputField();
    };

    return (
        <form className="search-form-main" noValidate autoComplete="off" onSubmit={(e) => callSearchFunction()}>
            <input
                className="search-input"
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
                placeholder="Search for brand, color, etc"
                onFocus={(e) => (e.target.placeholder = "")}
            />
            <button className="nav-search-button" type="submit">
                <Icon icon={magnifyIcon} style={{ height: "1.5rem", width: "1.5rem" }} />
            </button>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = {
    searchingShoes,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
