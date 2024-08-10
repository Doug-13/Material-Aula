import React, { useState, useEffect } from 'react';
import axiosInstance from "../Axios/configuracaoAxios";
import { useParams, useNavigate } from 'react-router-dom';

// import Header from "../header/Header";
import BottonBack from '../componentes/BottonBack';
import './Editar.css'


function EditarRegistro() {

  const { id } = useParams();
  const navigate = useNavigate();

  //cria novo estado para os campos da tela
  const [campos, setCampos] = useState({
    nome: '',
    idade: 0,
    cidade: '',
    email: '',
    uf: '',
    cep: '',
    complemento: '',
    bairro: '',
    numero: ''
  });


  const [estados, setEstados] = useState([]);

  useEffect(() => {
    axiosInstance.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setEstados(response.data);
      })
  }, []);


  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  const [erros, setErros] = useState({});

  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/api/usuarios/${id}`)
      .then(response => {
        setCampos(response.data);
        setLoading(false);
      })
      .catch(error => {
        setMensagem('Houve um problema ao buscar o registro.');
        setLoading(false);
      });
  }, [id]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCampos(prevCampos => ({
      ...prevCampos,
      [name]: value
    }));
  }
  function validarCampos() {
    const novosErros = {};

    if (!campos.nome) {
      novosErros.nome = 'Nome é obrigatório';
    }

    if (!campos.idade || campos.idade <= 0) {
      novosErros.idade = 'Idade deve ser um número positivo';
    }

    if (!campos.email) {
      novosErros.email = 'E-mail é obrigatório';
    }

    if (!campos.cidade) {
      novosErros.cidade = 'Cidade é obrigatória';
    }

    if (!campos.uf || campos.uf <= 0) {
      novosErros.uf = 'UF é obrigatório';
    }

    if (!campos.cep) {
      novosErros.cep = 'CEP é obrigatório';
    } else if (campos.cep.replace(/\D/g, '').length !== 8) {
      novosErros.cep = 'CEP deve ter 8 dígitos';
    }

    if (!campos.complemento || campos.complemento <= 0) {
      novosErros.complemento = 'complemento é obrigatório';
    }

    if (!campos.logradouro || campos.logradouro <= 0) {
      novosErros.logradouro = 'logradouro é obrigatório';
    }

    if (!campos.bairro || campos.bairro <= 0) {
      novosErros.bairro = 'bairro é obrigatório';
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      return;
    }

    axiosInstance.put(`http://localhost:3001/api/usuarios/${id}`, campos)
      .then(response => {
        setMensagem('Dados editados com sucesso!');

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
          navigate(-1);
        }, 3000);


      })
      .catch(error => {
        setMensagem('Houve um problema ao atualizar o registro.');
      });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  function buscarEnderecoPorCEP() {
    const cep = campos.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      axiosInstance.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (response.data.erro) {
            setErros(prevErros => ({ ...prevErros, cep: 'CEP inválido' }));
          } else {
            setCampos(prevCampos => ({
              ...prevCampos,
              cidade: response.data.localidade,
              complemento: response.data.complemento,
              uf: response.data.uf,
              bairro: response.data.bairro,
              logradouro: response.data.logradouro

            }));
          }
        })
        .catch(error => {
          setErros(prevErros => ({ ...prevErros, cep: 'Erro ao buscar CEP' }));
        });
    }
  }

  return (
    <div className="App">
      {/* <Header title="Editar Cadastro" /> */}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>Dados de Cadastro</h2>
            </legend>

            <div>
              <label>Nome:
                <input type="text" name="nome" id="nome" value={campos.nome} onChange={handleInputChange} />
                {erros.nome && <p className="error">{erros.nome}</p>}
              </label>
            </div>

            <div>
              <label>Idade:
                <input type="number" name="idade" id="idade" value={campos.idade} onChange={handleInputChange} />
                {erros.idade && <p className="error">{erros.idade}</p>}
              </label>
            </div>
            <div className="inline-fields">
              <div className="field-maior">
                <label>E-mail:
                  <input type="text" name="email" id="nomemaile" value={campos.email} onChange={handleInputChange} />
                  {erros.email && <p className="error">{erros.email}</p>}
                </label>
              </div>

              <div className="field-menor">
                <label>Senha:
                  <input type="password" name="senha" id="senha" value={campos.senha} disabled onChange={handleInputChange} />
                  {erros.senha && <p className="error">{erros.senha}</p>}
                </label>
              </div>

              <div className="field-menor">
                <label>Confirmar Senha:
                  <input type="password" name="confirmarsenha" id="confirmarsenha" value={campos.confirmarsenha} disabled onChange={handleInputChange} />
                  {erros.confirmarsenha && <p className="error">{erros.confirmarsenha}</p>}
                </label>
              </div>
            </div>
            <div>
              <label>UF:
                <select name="uf" id="uf" value={campos.uf} onChange={handleInputChange}>
                  <option value="0">Selecione uma opção</option>
                  {estados.map(estado => (<option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>))}
                </select>

              </label>
              <label>
                <div>
                  {erros.uf && <p className="error">{erros.uf}</p>}
                </div>
              </label>
            </div>

            <div>
              <label>Cidade:
                <input type="text" name="cidade" id="cidade" value={campos.cidade} onChange={handleInputChange} />
                {erros.cidade && <p className="error">{erros.cidade}</p>}
              </label>
            </div>

            <div>
              <label>Bairro:
                <input type="text" name="bairro" id="bairro" value={campos.bairro} onChange={handleInputChange} />
                {erros.bairro && <p className="error">{erros.bairro}</p>}
              </label>
            </div>

            <div>
              <label>CEP:
                <input type="text" name="cep" id="cep" value={campos.cep} onChange={handleInputChange} onBlur={buscarEnderecoPorCEP} />
                {erros.cep && <p className="error">{erros.cep}</p>}
              </label>
            </div>

            <div>
              <label>Logradouro:
                <input type="text" name="logradouro" id="logradouro" value={campos.logradouro} onChange={handleInputChange} />
                {erros.logradouro && <p className="error">{erros.logradouro}</p>}
              </label>
            </div>

            <div>
              <label>Complemento:
                <input type="text" name="complemento" id="complemento" value={campos.complemento} onChange={handleInputChange} />
                {erros.complemento && <p className="error">{erros.complemento}</p>}
              </label>
            </div>

            <div>
              <label>Numero:
                <input type="text" name="numero" id="numero" value={campos.numero} onChange={handleInputChange} />
                {erros.numero && <p className="error">{erros.numero}</p>}
              </label>
            </div>

            <input type="submit" value="Salvar" />
          </fieldset>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <BottonBack></BottonBack>
      </div>
    </div>
  );
}

export default EditarRegistro;