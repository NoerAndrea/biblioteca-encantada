import { Fragment } from "react/jsx-runtime";
import { Modal as ModalStyled } from "../styled-components/Modal/Modal";
import { ModalBody } from "../styled-components/Modal/ModalBody";
import { ModalButton } from "../styled-components/Modal/ModalButton";
import { ModalContent } from "../styled-components/Modal/ModalContent";
import { ModalDialog } from "../styled-components/Modal/ModalDialog";
import { ModalFooter } from "../styled-components/Modal/ModalFooter";
import { ModalHeader } from "../styled-components/Modal/ModalHeader";
import { ModalTitle } from "../styled-components/Modal/ModalTitle";
import { Livro } from "../../pages/Home";

interface ModalProps {
    titulo: string;
    children?: React.ReactNode;

    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDetalhes: Livro[];
}

export function Modal({titulo, children, open, setOpen, setDetalhes}: ModalProps){

    function fechaModal(){
        setOpen(false)        
    }

    return(
        <ModalStyled style={{ display: open ? "block" : "none" }}>
            <ModalDialog>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>{titulo}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        {children ?? <Fragment/>}
                        <ul>
                            {setDetalhes.map((livro) => (
                                <div key={livro.id}>
                                    <p>Titulo: {livro.titulo}</p>
                                    <p>Autor: {livro.autor}</p>
                                    <p>Ano de publicação: {livro.anoDePublicacao}</p>
                                    <p>Data de cadastro: {livro.dataDeCadastro.toLocaleString()}</p>
                                    <p>Gênero: {livro.genero}</p>
                                    <p>Descrição: {livro.descricao}</p>
                                </div>
                            ))}
                        </ul>
                    </ModalBody>  
                    <ModalFooter>
                                <ModalButton type="button" onClick={fechaModal}>Sair</ModalButton>
                            </ModalFooter>                  
                </ModalContent>
            </ModalDialog>
        </ModalStyled>
    )
}