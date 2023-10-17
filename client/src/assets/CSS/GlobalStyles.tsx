// GlobalStyles.js
import styled , { createGlobalStyle } from 'styled-components';
import { Input } from 'semantic-ui-react';


export  const CustomInput = styled(Input)`
  /* أضف أي أنماط مخصصة هنا */
  background-color: #f2f2f2;
  color: #333;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  /* ... إلخ */
`;



const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'CustomFontName';
  src: local('CustomFontName'), local('CustomFontName'),
  url("../font/JannaFont.ttf") format("truetype");
  /* You can define more font weights and styles if needed */
}
* {
  font-family: 'CustomFontName' !important;
  font-weight: 600 !important;
}


`;

export default GlobalStyle;
