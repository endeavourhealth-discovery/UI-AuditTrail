package org.endeavourhealth.uiaudit.dal;

import org.endeavourhealth.common.cache.GenericCache;
import org.endeavourhealth.common.config.ConfigManager;
import org.endeavourhealth.common.utility.MetricsHelper;
import org.endeavourhealth.core.database.rdbms.ConnectionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.SQLException;

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
    protected Connection create()  {

        try {
            String appId = ConfigManager.getAppId();

            switch (appId) {
                case "data-sharing-manager"  :   return ConnectionManager.getDataSharingManagerConnection();
                case "user-manager"          :   return ConnectionManager.getUserManagerConnection();

                default: throw new IllegalArgumentException("appId not recognised : " + appId);
            }

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
