#!/usr/bin/env python
#import unittest
#import mock
#import testArduinoService
#
import mock
import unittest
import serial
import arduino_test_Service

class test_testArduinoService(unittest.TestCase):
    def test_mustCreateObject(self):
        service = arduino_test_Service.setup()
        assert isinstance(service, arduino_test_Service.setup())



    def test_test(self):
		pass

    def test_mustOpenConnectiontoSerialPort(self):
        s = serial.Serial('/dev/pts/1')
        service = arduino_test_Service.setup()
        c = service.serialConnection 
        self.assertEqual(s, c)

    def test_mustRecieveDatafromSerialPort(self):
        pass

    def test_mustCreateConnectiontoRabbitMQ(self):
        pass

    def test_mustSendMessagetoRabbitMQ(self):
        pass

    def test_mustMaintainMessagetoRabbit(self):
        pass

    def main():
        unittest.main()

    if __name__ == '__main__':
        main()