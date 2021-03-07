package oslomet.webprog;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BilletterController {

    public final List<Billetter> billetterRegister = new ArrayList<>();

    @PostMapping("/lagre")
    public void lagreBillett(Billetter billett){
        billetterRegister.add(billett);
    }

    @GetMapping("/hentAlle")
    public List<Billetter> hentAlle(){
        return billetterRegister;
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        billetterRegister.clear();
    }
}
