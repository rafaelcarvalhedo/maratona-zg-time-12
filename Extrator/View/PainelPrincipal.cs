using Extrator.Model;
using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Extrator
{
    public partial class ExtratorVW : Form
    {
        String connString;
        Config config;
        NpgsqlConnection pgsqlConnection = null;
        DataTable dt;

        public ExtratorVW()
        {
            InitializeComponent();
        }

        private void ExtratorVW_Load(object sender, EventArgs e)
        {
            try
            {
                config = JsonConvert.DeserializeObject<Config>(File.ReadAllText(Application.StartupPath + @"\config.json"));

                foreach (Conexoes item in config.conexoes)
                {
                    connString = String.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",
                                                item.host, item.port, item.user, item.pwd, item.database);

                    using (pgsqlConnection = new NpgsqlConnection(connString))
                    {
                        pgsqlConnection.Open();
                    }
                }

                txtLog.Text += "Rodando...";
                bgwThreadArquivo.RunWorkerAsync();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Ocorreu o seguitne erro: " + ex.Message,
                                "Mensagem do sistema",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Exclamation,
                                MessageBoxDefaultButton.Button1);
                pgsqlConnection.Close();
            }

            
        }

        private void baixaArquivos()
        {
            //Url PAI
            foreach (String item in config.url)
            {
                string urlAddress = item;
                dt = new DataTable();

                connString = String.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",
                                                config.conexoes[0].host,
                                                config.conexoes[0].port,
                                                config.conexoes[0].user,
                                                config.conexoes[0].pwd,
                                                config.conexoes[0].database);


                using (pgsqlConnection = new NpgsqlConnection(connString))
                {
                    pgsqlConnection.Open();

                    String nomeConvenio = item.Split('/')[3];


                    bgwThreadArquivo.ReportProgress(0, Environment.NewLine + Environment.NewLine +
                                                       "=======================================" +
                                                        Environment.NewLine +
                                                       "Baixando Convênio: " + nomeConvenio +
                                                       Environment.NewLine +
                                                       "=======================================" +
                                                       Environment.NewLine);

                    string sql = String.Format("select nome from arquivos where nome like '%" + nomeConvenio + "%'");

                    using (NpgsqlDataAdapter Adpt = new NpgsqlDataAdapter(sql, pgsqlConnection))
                    {
                        Adpt.Fill(dt);
                    }
                }


                using (WebClient client = new WebClient())
                {
                    string htmlCode = client.DownloadString(urlAddress);
                    var hrefs = htmlCode.Split(new[] { "href=\"" }, StringSplitOptions.RemoveEmptyEntries).Where(o => o.StartsWith("../arquivo")).Select(o => o.Substring(0, o.IndexOf("\"")));

                    //Percorre lisks da URL PAI
                    foreach (var href in hrefs)
                    {

                        bool exists = dt.AsEnumerable().Where(c => c.Field<string>("nome").Contains(href.Split('?')[1].Split('=')[1])).Count() > 0;
                        if (exists)
                        {
                            continue;
                        }


                        htmlCode = client.DownloadString(item.Replace("index", "pagina?" + href.Split('?')[1]));
                        var pagLink = htmlCode.Split(new[] { "href=\"" }, StringSplitOptions.RemoveEmptyEntries).Where(o => o.StartsWith("../arquivo/download")).Select(o => o.Substring(0, o.IndexOf("\"")));

                        //Percorre link da URL FILHA
                        foreach (var link in pagLink)
                        {
                            String linkFile = link.Replace("&amp;", "&");
                            urlAddress = item.Replace("index", "download");
                            urlAddress += "?" + linkFile.Split('?')[1];

                            String nomeArq = urlAddress.Split('?')[1].Replace("nome=", "").Split('&')[0];
                            bgwThreadArquivo.ReportProgress(0, Environment.NewLine +
                                                                "Baixando arquivo: " + nomeArq +
                                                                Environment.NewLine);


                            string conteudo = client.DownloadString(urlAddress);


                            using (pgsqlConnection = new NpgsqlConnection(connString))
                            {
                                pgsqlConnection.Open();

                                string sql = String.Format("Insert into arquivos values('{0}','{1}','{2}')", nomeArq, conteudo, "N");

                                using (NpgsqlCommand pgsqlcommand = new NpgsqlCommand(sql, pgsqlConnection))
                                {
                                    pgsqlcommand.ExecuteNonQuery();
                                    continue;
                                }
                            }
                        }
                        continue;

                    }

                }
            }




        }

        private void bgwThreadArquivo_DoWork(object sender, System.ComponentModel.DoWorkEventArgs e)
        {
            baixaArquivos();
        }
        private void bgwThreadArquivo_ProgressChanged(object sender, System.ComponentModel.ProgressChangedEventArgs e)
        {
            txtLog.Text += (String)e.UserState;
        }
        private void bgwThreadArquivo_RunWorkerCompleted(object sender, System.ComponentModel.RunWorkerCompletedEventArgs e)
        {
            txtLog.Text += Environment.NewLine + "ARQUIVOS ATUALIZADOS COM SUESSO";
        }

    }
    
}
