import logo from "./logo2.svg";
import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { states } from "./states.js";
import { districtdata } from "./district";

function App() {
	const [body, setBody] = useState({});
	const [flag, setFlag] = useState(false);
	const [dist, setDist] = useState([]);
	const [isSubmitted, setsubmit] = useState(false);

	function handleData({ target }) {
		setBody((prev) => ({ ...prev, [target.name]: target.value }));
	}

	useEffect(() => {
		if (body.state) {
			setDist(districtdata[body.state]);
		}
	}, [body.state]);

	function handleFree(e) {
		body[e.target.name] = !flag;
		setFlag(!flag);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setsubmit(true);
		let res = await axios.post("/api/get", body);
		console.log(res);
	}

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
						18+ and unable to book slot? No need to refresh the CoWIN website
						every five minutes: Sign up and you will receive an email update
						when a slot is available for you.
					</p>
				</div>
				<div className="container">
					<h1 className="title"> Kindly fill the form to get notified.</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formGridEmail">
							<Form.Label className="label">Email :</Form.Label>
							<Form.Control
								style={{ width: "48%" }}
								className="input"
								name="email"
								type="email"
								placeholder="Enter Email"
								onChange={handleData}
								required
							/>
						</Form.Group>

						<Form.Group controlId="formGridState">
							<Form.Label className="label">State :</Form.Label>
							<Form.Control
								className="input"
								name="state"
								as="select"
								onChange={handleData}
								required
							>
								<option value="">Select State</option>
								{states.states.map((value) => (
									<option value={value.state_name}> {value.state_name} </option>
								))}
							</Form.Control>
						</Form.Group>

						<Form.Group controlId="formGridState">
							<Form.Label className="label">District :</Form.Label>
							<Form.Control
								className="input"
								name="district"
								as="select"
								onChange={handleData}
								required
							>
								<option value="">Select District</option>
								{dist.map((value) => (
									<option value={value.district_id}>
										{" "}
										{value.district_name}{" "}
									</option>
								))}
							</Form.Control>
						</Form.Group>

						<Form.Group controlId="formGridZip">
							<Form.Label className="label">Pincode :</Form.Label>
							<Form.Control
								style={{ width: "48%" }}
								className="input"
								name="pin"
								placeholder="Enter Pincode"
								onChange={handleData}
								required
							/>
						</Form.Group>

						<Form.Group controlId="formGridState">
							<Form.Label className="label">Vaccine :</Form.Label>
							<Form.Control
								className="input"
								name="vaccine"
								as="select"
								onChange={handleData}
								required
							>
								<option>Select Vaccine</option>
								<option value="1">Covaxin</option>
								<option value="2">Covishield</option>
								<option value="3">Any</option>
							</Form.Control>
						</Form.Group>

						{/* <Form.Group id="formGridCheckbox">
							<Form.Label className="label">Free :</Form.Label>
							<Form.Check
								style={{ display: "flex", alignItems: "center" }}
								className="input"
								name="isfree"
								type="checkbox"
								label=" yes "
								onChange={handleFree}
							/>
						</Form.Group> */}
						<div style={{ textAlign: "center" }}>
							<Button
								className="button"
								variant="primary"
								type="submit"
								onSubmit={handleSubmit}
							>
								SUBMIT
							</Button>
						</div>
					</Form>
				</div>
				{isSubmitted && <p className="title">Email Verification Link Sent</p>}
				<div
					style={{
						color: "white",
						width: "100%",
						textAlign: "center",
						fontSize: "1rem",
					}}
				>
					<p>
						Want to receive alerts for multiple districts? Fill the form again
						and we've got you covered!
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

export default App;
