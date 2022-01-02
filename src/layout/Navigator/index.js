import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { APIs, useAsyncAxios, Types } from '@/utils/axios';
import './style.scss';

// // 메뉴 목록은 추후 axios 를 통해 비동기로 가져올 예정
// const menuList2 = [
// 	{ id: 1, link: '/', name: '홈', children: [] },
// 	{
// 		id: 2,
// 		name: '메뉴1',
// 		children: [
// 			{ id: 3, link: '/test', name: '테스트1' },
// 			{ id: 4, link: '/id-test/123', name: '테스트123' },
// 			{ id: 5, link: '/id-test/345', name: '테스트345' },
// 		],
// 	},
// 	{
// 		id: 6,
// 		name: '메뉴2',
// 		children: [
// 			{ id: 7, link: '/id-test/hihi!', name: '테스트hi' },
// 			{ id: 8, link: '/id-test/zzz', name: '테스트zzz' },
// 			{ id: 9, link: '/id-test/aaa', name: '테스트aaa' },
// 		],
// 	},
// ];

function Navigator() {
	const { pathname } = useLocation();

	const [menuState, refetchMenu] = useAsyncAxios(APIs.COMMON.MENU);
	const { type: menuType, data: menuList, error: menuError } = menuState;

	// 현재 활성화 된 최상위 메뉴의 Index를 담아두는 State
	const [activeIndex, setActiveIndex] = useState( -1 );
	const handleActiveIndex = e => {
		const value = parseInt(e.target.dataset.id);
		if(activeIndex !== value) setActiveIndex(value);
		else setActiveIndex(-1)	
	}

	// Path가 변경될 때 마다, 다시 activeIndex 갱신
	useEffect(() => {
		if(menuType !== Types.SUCCESS) return;
		const activeOptional = menuList.filter( x => pathname === x.link || x.children.filter( child => pathname === child.link).length > 0);
		const activeId = activeOptional.length > 0 ? activeOptional[0].id : -1
		setActiveIndex(activeId);
	}, [pathname, menuType, menuList])

	if(menuType === Types.NOSTATE || menuType === Types.LOADING) return (<div>메뉴 로딩 중</div>)	 // TODO: Loading 관련 rendering도 만들어 보자....!
	if(menuError) return <div>메뉴 로딩 중 에러 발생</div>
	if(!menuList) return <div onClick={refetchMenu}>메뉴 다시 불러오기</div>
	return (
		<div className="nav-wrap">
			<ul className="menu">
				{ menuList.map( x => <Menu item={x} activeIndex={activeIndex} onSelect={handleActiveIndex} key={x.id} /> ) }
			</ul>
		</div>
	);
}

/**
 * Menu - Depth 1
 * 링크가 있는 메뉴인 경우 NavLink, 아닌경우 펼치기
 * activeIndex: 현재 선택되어 있는 Depth1 메뉴의 Id
 * onSelect: Depth 1 메뉴 선택 이벤트
 */
function Menu( { item, activeIndex, onSelect } ) {

	// 현재 메뉴가 활성화 (활성화 시 펼치기..) 되어 있는지에 대한 상태
	const [isActive, setActive] = useState(false);
	useEffect(() => {
		if(activeIndex === item.id) setActive(true)
		else setActive(false)
	}, [activeIndex, item.id])

	return (
		<li className={`parent ${item.children.length > 0 ? 'has-child' : ''} ${isActive ? 'active' : ''}`} >
			{
				item.link 
				? <NavLink to={item.link}> {item.name} </NavLink> 
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				: <a onClick={onSelect} data-id={item.id}> {item.name} </a>
			}
			<div className="children">
				<ul>
					{ item.children.map( child => <Submenu key={child.id} link={child.link} name={child.name} /> ) }
				</ul>
			</div>
		</li>
	);
}

/**
 * Menu - Depth 2
 * 심플하게 메뉴에 대한 링크만...
 */
function Submenu( { link, name } ) {
	return (
		<li className="child">
			<NavLink to={link}>{name}</NavLink>
		</li>
	);
}

export default Navigator;