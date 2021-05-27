import logo from "./logo2.svg";
import "./App.css";
import { React, useState, useEffect } from "react";


function Verify(){

    return (
		<>
			<div style={{ maxWidth: "500px" }}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<h1 className="heading">CoWIN NOTIFY</h1>
					<img src={logo} className="App-logo" alt="logo" />
				</div>
				<div
					style={{
						color: "white",
						width: "100%",
						textAlign: "center",
						fontSize: "1rem",
					}}
				>
					<p>
                    Thank you for verifying your email address. You will start receiving 
                    notifications as soon as the slots open. Stay Safe, until then.
					</p>
				</div>
			</div>
			<div className="footer">
				<div>
					{" "}
					<a
						href="https://apisetu.gov.in/public/api/cowin"
						style={{ textDecoration: "none", color: "yellowgreen" }}
					>
						Co-WIN public API
					</a>
				</div>
				<div>
					By{" "}
					<a
						href="https://www.linkedin.com/in/shubhammohapatra/"
						target="_blank"
						style={{ textDecoration: "none", color: "yellowgreen" }}
					>
						Shubham
					</a>{" "}
					&{" "}
					<a
						href="https://www.linkedin.com/in/divjeet-singh/"
						target="_blank"
						style={{ textDecoration: "none", color: "yellowgreen" }}
					>
						Divjeet
					</a>
				</div>
			</div>
		</>
	);



}


export default Verify;