#!/usr/bin/env python
#import unittest
#import mock
#import testArduinoService
#
import mock
import unittest
import serial
from services.arduino_test_Service import arduino_test_Service
class test_testArduinoService(unittest.TestCase):
    def test_mustCreateObject(self):
        service = arduino_test_Service.arduino_test_Service()
        assert isinstance(service, arduino_test_Service.arduino_test_Service())



    def test_test(self):
		pass

    def test_mustOpenConnectiontoSerialPort(self):
        #s = serial.Serial('/dev/pts/1')
       # service = arduino_test_Service()
       # c = service.serialConnection 
       pass
       # self.assertEqual(s, c)

    def test_mustRecieveDatafromSerialPort(self):
        pass

    def test_mustCreateConnectiontoRabbitMQ(self):
        pass

    def test_mustSendMessagetoRabbitMQ(self):
        pass

    def test_mustMaintainMessagetoRabbit(self):
        self.assertEqual(1,2)

    def main():
        unittest.main()

    if __name__ == '__main__':
        main()