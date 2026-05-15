
CREATE DATABASE IF NOT EXISTS db_produtos;
USE db_produtos;

CREATE TABLE Produtos (
    idProduto     INT AUTO_INCREMENT PRIMARY KEY,
    Nome          VARCHAR(150) NOT NULL,
    CustoUnitario DECIMAL(10,2) NOT NULL,
    DataCompra    DATE NOT NULL,
    Imagem        LONGBLOB,
    Quantidade    INT NOT NULL
);

INSERT INTO Produtos (Nome, CustoUnitario, DataCompra, Quantidade) VALUES
('Mouse USB',        25.90,  '2026-01-10', 15),
('Teclado Mecanico', 189.00, '2026-02-05', 8),
('Monitor 24"',      850.00, '2026-03-15', 4),
('Cabo HDMI',        18.50,  '2026-03-20', 30),
('Webcam HD',        220.00, '2026-04-01', 6);
