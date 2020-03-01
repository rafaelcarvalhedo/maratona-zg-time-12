package br.com.zg.maratona.demo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table
@Getter
@Setter
public class ResumoQuitacaoConciliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String num_guia;
    private Timestamp data_faturamento;
    private BigDecimal valor_guia;
    private BigDecimal valor_pago;
    private BigDecimal valor_glosa;
    private Integer id_produto;
    private String desc_produto;
    private BigDecimal qtde_produto;
    private Integer id_prestador;
    private Integer id_convenio;
    private Timestamp data_conciliacao;
}
