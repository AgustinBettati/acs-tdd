package cursago;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static final String API_V1_BASE_URI = "/api";

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
