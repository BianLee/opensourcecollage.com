import React from "react";
import {
    Inner,
    ContainerZero,
    Container,
    Label,
    Info,
    Input,
    ButtonContainer,
} from "./styles/login";
function Login({ children }) {
    return { children };
}
export default Login;
Login.ContainerZero = function LoginContainerZero({ children, ...restProps }) {
    return <ContainerZero {...restProps}>{children}</ContainerZero>;
};
Login.Inner = function LoginInner({ children, direction }) {
    return <Inner direction={direction}>{children}</Inner>;
};
Login.Info = function LoginInfo({ children }) {
    return <Info>{children}</Info>;
};
Login.Label = function LoginLabel({ children }) {
    return <Label>{children}</Label>;
};
Login.Input = function LoginInput({ children, ...restProps }) {
    return <Input {...restProps}>{children}</Input>;
};
Login.ButtonContainer = function LoginButtonContainer({
    children,
    ...restProps
}) {
    return <ButtonContainer {...restProps}>{children}</ButtonContainer>;
};
