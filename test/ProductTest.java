import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.Product;
import org.junit.Test;
import play.mvc.Result;
import play.test.WithApplication;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.contentAsString;
import static play.test.Helpers.route;


public class ProductTest extends WithApplication {


    @Test
    public void listComputersOnTheFirstPage() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Result result = route(app, controllers.routes.ProductsController.getAllProducts());

        Product expectedProduct1 = new Product(1L, "un producto", "Apple Inc.");
        Product expectedProduct2 = new Product(2L, "un producto", "Thinking Machines");
        Product expectedProduct3 = new Product(3L, "un producto", "RCA");
        Product expectedProduct4 = new Product(4L, "un producto", "Netronics");
        Product expectedProduct5 = new Product(5L, "un producto", "Tandy Corporation");

        String s = contentAsString(result);
        List<Product> products = objectMapper.readValue(s, new TypeReference<List<Product>>() {
        });

        assertThat(result.status()).isEqualTo(OK);
        assertThat(products).containsExactly(expectedProduct1, expectedProduct2, expectedProduct3, expectedProduct4, expectedProduct5);
    }
}
