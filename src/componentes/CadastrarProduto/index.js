import React, { useState, useEffect } from "react";
import {
  cadastroDeProduto,
  obtemProduto,
  updateProduto,
} from "../ProdutoServico";
import { useNavigate, useParams } from "react-router-dom";
const CadastrarProduto = () => {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidadeNoEstoque, setQuantidadeNoEstoque] = useState("");
  const [custo, setCusto] = useState("");
  const { id } = useParams();
  const [errors, setErrors] = useState({
    descricao: "",
    categoria: "",
    quantidadeNoEstoque: "",
    custo: "",
  });
  useEffect(() => {
    if (id) {
      obtemProduto(id)
        .then((response) => {
          setDescricao(response.data.descricao);
          setCategoria(response.data.categoria);
          setQuantidadeNoEstoque(response.data.quantidadeNoEstoque);
          setCusto(response.data.custo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const navigator = useNavigate();

  function manipulaDescricao(e) {
    setDescricao(e.target.value);
  }
  function manipulaCategoria(e) {
    setCategoria(e.target.value);
  }
  function manipulaQuantidade(e) {
    setQuantidadeNoEstoque(e.target.value);
  }
  function manipulaCusto(e) {
    setCusto(e.target.value);
  }
  function saveOrUpdateProduto(e) {
    e.preventDefault();
    if (validateForm()) {
      const produto = { descricao, categoria, quantidadeNoEstoque, custo };
      console.log(produto);
      if (id) {
        updateProduto(id, produto)
          .then((response) => {
            console.log(response.data);
            navigator("/produtos");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        cadastroDeProduto(produto)
          .then((response) => {
            console.log("cadastro de produto", response.data);
            navigator("/produtos");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const msgErro = { ...errors };
    if (descricao.trim()) {
      msgErro.descricao = "";
    } else {
      msgErro.descricao = "A descrição do produto é obrigatorio. ";
      valid = false;
    }
    if (categoria.trim()) {
      msgErro.categoria = "";
    } else {
      msgErro.categoria = "A categoria do produto é obrigatorio. ";
      valid = false;
    }
    if (quantidadeNoEstoque > 0) {
      msgErro.quantidadeNoEstoque = "";
    } else {
      msgErro.quantidadeNoEstoque = "A quantidade deve ser maior que zero. ";
      valid = false;
    }
    if (custo > 0) {
      msgErro.custo = "";
    } else {
      msgErro.custo = "O custo deve ser maior que zero. ";
      valid = false;
    }
    setErrors(msgErro);
    return valid;
  }
  function pageTitle() {
    if (id) {
      return <h2 className="text-center"> Atualizar Produto</h2>;
    } else {
      return <h2 className="text-center"> Cadastrar Produto</h2>;
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="descricao">
                  {" "}
                  Descrição:
                </label>
                <input
                  type="text"
                  placeholder="Entre com a descrição do produto"
                  name="descricao"
                  id="descricao"
                  value={descricao}
                  className={`form-control ${
                    errors.descricao ? `is-invalid` : ``
                  }`}
                  onChange={manipulaDescricao}
                ></input>
                {errors.descricao && (
                  <div className="invalid-feedback"> {errors.descricao}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="categoria">
                  {" "}
                  Categoria:
                </label>
                <input
                  type="text"
                  placeholder="Entre com a categoria a qual o produto pertence"
                  name="categoria"
                  id="categoria"
                  value={categoria}
                  className={`form-control ${
                    errors.categoria ? `is-invalid` : ``
                  }`}
                  onChange={manipulaCategoria}
                ></input>
                {errors.categoria && (
                  <div className="invalid-feedback"> {errors.categoria}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="quantidadeNoEstoque">
                  {" "}
                  Quantidade:
                </label>
                <input
                  type="number"
                  placeholder="Entre com a quantidade armazenada no estoque do produto"
                  name="quantidadeNoEstoque"
                  id="quantidadeNoEstoque"
                  value={quantidadeNoEstoque}
                  className={`form-control ${
                    errors.quantidadeNoEstoque ? `is-invalid` : ``
                  }`}
                  onChange={manipulaQuantidade}
                ></input>
                {errors.quantidadeNoEstoque && (
                  <div className="invalid-feedback">
                    {" "}
                    {errors.quantidadeNoEstoque}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="custo">
                  {" "}
                  Custo:
                </label>
                <input
                  type="number"
                  placeholder="Entre com o custo do produto"
                  name="custo"
                  id="custo"
                  value={custo}
                  className={`form-control ${errors.custo ? `is-invalid` : ``}`}
                  onChange={manipulaCusto}
                ></input>
                {errors.custo && (
                  <div className="invalid-feedback"> {errors.custo}</div>
                )}
              </div>
              <button
                id="submit"
                className="btn btn-success"
                onClick={saveOrUpdateProduto}
              >
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CadastrarProduto;
