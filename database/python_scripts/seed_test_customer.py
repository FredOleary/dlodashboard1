#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May  8 17:20:33 2018

@author: brian mackessy
"""

from platform import python_version
from DBConnection import DBConnection
from DBPopulate import DBPopulate
from Customer import Customer

import datetime

if __name__ == "__main__":
    print('Python', python_version())
    customers = [ Customer(name='TestCustomer 1', created_date= datetime.date(2018, 1, 1)),
                  Customer(name='TestCustomer 2', created_date=datetime.date(2018, 2, 1)),
                  Customer(name='TestCustomer 3', created_date=datetime.date(2018, 3, 1)),
                  Customer(name='TestCustomer 4', created_date=datetime.date(2018, 4, 1)),
                  Customer(name='TestCustomer 5', created_date=datetime.date(2018, 4, 1)),
                  Customer(name='TestCustomer 6', created_date=datetime.date(2018, 5, 1))
                  ]
    dbConnection = DBConnection('167.99.229.86', 'dashboard', 'Dashboard2018', 'sema_test_brian')
    dbConnection.connect()
    connection = dbConnection.get_connection()
    if connection is not None:
        print("Connected")
        dbPopulate = DBPopulate(connection)
        dbPopulate.populate_country('New Zealand')
        dbPopulate.populate_customer_type('TestCustomer')
        dbPopulate.populate_sales_channel(0x0, "sales channel 1")
        dbPopulate.populate_product_category("Description of product category", "product_category 1")
        dbPopulate.populate_region('New Zealand', 'Manawatu')
        dbPopulate.populate_kiosk('Manawatu', "UnitTestCustomers", "my_api_key")
        for customer in customers:
            dbPopulate.populate_customer('UnitTestCustomers', "TestCustomer", customer.name, customer.created_date)

        dbConnection.close()
    else:
        print('failed to connect')

