import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

test("ct01 - verificar a integracao na consulta", () => {
  render(<App />);
  const textElement = screen.getByText(/consulta catalogo/i);
  expect(textElement).toBeInTheDocument();
});
test("ct02 - verificar a integracao no resultado da consulta", async () => {
  render(<App />);
  await waitFor(
    () => {
      const txtLabel = screen.getByText(/eletrobomba/i);
      expect(txtLabel).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
});
test("ct03 - verificar a quantidade de linhas na tabela de produtos", async () => {
  //dado que o componente foi renderizado
  render(<App />);

  // quando consulto o catalogo de produtos
  await waitFor(() => {
    const tabelaProdutos = screen.getByRole("table");
    const linhasProdutos = tabelaProdutos.querySelectorAll("tbody > tr");

    // então a quantidade de linhas e três
    expect(linhasProdutos.length).toBe(1);
  });
});
test("ct04 - verificar o comportamento do cadastro de produto", async () => {
  render(<App />);
  await waitFor(() => {
    const tituloElement1 = screen.getByText(/consulta catalogo/i);
    expect(tituloElement1).toBeInTheDocument();
  });
  // Encontra o campo de entrada pela etiqueta associada (label)
  const botaoCadastrar = screen.getByText("Cadastrar Produto");
  // Simula um click no botao
  fireEvent.click(botaoCadastrar);
  await waitFor(() => {
    const tituloElement2 = screen.getByText(/cadastrar produto/i);
    expect(tituloElement2).toBeInTheDocument();
  });
  //*********************************************************** */
  // Entrada de dados
  //*********************************************************** */
  // Encontre o campo de entrada pela etiqueta associada (label)
  const inputDescricao = screen.getByLabelText("Descrição:");
  // Simule uma entrada de texto
  fireEvent.change(inputDescricao, {
    target: { value: "Eletrobomba 110v" },
  });
  // Encontre o campo de entrada pela etiqueta associada (label)
  const inputCategoria = screen.getByLabelText("Categoria:");
  // Simule uma entrada de texto
  fireEvent.change(inputCategoria, {
    target: { value: "Maquina de Lavar" },
  });
  // Encontre o campo de entrada pela etiqueta associada (label)
  const inputQuantidade = screen.getByLabelText("Quantidade:");
  // Simule uma entrada de texto
  fireEvent.change(inputQuantidade, {
    target: { value: "12" },
  });
  // Encontre o campo de entrada pela etiqueta associada (label)
  const inputCusto = screen.getByLabelText("Custo:");
  // Simule uma entrada de texto
  fireEvent.change(inputCusto, {
    target: { value: "31.50" },
  });
  // Encontre o botão pelo ID
  const botaoSubmit = screen.getByRole("button", { name: "Submit" });

  // Simula o click no botao
  fireEvent.click(botaoSubmit);
  await waitFor(() => {
    // Confirma se o estado atual eh a tela de consulta
    const tituloElement1 = screen.getByText(/consulta catalogo/i);
    expect(tituloElement1).toBeInTheDocument();
  });
});
