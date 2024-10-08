import React, { useState, useEffect } from 'react';
import axiosInstance from "../Axios/configuracaoAxios";
import BottonBack from '../componentes/BottonBack';
import { Link } from 'react-router-dom';
import './ListaRegistros.css';

//Importar o modal
import Modal from '../componentes/Modal';
import '../App.css';

 // Importando o ícone de edicao
import { FaEdit,FaTrash  } from 'react-icons/fa'; 


function ListaRegistros() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axiosInstance.get('http://localhost:3001/api/usuarios')
      .then(response => {
        setRegistros(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Houve um problema ao buscar os registros.');
        setLoading(false);
      });
  }, []);


  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };


  const confirmDelete = () => {
    axiosInstance.delete(`http://localhost:3001/api/usuarios/${selectedId}`)
      .then(response => {
        setRegistros(registros.filter(registro => registro.id !== selectedId));
        setMensagem('Registro deletado com sucesso!');
        setShowModal(false);
      })
      .catch(error => {
        setError('Houve um problema ao deletar o registro.');
        setShowModal(false);
      });

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
      }, 3000);

  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="lista-registros">
      <h2>Lista de Registros</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>CEP</th>
            <th>Bairro</th>
            <th>Complemento</th>
            <th>Logradouro</th>
            <th>Número</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(registro => (
            <tr key={registro.id}>
              <td>{registro.nome}</td>
              <td>{registro.idade}</td>
              <td>{registro.cidade}</td>
              <td>{registro.uf}</td>
              <td>{registro.cep}</td>
              <td>{registro.bairro}</td>
              <td>{registro.complemento}</td>
              <td>{registro.logradouro}</td>
              <td>{registro.numero}</td>
              <td class="action-column">
                <Link to={`/editar/${registro.id}`} className="espaco_coluna">
                   <FaEdit/> Editar  {/* Ícone de edição */}
                </Link>
                
                <Link onClick={() => handleDelete(registro.id)} >
                  <FaTrash /> Deletar {/* Ícone de delete */}
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mensagem && <p>{mensagem}</p>}
      <BottonBack/>
      <Modal
        show={showModal}
        handleClose={closeModal}
        handleConfirm={confirmDelete}
        title="Confirmar Exclusão"
      >
        Tem certeza que deseja deletar este registro?
      </Modal>
    </div>
  );
}

export default ListaRegistros;