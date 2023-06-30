import React, { useState, useEffect } from "react";
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../Components/Form/Input";
import { Button } from "../../Components/Form/Button";
import { TransactionTypeButton } from "../../Components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../Components/Form/CategorySelectButton";
import { InputForm } from "../../Components/Form/InputForm";
import { CategorySelect } from "../../Components/CategorySelect";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProps = {
    navigate: (screen: string) => void;
}


interface FormData {
    name: string;
    amount: number;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório!'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório!')

}).required()

export function Register() {

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    const navigation = useNavigation<NavigationProps>()

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const dataKey = '@gofinance:transactions';

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver<any>(schema)
    })

    function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleCloseSelectCatetoryModal() {
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCatetoryModal() {
        setCategoryModalOpen(true);
    }

    async function handleRegister(form: FormData) {
        if (!transactionType) return Alert.alert('Selecione o tipo da tranação!')

        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria!')
        }

        const newTransaction = {
            id: String(uuidv4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFomated = [
                newTransaction,
                ...currentData,
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFomated));

            reset();
            setTransactionType('')
            setCategory({
                key: 'category',
                name: 'Categoria',
            })
            navigation.navigate('Listagem')

        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível salvar atividade.')
        }
    }

    // useEffect(() => {
    //     async function loadData() {
    //         const data = await AsyncStorage.getItem(dataKey)
    //         console.log(JSON.parse(data!))
    //     }

    //     loadData();

    //     // async function removeAll() {
    //     //     await AsyncStorage.removeItem(dataKey);
    //     // }

    //     // removeAll()
    // }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            control={control}
                            name="name"
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message?.toString()}
                        />
                        <InputForm
                            control={control}
                            name="amount"
                            placeholder="Preço"
                            keyboardType="decimal-pad"
                            error={errors.amount && errors?.amount.message?.toString()}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton
                                title="Income"
                                type="up"
                                onPress={() => handleTransactionsTypeSelect('positive')}
                                isActive={transactionType === 'positive'}
                            />
                            <TransactionTypeButton
                                title="Outcome"
                                type="down"
                                onPress={() => handleTransactionsTypeSelect('negative')}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionsTypes>

                        <CategorySelectButton
                            onPress={handleOpenSelectCatetoryModal}
                            title={category.name} />
                    </Fields>

                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCatetoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}