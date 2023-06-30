import React, { useCallback, useEffect, useState } from "react";

import { HighlightCard } from "../../Components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../Components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native'
import { useTheme } from "styled-components";


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
    TransactionList,
    LogountButton,
    LoadContainer
} from './styles'

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
    const dataKey = '@gofinance:transactions';
    const theme = useTheme();

    let entrisTotal = 0;
    let expensiveTotal = 0;

    async function loadTransactions() {
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormated: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entrisTotal += Number(item.amount)
                } else {
                    expensiveTotal += Number(item.amount)
                }

                const amount = Number(item.amount).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).format(new Date(item.date))

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    date,
                    category: item.category,

                }
            }
            );
        setData(transactionsFormated)
        const total = entrisTotal - expensiveTotal;
        setHighlightData({
            entries: {
                amount: entrisTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        })
        setIsLoading(false)
    }

    useEffect(() => {
        loadTransactions();

    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            
            { isLoading ? 
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer>  :
                <>
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
                            <LogountButton onPress={() => { console.log('Testando Logout') }}>
                                <Icon name="power" />
                            </LogountButton>
                        </UserWrapper>
                    </Header>

                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title="Entrada"
                            amount={highlightData.entries?.amount}
                            lastTransaction="Última entrada dia 13 de Maio"
                        />
                        <HighlightCard
                            type="down"
                            title="Saída"
                            amount={highlightData.expensives?.amount}
                            lastTransaction="Última entrada dia 20 de Junho"
                        />
                        <HighlightCard
                            type="total"
                            title="Saldo"
                            amount={highlightData.total?.amount}
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
                </>
            }


        </Container>
    )
}