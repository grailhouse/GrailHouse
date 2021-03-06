import React, { useEffect, useState } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import gridIcon from "@iconify/icons-gridicons/grid";
import menuIcon from "@iconify/icons-vaadin/menu";

import { searchingShoes } from "../../../actions";
import NavBar from "../../Nav/NavBar";
import SearchResultsForm from "./SearchResultsForm";
import SkeletonCards from "../Skeletons/SkeletonCards";
import Footer from "../../Footer/Footer";
import "./Search.css";
import SearchPaginate from "./SearchPaginate";
import SideBar from "../SideBar/SideBar";
import SearchedShoesDetails from "./SearchedShoesDetails";

const StyledLinks = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 15px;
    text-align: center;
`;

function Search({ searchResults, searchShoes, shoeName, closet }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [shoesPerPage] = useState(24);
    const [isViewActive, setIsViewActive] = useState(false);
    let params = useParams();
    const newShoeName = params.shoe.toUpperCase();

    useEffect(() => {
        closetId = JSON.parse(localStorage.getItem("closetId"));
    }, [closet]);

    let closetId = JSON.parse(localStorage.getItem("closetId"));

    //* Get Current Shoes
    const indexofLastShoe = currentPage * shoesPerPage;
    const indexOfFirstShoe = indexofLastShoe - shoesPerPage;
    const currentShoes = searchResults.slice(indexOfFirstShoe, indexofLastShoe);

    //* Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <NavBar />
            <div className="cta-shoelinks-img">
                <h1>{newShoeName}</h1>
            </div>
            <div className="search-content">
                <div className={`search-shoes-container ${isViewActive ? "active" : "inactive"}`}>
                    <div className="search-options">
                        <h3>FILTER</h3>
                        <SideBar />
                    </div>
                    <div className={`search-shoes-content ${isViewActive ? "active" : "inactive"}`}>
                        <div className="title-details">
                            <div className="title-links-filters-view">
                                <div className="search-links-results-details">
                                    <StyledLinks to="/">HOME</StyledLinks>
                                    {" / "}
                                    <StyledLinks to="/trendingshoes">SNEAKERS</StyledLinks>
                                    {" / "}
                                    <StyledLinks to={`/${params.shoe}`}>{newShoeName}</StyledLinks>
                                    <div className="search-results-name">
                                        <h3>Search results for " {newShoeName} "</h3>
                                    </div>
                                </div>
                                <div className="search-options-mobile">filter</div>
                                <div className="search-bar-details">
                                    <SearchResultsForm search={SearchResultsForm} />
                                    <Icon
                                        icon={gridIcon}
                                        onClick={() => setIsViewActive(!isViewActive)}
                                        style={
                                            isViewActive
                                                ? { color: "CECECE", width: "2.5rem", height: "2.5rem" }
                                                : { color: "000000", width: "2.5rem", height: "2.5rem" }
                                        }
                                    />
                                    <Icon
                                        icon={menuIcon}
                                        onClick={() => setIsViewActive(!isViewActive)}
                                        className={`menu-list-icon ${isViewActive ? "active" : "inactive"}`}
                                        style={
                                            isViewActive
                                                ? { color: "000000", width: "2rem", height: "3rem" }
                                                : { color: "CECECE", width: "2rem", height: "3rem" }
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {searchShoes && <SkeletonCards />}
                        {!searchShoes &&
                            currentShoes.map((shoe, i) => (
                                <SearchedShoesDetails
                                    key={i}
                                    id={shoe._id}
                                    thumbnail={shoe.thumbnail}
                                    shoeName={shoe.shoeName}
                                    lowestPrice={shoe.lowestPrice}
                                    styleId={shoe.styleID}
                                    type="shoe"
                                    isViewActive={isViewActive}
                                    inCloset={closetId ? closetId.hasOwnProperty(shoe.shoeName) : false}
                                />
                            ))}
                        <SearchPaginate
                            shoesPerPage={shoesPerPage}
                            totalShoes={searchResults.length}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        searchShoes: state.searchShoes,
        searchShoesError: state.searchShoesError,
        searchResults: state.searchResults,
        closet: state.user.closet,
    };
};

const mapDispatchToProps = {
    searchingShoes,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
