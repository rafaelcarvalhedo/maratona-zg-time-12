package br.com.zg.maratona.demo.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
public class LayoutConvenio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer id_convenio;
    private String extensao;
    private String posicao_inicial;
    private String posicao_final;
    private String indice;
    private String tag_seletor;
    private String delimitador;
    private String chave;
}
