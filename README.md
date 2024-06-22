# Sistema de Biblioteca em Vue.js com Vite

## Descrição

Este projeto implementa o frontend de um sistema de biblioteca completo, utilizando Vue.js com Vite como bundler e npm para gerenciamento de pacotes. Ele é integrado ao backend implementado em Java com Spring Boot e PostgreSQL como banco de dados. O sistema permite o gerenciamento de livros, autores, empréstimos, usuários, multas e relatórios.

## Funcionalidades

### Gerenciamento de Livros

- **Cadastro de Livros:** Permite adicionar novos livros ao sistema com informações detalhadas como título, autor, ISBN, gênero e descrição.
- **Edição de Livros:** Possibilidade de editar informações de livros já cadastrados.
- **Exclusão de Livros:** Remoção de livros do sistema.
- **Pesquisa de Livros:** Pesquisa avançada por título, autor ou ISBN.
- **Detalhes do Livro:** Visualização de informações detalhadas de cada livro.

### Gerenciamento de Autores

- **Cadastro de Autores:** Adição de novos autores com detalhes biográficos.
- **Edição de Autores:** Atualização das informações dos autores existentes.
- **Exclusão de Autores:** Remoção de autores do sistema.
- **Pesquisa de Autores:** Busca rápida por nome de autor.
- **Detalhes do Autor:** Visualização de informações detalhadas sobre cada autor.

### Gerenciamento de Empréstimos

- **Registro de Empréstimos:** Permite registrar o empréstimo de livros para usuários cadastrados.
- **Devolução de Livros:** Gerenciamento das devoluções de livros emprestados.
- **Histórico de Empréstimos:** Visualização do histórico completo de empréstimos de cada usuário.
- **Multas por Atraso:** Registro e gestão de multas associadas a devoluções atrasadas.

### Gerenciamento de Usuários

- **Cadastro de Usuários:** Inclusão de novos usuários no sistema com informações de contato e identificação.
- **Edição de Usuários:** Atualização de dados de usuários cadastrados.
- **Exclusão de Usuários:** Remoção de usuários do sistema.
- **Pesquisa de Usuários:** Busca por nome ou e-mail.
- **Detalhes do Usuário:** Acesso a informações detalhadas de cada usuário.

### Registro e Pagamento de Multas

- **Registro de Multas:** Registro de multas para usuários com devoluções atrasadas.
- **Pagamento de Multas:** Funcionalidade para efetuar e registrar o pagamento de multas pendentes.

### Consulta de Movimentos

- **Histórico de Movimentos:** Consulta detalhada do histórico de todas as operações, incluindo empréstimos, devoluções e pagamentos de multas.

### Produção de Relatórios Periódicos

- **Geração de Relatórios:** Criação automática de relatórios periódicos em formato PDF com estatísticas e informações relevantes sobre o sistema, como livros mais emprestados, usuários mais ativos, etc.

## Tecnologias Utilizadas

### Frontend

- **Vue.js 3:** Framework JavaScript progressivo para construir interfaces de usuário.
- **Vite:** Ferramenta de bundling e build para desenvolvimento rápido de frontends modernos.
- **npm:** Gerenciador de pacotes para instalar dependências e scripts.

### Backend

- **Java 17:** Linguagem de programação utilizada para o desenvolvimento do backend.
- **Spring Boot 2.7.0:** Framework para criação de aplicações Java com configuração mínima.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados.
- **Lombok:** Biblioteca Java para reduzir a verbosidade do código.
- **Hibernate:** Framework de mapeamento objeto-relacional (ORM) para facilitar a persistência dos dados.
- **Spring Data JPA:** Abstração de persistência que simplifica o acesso ao banco de dados.
- **Spring Security:** Framework de segurança para proteger a aplicação.
- **JWT (JSON Web Token):** Técnica para implementação de autenticação segura.

## Instalação e Configuração

### Frontend

1. Clone este repositório:
   ```sh
   git clone https://github.com/seuusuario/sistema-biblioteca-vue.git
   cd sistema-biblioteca-vue
   ```
2. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

### Backend

1. Siga as instruções de instalação e configuração do backend, conforme mencionado no README do [repositório do backend](https://github.com/mmaunze/api.esib.com).

## Documentação

A documentação completa da API está disponível em [link a ser fornecido].

## Contribuições

Contribuições são bem-vindas! Para mais informações, consulte o guia de contribuição em [link a ser fornecido].

## Licença

Este projeto está licenciado sob a licença MIT.

## Autor

Meldo Leonardo Maunze

## Agradecimentos

Agradecemos a todos os colaboradores e utilizadores que contribuíram para o desenvolvimento deste sistema.

## Links Úteis

- [Repositório do Backend](https://github.com/mmaunze/api.esib.com)
- [Documentação da API](#) (link a ser fornecido)
- [Guia de Contribuição](#) (link a ser fornecido)

---

Obrigado por utilizar o Sistema de Biblioteca! Esperamos que ele atenda a todas as suas necessidades de gestão de bibliotecas de forma eficiente e eficaz.

---