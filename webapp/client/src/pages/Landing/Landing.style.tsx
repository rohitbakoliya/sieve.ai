import styled from 'styled-components';

export const LandingWrapper = styled.section`
  height: calc(100vh - 50px);
  background-color: rgb(12, 1, 75);
  background-image: radial-gradient(at 50% 100%, rgb(67, 18, 131), rgb(12, 1, 75));
  display: flex;

  #home-left {
    margin-top: 12em;
    display: inline-block;
    width: 40%;
    vertical-align: top;
    text-align: left !important;
    padding-left: 7em;
  }

  #home-left h1 {
    letter-spacing: 1.5px;
    color: #fff;
    font-size: 2.1em;
    letter-spacing: 1.5px;
    font-weight: 400;
    line-height: 1.5;
    border-bottom: 1px #486494 !important;
  }

  #home-left p {
    color: #d1e0f1;
    font-size: 1em;
    letter-spacing: 1.4px;
    font-weight: 300;
    line-height: 2em;
  }

  #home-right {
    margin: auto;
    img {
      transform: skewY(-2deg);
    }
  }
`;
