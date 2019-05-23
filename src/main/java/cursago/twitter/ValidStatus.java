package cursago.twitter;

import twitter4j.GeoLocation;
import twitter4j.HashtagEntity;
import twitter4j.MediaEntity;
import twitter4j.Place;
import twitter4j.RateLimitStatus;
import twitter4j.Scopes;
import twitter4j.Status;
import twitter4j.SymbolEntity;
import twitter4j.URLEntity;
import twitter4j.User;
import twitter4j.UserMentionEntity;

import java.util.Date;

public class ValidStatus implements Status {

    private String message;

    public ValidStatus(String message) {
        this.message = message;
    }

    /**
     * Return the created_at
     *
     * @return created_at
     * @since Twitter4J 1.1.0
     */
    @Override
    public Date getCreatedAt() {
        return new Date();
    }

    /**
     * Returns the id of the status
     *
     * @return the id (e.g. 210462857140252672)
     */
    @Override
    public long getId() {
        return 0;
    }

    /**
     * Returns the text of the status
     *
     * @return the text (e.g. Along with our new #Twitterbird, we've also updated our Display Guidelines: https://t.co/Ed4omjYs  ^JC)
     */
    @Override
    public String getText() {
        return message;
    }

    @Override
    public int getDisplayTextRangeStart() {
        return 0;
    }

    @Override
    public int getDisplayTextRangeEnd() {
        return 0;
    }

    /**
     * Returns the source
     *
     * @return the source (e.g. &lt;a href="http://twitter.com" rel="nofollow"&gt;Twitter Web Client&lt;/a&gt;)
     * @since Twitter4J 1.0.4
     */
    @Override
    public String getSource() {
        return null;
    }

    /**
     * Test if the status is truncated
     *
     * @return true if truncated
     * @since Twitter4J 1.0.4
     */
    @Override
    public boolean isTruncated() {
        return false;
    }

    /**
     * Returns the in_reply_tostatus_id
     *
     * @return the in_reply_tostatus_id
     * @since Twitter4J 1.0.4
     */
    @Override
    public long getInReplyToStatusId() {
        return 0;
    }

    /**
     * Returns the in_reply_user_id
     *
     * @return the in_reply_tostatus_id
     * @since Twitter4J 1.0.4
     */
    @Override
    public long getInReplyToUserId() {
        return 0;
    }

    /**
     * Returns the in_reply_to_screen_name
     *
     * @return the in_in_reply_to_screen_name
     * @since Twitter4J 2.0.4
     */
    @Override
    public String getInReplyToScreenName() {
        return null;
    }

    /**
     * Returns The location that this tweet refers to if available.
     *
     * @return returns The location that this tweet refers to if available (can be null)
     * @since Twitter4J 2.1.0
     */
    @Override
    public GeoLocation getGeoLocation() {
        return null;
    }

    /**
     * Returns the place attached to this status
     *
     * @return The place attached to this status
     * @since Twitter4J 2.1.1
     */
    @Override
    public Place getPlace() {
        return null;
    }

    /**
     * Test if the status is favorited
     *
     * @return true if favorited
     * @since Twitter4J 1.0.4
     */
    @Override
    public boolean isFavorited() {
        return false;
    }

    /**
     * Test if the status is retweeted
     *
     * @return true if retweeted
     * @since Twitter4J 3.0.4
     */
    @Override
    public boolean isRetweeted() {
        return false;
    }

    /**
     * Indicates approximately how many times this Tweet has been "favorited" by Twitter users.
     *
     * @return the favorite count
     * @since Twitter4J 3.0.4
     */
    @Override
    public int getFavoriteCount() {
        return 0;
    }

    /**
     * Return the user associated with the status.<br>
     * This can be null if the instance is from User.getStatus().
     *
     * @return the user
     */
    @Override
    public User getUser() {
        return null;
    }

    /**
     * @return if the status is retweet or not
     * @since Twitter4J 2.0.10
     */
    @Override
    public boolean isRetweet() {
        return false;
    }

    /**
     * @return retweeted status
     * @since Twitter4J 2.1.0
     */
    @Override
    public Status getRetweetedStatus() {
        return null;
    }

    /**
     * Returns an array of contributors, or null if no contributor is associated with this status.
     *
     * @return contributors
     * @since Twitter4J 2.2.3
     */
    @Override
    public long[] getContributors() {
        return new long[0];
    }

    /**
     * Returns the number of times this tweet has been retweeted, or -1 when the tweet was
     * created before this feature was enabled.
     *
     * @return the retweet count.
     */
    @Override
    public int getRetweetCount() {
        return 0;
    }

    /**
     * Returns true if the authenticating user has retweeted this tweet, or false when the tweet was
     * created before this feature was enabled.
     *
     * @return whether the authenticating user has retweeted this tweet.
     * @since Twitter4J 2.1.4
     */
    @Override
    public boolean isRetweetedByMe() {
        return false;
    }

    /**
     * Returns the authenticating user's retweet's id of this tweet, or -1L when the tweet was created
     * before this feature was enabled.
     *
     * @return the authenticating user's retweet's id of this tweet
     * @since Twitter4J 3.0.1
     */
    @Override
    public long getCurrentUserRetweetId() {
        return 0;
    }

    /**
     * Returns true if the status contains a link that is identified as sensitive.
     *
     * @return whether the status contains sensitive links
     * @since Twitter4J 3.0.0
     */
    @Override
    public boolean isPossiblySensitive() {
        return false;
    }

    /**
     * Returns the lang of the status text if available.
     *
     * @return two-letter iso language code (e.g. en)
     * @since Twitter4J 3.0.6
     */
    @Override
    public String getLang() {
        return null;
    }

