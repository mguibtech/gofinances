import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface IconsProps {
    type: 'up' | 'down';
}

interface ContainerProps {
    isactive: boolean;
    ype: 'up' | 'down';
}


export const Container = styled(TouchableOpacity) <ContainerProps>`
    width: 46%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-width: ${({ isactive}) => isactive ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    padding: 16px;

    ${({ isactive, type }) => isactive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attencion_light};
    `}

    ${({ isactive, type }) => isactive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light
        };
    `}
`;

export const Icon = styled(Feather) <IconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({ theme, type }) =>
        type === 'up' ? theme.colors.success : theme.colors.attencion
    }
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;
