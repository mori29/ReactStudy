import axios from 'axios';
import { useReducer, useEffect } from 'react';
import reducer from './reducer'

const host = "http://localhost:3000"
const Types = {
		NOSTATE: 'NOSTATE',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}

/**
 * axiosApi : axios의 에러 핸들링을 한곳에서 하기 위해!
 * @param {method, data 등 세팅} _config
 */
const awaitApi = async (_config) => {
    if (_config.url.substring(0, 1) === '/') _config.url = host + _config.url
    try {
        return {
            type: Types.SUCCESS,
            data: (await axios(_config)).data,
            error: false
        }
    } catch (e) {
        return {
            type: Types.ERROR,
            data: null,
            error: e
        };
    }
}

function useAsyncAxios(callback, params = {}, deps = [], skip = false) {
    const [state, dispatch] = useReducer(reducer, {
        type: Types.NOSTATE,
        data: null,
        error: false
    });

    const fetchData = async () => {
        dispatch( { type: Types.LOADING } );
        const result = await callback(params);
        dispatch( { type: result.type, data: result.data, error: result.error } );
    };
    
    useEffect(() => {
        if(skip) return;
        fetchData();
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData];
}

const common = {
    menu: () => {
        const config = {
            method: 'GET',
            url: 'https://61d116a0cd2ee50017cc998e.mockapi.io/api/v1/menu-list'
        }
        return awaitApi(config);
    }
}

const APIs = {
    COMMON: {
        MENU: common.menu
    }
}

export {
    Types,
    APIs,
    useAsyncAxios,
}