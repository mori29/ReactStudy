import { useParams } from "react-router-dom";

function Test() {
	let { id } = useParams();
	
	const a = {
	a: 1,
	b: 2,
	c: 3
}


let { b } = a;
	
	console.log(b)
	
	return (<div>Test Id {id}</div>);
}

export default Test;