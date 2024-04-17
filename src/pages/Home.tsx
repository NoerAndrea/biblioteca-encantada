import React, { useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { v4 as generateUUID } from 'uuid';
import { Title } from "../components/styled-components/Title"
import { ContainerFlex } from "../components/styled-components/Container"
import { Input } from "../components/styled-components/Input"
import { Button } from "../components/styled-components/Button"
import { Modal } from "../components/functional-componentts/Modal";

export interface Livro {
    id: string;
    titulo: string;
    autor: string;
    anoDePublicacao: string;
    genero: string;
    descricao: string;
    dataDeCadastro: Date;
}

export function Home(){    
    const [livros, setLivros] = useState<Livro[]>([])
    const [aberto, setAberto] = useState<boolean>(false)

    //cadastrar livro
    function cadastrar(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        //condição para não ser livro com data futuro
        const anoAtual = new Date().getFullYear();
        const anoDePublicacao = parseInt(event.currentTarget['anoDePublicacao'].value)

        if(anoDePublicacao > anoAtual){
            alert('O ano de publicação não pode ser futuro.');
            return;
        }
        
        const novoLivro: Livro = {
            id: generateUUID(),
            titulo: event.currentTarget['titulo'].value,
            autor: event.currentTarget['autor'].value,
            anoDePublicacao: event.currentTarget['anoDePublicacao'].value,
            genero: event.currentTarget['genero'].value,
            descricao: event.currentTarget['descricao'].value,
            dataDeCadastro: new Date()
        }
       
        setLivros((array)=>[novoLivro, ...array]);
        
        event.currentTarget.reset();
    } 

    //excluir livro
    function excluirLivro(livro: Livro){
        const confirmacao = confirm(`Tem certeza que deseja excluir este livro ${livro.titulo}?`)

        if(confirmacao) {
            setLivros(livros.filter(livro => livro.id !== livro.id))
        }       
    }

    function abreModal(){
        setAberto(true)
    }

    return(
        <Fragment>
            <ContainerFlex>
                <Title>Biblioteca Encantada</Title>

                <form onSubmit={cadastrar}>
                    <Input type="text" name="titulo" required placeholder="Título" />
                    <Input type="text" name="autor" required placeholder="Autor" />
                    <Input type="date" name="anoDePublicacao" required placeholder="Ano de publicação" />
                    <Input type="text" name="genero" required placeholder="Gênero" />
                    <Input type="text" name="descricao" required placeholder="Descrição" />

                    <Button type="submit">Cadastrar</Button>
                </form> 

                <ul>
                    {livros.map((livro)=> (
                        <li key={livro.id}>
                            <p>{livro.titulo}</p>
                            <p>{livro.autor}</p>
                            <p>{livro.anoDePublicacao}</p>

                            <Button onClick={abreModal}>Mais Informações</Button>

                            <Button onClick={()=> excluirLivro(livro)}>Excluir</Button>
                        </li>
                    ))}
                </ul>               
            </ContainerFlex>   
            <Modal 
                titulo="Detalhes Livro" 
                open={aberto} 
                setOpen={setAberto} 
                setDetalhes={livros}>
            </Modal>              
        </Fragment>
    )
}
