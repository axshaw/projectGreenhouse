#!/usr/bin/env python
import serial

class arduino_test_Service:

    serialPort = "/dev/pts/0"
    serialConnection = 0
	
    def __init__(self):
	    self.serialConnection = serial.Serial(self.serialPort)
        #self.port=self.serialConnection.portstr 

    def generateJSON(self):
    	print self.serialConnection.port
    	print self.serialConnection.isOpen
        JSONString = '{"":"","":"","":""}\n'
        self.serialConnection.write(JSONString)

newConnection = arduino_test_Service()
print newConnection.generateJSON()