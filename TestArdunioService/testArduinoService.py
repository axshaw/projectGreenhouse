#!/usr/bin/env python
import pika

class testArduinoService():

	HOST = "localhost"
	QUEUE = "GreenhouseData"
	EXCHANGE = ""
	ROUTING_KEY = QUEUE
	BODY = ""


	def setUp(self):

		self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
		self.channel = connection.channel()
		self.channel.queue_declare(queue='GreenhouseData')
		
		

	def sendMessage(self):
		self.channel.basic_publish(exchange='',
			routing_key='GreenhouseData',
            body='GreenhouseTalking')
		#print " [x] Sent 'GreenhouseTalking'"

	def closeConnection(self):
		self.connection.close()