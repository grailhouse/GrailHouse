import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import { Icon } from "@iconify/react";
import gridIcon from "@iconify/icons-gridicons/grid";
import menuIcon from "@iconify/icons-vaadin/menu";

import { getShoes } from "../../../actions";
import NavBar from "../../Nav/NavBar";
import SkeletonCards from "../Skeletons/SkeletonCards";
import TrendingShoesCard from "./TrendingShoesCard";
import TrendingBackground from "../../../Svgs/TrendingBackground.svg";
import SearchResultsForm from "../Search/SearchResultsForm";
import Pagination from "./Pagination/Pagination";
import SideBar from "../SideBar/SideBar";
import Footer from "../../Footer/Footer";
import "./TrendingShoes.css";
import "../Search/Search.css";

const StyledLinks = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 15px;
    text-align: center;
`;

function TrendingShoes({ getShoes, shoes, gettingShoes, closet }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [shoesPerPage] = useState(16);
    const [isViewActive, setIsViewActive] = useState(false);

    useEffect(() => {
        getShoes();
    }, [getShoes]);

    useEffect(() => {
        closetId = JSON.parse(localStorage.getItem("closetId"));
    }, [closet]);

    let closetId = JSON.parse(localStorage.getItem("closetId"));

    //* Get Current Shoes
    const indexofLastShoe = currentPage * shoesPerPage;
    const indexOfFirstShoe = indexofLastShoe - shoesPerPage;
    const currentShoes = shoes.slice(indexOfFirstShoe, indexofLastShoe);

    //* Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <NavBar />
            <div className="cta-trending-img">
                <img src={TrendingBackground} alt="cta-logo" />
            </div>
            <div className="trending-content">
                <div className={`trending-shoes-container ${isViewActive ? "active" : "inactive"}`}>
                    <div className="options">
                        <h3>FILTER</h3>
                        <SideBar />
                    </div>
                    <div className={`trending-shoes-content ${isViewActive ? "active" : "inactive"}`}>
                        <div className="title-details">
                            <div className="title-links-filters-view">
                                <div className="search-links-results-details">
                                    <StyledLinks to="/">HOME</StyledLinks>
                                    {" / "}
                                    <StyledLinks to="/trendingshoes">SNEAKERS</StyledLinks>
                                </div>
                                <div className="options-mobile">filter</div>
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
                        {gettingShoes && <SkeletonCards />}
                        {!gettingShoes &&
                            currentShoes.map((shoe, i) => (
                                <TrendingShoesCard
                                    key={i}
                                    id={shoe._id}
                                    thumbnail={shoe.thumbnail}
                                    shoeName={shoe.shoeName}
                                    lowestPrice={shoe.lowestPrice}
                                    styleId={shoe.styleID}
                                    type="trending"
                                    isViewActive={isViewActive}
                                    inCloset={closetId ? closetId.hasOwnProperty(shoe.shoeName) : false}
                                />
                            ))}
                        <Pagination shoesPerPage={shoesPerPage} totalShoes={shoes.length} paginate={paginate} />
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        shoes: state.shoes,
        gettingShoes: state.gettingShoes,
        gettingShoesError: state.gettingShoesError,
        closet: state.user.closet,
    };
};

const mapDispatchToPros = {
    getShoes,
};

export default withRouter(connect(mapStateToProps, mapDispatchToPros)(TrendingShoes));
