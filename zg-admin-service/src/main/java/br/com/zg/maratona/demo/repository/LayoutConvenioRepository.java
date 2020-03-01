package br.com.zg.maratona.demo.repository;

import br.com.zg.maratona.demo.entity.LayoutConvenio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LayoutConvenioRepository extends JpaRepository<LayoutConvenio, Integer> {

}
