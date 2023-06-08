import { createGlobalStyle } from 'styled-components';

// 아래 해당 코드는 샘플입니다.
export default createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box;
    }
    html{
        font-size: 1vw;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    ul{
        list-style: none;
    }
`;
