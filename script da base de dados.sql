CREATE TABLE tipo_utilizador (
	id_tipo_utilizador SERIAL PRIMARY KEY,
	descricao VARCHAR (35) NOT NULL UNIQUE
);

CREATE TABLE tipo_instituicao(
id_tipo_instituicao SERIAL,
descricao VARCHAR (255) NOT NULL UNIQUE,
PRIMARY KEY (id_tipo_instituicao )

);



CREATE TABLE estado_utilizador (
	id_estado_utilizador SERIAL PRIMARY KEY,
	descricao VARCHAR (35) NOT NULL UNIQUE
);

CREATE TABLE estado_mensagem (
	id_estado_mensagem SERIAL PRIMARY KEY,
	descricao VARCHAR (35) NOT NULL UNIQUE
);


CREATE TABLE provincia (
	id_provincia SERIAL PRIMARY KEY,
	descricao VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE utilizador (
	id_utilizador SERIAL,
	nome VARCHAR (255) NOT NULL,
	username VARCHAR (25) UNIQUE NOT NULL,
	data_nascimento date NOT NULL,
	email VARCHAR (150) NOT NULL UNIQUE,
	numero_telefone BIGINT NOT NULL UNIQUE,
	id_provincia BIGINT NOT NULL,
	id_tipo_utilizador BIGINT NOT NULL,
	id_estado_utilizador BIGINT NOT NULL,
	foto_perfil VARCHAR(255),
	FOREIGN KEY (id_provincia) references provincia (id_provincia) on UPDATE CASCADE on DELETE CASCADE ,
	FOREIGN KEY (id_tipo_utilizador) references provincia (id_tipo_utilizador) on UPDATE CASCADE on DELETE CASCADE ,
	FOREIGN KEY(id_estado_utilizador) references estado_utilizador (id_estado_utilizador) on UPDATE CASCADE on DELETE CASCADE ,
	PRIMARY KEY(id_utilizador)
);

CREATE TABLE campo_estudo (
	id_campo_estudo SERIAL ,
	descricao VARCHAR (150) NOT NULL UNIQUE,
	PRIMARY KEY(id_campo_estudo)
);

CREATE TABLE instituicao_ensino_superior (
id_instituicao_ensino_superior SERIAL ,
nome VARCHAR (255),
id_tipo_instituicao BIGINT NOT NULL
PRIMARY KEY (id_instituicao_ensino_superior)
);


CREATE TABLE curso_licenciatura(
	id_curso SERIAL PRIMARY KEY,
	nome VARCHAR(255) UNIQUE NOT NULL,
	sigla VARCHAR (15) UNIQUE NOT NULL,
	id_campo_estudo BIGINT,
	descricao TEXT,
	duracao BIGINT,
	FOREIGN KEY (id_campo_estudo) references campo_estudo (id_campo_estudo),
);

CREATE TABLE mensagem (
	id_mensagem SERIAL PRIMARY KEY,
	id_remetente BIGINT NOT NULL,
	id_destinatario BIGINT NOT NULL,
	conteudo_mensagem Text NOT NULL,
	id_estado_mensagem BIGINT NOT NULL,
	FOREIGN KEY id_remetente REFERENCES   utilizador (id_utilizador) on UPDATE CASCADE on DELETE CASCADE ,
	FOREIGN KEY id_destinatario  REFERENCES utilizador (id_utilizador) on UPDATE CASCADE on DELETE CASCADE ,
	FOREIGN KEY id_estado_mensagem REFERENCES estado_mensagem (id_estado_mensagem) on UPDATE CASCADE on DELETE CASCADE ,
	PRIMARY KEY (id_mensagem)
);

CREATE TABLE faculdade (
id_faculdade SERIAL ,
id_instituicao_ensino_superior BIGINT,
nome VARCHAR (250) ,
sigla VARCHAR(30),
endereco VARCHAR (250),
FOREIGN KEY (id_instituicao_ensino_superior) REFERENCES instituicao_ensino_superior (id_instituicao_ensino_superior) on UPDATE CASCADE on DELETE CASCADE ,
PRIMARY KEY (id_faculdade)
);


CREATE TABLE  curso_faculdade(
id_curso_faculdade SERIAL ,
id_curso BIGINT,
id_faculdade BIGINT,
FOREIGN KEY (id_curso) REFERENCES curso (id_curso) on UPDATE CASCADE on DELETE CASCADE ,
FOREIGN KEY (id_faculdade) REFERENCES faculdade (id_faculdade) on UPDATE CASCADE on DELETE CASCADE ,
PRIMARY KEY (id_curso_faculdade)
);

