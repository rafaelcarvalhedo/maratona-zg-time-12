package br.com.zg.maratona.demo.controller;

import br.com.zg.maratona.demo.entity.LayoutConvenio;
import br.com.zg.maratona.demo.repository.LayoutConvenioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/layout-convenio")
public class LayoutConvenioController {

    @Autowired
    private LayoutConvenioRepository layoutConvenioRepository;

    @GetMapping(name = "/", produces = "application/json")
    public List<LayoutConvenio> getLayoutsConvenios() {
        return layoutConvenioRepository.findAll();
    }

    @PutMapping(name = "/", produces = "application/json")
    public LayoutConvenio saveLayoutConvenio(@RequestBody() LayoutConvenio layoutConvenio) {
        return layoutConvenioRepository.save(layoutConvenio);
    }

}
