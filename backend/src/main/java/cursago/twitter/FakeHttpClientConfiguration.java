package cursago.twitter;

import twitter4j.HttpClientConfiguration;

public class FakeHttpClientConfiguration implements HttpClientConfiguration {
    @Override
    public String getHttpProxyHost() {
        return null;
    }

    @Override
    public int getHttpProxyPort() {
        return 0;
    }

    @Override
    public String getHttpProxyUser() {
        return null;
    }

    @Override
    public String getHttpProxyPassword() {
        return null;
    }

    @Override
    public boolean isHttpProxySocks() {
        return false;
    }

    @Override
    public int getHttpConnectionTimeout() {
        return 0;
    }

    @Override
    public int getHttpReadTimeout() {
        return 0;
    }

    @Override
    public int getHttpRetryCount() {
        return 0;
    }

    @Override
    public int getHttpRetryIntervalSeconds() {
        return 0;
    }

    @Override
    public boolean isPrettyDebugEnabled() {
        return false;
    }

    @Override
    public boolean isGZIPEnabled() {
        return false;
    }
}
