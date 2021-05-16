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
		let res = await axios.post("http://localhost:5000/api/get", body);
		console.log(res);
	}

	return (
		<div>
			<h1 className="heading">Cowin Notifier</h1>
			<img src={logo} className="App-logo" alt="logo" />
			<div className="container">
				<h1 className="title"> Kindly Fill the form</h1>
				<Form onSubmit={handleSubmit}>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridEmail">
							<Form.Label className="label">Email</Form.Label>
							<Form.Control
								className="input"
								name="email"
								type="email"
								placeholder="Enter email"
								onChange={handleData}
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						{/* <Form.Group as={Col} controlId="formGridCity">
      <Form.Label className="label">City</Form.Label>
      <Form.Control className="input" placeholder="Enter city"/>
    </Form.Group> */}

						<Form.Group as={Col} controlId="formGridState">
							<Form.Label className="label" style={{ width: "410px" }}>
								State
							</Form.Label>
							<Form.Control
								className="input"
								name="state"
								as="select"
								onChange={handleData}
								required
							>
								<option value="">Choose...</option>
								{states.states.map((value) => (
									<option value={value.state_name}> {value.state_name} </option>
								))}
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridState">
							<Form.Label className="label" style={{ width: "410px" }}>
								District
							</Form.Label>
							<Form.Control
								className="input"
								name="district"
								as="select"
								onChange={handleData}
								required
							>
								<option value="">Choose...</option>
								{dist.map((value) => (
									<option value={value.district_id}>
										{" "}
										{value.district_name}{" "}
									</option>
								))}
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridZip">
							<Form.Label className="label">Zip</Form.Label>
							<Form.Control
								className="input"
								name="pin"
								placeholder="Enter pin code"
								onChange={handleData}
								required
							/>
						</Form.Group>
					</Form.Row>

					<Form.Group as={Col} controlId="formGridState">
						<Form.Label className="label" style={{ width: "410px" }}>
							{" "}
							Which Vaccine?
						</Form.Label>
						<Form.Control
							className="input"
							name="vaccine"
							as="select"
							onChange={handleData}
							required
						>
							<option>Choose...</option>
							<option value="1">Covaxin</option>
							<option value="2">Covishield</option>
							<option value="3">Any</option>
						</Form.Control>
					</Form.Group>

					<Form.Group id="formGridCheckbox">
						<Form.Check
							className="input"
							name="isfree"
							type="checkbox"
							label="Free Vaccine"
							onChange={handleFree}
						/>
					</Form.Group>

					<Button
						className="button"
						variant="primary"
						type="submit"
						onSubmit={handleSubmit}
					>
						Submit
					</Button>
				</Form>
			</div>
			{isSubmitted && <p className="title">Email Verification Link Sent</p>}
		</div>
	);
}

export default App;
