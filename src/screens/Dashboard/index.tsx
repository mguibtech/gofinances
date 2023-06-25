import React from "react";

import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards
} from './styles'
import { HighlightCard } from "../../Components/HighlightCard";

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/112142514?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Guibson</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entrada"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de Maio"
                />
                <HighlightCard
                    type="down"
                    title="Saída"
                    amount="R$ 1.400,00"
                    lastTransaction="Última entrada dia 20 de Junho"
                />
                <HighlightCard
                    type="total"
                    title="Saldo"
                    amount="R$ 15.400,00"
                    lastTransaction="Última entrada dia 30 de Junho"
                />
            </HighlightCards>

        </Container>
    )
}