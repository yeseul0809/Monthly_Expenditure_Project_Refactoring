import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;

    font-family: "Gowun Dodum", sans-serif;
    font-weight: 400;
    font-style: normal;
    }

    h1 {
    font-size: 2.5rem;
    margin: 15px;
    font-weight: 700;
    }

    .swal2-icon {
    display: flex !important;
    justify-content: center !important;
    margin: auto;
    }

    .swal2-icon-content {
       color: #e22a2a;
    }

    .swal2-popup{
        width: 30rem;
        height: 20rem;
        padding: 25px;
        grid-row: 1;
    }

    .swal2-container{
        grid-row: 1;
    }
     
    .swal2-success-circular-line-right{
        display: none;
    }

    .swal2-confirm.swal2-styled{
    background-color: #e98282;
    border: #e98282;
    }
   
`;

export default GlobalStyles;
