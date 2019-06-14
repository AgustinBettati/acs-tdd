package cursago.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@Entity(name = "course_table")
public class ExternalCourse {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "description")
    @NotNull
    private String description;

    @Column(name = "platform")
    @NotNull
    private String platform;

    @Column(name = "link")
    @NotNull
    @Pattern(regexp = "^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]", flags = Pattern.Flag.CASE_INSENSITIVE, message = "Invalid link")
    private String link;

    @Column(name = "sharedInTwitter")
    private boolean sharedInTwitter;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public boolean isSharedInTwitter() {
        return sharedInTwitter;
    }

    public void setSharedInTwitter(boolean sharedInTwitter) {
        this.sharedInTwitter = sharedInTwitter;
    }
}
