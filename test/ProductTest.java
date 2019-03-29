import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.ebean.Ebean;
import models.Product;
import org.junit.After;
import org.junit.Test;
import play.mvc.Result;
import play.test.WithApplication;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.contentAsString;
import static play.test.Helpers.route;


public class ProductTest extends WithApplication {

    @Test
    public void listComputersOnTheFirstPage() throws IOException {
        List<Product> expectedProducts = addProductsToCatalog();
        ObjectMapper objectMapper = new ObjectMapper();
        Result result = route(app, controllers.routes.ProductsController.getAllProducts());

        String s = contentAsString(result);
        List<Product> products = objectMapper.readValue(s, new TypeReference<List<Product>>() {
        });

        assertThat(result.status()).isEqualTo(OK);
        assertThat(products).isEqualTo(expectedProducts);
    }

    private List<Product> addProductsToCatalog() {
        Product product1 = new Product(1L, "un producto", "Apple Inc.");
        Product product2 = new Product(2L, "un producto", "Thinking Machines");
        Product product3 = new Product(3L, "un producto", "RCA");
        Product product4 = new Product(4L, "un producto", "Netronics");
        Product product5 = new Product(5L, "un producto", "Tandy Corporation");

        product1.save();
        product2.save();
        product3.save();
        product4.save();
        product5.save();

        return Arrays.asList(product1, product2, product3, product4, product5);
    }

    @After
    public void teardown() {
        Ebean.createCallableSql("TRUNCATE TABLE Product");
    }


}
