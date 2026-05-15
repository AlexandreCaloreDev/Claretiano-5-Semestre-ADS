<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de Produtos</title>
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
            max-width: 420px;
        }

        .card h1 {
            font-size: 1.5rem;
            color: #1a1a2e;
            margin-bottom: 6px;
        }

        .card p.subtitulo {
            font-size: 0.88rem;
            color: #6c757d;
            margin-bottom: 28px;
        }

        label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 6px;
        }

        input[type="number"] {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            font-size: 1rem;
            color: #333;
            outline: none;
            transition: border-color 0.2s;
        }

        input[type="number"]:focus {
            border-color: #4361ee;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
        }

        button[type="submit"] {
            margin-top: 18px;
            width: 100%;
            padding: 11px;
            background-color: #4361ee;
            color: #fff;
            font-size: 1rem;
            font-weight: 600;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        button[type="submit"]:hover {
            background-color: #3451d1;
        }

        .rodape {
            margin-top: 24px;
            font-size: 0.78rem;
            color: #adb5bd;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="card">

        <h1>&#128270; Consulta de Produto</h1>
        <p class="subtitulo">Informe o código do produto para visualizar os detalhes.</p>

        <form action="${pageContext.request.contextPath}/buscar" method="post">

            <label for="id">ID do Produto</label>
            <input
                type="number"
                id="id"
                name="id"
                placeholder="Ex.: 1"
                min="1"
                required
                autofocus
            />

            <button type="submit">Buscar</button>

        </form>

        <p class="rodape">Sistema de Atendimento – Loja de Eletrônicos</p>

    </div>

</body>
</html>
