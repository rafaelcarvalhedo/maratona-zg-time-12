using System.Collections.Generic;
using System.Xml.Serialization;

namespace core
{
	[XmlRoot(ElementName = "row")]
	public class Modelo2
	{
		[XmlElement(ElementName = "convenio")]
		public string Convenio { get; set; }
		[XmlElement(ElementName = "data_pagamento")]
		public string Data_pagamento { get; set; }
		[XmlElement(ElementName = "numero_protocolo")]
		public string Numero_protocolo { get; set; }
		[XmlElement(ElementName = "matricula")]
		public string Matricula { get; set; }
		[XmlElement(ElementName = "nome")]
		public string Nome { get; set; }
		[XmlElement(ElementName = "numero_guia")]
		public string Numero_guia { get; set; }
		[XmlElement(ElementName = "ng_prest")]
		public string Ng_prest { get; set; }
		[XmlElement(ElementName = "senha_guia")]
		public string Senha_guia { get; set; }
		[XmlElement(ElementName = "codigo_produto")]
		public string Codigo_produto { get; set; }
		[XmlElement(ElementName = "descricao_produto")]
		public string Descricao_produto { get; set; }
		[XmlElement(ElementName = "valor_apresentado")]
		public string Valor_apresentado { get; set; }
		[XmlElement(ElementName = "valor_pago")]
		public string Valor_pago { get; set; }
		[XmlElement(ElementName = "valor_glosa")]
		public string Valor_glosa { get; set; }
		[XmlElement(ElementName = "descricao_motivo")]
		public string Descricao_motivo { get; set; }
		[XmlElement(ElementName = "codigo_motivo")]
		public string Codigo_motivo { get; set; }
	}

	[XmlRoot(ElementName = "data")]
	public class Data
	{
		[XmlElement(ElementName = "row")]
		public List<Modelo2> Row { get; set; }
	}
}