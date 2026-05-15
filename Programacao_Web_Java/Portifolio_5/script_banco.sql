-- Script de criação do banco de dados e tabela de produtos
-- Portfólio 5 – Disciplina: Desenvolvimento WEB com Java
-- Claretiano – Tecnólogo em Análise de Sistemas

-- Cria o banco de dados caso não exista
CREATE DATABASE IF NOT EXISTS consulta_produtos
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco de dados
USE consulta_produtos;

-- Remove a tabela se já existir (para facilitar re-execução do script)
DROP TABLE IF EXISTS produto;

-- Cria a tabela de produtos conforme requisito do portfólio
CREATE TABLE produto (
    id       BIGINT       NOT NULL AUTO_INCREMENT, -- chave primária numérica
    nome     VARCHAR(150) NOT NULL,                -- nome do produto
    descricao TEXT,                                -- descrição detalhada
    preco    DECIMAL(10, 2) NOT NULL,              -- preço com duas casas decimais
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserção de dados de exemplo para testes
INSERT INTO produto (nome, descricao, preco) VALUES
    ('Notebook Dell Inspiron 15',   'Processador Intel Core i5, 8 GB RAM, SSD 256 GB, Tela 15.6"',            2799.90),
    ('Smartphone Samsung Galaxy A54','Tela AMOLED 6.4", 128 GB, câmera tripla 50 MP, bateria 5000 mAh',       1599.00),
    ('Teclado Mecânico Redragon',   'Switch Red, RGB, ABNT2, USB, anti-ghosting',                              349.99),
    ('Mouse Logitech MX Master 3',  'Sem fio, sensor de alta precisão, 7 botões programáveis, ergonômico',     499.90),
    ('Monitor LG 24" Full HD',      'Resolução 1920x1080, painel IPS, 75 Hz, FreeSync, bordas ultrafinas',     1099.00);
