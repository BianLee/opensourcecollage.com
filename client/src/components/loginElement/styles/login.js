import styled from "styled-components/macro"

export const Inner = styled.div`
    overflow-x: hidden;
    display: flex; 
    flex-direction: ${({ direction }) => direction};
    box-sizing: border-box;
    margin: auto;
    padding: 0;
    font-family: 'Newsreader', serif;
    width: 90%;
    @media (max-width: 980px) {
        flex-direction: column;
        margin: auto; 
        width: 100%;
    }
`; 

export const ContainerZero = styled.div`
    border: dashed white;
    border-width: 5px;
    
    margin-bottom: 10px; 
    margin-right: ${({ marginRight }) => marginRight}; 
    padding: 30px 3%;
    color: white;
    overflow-x: hidden;
    overflow-y: hidden;
    width: ${({ width }) => width};
    height: 345px;
    @media (max-width:980px) {
        margin: auto;
        margin-bottom: ${({ marginBottomSmall }) => marginBottomSmall}; 
        height: auto; 
        width: 95%;
        padding: 30px 0%;
        border-radius: 0px; 
    }
    @media (max-width: 680px) {
        margin: auto;
        margin-bottom: ${({ marginBottomSmall }) => marginBottomSmall}; 
        height: auto; 
        width: 93%;
        padding: 30px 0%;
        border-radius: 0px; 
    }
    background-color: ${({ backgroundColor }) => backgroundColor}
    border-radius: 20px; 
`

export const Label = styled.div` 
    text-align: left;  
    color: black;
    margin: 14px 19%;
    display: block;
    font-size: 1.25rem;
    line-height: 1;
    font-family: 'Newsreader', serif;;
`; 

export const Info = styled.div`
color: white;
margin: 14px 0;
display: block;
font-size: 20px;
line-height: 1.5;
padding-left: 40px;
padding-right: 40px; 
padding-bottom: 10px; 
@media (max-width: 980px) {
   font-size: 18px;
   padding-right: 25px;
}
font-family: 'Newsreader', serif;
@media (min-width: 980px) and (max-width: 1400px) {
    font-size: 16px;
}

`

export const Input = styled.div`
    width: 100%;
    border: none;
    outline: none;
    font-size: 19px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    letter-spacing: 1px;
    margin: auto; 
`; 

export const ButtonContainer = styled.div`
    
    text-align: center;
    margin: auto; 
    width: ${({ width }) => width}; 
    padding: 24px 0;
` 