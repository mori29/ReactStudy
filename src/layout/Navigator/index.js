import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './scoped.scss';

// 메뉴 목록은 추후 axios 를 통해 비동기로 가져올 예정
const menuList = [
	{ id: 1, link: '/', name: '홈', children: [] },
	{
		id: 2,
		name: '메뉴클릭고고',
		children: [
			{ id: 3, link: '/test', name: '테스트1' },
			{ id: 4, link: '/id-test/123', name: '테스트123' },
			{ id: 5, link: '/id-test/345', name: '테스트345' },
		],
	},
];

function Navigator() {

	const {pathname} = useLocation();

	useEffect(() => {
		const activeOptional = menuList.filter( x => pathname === x.link || x.children.filter( child => pathname === child.link).length > 0);
		const activeId = activeOptional.length > 0 ? activeOptional[0].id : -1
		setActiveIndex(activeId);
	}, [pathname])

	const [activeIndex, setActiveIndex] = useState( -1 );
	const handleActiveIndex = e => {
		const value = parseInt(e.target.dataset.id);
		if(activeIndex !== value) setActiveIndex(value);
		else setActiveIndex(-1)	
	}

	return (
		<div className="nav-wrap">
			<ul className="menu">
				{
					menuList.map(x => {
						return <Menu item={x} activeIndex={activeIndex} onSelect={handleActiveIndex} />
					})
				}
			</ul>
		</div>
	);
}

function Menu({item, activeIndex, onSelect}) {

	const {pathname} = useLocation()
	const [isActive, setActive] = useState(false);
	useEffect(() => {
		
		const checkActive = () => {
			if(pathname === item.link) return true
			else if(item.id !== activeIndex) return false;
			else if(item.children.filter( x => x.link === pathname).length > 0) return true;
			else if(item.id === activeIndex) return true;
			else return false;
		}

		setActive(checkActive())

	}, [activeIndex, item.children, item.id, item.link, pathname])

	return (
		<li
			className={`parent ${item.children.length > 0 ? 'has-child' : ''} ${isActive ? 'active' : ''}`}
			key={item.id}
		>
			{
				item.link ? 
					<NavLink to={item.link} onClick={onSelect} data-id={item.id}>
						{item.name}
					</NavLink> : 
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a onClick={onSelect} data-id={item.id}> 
						{item.name} 
					</a>
			}
			<div className="children">
				<ul>
					{
						item.children.map( child => {
							return <Submenu key={child.id} link={child.link} name={child.name} />
						})
					}
				</ul>
			</div>
		</li>
	);
}

function Submenu({link, name}) {
	return (
		<li className="child">
			<NavLink to={link}>{name}</NavLink>
		</li>
	);
}

export default Navigator;