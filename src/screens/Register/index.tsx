import React, {useState}  from "react";
import { Modal } from "react-native";
import { useForm } from 'react-hook-form'
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";
import { Input } from "../../Components/Form/Input";
import { Button } from "../../Components/Form/Button";
import { TransactionTypeButton } from "../../Components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../Components/Form/CategorySelectButton";
import { InputForm } from "../../Components/Form/InputForm";

import { CategorySelect } from "../../Components/CategorySelect";

interface FormData {
    [name: string]: any;
}

export function Register() {

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {
        control,
        handleSubmit
    } = useForm()

    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleCloseSelectCatetoryModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCatetoryModal(){
        setCategoryModalOpen(true);
    }

    function handleRegister(form: FormData){
        const data ={
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data)
    }

    return (
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
                    />
                    <InputForm
                        control={control}
                        name="amount"
                        placeholder="Preço"
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
    )
}