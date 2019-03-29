import models.Product;
import org.junit.Test;
import play.Application;
import play.inject.guice.GuiceApplicationBuilder;
import play.test.WithApplication;
import repository.ProductRepository;
import play.mvc.Result;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.route;

public class ProductTest extends WithApplication {


    @Test
    public void listComputersOnTheFirstPage() {
        Result result = route(app, controllers.routes.ProductsController.getAllProducts());

        assertThat(result.status()).isEqualTo(OK);
    }

}