/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';

const menuList = [
	{ id: 1, link: '/', name: '홈', children: [] },
	{
		id: 2,
		name: '메뉴클릭고고',
		children: [
			{ link: '/test', name: '테스트1' },
			{ link: '/id-test/123', name: '테스트123' },
		],
	},
];

function Navigator() {
	let location = useLocation();
	console.log(location);
	const menu = makeMenu(menuList);
	return (
		<div className="nav-wrap">
			<ul className="menu">{menu}</ul>
		</div>
	);
}

function makeMenu(list) {
	return list.map((x, i) => {
		const [isActive, setActive] = useState(false);
		const handleToggle = () => {
			setActive(!isActive);
		};
		return (
			<li
				className={`parent ${x.children.length > 0 ? 'has-child' : ''} ${isActive ? 'active' : ''}`}
				key={i}
			>
				{x.link ? <Link to={x.link}>{x.name}</Link> : <a onClick={handleToggle}> {x.name} </a>}
				<div className="children">
					<ul>{makeSubmenu(x.children)}</ul>
				</div>
			</li>
		);
	});
}

function makeSubmenu(list) {
	return list.map((x, i) => {
		return (
			<li className="child" key={i}>
				<Link to={x.link}>{x.name}</Link>
			</li>
		);
	});
}

export default Navigator;