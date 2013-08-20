#!/usr/bin/env python
import serial

class testArduinoService:

    serialPort = '/dev/pts/2'
    serialConnection = 0
	
    def setup():
	    self.serialConnection = serial.Serial(serialPort)
		