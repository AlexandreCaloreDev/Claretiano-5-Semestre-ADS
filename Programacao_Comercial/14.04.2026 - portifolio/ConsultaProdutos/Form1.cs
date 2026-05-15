using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace ConsultaProdutos
{
    public partial class Form1 : Form
    {
        // ALTERE a senha conforme seu MySQL
        private const string Conn =
            "Server=localhost;Database=db_produtos;Uid=root;Pwd=;";

        public Form1() { InitializeComponent(); }

        private void Form1_Load(object sender, EventArgs e) => Buscar();

        // Alterna controles conforme tipo de busca
        private void cmbBusca_SelectedIndexChanged(object sender, EventArgs e)
        {
            bool periodo = cmbBusca.SelectedIndex == 2;
            txtValor.Visible  = !periodo;
            dtpInicio.Visible =  periodo;
            dtpFim.Visible    =  periodo;
        }

        private void btnBuscar_Click(object sender, EventArgs e) => Buscar();

        private void lstProdutos_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (lstProdutos.SelectedItem is ProdutoItem p) MostrarProduto(p);
        }

        private void Buscar()
        {
            string sql;
            MySqlCommand cmd;

            using (var conn = new MySqlConnection(Conn))
            {
                conn.Open();

                if (cmbBusca.SelectedIndex == 0) // Nome
                {
                    sql = "SELECT * FROM Produtos WHERE Nome LIKE @v";
                    cmd = new MySqlCommand(sql, conn);
                    cmd.Parameters.AddWithValue("@v", "%" + txtValor.Text + "%");
                }
                else if (cmbBusca.SelectedIndex == 1) // ID
                {
                    if (!int.TryParse(txtValor.Text, out int id)) { MessageBox.Show("ID inválido."); return; }
                    sql = "SELECT * FROM Produtos WHERE idProduto = @v";
                    cmd = new MySqlCommand(sql, conn);
                    cmd.Parameters.AddWithValue("@v", id);
                }
                else // Período
                {
                    sql = "SELECT * FROM Produtos WHERE DataCompra BETWEEN @ini AND @fim";
                    cmd = new MySqlCommand(sql, conn);
                    cmd.Parameters.AddWithValue("@ini", dtpInicio.Value.ToString("yyyy-MM-dd"));
                    cmd.Parameters.AddWithValue("@fim", dtpFim.Value.ToString("yyyy-MM-dd"));
                }

                lstProdutos.Items.Clear();
                LimparDetalhe();

                using (var r = cmd.ExecuteReader())
                    while (r.Read())
                        lstProdutos.Items.Add(new ProdutoItem
                        {
                            Id         = r.GetInt32("idProduto"),
                            Nome       = r.GetString("Nome"),
                            Custo      = r.GetDecimal("CustoUnitario"),
                            DataCompra = r.GetDateTime("DataCompra"),
                            Quantidade = r.GetInt32("Quantidade"),
                            Imagem     = r.IsDBNull(r.GetOrdinal("Imagem")) ? null : (byte[])r["Imagem"]
                        });
            }
        }

        private void MostrarProduto(ProdutoItem p)
        {
            lblId.Text    = "ID: "         + p.Id;
            lblNome.Text  = "Nome: "       + p.Nome;
            lblCusto.Text = "Custo: "      + p.Custo.ToString("C2");
            lblData.Text  = "Compra: "     + p.DataCompra.ToString("dd/MM/yyyy");
            lblQtd.Text   = "Quantidade: " + p.Quantidade;

            picImagem.Image = null;
            if (p.Imagem != null)
                using (var ms = new MemoryStream(p.Imagem))
                    picImagem.Image = Image.FromStream(ms);
        }

        private void LimparDetalhe()
        {
            lblId.Text = lblNome.Text = lblCusto.Text = lblData.Text = lblQtd.Text = "";
            picImagem.Image = null;
        }
    }

    class ProdutoItem
    {
        public int      Id         { get; set; }
        public string   Nome       { get; set; }
        public decimal  Custo      { get; set; }
        public DateTime DataCompra { get; set; }
        public int      Quantidade { get; set; }
        public byte[]   Imagem     { get; set; }
        public override string ToString() => $"[{Id}] {Nome}";
    }
}
