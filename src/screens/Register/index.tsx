import React, { useState } from "react";
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

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";


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

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver<any>(schema)
    })

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleCloseSelectCatetoryModal() {
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCatetoryModal() {
        setCategoryModalOpen(true);
    }

    function handleRegister(form: FormData) {
        if(!transactionType) return Alert.alert('Selecione o tipo da tranação!')

        if(category.key === 'category'){
            return Alert.alert('Selecione a categoria!')
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data)
    }

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
                                onPress={() => handleTransactionsTypeSelect('up')}
                                isActive={transactionType === 'up'}
                            />
                            <TransactionTypeButton
                                title="Outcome"
                                type="down"
                                onPress={() => handleTransactionsTypeSelect('down')}
                                isActive={transactionType === 'down'}
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