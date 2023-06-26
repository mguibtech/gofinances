import React, {useState}  from "react";
import { Modal } from "react-native";
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

import { CategorySelect } from "../../Components/CategorySelect";

export function Register() {

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleCloseSelectCatetoryModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCatetoryModal(){
        setCategoryModalOpen(true);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
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

                <Button title="Enviar" />
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