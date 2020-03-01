package br.com.zg.maratona.demo.repository;

import br.com.zg.maratona.demo.entity.ResumoQuitacaoConciliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumoQuitacaoConciliacaoRepository extends JpaRepository<ResumoQuitacaoConciliacao, Integer> {
}
