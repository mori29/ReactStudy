import { useParams } from "react-router-dom";

function Test() {
	let { id } = useParams();
	
	return (<div>Test Id {id}</div>);
}

export default Test;