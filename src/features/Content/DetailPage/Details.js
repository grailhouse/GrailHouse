import React, { useState, useEffect } from "react";
import { useParams, Link, withRouter, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
// import axios from "axios";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";

import { addToCloset } from "../../../actions";
import { getDetails } from "../../../actions";
import { removeFromCloset } from "../../../actions";
import NavBar from "../../Nav/NavBar";
import DetailsSkeleton from "../Skeletons/DetailsSkeleton";
import Footer from "../../Footer/Footer";
import FlightClub from "../../../Svgs/Flightclub.svg";
import FlightClubColored from "../../../Svgs/FlightClubColored.svg";
import StockX from "../../../Svgs/StockX.svg";
import StockXColored from "../../../Svgs/StockX-colored.svg";
import Goat from "../../../Svgs/Goat.svg";
import GoatColored from "../../../Svgs/Goat-colored.svg";
import StadiumGoods from "../../../Svgs/StadiumGoods.svg";
import StadiumGoodsColored from "../../../Svgs/StadiumGoods-colored.svg";

import "./Details.css";

const StyledLinks = styled(Link)`
    padding: 5px;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    color: black;
    background: white;
    width: 100%;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid black;
    &:hover {
        background: #f5f5f5;
        color: black;
        text-decoration: none;
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`;

function Details({ id, shoeName, lowestPrice, thumbnail, isLoggedIn, closet, styleId, detailShoe, gettingDetailShoe }) {
    const [detailsTabActive, setDetailsTabActive] = useState(false);
    // const [isDeadstock, setIsDeadstock] = useState(false);
    const params = useParams();
    let style = params.styleId;

    const [stores, setStores] = useState({
        flightClub: {
            active: false,
        },
        stockX: {
            active: true,
        },
        goat: {
            active: false,
        },
        stadiumGoods: {
            active: false,
        },
    });

    const toggleMe = (store) => {
        if (store === "stockX") {
            setStores({
                flightClub: {
                    active: false,
                },
                stockX: {
                    active: true,
                },
                goat: {
                    active: false,
                },
                stadiumGoods: {
                    active: false,
                },
            });
        } else if (store === "flightClub") {
            setStores({
                flightClub: {
                    active: true,
                },
                stockX: {
                    active: false,
                },
                goat: {
                    active: false,
                },
                stadiumGoods: {
                    active: false,
                },
            });
        } else if (store === "goat") {
            setStores({
                flightClub: {
                    active: false,
                },
                stockX: {
                    active: false,
                },
                goat: {
                    active: true,
                },
                stadiumGoods: {
                    active: false,
                },
            });
        } else if (store === "stadiumGoods") {
            setStores({
                flightClub: {
                    active: false,
                },
                stockX: {
                    active: false,
                },
                goat: {
                    active: false,
                },
                stadiumGoods: {
                    active: true,
                },
            });
        }
    };

    let history = useHistory();

    const dispatch = useDispatch();

    const addShoeToCloset = () => {
        if (!isLoggedIn) {
            history.push("/signin");
        }

        dispatch(
            addToCloset({
                shoeId: detailShoe._id,
                styleID: detailShoe.styleID,
                shoeName: detailShoe.shoeName,
                lowestPrice: detailShoe.lowestPrice,
                thumbnail: detailShoe.thumbnail,
                deadstock: detailShoe.isDeadstock,
            })
        );
    };

    const removeShoe = (closetShoeId) => {
        dispatch(removeFromCloset(closetShoeId));
    };

    useEffect(() => {
        dispatch(getDetails(style));
    }, [style]);

    useEffect(() => {
        closetId = JSON.parse(localStorage.getItem("closetId"));
    }, [closet]);

    let closetId = JSON.parse(localStorage.getItem("closetId"));

    let inCloset = closetId ? closetId.hasOwnProperty(detailShoe.shoeName) : false;

    if (!gettingDetailShoe && detailShoe.length < 1) {
        return (
            <React.Fragment>
                <NavBar />
                <DetailsSkeleton />
                <Footer />
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <NavBar />
                <div className="shoe-details-container">
                    <div className="shoe-details-content">
                        <div className="shoe-img">
                            {detailShoe.imageLinks === undefined || null || 0 ? (
                                <div> Loading </div>
                            ) : (
                                <Carousel variant="dark" indicator="true" controls="true" interval={10000}>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={detailShoe.imageLinks[0]}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={detailShoe.imageLinks[1]}
                                            alt="Second slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={detailShoe.imageLinks[2]}
                                            alt="Third slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={detailShoe.imageLinks[3]}
                                            alt="Third slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={detailShoe.imageLinks[4]}
                                            alt="Third slide"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            )}
                        </div>
                        <div className="shoe-details">
                            <h2>{detailShoe.shoeName}</h2>
                            <div className="shoe-img-mobile">
                                <img src={detailShoe.thumbnail} alt="shoe pic" />
                            </div>
                            <div className="details-prices-tabs">
                                <div className="tabs">
                                    <button
                                        onClick={() => setDetailsTabActive(!detailsTabActive)}
                                        className={`details-tab ${!detailsTabActive ? "active" : ""}`}
                                    >
                                        <h5>DETAILS</h5>
                                    </button>
                                    <button
                                        onClick={() => setDetailsTabActive(!detailsTabActive)}
                                        className={`prices-tab ${detailsTabActive ? "active" : ""}`}
                                    >
                                        <h5>PRICES</h5>
                                    </button>
                                </div>
                                <div className="details-box">
                                    <div className={`details-description ${!detailsTabActive ? "active" : "inactive"}`}>
                                        {/* <p>{detailShoe.description}</p> */}
                                        {detailShoe.description === "" ? (
                                            <p>Shoe has no description</p>
                                        ) : (
                                            <p>{detailShoe.description}</p>
                                        )}
                                    </div>
                                    <div className={`prices-prices ${detailsTabActive ? "active" : "inactive"}`}>
                                        <div className="prices-stores">
                                            <button
                                                onClick={() => toggleMe("stockX")}
                                                className={`stockx ${stores.stockX.active ? "active" : "inactive"}`}
                                            >
                                                <img src={stores.stockX.active ? StockXColored : StockX} alt="logo" />
                                            </button>
                                            <button
                                                onClick={() => toggleMe("goat")}
                                                className={`goat ${stores.goat.active ? "active" : "inactive"}`}
                                            >
                                                <img src={stores.goat.active ? GoatColored : Goat} alt="logo" />
                                            </button>
                                            <button
                                                onClick={() => toggleMe("flightClub")}
                                                className={`flightclub ${
                                                    stores.flightClub.active ? "active" : "inactive"
                                                }`}
                                            >
                                                <img
                                                    src={stores.flightClub.active ? FlightClubColored : FlightClub}
                                                    alt="logo"
                                                />
                                            </button>
                                            <button
                                                onClick={() => toggleMe("stadiumGoods")}
                                                className={`stadiumgoods ${
                                                    stores.stadiumGoods.active ? "active" : "inactive"
                                                }`}
                                            >
                                                <img
                                                    src={
                                                        stores.stadiumGoods.active ? StadiumGoodsColored : StadiumGoods
                                                    }
                                                    alt="logo"
                                                />
                                            </button>
                                        </div>

                                        <div className={`stockx-sizes ${stores.stockX.active ? "active" : "inactive"}`}>
                                            {detailShoe.resellPrices === undefined || null || 0 ? (
                                                <div> Loading... </div>
                                            ) : (
                                                <ul className="stockx-ul">
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["6"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na">6 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    6 | ${detailShoe.resellPrices.stockX["6"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["7"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 7 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    7 | ${detailShoe.resellPrices.stockX["7"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["8"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 8 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    8 | ${detailShoe.resellPrices.stockX["8"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["9"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 9 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    9 | ${detailShoe.resellPrices.stockX["9"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["10"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 10 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    10 | ${detailShoe.resellPrices.stockX["10"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["11"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 11 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    11 | ${detailShoe.resellPrices.stockX["11"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["12"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 12 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    12 | ${detailShoe.resellPrices.stockX["12"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["13"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 13 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    13 | ${detailShoe.resellPrices.stockX["13"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["14"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 14 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    14 | ${detailShoe.resellPrices.stockX["14"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["15"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 15 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    15 | ${detailShoe.resellPrices.stockX["15"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.stockX}>
                                                        <li className="stockx-li">
                                                            {detailShoe.resellPrices.stockX["16"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 16 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    16 | ${detailShoe.resellPrices.stockX["16"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                </ul>
                                            )}
                                        </div>

                                        <div className={`goat-sizes ${stores.goat.active ? "active" : "inactive"}`}>
                                            {detailShoe.resellPrices === undefined || null || 0 ? (
                                                <div> Loading</div>
                                            ) : (
                                                <ul className="goat-ul">
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["6"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 6 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    6 | ${detailShoe.resellPrices.goat["6"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["7"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 7 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    7 | ${detailShoe.resellPrices.goat["7"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["8"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 8 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    8 | ${detailShoe.resellPrices.goat["8"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["9"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 9 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    9 | ${detailShoe.resellPrices.goat["9"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["10"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 10 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    10 | ${detailShoe.resellPrices.goat["10"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["11"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 11 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    11 | ${detailShoe.resellPrices.goat["11"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["12"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 12 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    12 | ${detailShoe.resellPrices.goat["12"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["13"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 13 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    13 | ${detailShoe.resellPrices.goat["13"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["14"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 14 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    14 | ${detailShoe.resellPrices.goat["14"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href="">
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["15"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 15 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    15 | ${detailShoe.resellPrices.goat["15"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                    <a href={detailShoe.resellLinks.goat}>
                                                        <li className="goat-li">
                                                            {detailShoe.resellPrices.goat["16"] === undefined ||
                                                            null ||
                                                            0 ? (
                                                                <p className="details-na"> 16 | N/A</p>
                                                            ) : (
                                                                <p className="details-in-stock">
                                                                    16 | ${detailShoe.resellPrices.goat["16"]}
                                                                </p>
                                                            )}
                                                        </li>
                                                    </a>
                                                </ul>
                                            )}
                                        </div>

                                        <div
                                            className={`flightclub-sizes ${
                                                stores.flightClub.active ? "active" : "inactive"
                                            }`}
                                        >
                                            {detailShoe.resellPrices === undefined || null || 0 ? (
                                                <div> Coming soon </div>
                                            ) : (
                                                <ul className="flightClub-ul">
                                                    <div> Coming soon </div>
                                                </ul>
                                            )}
                                        </div>

                                        <div
                                            className={`stadiumgoods-sizes ${
                                                stores.stadiumGoods.active ? "active" : "inactive"
                                            }`}
                                        >
                                            {detailShoe.resellPrices === undefined || null || 0 ? (
                                                <div> Coming soon </div>
                                            ) : (
                                                <ul className="stadiumgoods-ul">
                                                    <div> Coming soon </div>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className={`details-the-little-things ${!detailsTabActive ? "" : "active"}`}>
                                {detailShoe.styleID} | {detailShoe.colorway} | {detailShoe.releaseDate}
                            </span>
                            <div onClick={addShoeToCloset} className={`add-btn ${inCloset ? "inactive " : ""}`}>
                                <StyledLinks>Add to closet</StyledLinks>
                            </div>
                            <div className={`details-got-them ${inCloset ? "" : "inactive "}`}>
                                <StyledLinks
                                    style={{ color: "white", background: "black" }}
                                    className="details-condition-btn"
                                    onClick={() => removeShoe(id)}
                                >
                                    Remove from closet
                                </StyledLinks>
                            </div>
                        </div>
                        <div className="mobile-details-description">
                            <h3> Details </h3>
                            <span>
                                {detailShoe.description === "" ? (
                                    <p style={{ width: "325px" }}>Shoe has no description</p>
                                ) : (
                                    <p className="mobile-description">{detailShoe.description}</p>
                                )}
                            </span>
                            <p className="details-the-little-things">
                                {detailShoe.styleID} | {detailShoe.colorway} | {detailShoe.releaseDate}
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        closet: state.user.closet,
        isLoggedIn: state.isLoggedIn,
        detailShoe: state.detailShoe,
        gettingDetailShoe: state.gettingDetailShoe,
    };
};

const mapDispatchToPros = {
    getDetails,
    addToCloset,
    removeFromCloset,
};

export default withRouter(connect(mapStateToProps, mapDispatchToPros)(Details));
