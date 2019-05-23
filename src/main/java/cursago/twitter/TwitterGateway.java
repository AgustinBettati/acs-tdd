package cursago.twitter;

import cursago.model.ExternalCourse;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;

class TwitterGateway {

    private Twitter twitter;

    TwitterGateway(Twitter twitter) {
        this.twitter = twitter;
    }

    Status tweetAboutCourse(ExternalCourse course, String message) {
        Status status;
        try {
            status = twitter.tweets().updateStatus(message);
        } catch (TwitterException e) {
            throw new TwitterExceptionOurs(e);
        }
        course.setSharedInTwitter(true);
        return status;
    }
}
