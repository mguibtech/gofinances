import React from "react";

import { HighlightCard } from "../../Components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../Components/TransactionCard";

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
    HighlightCards,
    Transactions,
    Title,
    TransactionList
} from './styles'

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: "01/07/2023"
        },
        {
            id: '2',
            type: 'negative',
            title: "Aluguel do apartamento",
            amount: "R$ 180,00",
            category: {
                name: 'Casa',
                icon: 'shopping-bag'
            },
            date: "01/09/2023"
        },
        {
            id: '3',
            type: 'negative',
            title: "Cafezim da tarde",
            amount: "R$ 100,00",
            category: {
                name: 'Alimentação',
                icon: 'coffee'
            },
            date: "01/02/2023"
        }
    ];

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

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <TransactionCard data={item} />}

                />

            </Transactions>

        </Container>
    )
}