import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;

    justify-content: flex-end;
    align-items: center;

    background-color: ${({theme}) => theme.colors.primary};
    height: ${RFValue(113)}px;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    padding-bottom: ${RFValue(19)}px;
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    justify-content: space-between;

    padding: 24px;
`;

export const Fields = styled.View`
`;

export const TransactionsTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 8px;
    margin-bottom: 16px;
`;
