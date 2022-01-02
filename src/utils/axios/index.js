import axios from 'axios';
import { useReducer, useEffect } from 'react';
import reducer from './reducer'

const host = "http://localhost:8080"
const Types = {
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
        loading: true,
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
            url: 'https://moriya.free.beeceptor.com/my/api/menu'
        }
        return awaitApi(config);
    }
}

// const reqAuth = {
//     login: (email, password) => {
//         const config = {
//             method: 'POST',
//             url: '/api/account/login',
//             data: {
//                 email: email,
//                 password: password
//             }
//         };
//         return awaitApi(config);
//     },
//     check: () => {
//         const config = {
//             method: 'GET',
//             url: '/api/account/check'
//         };
//         return awaitApi(config);
//     },
//     logout: () => {
//         const config = {
//             method: 'GET',
//             url: '/api/account/logout'
//         };
//         return awaitApi(config);
//     }
// }

// const reqRegister = {
//     register: (email, password) => {
//         const config = {
//             method: 'POST',
//             url: '/api/account/register',
//             data: {
//                 email: email,
//                 password: password
//             }
//         };
//         return awaitApi(config);
//     }
// }

// const reqTodo = {
//     list: () => {
//         const config = {
//             method: 'GET',
//             url: '/api/todos'
//         };
//         return awaitApi(config);
//     },
//     status: (id, status) => {
//         const config = {
//             method: 'POST',
//             url: '/api/todos/status',
//             data: {
//                 id: id,
//                 status: status
//             }
//         };
//         return awaitApi(config);
//     },
//     modify: (item) => {
//         const config = {
//             method: 'POST',
//             url: '/api/todos/modify',
//             data: item
//         }
//         return awaitApi(config);
//     },
//     insert: (item) => {
//         const config = {
//             method: 'POST',
//             url: '/api/todos',
//             data: item
//         }
//         return awaitApi(config);
//     },
//     order: (item) => {
//         const config = {
//             method: 'PATCH',
//             url: `/api/todos/order/${item.id}/${item.orders}`
//         }
//         return awaitApi(config);
//     },
//     remove: (id) => {
//         const config = {
//             method: 'DELETE',
//             url: `/api/todos/${id}`
//         }
//         return awaitApi(config);
//     }
// }

// const reqBoard = {
//     list: () => {
//         const config = {
//             method: 'GET',
//             url: '/api/board'
//         };
//         return awaitApi(config);
//     },
//     modify: (item) => {
//         const config = {
//             method: 'POST',
//             url: '/api/board/modify',
//             data: item
//         }
//         return awaitApi(config);
//     },
//     insert: (item) => {
//         const config = {
//             method: 'POST',
//             url: '/api/board',
//             data: item
//         }
//         return awaitApi(config);
//     },
//     remove: (id) => {
//         const config = {
//             method: 'DELETE',
//             url: `/api/board/${id}`
//         }
//         return awaitApi(config);
//     }
// }




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