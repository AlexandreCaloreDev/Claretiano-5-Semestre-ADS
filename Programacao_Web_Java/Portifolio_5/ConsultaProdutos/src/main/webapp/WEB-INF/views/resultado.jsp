<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"   prefix="c"   %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"    prefix="fmt" %>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado da Consulta</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .card {
            background: #ffffff;
            border-radius: 10px;
            padding: 40px 48px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.10);
            width: 100%;
            max-width: 480px;
        }

        .card h1 {
            font-size: 1.4rem;
            color: #1a1a2e;
            margin-bottom: 24px;
        }

        .campo {
            display: flex;
            flex-direction: column;
            margin-bottom: 16px;
        }

        .campo span.rotulo {
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #6c757d;
            margin-bottom: 3px;
        }

        .campo span.valor {
            font-size: 1rem;
            color: #1a1a2e;
        }

        .preco {
            font-size: 1.3rem !important;
            font-weight: 700;
            color: #2d6a4f !important;
        }

        hr { border: none; border-top: 1px solid #e9ecef; margin: 20px 0; }

        .erro {
            background-color: #fff5f5;
            border: 1px solid #ffc9c9;
            border-radius: 8px;
            padding: 16px 20px;
            color: #c92a2a;
            font-size: 0.95rem;
        }

        .erro strong { display: block; margin-bottom: 4px; }

        .btn-voltar {
            display: inline-block;
            margin-top: 24px;
            padding: 10px 22px;
            background-color: #4361ee;
            color: #fff;
            font-size: 0.9rem;
            font-weight: 600;
            text-decoration: none;
            border-radius: 6px;
            transition: background-color 0.2s;
        }

        .btn-voltar:hover { background-color: #3451d1; }
    </style>
</head>
<body>

    <div class="card">

        <c:if test="${not empty produto}">

            <h1>&#128230; Dados do Produto</h1>

            <div class="campo">
                <span class="rotulo">ID</span>
                <span class="valor">${produto.id}</span>
            </div>

            <hr/>

            <div class="campo">
                <span class="rotulo">Nome</span>
                <span class="valor">${produto.nome}</span>
            </div>

            <div class="campo">
                <span class="rotulo">Descrição</span>
                <span class="valor">${produto.descricao}</span>
            </div>

            <div class="campo">
                <span class="rotulo">Preço</span>
                <span class="valor preco">
                    <fmt:formatNumber value="${produto.preco}"
                                      type="currency"
                                      currencySymbol="R$"
                                      groupingUsed="true"/>
                </span>
            </div>

        </c:if>

        <c:if test="${not empty erro}">

            <h1>Resultado da Consulta</h1>

            <div class="erro">
                <strong>&#9888; Produto não encontrado</strong>
                ${erro}
            </div>

        </c:if>

        <a class="btn-voltar" href="${pageContext.request.contextPath}/">
            &#8592; Nova Consulta
        </a>

    </div>

</body>
</html>
