#!/usr/bin/env python
#import unittest
#import mock
#import testArduinoService
#
import mock
import unittest
import serial
import io
from services.arduino_test_Service import arduino_test_Service
import threading


baudrate=115200
timeout=3.0

class test_testArduinoService(unittest.TestCase):
    def test_mustCreateObject(self):
        service = arduino_test_Service.arduino_test_Service()
        assert isinstance(service, arduino_test_Service.arduino_test_Service)


    def test_mustRecieveDatafromSerialPort(self):
        ser = serial.Serial('/dev/pts/1',baudrate=115200, timeout=30)
        service = arduino_test_Service.arduino_test_Service()
        hello = ser.readline()
       # service.generateJSON()
        assert isinstance(hello, str)
        print hello
        self.assertTrue(len(hello) > 4)
 
    def main():
        unittest.main()

    if __name__ == '__main__':
        main()