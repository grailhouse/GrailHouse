import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

import { searchShoes } from "../../../actions";

import "./Search.css";
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "@iconify/react";
import magnifyIcon from "@iconify/icons-mdi/magnify";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

function Search(props) {
	const [searchValue, setSearchValue] = useState("");
	const classes = useStyles();

	let history = useHistory();

	const handleSearchInputChanges = (e) => {
		setSearchValue(e.target.value);
	};

	const resetInputField = () => {
		setSearchValue("");
	};

	const callSearchFunction = () => {
		// e.preventDefault();
		props.searchShoes(searchValue);
		history.push(`search/${searchValue}`);
		resetInputField();
	};

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete="off"
			onSubmit={(e) => callSearchFunction()}
			style={{
				display: "flex",
				width: "90%",
				justifyContent: "space-around",
				alignItems: "center",
				height: "100%",
			}}
		>
			<input
				value={searchValue}
				onChange={handleSearchInputChanges}
				type="text"
				placeholder="Search..."
				style={{
					background: "white",
					width: "75%",
					height: "50%",
					borderRadius: "15px",
					color: "black",
					padding: "10px",
				}}
			/>
			<button
				type="submit"
				style={{
					position: "absolute",
					background: "none",
					right: "10.5rem",
					top: "1.7rem",
					margin: "0",
					padding: "0",
					width: "0",
					color: "black",
				}}
			>
				<Icon icon={magnifyIcon} style={{ height: "1.5rem", width: "1.5rem" }} />
			</button>
		</form>
	);
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = {
	searchShoes,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
