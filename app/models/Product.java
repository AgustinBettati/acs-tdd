package models;


import io.ebean.Finder;
import io.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.Entity;
import javax.persistence.Id;


/**
 * Company entity managed by Ebean
 */
@Entity
public class Product extends BaseModel {

    private static final long serialVersionUID = 1L;

    @Constraints.Required
    public String name;

    @Constraints.Required
    public String description;

    public Product(Long id, @Constraints.Required String name, @Constraints.Required String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Product() {
    }

    public boolean validForInsertion() {
        return name != null && description != null;
    }

    //Static
    public static final Finder<Long, Product> find = new Finder<>(Product.class);
}


