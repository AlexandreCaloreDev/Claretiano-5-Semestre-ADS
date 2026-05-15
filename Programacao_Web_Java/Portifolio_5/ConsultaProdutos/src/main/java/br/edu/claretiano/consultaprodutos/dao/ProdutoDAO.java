package br.edu.claretiano.consultaprodutos.dao;

import br.edu.claretiano.consultaprodutos.model.Produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class ProdutoDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Produto buscarPorId(Long id) {
        String sql = "SELECT id, nome, descricao, preco FROM produto WHERE id = ?";

        try {
            return jdbcTemplate.queryForObject(sql, new ProdutoRowMapper(), id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    private static class ProdutoRowMapper implements RowMapper<Produto> {

        @Override
        public Produto mapRow(ResultSet rs, int rowNum) throws SQLException {
            Produto produto = new Produto();
            produto.setId(rs.getLong("id"));
            produto.setNome(rs.getString("nome"));
            produto.setDescricao(rs.getString("descricao"));
            produto.setPreco(rs.getBigDecimal("preco"));
            return produto;
        }
    }
}
