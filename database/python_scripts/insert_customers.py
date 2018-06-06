from platform import python_version
from DBConnection import DBConnection
from DBPopulate import DBPopulate
from Customer import Customer

if __name__ == "__main__":
    dbConnection = DBConnection('167.99.229.86', 'dashboard', 'Dashboard2018', 'sema_test1')
    dbConnection.connect()
    connection = dbConnection.get_connection()
    populate = DBPopulate(connection)
