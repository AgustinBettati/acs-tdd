import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import controllers.routes;
import io.ebean.Ebean;
import io.ebean.Model;
import models.Product;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import play.libs.Json;
import play.mvc.Http;
import play.mvc.Result;
import play.test.WithApplication;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static junit.framework.TestCase.fail;
import static org.assertj.core.api.Assertions.assertThat;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.BAD_REQUEST;
import static play.test.Helpers.CREATED;
import static play.test.Helpers.NOT_FOUND;
import static play.test.Helpers.contentAsString;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.route;
import static play.test.Helpers.running;


public class ProductTest extends WithApplication {
    ObjectMapper objectMapper;

    public ProductTest() {
        objectMapper = new ObjectMapper();
    }

    @Test
    public void test001_obtainingPresentProductById() throws IOException {
        Product savedProduct = new Product(1L, "un producto", "Apple Inc.");
        savedProduct.save();
        Result result = route(app, controllers.routes.ProductsController.getProductById(1));
        Product retrievedProduct = getProductFromResult(result);

        assertThat(result.status()).isEqualTo(OK);
        assertThat(savedProduct.id).isEqualTo(retrievedProduct.id);
        assertThat(savedProduct.name).isEqualTo(retrievedProduct.name);
        savedProduct.delete();
    }

    @Test
    public void test001b_obtainingPresentProductById() {
        Product savedProduct = new Product(1L, "un producto", "Apple Inc.");
        savedProduct.save();
        running(fakeApplication(), () -> {
            Result result = route(app, routes.ProductsController.getProductById(1));
            Product retrievedProduct = getProductFromResult(result);

            assertThat(result.status()).isEqualTo(OK);
            assertThat(savedProduct.id).isEqualTo(retrievedProduct.id);
            assertThat(savedProduct.name).isEqualTo(retrievedProduct.name);
            savedProduct.delete();
        });
    }

    @Test
    public void test002_notFoundResponseWhenSearchingWithInvalidId() {
        Result result = route(app, controllers.routes.ProductsController.getProductById(0));
        assertThat(result.status()).isEqualTo(NOT_FOUND);
    }

    @Test
    public void test003_validProductCreationRespondsWithCreatedCode() {
        Product newProduct = new Product(null, "new product", "Apple Inc.");
        JsonNode jsonNode = Json.toJson(newProduct);
        Http.RequestBuilder saveRequest = new Http.RequestBuilder().method("POST")
                .bodyJson(jsonNode)
                .uri(routes.ProductsController.create().url());
        Result postResult = route(app, saveRequest);

        assertThat(postResult.status()).isEqualTo(CREATED);
    }

    @Test
    public void test004_postingProductAndRetrievingById() throws IOException {
        Product newProduct = new Product(null, "other product", "Microsft.");
        JsonNode jsonNode = Json.toJson(newProduct);
        Http.RequestBuilder saveRequest = new Http.RequestBuilder().method("POST")
                .bodyJson(jsonNode)
                .uri(routes.ProductsController.create().url());
        Result postResult = route(app, saveRequest);

        assertThat(postResult.status()).isEqualTo(CREATED);

        String postString = contentAsString(postResult);

        System.out.println(postString);
        Product createdProduct = objectMapper.readValue(postString, new TypeReference<Product>() {
        });

        Long idOfCreated = createdProduct.id;
        Result getResult = route(app, controllers.routes.ProductsController.getProductById(idOfCreated));
        Product retrievedProduct =getProductFromResult(getResult);

        assertThat(getResult.status()).isEqualTo(OK);
        assertThat(retrievedProduct.name).isEqualTo(newProduct.name);
        assertThat(retrievedProduct.description).isEqualTo(newProduct.description);
        newProduct.delete();
    }

    @Test
    public void test005_whenProductIsCreatedWithNullDescriptionStatusShouldBadRequest() {
        Product newProduct = new Product(null, "new product", null);
        JsonNode jsonNode = Json.toJson(newProduct);
        Http.RequestBuilder saveRequest = new Http.RequestBuilder().method("POST")
                .bodyJson(jsonNode)
                .uri(routes.ProductsController.create().url());
        Result postResult = route(app, saveRequest);

        assertThat(postResult.status()).isEqualTo(BAD_REQUEST);
    }

    @Test
    public void test006_whenProductIsCreatedWithNullNameStatusShouldBadRequest() {
        Product newProduct = new Product(null, null, "description");
        JsonNode jsonNode = Json.toJson(newProduct);
        Http.RequestBuilder saveRequest = new Http.RequestBuilder().method("POST")
                .bodyJson(jsonNode)
                .uri(routes.ProductsController.create().url());
        Result postResult = route(app, saveRequest);

        assertThat(postResult.status()).isEqualTo(BAD_REQUEST);
    }


    @Test
    public void test007_whenThereAreNoProductsGetAllShouldReturnEmpty() {
        Result result = route(app, controllers.routes.ProductsController.getAllProducts());

        List<Product> products = getProductListFromResult(result);

        assertThat(result.status()).isEqualTo(OK);
        assertThat(products.isEmpty()).isEqualTo(true);
    }

    @Test
    public void test008_whenProductsArePresentGetAllShoulReturnAllProducts() throws IOException {
        List<Product> expectedProducts = addProductsToCatalog();
        Result result = route(app, controllers.routes.ProductsController.getAllProducts());

        String s = contentAsString(result);
        List<Product> products = getProductListFromResult(result);

        assertThat(result.status()).isEqualTo(OK);
        assertThat(products).isEqualTo(expectedProducts);

        expectedProducts.forEach(Model::delete);
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

    private Product getProductFromResult(Result result){
        try {
            return objectMapper.readValue(contentAsString(result), new TypeReference<Product>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private List<Product> getProductListFromResult(Result result){
        try {
            return objectMapper.readValue(contentAsString(result), new TypeReference<List<Product>>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    @After
    public void teardown() {
        try {
            Ebean.deleteAll(Product.find.all());
        } catch (RuntimeException e){

        }
        Ebean.createCallableSql("TRUNCATE TABLE Product");
    }


}
