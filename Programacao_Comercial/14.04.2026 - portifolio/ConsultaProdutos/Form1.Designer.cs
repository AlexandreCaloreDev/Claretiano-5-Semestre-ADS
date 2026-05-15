namespace ConsultaProdutos
{
    partial class Form1
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null)) components.Dispose();
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.splitContainer1  = new System.Windows.Forms.SplitContainer();
            this.cmbBusca         = new System.Windows.Forms.ComboBox();
            this.txtValor         = new System.Windows.Forms.TextBox();
            this.dtpInicio        = new System.Windows.Forms.DateTimePicker();
            this.dtpFim           = new System.Windows.Forms.DateTimePicker();
            this.btnBuscar        = new System.Windows.Forms.Button();
            this.lstProdutos      = new System.Windows.Forms.ListBox();
            this.lblId            = new System.Windows.Forms.Label();
            this.lblNome          = new System.Windows.Forms.Label();
            this.lblCusto         = new System.Windows.Forms.Label();
            this.lblData          = new System.Windows.Forms.Label();
            this.lblQtd           = new System.Windows.Forms.Label();
            this.picImagem        = new System.Windows.Forms.PictureBox();

            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picImagem)).BeginInit();
            this.SuspendLayout();

            // splitContainer1
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.SplitterDistance = 300;

            // cmbBusca
            this.cmbBusca.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbBusca.Items.AddRange(new object[] { "Nome", "ID", "Período" });
            this.cmbBusca.SelectedIndex = 0;
            this.cmbBusca.Location = new System.Drawing.Point(8, 8);
            this.cmbBusca.Size = new System.Drawing.Size(280, 24);
            this.cmbBusca.SelectedIndexChanged += new System.EventHandler(this.cmbBusca_SelectedIndexChanged);

            // txtValor
            this.txtValor.Location = new System.Drawing.Point(8, 40);
            this.txtValor.Size = new System.Drawing.Size(280, 22);

            // dtpInicio
            this.dtpInicio.Location = new System.Drawing.Point(8, 40);
            this.dtpInicio.Size = new System.Drawing.Size(280, 22);
            this.dtpInicio.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.dtpInicio.Visible = false;

            // dtpFim
            this.dtpFim.Location = new System.Drawing.Point(8, 70);
            this.dtpFim.Size = new System.Drawing.Size(280, 22);
            this.dtpFim.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.dtpFim.Visible = false;

            // btnBuscar
            this.btnBuscar.Text = "Buscar";
            this.btnBuscar.Location = new System.Drawing.Point(8, 100);
            this.btnBuscar.Size = new System.Drawing.Size(280, 28);
            this.btnBuscar.Click += new System.EventHandler(this.btnBuscar_Click);

            // lstProdutos
            this.lstProdutos.Location = new System.Drawing.Point(8, 136);
            this.lstProdutos.Size = new System.Drawing.Size(280, 400);
            this.lstProdutos.SelectedIndexChanged += new System.EventHandler(this.lstProdutos_SelectedIndexChanged);

            // Labels painel direito
            this.lblId.Location   = new System.Drawing.Point(8, 8);
            this.lblId.Size       = new System.Drawing.Size(450, 20);
            this.lblNome.Location = new System.Drawing.Point(8, 34);
            this.lblNome.Size     = new System.Drawing.Size(450, 20);
            this.lblCusto.Location= new System.Drawing.Point(8, 60);
            this.lblCusto.Size    = new System.Drawing.Size(450, 20);
            this.lblData.Location = new System.Drawing.Point(8, 86);
            this.lblData.Size     = new System.Drawing.Size(450, 20);
            this.lblQtd.Location  = new System.Drawing.Point(8, 112);
            this.lblQtd.Size      = new System.Drawing.Size(450, 20);

            // picImagem
            this.picImagem.Location = new System.Drawing.Point(8, 140);
            this.picImagem.Size = new System.Drawing.Size(440, 330);
            this.picImagem.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.picImagem.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;

            // Adicionar controles
            this.splitContainer1.Panel1.Controls.Add(this.cmbBusca);
            this.splitContainer1.Panel1.Controls.Add(this.txtValor);
            this.splitContainer1.Panel1.Controls.Add(this.dtpInicio);
            this.splitContainer1.Panel1.Controls.Add(this.dtpFim);
            this.splitContainer1.Panel1.Controls.Add(this.btnBuscar);
            this.splitContainer1.Panel1.Controls.Add(this.lstProdutos);

            this.splitContainer1.Panel2.Controls.Add(this.lblId);
            this.splitContainer1.Panel2.Controls.Add(this.lblNome);
            this.splitContainer1.Panel2.Controls.Add(this.lblCusto);
            this.splitContainer1.Panel2.Controls.Add(this.lblData);
            this.splitContainer1.Panel2.Controls.Add(this.lblQtd);
            this.splitContainer1.Panel2.Controls.Add(this.picImagem);

            // Form
            this.ClientSize = new System.Drawing.Size(850, 560);
            this.Controls.Add(this.splitContainer1);
            this.Text = "Consulta de Produtos";
            this.Load += new System.EventHandler(this.Form1_Load);

            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).EndInit();
            this.splitContainer1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.picImagem)).EndInit();
            this.ResumeLayout(false);
        }

        private System.Windows.Forms.SplitContainer  splitContainer1;
        private System.Windows.Forms.ComboBox        cmbBusca;
        private System.Windows.Forms.TextBox         txtValor;
        private System.Windows.Forms.DateTimePicker  dtpInicio;
        private System.Windows.Forms.DateTimePicker  dtpFim;
        private System.Windows.Forms.Button          btnBuscar;
        private System.Windows.Forms.ListBox         lstProdutos;
        private System.Windows.Forms.Label           lblId;
        private System.Windows.Forms.Label           lblNome;
        private System.Windows.Forms.Label           lblCusto;
        private System.Windows.Forms.Label           lblData;
        private System.Windows.Forms.Label           lblQtd;
        private System.Windows.Forms.PictureBox      picImagem;
    }
}
