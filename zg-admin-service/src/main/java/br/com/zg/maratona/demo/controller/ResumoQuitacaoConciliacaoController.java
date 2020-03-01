package br.com.zg.maratona.demo.controller;

import br.com.zg.maratona.demo.entity.ResumoQuitacaoConciliacao;
import br.com.zg.maratona.demo.repository.ResumoQuitacaoConciliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resumo-quitacao")
public class ResumoQuitacaoConciliacaoController {

    @Autowired
    private ResumoQuitacaoConciliacaoRepository resumoQuitacaoConciliacaoRepository;

    @GetMapping(name = "/", produces = "application/json")
    public List<ResumoQuitacaoConciliacao> getResumos() {
        return resumoQuitacaoConciliacaoRepository.findAll();
    }

}
