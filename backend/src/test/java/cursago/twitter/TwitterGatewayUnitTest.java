package cursago.twitter;

import cursago.model.ExternalCourse;
import org.junit.Test;
import twitter4j.Status;
import twitter4j.Twitter;

import static junit.framework.TestCase.assertTrue;
import static org.hamcrest.Matchers.containsString;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class TwitterGatewayUnitTest {

    private TwitterGateway twitterGateway;

    @Test
    public void testUpdateStatusWithValidBodyShouldUpdateSharedInTwitterVariable() {
        Twitter twitter = mock(Twitter.class);
        when(twitter.tweets()).thenReturn(new FakeTwitterResourcesUpdateAlwaysReturnsValidStatus());
        this.twitterGateway = new TwitterGateway(twitter);

        ExternalCourse course = new ExternalCourse();
        course.setName("TDD course");

        Status status = null;
        try {
            status = twitterGateway.tweetAboutCourse(course,"Check this awesome course out: " + course.getName() + " !");
        } catch (TwitterExceptionOurs e) {
            assertNull(e.getMessage());
        }

        assertNotNull(status);
        assertTrue(course.isSharedInTwitter());
        assertThat(status.getText(), containsString(course.getName()));
    }

    @Test
    public void testUpdateStatusWithErrorResponseShouldNotUpdateSharedInTwitterVariable() {
        Twitter twitter = mock(Twitter.class);
        when(twitter.tweets()).thenReturn(new FakeTweetResourcesUpdateStatusAlwaysReturnsNotFound());
        this.twitterGateway = new TwitterGateway(twitter);

        ExternalCourse course = new ExternalCourse();
        course.setName("TDD course");

        Status status = null;
        try {
            status = twitterGateway.tweetAboutCourse(course,"Check this awesome course out: " + course.getName() + " !");
        } catch (TwitterExceptionOurs e) {
            assertNotNull(e.getMessage());
            assertThat(e.getMessage(), containsString("404"));
        }
        assertNull(status);
        assertFalse(course.isSharedInTwitter());
    }
}