    /**
     * Returns the targeting scopes applied to a status.
     *
     * @return the targeting scopes applied to a status.
     * @since Twitter4J 3.0.6
     */
    @Override
    public Scopes getScopes() {
        return null;
    }

    /**
     * Returns the list of country codes where the tweet is withheld
     *
     * @return list of country codes where the tweet is withheld - null if not withheld
     * @since Twitter4j 4.0.3
     */
    @Override
    public String[] getWithheldInCountries() {
        return new String[0];
    }

    /**
     * Returns the Tweet ID of the quoted Tweet
     *
     * @return the Tweet ID of the quoted Tweet
     * @since Twitter4J 4.0.4
     */
    @Override
    public long getQuotedStatusId() {
        return 0;
    }

    /**
     * Returns the Tweet object of the original Tweet that was quoted.
     *
     * @return the quoted Tweet object
     * @since Twitter4J 4.0.4
     */
    @Override
    public Status getQuotedStatus() {
        return null;
    }

    /**
     * Returns the URLEntity object that represents the permalink of the quoted Tweet.
     * <p>
     * Note that "text" and an indices of "start", "end" are not provided.
     *
     * @return the URLEntity object that represents the permalink of the quoted Tweet. - null if not presents
     * @since Twitter4J 4.0.7
     */
    @Override
    public URLEntity getQuotedStatusPermalink() {
        return null;
    }

    /**
     * Compares this object with the specified object for order.  Returns a
     * negative integer, zero, or a positive integer as this object is less
     * than, equal to, or greater than the specified object.
     *
     * <p>The implementor must ensure <tt>sgn(x.compareTo(y)) ==
     * -sgn(y.compareTo(x))</tt> for all <tt>x</tt> and <tt>y</tt>.  (This
     * implies that <tt>x.compareTo(y)</tt> must throw an exception iff
     * <tt>y.compareTo(x)</tt> throws an exception.)
     *
     * <p>The implementor must also ensure that the relation is transitive:
     * <tt>(x.compareTo(y)&gt;0 &amp;&amp; y.compareTo(z)&gt;0)</tt> implies
     * <tt>x.compareTo(z)&gt;0</tt>.
     *
     * <p>Finally, the implementor must ensure that <tt>x.compareTo(y)==0</tt>
     * implies that <tt>sgn(x.compareTo(z)) == sgn(y.compareTo(z))</tt>, for
     * all <tt>z</tt>.
     *
     * <p>It is strongly recommended, but <i>not</i> strictly required that
     * <tt>(x.compareTo(y)==0) == (x.equals(y))</tt>.  Generally speaking, any
     * class that implements the <tt>Comparable</tt> interface and violates
     * this condition should clearly indicate this fact.  The recommended
     * language is "Note: this class has a natural ordering that is
     * inconsistent with equals."
     *
     * <p>In the foregoing description, the notation
     * <tt>sgn(</tt><i>expression</i><tt>)</tt> designates the mathematical
     * <i>signum</i> function, which is defined to return one of <tt>-1</tt>,
     * <tt>0</tt>, or <tt>1</tt> according to whether the value of
     * <i>expression</i> is negative, zero or positive.
     *
     * @param o the object to be compared.
     * @return a negative integer, zero, or a positive integer as this object
     * is less than, equal to, or greater than the specified object.
     * @throws NullPointerException if the specified object is null
     * @throws ClassCastException   if the specified object's type prevents it
     *                              from being compared to this object.
     */
    @Override
    public int compareTo(Status o) {
        return 0;
    }

    /**
     * Returns an array of user mentions in the tweet. This method will return an empty array if no users were mentioned in the tweet.
     *
     * @return An array of user mention entities in the tweet.
     * @since Twitter4J 2.1.9
     */
    @Override
    public UserMentionEntity[] getUserMentionEntities() {
        return new UserMentionEntity[0];
    }

    /**
     * Returns an array if URLEntity mentioned in the tweet. This method will return an empty array if no url were mentioned in the tweet.
     *
     * @return An array of URLEntity mentioned in the tweet.
     * @since Twitter4J 2.1.9
     */
    @Override
    public URLEntity[] getURLEntities() {
        return new URLEntity[0];
    }

    /**
     * Returns an array if hashtag mentioned in the tweet.  This method will return an empty array if no hashtags were mentioned in the tweet.
     *
     * @return An array of Hashtag mentioned in the tweet.
     * @since Twitter4J 2.1.9
     */
    @Override
    public HashtagEntity[] getHashtagEntities() {
        return new HashtagEntity[0];
    }

    /**
     * Returns an array of MediaEntities if medias are available in the tweet. This method will return an empty array if no medias were mentioned.
     *
     * @return an array of MediaEntities.
     * @since Twitter4J 2.2.3
     */
    @Override
    public MediaEntity[] getMediaEntities() {
        return new MediaEntity[0];
    }

    /**
     * Returns an array of SymbolEntities if medias are available in the tweet. This method will return an empty array if no symbols were mentioned.
     *
     * @return an array of SymbolEntities.
     * @since Twitter4J 3.0.4
     */
    @Override
    public SymbolEntity[] getSymbolEntities() {
        return new SymbolEntity[0];
    }

    /**
     * Returns the current rate limit status if available.
     *
     * @return current rate limit status
     * @since Twitter4J 2.1.0
     */
    @Override
    public RateLimitStatus getRateLimitStatus() {
        return null;
    }

    /**
     * @return application permission model
     * @see <a href="https://dev.twitter.com/pages/application-permission-model-faq#how-do-we-know-what-the-access-level-of-a-user-token-is">Application Permission Model FAQ - How do we know what the access level of a user token is?</a>
     * @since Twitter4J 2.2.3
     */
    @Override
    public int getAccessLevel() {
        return 0;
    }
}
