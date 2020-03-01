
using Extrator.Model;
using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using System.Xml;
using System.Xml.Serialization;

namespace core
{
    public partial class PaginaInicial : Form
    {
        Config config;
        String connString;
        DataTable dtArqivos, dtGuias;
        NpgsqlConnection pgsqlConnection = null;
        List<String> erros;

        public PaginaInicial()
        {
            InitializeComponent();
        }

        private void PaginaInicial_Load(object sender, EventArgs e)
        {
            config = JsonConvert.DeserializeObject<Config>(File.ReadAllText(Application.StartupPath + @"\config.json"));

            //Busca ARQUIVOS do banco do extrator
            dtArqivos = new DataTable();
            connString = String.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",
                                        config.conexoes[0].host,
                                        config.conexoes[0].port,
                                        config.conexoes[0].user,
                                        config.conexoes[0].pwd,
                                        config.conexoes[0].database);

            string cmdSeleciona = "select * from arquivos where conciliado = 'N'";

            using (pgsqlConnection = new NpgsqlConnection(connString))
            {
                pgsqlConnection.Open();

                using (NpgsqlDataAdapter Adpt = new NpgsqlDataAdapter(cmdSeleciona, pgsqlConnection))
                {
                    Adpt.Fill(dtArqivos);
                }
                pgsqlConnection.Close();
            }


            foreach (DataRow  arq in dtArqivos.Rows)
            {
                String conteudoArq = Convert.ToString(arq.ItemArray[1]);
                var list = new List<string>();
                var pattern = "<data>|<row>";
                var isInTag = false;
                var inTagValue = String.Empty;
                String[] GuiasArq = Regex.Split(conteudoArq, pattern);
                erros = new List<string>();

                for (int i = 2; i < GuiasArq.Length -1; i++)
                {
                    String convenio = Regex.Split(conteudoArq, pattern)[2];

                    //Busca GUIAS do banco ERP
                    dtGuias = new DataTable();
                    connString = String.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",
                                                config.conexoes[1].host,
                                                config.conexoes[1].port,
                                                config.conexoes[1].user,
                                                config.conexoes[1].pwd,
                                                config.conexoes[1].database);

                    cmdSeleciona = "select it.guia_id, g.valor_total as VlTotalGuia , it.valor_total as vlTotalItem, it.quantidade , it.produto_id , g.prestador_id , g.convenio_id from guia g inner join item_guia it on it.guia_id = g.id" +
                                    " where g.id='" + Regex.Split(convenio, "numero_guia>|</")[6] + "'";

                    using (pgsqlConnection = new NpgsqlConnection(connString))
                    {
                        pgsqlConnection.Open();

                        using (NpgsqlDataAdapter Adpt = new NpgsqlDataAdapter(cmdSeleciona, pgsqlConnection))
                        {
                            Adpt.Fill(dtGuias);
                        }
                        pgsqlConnection.Close();
                    }

                    String vlPagoArq = Regex.Split(convenio, "valor_pago>|</")[12];
                    String vlApresentado = Regex.Split(convenio, "valor_apresentado>|</")[11];
                    String codErroAq = Regex.Split(convenio, "codigo_motivo>|</")[15];
                    String descErroArq = Regex.Split(convenio, "descricao_motivo>|</")[14];


                    String insertCon = "INSERT INTO public.resumo_quitacao_consolidado VALUES(0, '', '', 0, 0, 0, 0, '', 0, 0, 0, ''); ";

                    connString = String.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",
                                                config.conexoes[2].host,
                                                config.conexoes[2].port,
                                                config.conexoes[2].user,
                                                config.conexoes[2].pwd,
                                                config.conexoes[2].database);

                    using (pgsqlConnection = new NpgsqlConnection(connString))
                    {
                        pgsqlConnection.Open();

                        using (NpgsqlCommand pgsqlcommand = new NpgsqlCommand(insertCon, pgsqlConnection))
                        {
                            pgsqlcommand.ExecuteNonQuery();
                        }
                    }





                }


                
            }

            

            //Busca os dados do LAYOUT
            dtGuias = new DataTable();
            connString = String.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",
                                        config.conexoes[2].host,
                                        config.conexoes[2].port,
                                        config.conexoes[2].user,
                                        config.conexoes[2].pwd,
                                        config.conexoes[2].database);

            cmdSeleciona = "select * from layout_convenio where id_convenio = " + "";

            using (pgsqlConnection = new NpgsqlConnection(connString))
            {
                pgsqlConnection.Open();

                using (NpgsqlDataAdapter Adpt = new NpgsqlDataAdapter(cmdSeleciona, pgsqlConnection))
                {
                    Adpt.Fill(dtGuias);
                }
                pgsqlConnection.Close();
            }



            foreach (var arquivo in dtArqivos.Rows)
            {

            }

            //Efeta a conciliacao

            bgwThreadCore.RunWorkerAsync();
        }



        private void bgwThreadCore_DoWork(object sender, System.ComponentModel.DoWorkEventArgs e)
        {
            procesarArquivos();
        }
        private void bgwThreadCore_ProgressChanged(object sender, System.ComponentModel.ProgressChangedEventArgs e)
        {
            txtLog.Text += (String)e.UserState;
        }
        private void bgwThreadCore_RunWorkerCompleted(object sender, System.ComponentModel.RunWorkerCompletedEventArgs e)
        {
            txtLog.Text += Environment.NewLine + "ARQUIVOS CONCILIADOS COM SUESSO";
        }

        private void procesarArquivos()
        {

        }
    }
}
