import { useEffect, useReducer } from 'react';

//1.상태 초기화
const initialState = {
    loading: false,
    data:null,
    error:null
}

//2.리듀서 함수 구현
//로딩중일때 상태 업데이트 LOADING
//데이터를 성공적으로 받을때 상태 업데이트 SUCCES
//에러가 발생했을 경우 상태 업데이트 ERROR
function reducer(state , action){
    switch(action.type){
        case 'LOADING':
            return{
                loading:true,
                data:null,
                error:null
            };
        case 'SUCCES':
            return{
                loading:false,
                data:action.data,
                error:null
            }
        case 'ERROR':
            return{
                loading:false,
                data:null,
                error:action.error
            }
        default:
            return state;
    }
}

const useAsync = (callback,deps=[],id) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    //데이터를 요청 함수
    const fetchData = async () =>{
        //loading의 value를 true로 상태 업데이트
        dispatch({ type: "LOADING"});

        //에러가 발생할 확률이 높은 코드작성시 에러 핸들링
        try{
            const data = await callback(id);
            dispatch({ type: "SUCCES",data:data})//data:data 생략가능 data로 적으면됨
        }
        catch(e){
            dispatch({type:"ERROR",error:e}) 
        }
    }

    useEffect(()=>{
        fetchData();
    },deps)

    return state;
};

export default useAsync;