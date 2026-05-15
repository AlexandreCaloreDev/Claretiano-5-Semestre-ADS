package br.edu.claretiano.consultaprodutos.controller;

import br.edu.claretiano.consultaprodutos.dao.ProdutoDAO;
import br.edu.claretiano.consultaprodutos.model.Produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProdutoController {

    @Autowired
    private ProdutoDAO produtoDAO;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/buscar")
    public String buscarProduto(@RequestParam("id") Long id, Model model) {
        Produto produto = produtoDAO.buscarPorId(id);

        if (produto != null) {
            model.addAttribute("produto", produto);
        } else {
            model.addAttribute("erro", "Produto não encontrado para o ID informado: " + id);
        }

        return "resultado";
    }
}
