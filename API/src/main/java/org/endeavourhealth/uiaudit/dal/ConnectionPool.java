package org.endeavourhealth.uiaudit.dal;

import com.fasterxml.jackson.databind.JsonNode;
import org.endeavourhealth.common.cache.GenericCache;
import org.endeavourhealth.common.config.ConfigManager;
import org.endeavourhealth.common.utility.MetricsHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionPool extends GenericCache<Connection> {
    private static final Logger LOG = LoggerFactory.getLogger(ConnectionPool.class);
    private static final int VALID_TIMEOUT = 5;
    private static ConnectionPool instance = null;

    public static ConnectionPool getInstance() {
        if (instance == null)
            instance = new ConnectionPool();

        return instance;
    }

    @Override
    protected boolean isValid(Connection connection) {
        try {
            if (connection == null)
                return false;

            if (connection.isValid(VALID_TIMEOUT)) {
                connection.setAutoCommit(true);
                return true;
            }

            MetricsHelper.recordCounter("ConnectionPool.Size").dec();

            if (!connection.isClosed())
                connection.close();

            return false;
        } catch (SQLException e) {
            LOG.error("Error validating/cleaning up connection", e);
            return false;
        }
    }

    @Override
    protected Connection create() {
        try {

            String url;
            String user;
            String pass;
            String driver;
            JsonNode json = ConfigManager.getConfigurationAsJson("database");

            if (json != null) {
                url = json.get("url").asText();
                user = json.get("username").asText();
                pass = json.get("password").asText();
                driver = json.get("class") == null ? null : json.get("class").asText();
            } else {
                // get new style of config

                String appId = ConfigManager.getAppId();

                String dbConnectionConfigItem = "db_" + appId.replace("-", "_");

                json = ConfigManager.getConfigurationAsJson(dbConnectionConfigItem, "global");

                url = json.get("url").asText();
                driver = json.get("class") == null ? null : json.get("class").asText();

                json = ConfigManager.getConfigurationAsJson("db_credentials");

                user = json.get("username").asText();
                pass = json.get("password").asText();

            }

            if (driver != null && !driver.isEmpty())
                Class.forName(driver);

            Properties props = new Properties();

            props.setProperty("user", user);
            props.setProperty("password", pass);

            Connection connection = DriverManager.getConnection(url, props);    // NOSONAR

            LOG.debug("New DB Connection created");

            MetricsHelper.recordCounter("ConnectionPool.Size").inc();
            return connection;
        } catch (Exception e) {
            LOG.error("Error getting connection", e);
        }
        return null;
    }

    @Override
    public Connection pop() {
        Connection conn = super.pop();
        MetricsHelper.recordCounter("ConnectionPool.InUse").inc();
        return conn;
    }

    @Override
    public void push(Connection conn) {
        super.push(conn);
        MetricsHelper.recordCounter("ConnectionPool.InUse").dec();
    }
}
