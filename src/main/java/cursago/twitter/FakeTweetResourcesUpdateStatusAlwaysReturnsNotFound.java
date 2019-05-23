package cursago.twitter;

import twitter4j.HttpClientConfiguration;
import twitter4j.HttpResponse;
import twitter4j.IDs;
import twitter4j.OEmbed;
import twitter4j.OEmbedRequest;
import twitter4j.ResponseList;
import twitter4j.Status;
import twitter4j.StatusUpdate;
import twitter4j.TwitterException;
import twitter4j.UploadedMedia;
import twitter4j.api.TweetsResources;

import java.io.File;
import java.io.InputStream;

public class FakeTweetResourcesUpdateStatusAlwaysReturnsNotFound implements TweetsResources {

    @Override
    public ResponseList<Status> getRetweets(long statusId) throws TwitterException {
        return null;
    }

    @Override
    public IDs getRetweeterIds(long statusId, long cursor) throws TwitterException {
        return null;
    }

    @Override
    public IDs getRetweeterIds(long statusId, int count, long cursor) throws TwitterException {
        return null;
    }

    @Override
    public Status showStatus(long id) throws TwitterException {
        return null;
    }

    @Override
    public Status destroyStatus(long statusId) throws TwitterException {
        return null;
    }

    @Override
    public Status updateStatus(String status) throws TwitterException {
        HttpClientConfiguration httpClientConfiguration = new FakeHttpClientConfiguration();
        HttpResponse notFoundResponse = new FakeTwitterHttpResponse(httpClientConfiguration, 404);
        throw new TwitterException("Not found", notFoundResponse);
    }

    @Override
    public Status updateStatus(StatusUpdate latestStatus) throws TwitterException {
        return null;
    }

    @Override
    public Status retweetStatus(long statusId) throws TwitterException {
        return null;
    }

    @Override
    public Status unRetweetStatus(long statusId) throws TwitterException {
        return null;
    }

    @Override
    public OEmbed getOEmbed(OEmbedRequest req) throws TwitterException {
        return null;
    }

    @Override
    public ResponseList<Status> lookup(long... ids) throws TwitterException {
        return null;
    }

    @Override
    public UploadedMedia uploadMedia(File mediaFile) throws TwitterException {
        return null;
    }

    @Override
    public UploadedMedia uploadMedia(String fileName, InputStream media) throws TwitterException {
        return null;
    }

    @Override
    public UploadedMedia uploadMediaChunked(String fileName, InputStream media) throws TwitterException {
        return null;
    }
}
